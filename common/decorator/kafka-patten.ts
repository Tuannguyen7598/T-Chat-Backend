import { Injectable } from "@nestjs/common";
import { MessageHandler } from "@nestjs/microservices";
import { Kafka, Consumer, Producer } from "kafkajs";

@Injectable()
export class KafkaService {
	private kafka: Kafka;
	private producer: Producer;
	private consumer: Consumer;

	constructor() {
		this.kafka = new Kafka({
			clientId: "api-gateway",
			brokers: ["localhost:29092"],
		});
		this.producer = this.kafka.producer();
		this.consumer = this.kafka.consumer({ groupId: "your-group-id" });

		this.connect();
	}

	async connect() {
		await this.producer.connect();
		await this.consumer.connect();
	}

	getProducer(): Producer {
		return this.producer;
	}

	getConsumer(): Consumer {
		return this.consumer;
	}
}
// kafka-pattern.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const KafkaPattern = (pattern: string) =>
	SetMetadata("kafka-pattern", pattern);

export const KafkaMessageHandler = (pattern: string): MethodDecorator => {
	return (target: any, key, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;

		if (typeof originalMethod !== "function") {
			throw new Error(
				`@KafkaMessageHandler decorator can only be used on methods.`
			);
		}

		const kafkaService = new KafkaService();
		const consumer = kafkaService.getConsumer();

		consumer.subscribe({ topic: pattern });

		consumer.run({
			eachMessage: async ({ message, topic, partition, pause }) => {
				const content = JSON.parse(message.value.toString());
				const instance = new target.constructor();
				const handler: MessageHandler = instance[key];

				if (!handler || typeof handler !== "function") {
					throw new Error(
						`No matching message handler method found in ${target.constructor.name} for pattern: ${pattern}`
					);
				}

				await handler.bind(instance)(content);
			},
		});
	};
};
