export type PostServerModel = {
  id: number;
  title: string;
  body: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
};

interface PostModel {
  id: number;
  title: string;
  body: string;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
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
