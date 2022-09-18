interface LoginCredentials {
  username: string;
  password: string;
}

export type Inquiry = {
  id: string;
  body: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: number;
  viewed: boolean;
}
