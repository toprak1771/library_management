import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Örnek veri ekleme
  await prisma.user.create({
    data: {
      id:2,
      name: 'Enes Faruk Meniz',
      createdAt: new Date(),
      updatedAt:new Date(),
      books:{
        past: [
            {
                name: "I, Robot",
                userScore: 5
            },
            {
                name: "The Hitchhiker's Guide to the Galaxy",
                userScore: 10
            }
        ],
        present: [
            {
                name: "Brave New World"
            }
        ]
      }
    },
  });

  await prisma.user.create({
    data: {
      id:1,
      name: 'Eray Aslan',
      createdAt: new Date(),
      updatedAt:new Date(),
    },
  });

  await prisma.user.create({
    data: {
      id:4,
      name: 'Kadir Mutlu',
      createdAt: new Date(),
      updatedAt:new Date(),
    },
  });

  await prisma.user.create({
    data: {
      id:3,
      name: 'Sefa Eren Şahin',
      createdAt: new Date(),
      updatedAt:new Date(),
    },
  });

  await prisma.user.create({
    data: {
      name: 'Enes Faruk Meniz',
      createdAt: new Date(),
      updatedAt:new Date(),
    },
  });

  await prisma.book.create({
    data:{
        id:4,
        name:'1984',
        author:'George Orwell',
        year:'1949',
        createdAt:new Date(),
        updatedAt:new Date(),
        status:false
    }
  })

  await prisma.book.create({
    data:{
        id:5,
        name:'Brave New World',
        author:'Aldous Huxley',
        year:'1932',
        createdAt:new Date(),
        updatedAt:new Date(),
        status:false,
        user_id:2
    }
  })

  await prisma.book.create({
    data:{
        id:3,
        name:'Dune',
        author:'Frank Herbert',
        year:'1965',
        createdAt:new Date(),
        updatedAt:new Date(),
        status:false
    }
  })

  await prisma.book.create({
    data:{
        id:1,
        name:"The Hitchhiker's Guide to the Galaxy",
        author:'Douglas Adams',
        year:'1979',
        createdAt:new Date(),
        updatedAt:new Date(),
        status:false
    }
  })

  await prisma.book.create({
    data:{
        id:2,
        name:'I, Robot',
        author:'Isaac Asimov',
        year:'1950',
        score:5.33,
        createdAt:new Date(),
        updatedAt:new Date(),
        status:false
    }
  })

  
}

main()
  .then(() => {
    console.log('Seed data successfully added!');
  })
  .catch((e) => {
    console.error('Error while seeding data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
