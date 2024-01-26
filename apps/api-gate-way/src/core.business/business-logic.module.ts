import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TransportModule } from "../transport/transport.module";
import { AuthUseCase } from "./auth/auth.usecase";

@Module({
	imports: [TransportModule],
	controllers: [],
	providers: [AuthUseCase],
	exports: [AuthUseCase],
})
export class BusinessLogicModule {}
