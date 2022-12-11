import { PrismaClient } from '@prisma/client'
import { CRASH_SPEED } from '$lib/constants'
import { broadcast } from './ws'
import * as env from '$env/static/private'

const prisma = new PrismaClient()
await prisma.$connect()
console.log('Connected to database')

let gameStatus: 'playing' | 'waiting' | 'crashed' = 'waiting'
let multiplier = 0
let stopped = false
setTimeout(() => (stopped = true), 100000)
if (+env.REAL_GAME) startGame()

export async function startGame() {
  while (!stopped) {
    gameStatus = 'waiting'
    await new Promise((resolve) => setTimeout(resolve, 10000))
    await round([])
  }
}

export async function round(bets: number[]) {
  console.log('Starting round')
  gameStatus = 'playing'
  const maxMultiplier = Math.random() * 100
  const duration = maxMultiplier / CRASH_SPEED
  for (let i = 0; i < duration; i++) {
    multiplier = Math.floor(i * CRASH_SPEED * 100) / 100
    console.log('Multiplier', multiplier)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  console.log('Round ended with multiplier', multiplier)
  gameStatus = 'crashed'
  await prisma.round.create({
    data: {
      maxMultiplier,
      duration,
      bets: {
        connect: bets.map((bet) => ({ id: bet }))
      }
    }
  })
}

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
