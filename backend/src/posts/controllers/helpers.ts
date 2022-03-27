export const convertB64StringToHex = (b64String: string) =>
  Buffer.from(b64String, "base64").toString("hex");
