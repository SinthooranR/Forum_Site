//TODO: Update all the any interfaces and place them here
export interface Comment {
  id: number;
  createdDate: string;
  userId?: number;
  threadId?: number;
  user?: User;
  text: string;
}

export interface Thread {
  id: number;
  createdDate: string;
  userId?: number;
  user?: User;
  title: string;
  description: string;
  comments?: Comment[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  threads: Thread[];
  comments: Comment[];
}
