import { PrismaClient } from './generated/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function seedDb() {
  console.log('Seeding database...');
  const janeDoe = await prisma.user.create({
    data: {
      email: 'jane.doe@mail.com',
      name: 'Jane Doe',
      password: await hash('password', 10),
    },
  });

  const foobarUSer = await prisma.user.create({
    data: {
      email: 'foo@bar.com',
      name: 'Foo Bar',
      password: await hash('password', 10),
    },
  });

  await prisma.todoList.create({
    data: {
      sharedWith: {
        connect: {
          id: janeDoe.id,
        },
      },
      createdBy: { connect: { id: foobarUSer.id } },
      title: 'My First List',
      todos: {
        create: [
          {
            description: 'Todo 1',
            completed: false,
            createdBy: { connect: { id: foobarUSer.id } },
          },
          {
            description: 'Todo 2',
            completed: true,
            createdBy: { connect: { id: foobarUSer.id } },
          },
        ],
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
