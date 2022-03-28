interface PostServerModel {
  id: number;
  title: string;
  body: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PostModel {
  id: number;
  title: string;
  body: string;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
}
