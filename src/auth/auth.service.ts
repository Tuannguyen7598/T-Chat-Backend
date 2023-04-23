import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";


import { UserDto, UserRole } from "src/model/interface/user.interface";
import { ResultToApiGateWay, resulToGateWay } from "src/model/lib/TransformValue/transformValue";

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_MODEL") private userModel: Model<UserDto>,
    @Inject("HASH_PASSWORD") private hassPassword
  ) { }
  async create(createUser: Pick<UserDto, 'username' | 'credentials' | 'role'>): Promise<any> {
    const user = await this.userModel.findOne({
      username: createUser.username,
    });
    if (user) {
      return {
        message: "Đã tồn tại user",
      };
    }
    const salt = this.hassPassword.buySalt();
    const newUser = {
      username: createUser.username,
      credentials: {
        salt,
        password: this.hassPassword.hashPassword(createUser.credentials.password, salt),
      },
      role: UserRole.user,
      ...createUser
    };
    console.log('user', newUser);

    const createdUser = await this.userModel.create(newUser);
    const result = resulToGateWay("Đăng kí thành công", newUser, []);
    return result;
  }

  async findOne(userlogin: UserDto): Promise<any> {
    const user = await this.userModel.findOne({ username: userlogin.username });
    if (!user) {
      const result: ResultToApiGateWay<UserDto> = {
        message: "Bạn nhập sai tài khoản hoặc mật khẩu",
      };
      return result;
    }
    const passwordLogin = this.hassPassword.hashPassword(
      userlogin.credentials.password,
      user.credentials.salt
    );
    if (passwordLogin !== user.credentials.password) {
      const result: ResultToApiGateWay<UserDto> = {
        message: "Bạn nhập sai tài khoản hoặc mật khẩu",
      };
      return result;
    }
    const result = resulToGateWay("Đăng nhậP thành công", user, []);

    console.log(result);

    return result;
  }

  update(id: number, updateAuthDto: UserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
