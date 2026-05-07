import { prisma } from "@/database/lib/prisma";
import type { GenerateRefreshTokenProvider } from "@/provider/generate-refresh-token-provider";
import type { JwtProvider } from "@/provider/jwt/jwt-provider";
import type { Encryption } from "../util/encryption";
import type {
	IAuthenticateUserRequestDTO,
	IAuthenticateUserResponseDTO,
} from "./authenticate-user-dto";

export class AuthenticateUserUseCase {
	constructor(
		private encryption: Encryption,
		private readonly jwtProvider: JwtProvider,
		private readonly generateRefreshToken: GenerateRefreshTokenProvider
	) {}

	public async execute({
		username,
		email,
		password,
	}: IAuthenticateUserRequestDTO): Promise<
		IAuthenticateUserResponseDTO | unknown
	> {
		const user = await prisma.user.findFirstOrThrow({
			where: {
				OR: [{ username }, { email }],
			},
		});

		if (!user) {
			throw new Error("User or password incorrect");
		}

		const isPasswordMatch = await this.encryption.compare(
			password,
			user.password
		);

		if (!isPasswordMatch) {
			throw new Error("User or password incorrect");
		}

		const token = await this.jwtProvider.signToken({
			id: user.id,
			username: user.username,
			email: user.email,
		});

		await prisma.refreshToken.deleteMany({
			where: {
				userId: user.id,
			},
		});

		const refreshToken = await this.generateRefreshToken.execute(user.id);

		return { token, refreshToken };
	}
}
