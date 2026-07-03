export interface RefreshTokenUserRequestDTO {
  refresh_token: string;
}

export interface RefreshTokenUserResponseDTO {
  acessToken: string;
  refreshToken: string;
}
