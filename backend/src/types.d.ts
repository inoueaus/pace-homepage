export interface PostModel {
  id: number;
  title: string;
  body: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostEntry {
  id: number;
  title: string;
  body: string;
  picture: string;
  created_at: string;
  updated_at: string;
}
