export interface IAuthenticateUserRequestDTO {
  username: string;
  email: string;
  password: string;
}

export interface IAuthenticateUserResponseDTO {
  acessToken: string;
  refreshToken: string;
}
