export type RoleName = 'admin' | 'author' | 'user';

interface User {
  id: string;
  name: string;
  nickname?: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: RoleName[];
}

export default User;
