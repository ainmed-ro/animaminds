import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  for (const user of users) {
    console.log(user.email, user.role, user.password ? 'has password' : 'no password')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(() => prisma.$disconnect())
export {} 
