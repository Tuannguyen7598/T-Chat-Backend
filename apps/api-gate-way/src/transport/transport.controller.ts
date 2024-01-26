import { Controller, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import {
	ClientKafka,
	Ctx,
	KafkaContext,
	MessagePattern,
	Payload,
} from "@nestjs/microservices";

@Controller()
export class TransportController implements OnModuleInit {
	constructor(@Inject("user-service") private clientKafka: ClientKafka) {}

	async onModuleInit() {
		this.clientKafka.subscribeToResponseOf("user-service_auth");
		await this.clientKafka.connect();
	}

	@MessagePattern("user-service_auth")
	async handleAuth(@Payload() payload: any, @Ctx() ctx: KafkaContext) {
		console.log("Response from messasge patten:", payload);
		return "Okeee";
	}
}
