import { PartialType, PickType } from "@nestjs/swagger";
import { UserDto } from "libs/share/model";


export class UserRegisterDto extends PickType(UserDto, ['id', 'username', 'credentials', 'role'] as const) { }

export class AddFriendDto extends PickType(UserDto,['id','username'] as const) {}