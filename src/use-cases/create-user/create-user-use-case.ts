import type { IUserRepository } from "@/repositories/user-repository/i-user-repository";
import type { Encryption } from "../util/encryption";
import type { IUserRequestDTO, IUserResponseDTO } from "./create-user-dto";

export class CreateUserUseCase {
  constructor(
    private encryption: Encryption,
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    username,
    email,
    password,
  }: IUserRequestDTO): Promise<IUserResponseDTO | undefined> {
    const userAlreadyExists = await this.userRepository.findByUsernameOrEmail(
      username,
      email,
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashPassword = await this.encryption.hash(password);

    const user = await this.userRepository.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return { user };
  }
}
