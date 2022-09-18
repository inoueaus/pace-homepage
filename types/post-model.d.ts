export type PostServerModel = {
  title: string;
  body: string;
  picture: string;
  createdAt: number;
  updatedAt: number;
};

interface PostModel {
  id: string;
  title: string;
  body: string;
  picture: string | null;
  createdAt: number;
  updatedAt: number;
}
export const dummyPost = {
  title: "",
  body: "",
  id: 999,
  createdAt: new Date(),
  updatedAt: new Date(),
  picture: null,
};

export type PostModel = typeof dummyPost & { picture: string | null; };
