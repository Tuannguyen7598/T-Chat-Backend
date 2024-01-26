import { Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TransportService } from "../../transport/transport.service";
import { AuthUseCase } from "../../core.business/auth/auth.usecase";

@Controller()
@ApiTags("Auth")
export class AuthController {
	constructor(@Inject(AuthUseCase) private transportService: AuthUseCase) {}

	@Post("test")
	async test() {
		return await this.transportService.test();
	}
}
