import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NotifiServiceConfig, UserServiceConfig } from "common/config/config";
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
	await app.listen(NotifiServiceConfig.PORT, () => {
		console.log("Notifi server listen on port:", NotifiServiceConfig.PORT);
	});
}
bootstrap();
