import { PrismaClient } from './generated/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seedDb() {
  console.log('Seeding database...');
  await prisma.user.create({
    data: {
      email: 'foo@bar.com',
      name: 'Foo Bar',
      password: await hash('password', 10),
      todoLists: {
        create: {
          title: 'My First List',
          todos: {
            create: [
              { description: 'Todo 1', completed: false },
              { description: 'Todo 2', completed: true },
            ],
          },
        },
      },
    },
  });
}

seedDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
