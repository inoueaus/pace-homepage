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
  img: string;
  created_at: string;
  updated_at: string;
}

export interface InquiryDBRecord {
  id: number;
  body: string;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  viewed: boolean;
  created_at: string;
}
