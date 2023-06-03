import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Auth } from 'libs/share/model';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  
}
