// prisma
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
prisma.$connect().then(() => {
  console.log('Database connected!')
})

export async function login(address: string, signature: string, ip: string) {
  return await prisma.user.upsert({
    where: { signature },
    update: {
      logins: {
        create: { ip }
      }
    },
    create: {
      signature,
      address
    }
  })
}
