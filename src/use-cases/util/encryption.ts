import { scryptSync } from "node:crypto";

export class Encryption {
  public async hash(password: string): Promise<string> {
    const pass = scryptSync(
      password,
      process.env.SALT_PASSWORD as string,
      Number(process.env.KEY_LENGTH),
    );

    return pass.toString("hex");
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return hash === (await this.hash(password));
  }
}
