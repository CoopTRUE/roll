import { PrismaClient } from '@prisma/client'
// @ts-expect-error (ts-node doesn't like .ts)
import { CRASH_SPEED } from './src/constants.ts'

// type GameStatus = 'playing' | 'waiting' | 'crashed'

export const prisma = new PrismaClient()
await prisma.$connect()
console.log('Connected to database')
// ably.connection.on('connected', () => console.log('Connected to Ably'))

// let gameStatus: GameStatus = 'waiting'
// let multiplier = 0
// let stopped = false
// setTimeout(() => (stopped = true), 100000)
// if (+REAL_GAME) startGame()

// export async function startGame() {
//   console.log('Starting game')
//   while (!stopped) {
//     updateGameStatus('waiting')
//     await new Promise((resolve) => setTimeout(resolve, 10000))
//     await round([])
//   }
// }

// export async function updateGameStatus(
//   newGameStatus: 'playing' | 'waiting' | 'crashed',
//   multiplier = 0
// ) {
//   gameStatus = newGameStatus
//   gameStatusChannel.publish('update', { gameStatus, multiplier })
//   console.log('Status:', gameStatus, multiplier)
// }

// export async function round(bets: number[]) {
//   updateGameStatus('playing')
//   const maxMultiplier = Math.random() * 100
//   const duration = maxMultiplier / CRASH_SPEED
//   for (let i = 0; i < duration; i++) {
//     multiplier = Math.floor(i * CRASH_SPEED * 100) / 100
//     updateGameStatus('playing', multiplier)
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//   }
//   updateGameStatus('crashed')
//   await prisma.round.create({
//     data: {
//       maxMultiplier,
//       duration,
//       bets: {
//         connect: bets.map((bet) => ({ id: bet }))
//       }
//     }
//   })
// }

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
