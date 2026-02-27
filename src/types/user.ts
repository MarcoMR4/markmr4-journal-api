import { RoleName } from '@prisma/client';

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
export { RoleName };
