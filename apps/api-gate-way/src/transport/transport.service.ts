import { Injectable, OnModuleInit } from "@nestjs/common";
import { Consumer, EachMessagePayload, Kafka, Producer } from "kafkajs";
import { Observable } from "rxjs";

export enum Topic {}
@Injectable()
export class TransportService {
	constructor() {}
}
