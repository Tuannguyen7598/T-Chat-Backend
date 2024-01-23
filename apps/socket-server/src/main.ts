import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { SocketServiceConfig } from "common/config/config";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		})
	);
	await app.listen(SocketServiceConfig.PORT, () => {
		console.log("Socket server listen on port:", SocketServiceConfig.PORT);
	});
}
bootstrap();
