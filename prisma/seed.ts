import { PrismaClient, RoleName } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const roles: RoleName[] = ['admin', 'author', 'user'];

const users = [
  {
    name: 'John Doe',
    nickname: 'john1',
    email: 'john.doe@example.com',
    password: 'password123',
    roles: ['author'] as RoleName[],
  },
  {
    name: 'Maria Smith',
    nickname: 'maria1',
    email: 'maria.smith@example.com',
    password: 'guess',
    roles: ['author'] as RoleName[],
  },
  {
    name: 'Admin User',
    nickname: 'admin1',
    email: 'admin@example.com',
    password: 'admin123',
    roles: ['admin'] as RoleName[],
  },
];

async function main() {
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `${roleName} role`,
      },
    });
  }

  const roleRecords = await prisma.role.findMany({
    where: { name: { in: roles } },
  });
  const roleIdByName = new Map(roleRecords.map((role) => [role.name, role.id]));

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        nickname: user.nickname,
        password: hashedPassword,
        isActive: true,
      },
      create: {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        password: hashedPassword,
        isActive: true,
      },
    });

    await prisma.userRole.deleteMany({
      where: { userId: created.id },
    });

    const roleLinks = user.roles
      .map((roleName) => roleIdByName.get(roleName))
      .filter((roleId): roleId is string => Boolean(roleId))
      .map((roleId) => ({
        userId: created.id,
        roleId,
      }));

    if (roleLinks.length > 0) {
      await prisma.userRole.createMany({
        data: roleLinks,
        skipDuplicates: true,
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
