import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TransportController } from "./transport.controller";
import { TransportService } from "./transport.service";
import { UserServiceTransport } from "./transport-userservice/userservice-transport";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "user-service",
				transport: Transport.KAFKA,
				options: {
					client: {
						brokers: ["localhost:29092"],
						clientId: "api-gateway",
					},
					consumer: {
						groupId: "api-gateway",
						allowAutoTopicCreation: true,
					},
					producer: {
						allowAutoTopicCreation: true,
					},
				},
			},
		]),
	],
	controllers: [TransportController],
	providers: [TransportService, UserServiceTransport],
	exports: [TransportService, UserServiceTransport],
})
export class TransportModule {}
