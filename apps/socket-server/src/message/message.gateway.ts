import { Body, Inject, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';


import { BoxChatPerSonalDto, Image, Message } from 'libs/share/model';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { FileUploadDto } from './dto/file-upload.dto';
import { fstat, fsync } from 'fs';
import * as fs from 'fs'
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';

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
   
    
    const userSendMessage = this.listUserOnline.find((x) => x.socketId ===  client.id)
    const userReciverSMessage = this.listUserOnline.find((y)=> y.userId === userId)
    if (!boxChat) {
      const newBoxChat = (await this.boxChatPersonalModel.create(BoxChatPerSonalDto.createObj({ userOneId: userSendMessage.userId, userTwoId: userId })))
      if (!newBoxChat) {
        return 'error'
      }
      return newBoxChat.toObject()

    }
   
    const seenMessage = await this.messageModel.updateMany({ from: userId}, { $set: { isSeen: true } })
    const listMessage = await this.messageModel.find({ boxChatId: boxChat.toObject().id }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
   
    
    userSendMessage.isOnBoxChat = userId
    const result = []
    const getList =(await this.messageModel.find({ isSeen: false }, { _id: 0, from: 1 })).forEach((x) => {
      result.push(x.from)
    })
    this.server.to(userReciverSMessage?.socketId ?? '').emit('recive-message', {listMessage: listMessage , listMessageIsNotSeen: []})
    return { ...boxChat.toObject(), listMessage: listMessage,listMessageIsNotSeen : result }

  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() message: Message, @ConnectedSocket() client: Socket) {
   
    const userRecive = this.listUserOnline.find((x) => x.userId === message.to)
    if (userRecive && userRecive.isOnBoxChat === message.from) {
      const newMessage = this.messageModel.create({ ...message, isSeen: true })
      if (!newMessage) {
        return 'error'
      }
  
 
      
      const result = []
      const getListMessageIsNotsSeen =  (await this.messageModel.find({ isSeen: false }, { _id: 0, from: 1 })).forEach((x)=> {result.push(x.from)})
      const listMessage = await this.messageModel.find({ boxChatId: message.boxChatId }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
      this.server.to(userRecive.socketId).emit('recive-message', {listMessage: listMessage , listMessageIsNotSeen: result})
      
      return listMessage
    }
   
    const newMessage =await this.messageModel.create(message)
    if (!newMessage) {
    
      return 'error'
    }
    const listMessage = await this.messageModel.find({ boxChatId: message.boxChatId }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
    if (userRecive) {
      const result = []
      const getListMessageIsNotsSeen =  (await this.messageModel.find({ isSeen: false }, { _id: 0, from: 1 })).forEach((x)=> {result.push(x.from)})
      const listMessage = await this.messageModel.find({ boxChatId: message.boxChatId }, { _id: 0 }).sort({ createAt: -1 }).limit(20)
      
      this.server.to(userRecive.socketId).emit('recive-message', {listMessageIsNotSeen: result})
    }
   
    return listMessage
  }



  @SubscribeMessage('get-is-seen')
  async getListIsSeen(@ConnectedSocket() client: Socket) {
    const result = []
    const getList =(await this.messageModel.find({ isSeen: false }, { _id: 0, from: 1 })).forEach((x) => {
      result.push(x.from)
    })
   
    return result
  }


  @SubscribeMessage('upload-image')
  async uploadImage(@MessageBody() payload: {message: Message, image:Array<Image>}) {
    payload.image.forEach((value,index) => {
      const pathImg = path.join(__dirname,'..','..','..',`/upload/${value.imgName}`)
    
    
      const base64Data = value.imgData.replace(/^data:image\/png;base64,/, '')
      fs.createWriteStream(pathImg,'base64url').write(base64Data)
    
    })
    
    
    return 'ok'
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
      this.server.emit('newUserOnline', this.listUserOnline)
      return
    }
    this.listUserOnline.push({ socketId: socket.id, userId: user.id, username: user.username, isOnBoxChat: '' })
    this.server.emit('newUserOnline', this.listUserOnline)
    console.log('conect', this.listUserOnline);
  }
  handleDisconnect(client: Socket) {

    this.listUserOnline = this.listUserOnline.filter((a) => a.socketId !== client.id)
    this.server.emit('newUserOnline', this.listUserOnline)
    console.log('disconneted', this.listUserOnline);


  }
  afterInit(server: Server) {
    console.log('socket is Init')

  }

}
