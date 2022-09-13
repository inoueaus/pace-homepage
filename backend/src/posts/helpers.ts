import sql from "../db";

export const processProvidedImage = (base64String: string | undefined) => {
  if (typeof base64String === "string" && !base64String.includes(";")) {
    return Buffer.from(base64String, "base64"); // must do some security work here
  }
  return null;
};

export const checkIfHasImage = async (postId: number): Promise<boolean> => {
  const [hasImageResult] =
    await sql`SELECT img_id FROM images WHERE post_id = ${postId}`;
  return Boolean(hasImageResult);
};
