import {
	HttpException,
	Inject,
	Injectable,
	OnModuleInit,
} from "@nestjs/common";
import { TransportService } from "../transport.service";
import { Consumer, EachMessagePayload, Producer } from "kafkajs";
import { Observable } from "rxjs";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class UserServiceTransport implements OnModuleInit {
	constructor(
		private transportService: TransportService,
		@Inject("user-service") private clientKafka: ClientKafka
	) {}
	async onModuleInit() {}

	async sendMessageToUserService() {
		return await this.clientKafka
			.send("user-service_auth", {
				name: "test",
			})
			.toPromise();
	}
}
