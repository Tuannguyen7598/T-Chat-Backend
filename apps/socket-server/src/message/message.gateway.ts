import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

import { AuthSocket } from 'libs/share/model/lib/Authenticate/auth-socket.decorator';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';
import { BoxChatPerSonalDto } from 'libs/share/model';

interface ListSocketOnConnect {
  socketId: string;
  userId: string;
}
@WebSocketGateway(3003, {
  cors: {
    origin: '*',
  },


})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    @Inject("MESSAGE_MODEL") private userModel: Model<BoxChatPerSonalDto>,
    private jwtService: JwtService,
    private readonly messageService: MessageService,
  ) { }
  listUserOnline: Array<ListSocketOnConnect> = []
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log('soket', createMessageDto);

    return this.messageService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {

    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @AuthSocket('admin', 'user')
  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }


  handleConnection(socket: Socket, ...args: any[]) {
   
    const token = socket.handshake.query.token as string
    const user = this.jwtService.verify(token)
   
    
    if (user === null || user=== undefined) {
      socket.disconnect()
    }
    if (this.listUserOnline.findIndex((x)=> x.userId === user.id) !== -1) {
      return
    }
    this.listUserOnline.push({socketId: socket.id,userId:user.id})
    this.server.emit('newUserOnline', this.listUserOnline)
    console.log('conect',this.listUserOnline);
  


  }
  handleDisconnect(client: Socket) {

    this.listUserOnline = this.listUserOnline.filter((a) => a.socketId !== client.id)
    console.log('disconneted',this.listUserOnline);
    

  }
  afterInit(server: Server) {
    console.log('socket is Init')
  }


}
