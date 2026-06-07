import type { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import type { JwtProvider } from "@/provider/jwt/jwt-provider";
import type { IRefreshTokenRepository } from "@/repositories/refresh-token-repository/i-refresh-token-repository";
import type { IUserRepository } from "@/repositories/user-repository/i-user-repository";
import type { Encryption } from "../util/encryption";
import type {
	IAuthenticateUserRequestDTO,
	IAuthenticateUserResponseDTO,
} from "./authenticate-user-dto";

export class AuthenticateUserUseCase {
	constructor(
		private encryption: Encryption,
		private readonly jwtProvider: JwtProvider,
		private readonly generateRefreshToken: GenerateRefreshTokenProvider,
		private readonly userRepository: IUserRepository,
		private readonly refreshTokenRepository: IRefreshTokenRepository
	) {}

	public async execute({
		username,
		email,
		password,
	}: IAuthenticateUserRequestDTO): Promise<
		IAuthenticateUserResponseDTO | unknown
	> {
		const user = await this.userRepository.findByUsernameOrEmail(
			username,
			email
		);

		if (!user) {
			throw new Error("User or password incorrect");
		}

		const isPasswordMatch = await this.encryption.compare(
			password,
			user.password
		);

		if (!isPasswordMatch) {
			throw new Error("User or password incorrect!");
		}

		const token = await this.jwtProvider.signToken({
			id: user.id,
			username: user.username,
			email: user.email,
		});

		await this.refreshTokenRepository.deleteByUserId(user.id);

		const refreshToken = await this.generateRefreshToken.execute(user.id);

		return { token, refreshToken };
	}
}
