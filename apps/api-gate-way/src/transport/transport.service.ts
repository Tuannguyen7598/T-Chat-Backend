import { Injectable, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka, Producer } from "kafkajs";

export enum Topic {}
@Injectable()
export class TransportService implements OnModuleInit {
	constructor() {}
	private kafkaClient: Kafka;
	private consumer: Consumer;
	private produce: Producer;
	async onModuleInit() {
		this.kafkaClient = new Kafka({
			clientId: "api-gateway",
			brokers: ["localhost:29092"],
		});
		this.consumer = this.kafkaClient.consumer({
			groupId: "api-gateway",
		});
		await this.consumer.connect();
		this.consumer.on("consumer.connect", () => {
			console.log("consumer connected");
		});
		await this.consumer.subscribe({
			topic: "api-gateway",
			fromBeginning: true,
		});
		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				console.log({
					topic,
					partition,
					value: message.value.toString(),
				});
			},
		});
		this.produce = this.kafkaClient.producer({
			allowAutoTopicCreation: true,
		});
		await this.produce.connect();
		this.produce.on("producer.connect", () => {
			console.log("producer connected");
		});
		await this.produce.send({
			topic: "api-gateway",
			messages: [
				{
					value: "hello world",
				},
			],
		});
	}
}
