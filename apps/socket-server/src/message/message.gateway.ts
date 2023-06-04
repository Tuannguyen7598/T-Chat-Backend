import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';


import { BoxChatPerSonalDto, Message } from 'libs/share/model';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

interface ListSocketOnConnect {
  socketId: string;
  userId: string;
  username: string;
  isOnBoxChat: string;
}
@WebSocketGateway(3003, {
  cors: {
    origin: '*',
  },


})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    @Inject("MESSAGE_MODEL") private messageModel: Model<Message>,
    @Inject("BOXCHATPERSIONAL_MODEL") private boxChatPersonalModel: Model<BoxChatPerSonalDto>,
    private jwtService: JwtService,
    private readonly messageService: MessageService,
  ) { }
  listUserOnline: Array<ListSocketOnConnect> = []

  @WebSocketServer()
  server: Server;



  @SubscribeMessage('get-box-chat')
  async getBoxChat(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    const boxChat = await this.boxChatPersonalModel.findOne({ $or: [{ userOneId: userId }, { userTwoId: userId }] })
    const clientOnline = this.listUserOnline.find((x) => x.socketId === client.id)
    if (!boxChat) {
      const newBoxChat = (await this.boxChatPersonalModel.create(BoxChatPerSonalDto.createObj({ userOneId: clientOnline.userId, userTwoId: userId })))
      if (!newBoxChat) {
        return 'error'
      }
      return newBoxChat.toObject()

    }

    const seenMessage = this.messageModel.updateMany({ boxChatId: boxChat.toObject().id }, { $set: { isSeen: true } })
    const listMessage = await this.messageModel.find({ boxChatId: boxChat.toObject().id }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
    clientOnline.isOnBoxChat = userId
    console.log(this.listUserOnline);

    return { ...boxChat.toObject(), listMessage: listMessage }

  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() message: Message, @ConnectedSocket() client: Socket) {

    const userRecive = this.listUserOnline.find((x) => x.userId === message.to)
    if (userRecive && userRecive.isOnBoxChat === message.to) {
      const newMessage = this.messageModel.create({ ...message, isSeen: true })
      if (!newMessage) {
        return 'error'
      }
      const listMessage = await this.messageModel.find({ boxChatId: message.boxChatId }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
      this.server.to(userRecive.socketId).emit('recive-message', listMessage)
      return listMessage
    }
    const newMessage = this.messageModel.create(message)
    if (!newMessage) {
      return 'error'
    }
    const listMessage = await this.messageModel.find({ boxChatId: message.boxChatId }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
    return listMessage
  }



  @SubscribeMessage('get-is-seen')
  async getListIsSeen(@ConnectedSocket() client: Socket) {
    const getList = this.messageModel.find({ isSeen: false }, { _id: 0, to: 1 })
    return getList
  }



  handleConnection(socket: Socket, ...args: any[]) {

    const token = socket.handshake.query.token as string
    const user = this.jwtService.verify(token)


    if (user === null || user === undefined) {
      socket.disconnect()
    }
    if (this.listUserOnline.findIndex((x) => x.userId === user.id) !== -1) {
      this.listUserOnline.filter((x) => x.userId !== user.id)
      this.listUserOnline.push({ socketId: socket.id, userId: user.id, username: user.username, isOnBoxChat: '' })
      return
    }
    this.listUserOnline.push({ socketId: socket.id, userId: user.id, username: user.username, isOnBoxChat: '' })
    this.server.emit('newUserOnline', this.listUserOnline)
    console.log('conect', this.listUserOnline);



  }
  handleDisconnect(client: Socket) {

    this.listUserOnline = this.listUserOnline.filter((a) => a.socketId !== client.id)
    this.server.emit('newUserOnline', this.listUserOnline)
    console.log('disconnetedd', this.listUserOnline);


  }
  afterInit(server: Server) {
    console.log('socket is Init')
  }


}
