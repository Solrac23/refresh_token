export class BaseError<T extends string> extends Error {
	private code: T;
	public cause?: unknown;

	public constructor({ code, message, cause }: { code: T; message: string; cause?: unknown }) {
		super(message);
		this.code = code;
		this.cause = cause;
	}
}
