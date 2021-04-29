import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // await prisma.task.create({
    //     data: {
    //         text: 'Just a test',
    //         completed: true
    //     }
    // });

    const tasks = await prisma.task.findMany({
        where: {
            text: {
                
            }
        }
    })
    console.log(tasks);
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })