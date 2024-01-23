import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MessageServiceConfig } from "common/config/config";
import { AppModule } from "./app.module";
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
	await app.listen(MessageServiceConfig.PORT, () => {
		console.log("Message server listen on port:", MessageServiceConfig.PORT);
	});
}
bootstrap();
