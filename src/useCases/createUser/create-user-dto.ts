export interface IUserRequestDTO {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface IUserResponseDTO {
	user: {
		id: string;
		name: string;
		username: string;
		email: string;
	};
}
