import { Inject, Injectable } from "@nestjs/common";
import { TransportService } from "../../transport/transport.service";
import { UserServiceTransport } from "../../transport/transport-userservice/userservice-transport";

@Injectable()
export class AuthUseCase {
	constructor(
		@Inject(TransportService) private transportService: TransportService,
		@Inject(UserServiceTransport)
		private userServiceTransport: UserServiceTransport
	) {}

	async test() {
		return await this.userServiceTransport.sendMessageToUserService();
	}
}
