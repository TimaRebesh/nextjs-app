export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  img?: string | null;
  isAdmin: boolean;
}

export interface PostType {
  img: string;
  createdAt: number;
  title: string;
  body: string;
  slug: string;
}
