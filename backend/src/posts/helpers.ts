export const convertB64StringToHex = (b64String: string) =>
  Buffer.from(b64String, "base64").toString("hex");

export const processProvidedImage = (base64String: string | undefined) => {
  if (typeof base64String === "string" && !base64String.includes(";")) {
    return Buffer.from(base64String, "base64") // must do some security work here
  }
  return null
};
