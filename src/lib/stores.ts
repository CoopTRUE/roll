// svelte stores
import { derived, type Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import type { ethers } from 'ethers'

type Nullable<T> = T | null

export const provider = writable<Nullable<ethers.providers.Web3Provider>>(null)
export const address = writable<Nullable<string>>(null)
export const cuid = writable<Nullable<string>>(null)
export const balance = writable<Nullable<number>>(null)
export const roundedBalance = derived<typeof balance, Nullable<number>>(balance, ($balance, set) =>
  set($balance === null ? null : Math.floor($balance))
)
