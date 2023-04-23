import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { UserDto } from "src/model/interface/user.interface";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern("register")
  create(@Payload() createUser: UserDto) {
    return this.authService.create(createUser);
  }

  @MessagePattern("login")
  findOne(@Payload() user: UserDto) {
    return this.authService.findOne(user);
  }

  @MessagePattern("removeAuth")
  remove(@Payload() id: number) {
    return this.authService.remove(id);
  }
}
