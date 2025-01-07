import * as crypto from "crypto";

const ENCRYPTION_KEY = `${process.env.ENCRYPTION_KEY}`;

const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text: string): string {
  if (ENCRYPTION_KEY.length >= 32) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } else {
    return text;
  }
}

function decrypt(text: string): string {
  if (ENCRYPTION_KEY.length >= 32) {
    const textParts = text.split(":");
    const ivPart = textParts.shift();
    if (!ivPart) {
      throw new Error("Invalid encrypted text format");
    }
    const iv = Buffer.from(ivPart, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } else {
    return text;
  }
}

export { decrypt, encrypt };
