import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { useContainer } from "class-validator";
import { GateWayConfig } from "common/config/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		})
	);
	const config = new DocumentBuilder()
		.addBearerAuth()
		.setTitle("API_GATEWAY")
		.setDescription("The APIGATEWAY description")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	await app.listen(GateWayConfig.PORT, () => {
		console.log("Api gate way listen on port:", GateWayConfig.PORT);
	});
}
bootstrap();
