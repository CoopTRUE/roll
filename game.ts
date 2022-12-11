// @ts-expect-error (ts-node doesn't like .ts)
import { prisma } from './db.ts'
import type { Server } from 'socket.io'

type GameStatus = 'playing' | 'waiting' | 'crashed'

export class Game {
  gameStatus: GameStatus
  multiplier: number
  multiPerSec: number
  io: Server
  constructor(multiPerSec: number, io: Server) {
    this.gameStatus = 'waiting'
    this.multiplier = 0
    this.multiPerSec = multiPerSec
    this.io = io
  }
  async updateGameStatus(gameStatus: GameStatus, multiplier = 0) {
    this.gameStatus = gameStatus
    this.multiplier = multiplier
    this.io.send('update', { gameStatus, multiplier })
    console.log('Status:', gameStatus, multiplier)
  }
  async round(bets: number[]) {
    this.updateGameStatus('playing')
    const maxMultiplier = Math.random() * 100
    const duration = maxMultiplier / this.multiPerSec
    for (let i = 0; i < duration; i++) {
      this.multiplier = Math.floor(i * this.multiPerSec * 100) / 100
      this.updateGameStatus('playing', this.multiplier)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    this.updateGameStatus('crashed')
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
  async startGame() {
    console.log('Starting game')
    while (true) {
      await this.updateGameStatus('waiting')
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await this.round([])
    }
  }
}
