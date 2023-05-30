import { Inject } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { BoxChatDto } from 'libs/share/model';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageService } from './message.service';

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
    @Inject("MESSAGE_MODEL") private userModel: Model<BoxChatDto>,
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

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }


  handleConnection(socket: Socket, ...args: any[]) {
    console.log('client', socket.id,'conected');
    const userId = socket.handshake.query.userId
    if (userId !== '') {
      this.listUserOnline.push({
        userId: socket.handshake.query.userId as string,
        socketId: socket.id
      })
      this.server.emit('newUserOnline',this.listUserOnline)
    }
  
  }
  handleDisconnect(client: Socket) {
    
    console.log('client', client.id,'disconected');
    this.listUserOnline =  this.listUserOnline.filter((a)=> a.socketId === client.id)
    console.log('array socket',this.listUserOnline);
    
    
  }
  afterInit(server: Server) {
    console.log('socket is Init')
  }


}
