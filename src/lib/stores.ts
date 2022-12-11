// svelte stores
import type { ethers } from 'ethers'
import { derived, readable, writable } from 'svelte/store'
import io from 'socket.io-client'
import axios from 'axios'
import { browser } from '$app/environment'

type Nullable<T> = T | null

const development = process.env.NODE_ENV === 'development'
export const socket = readable(development ? io(':2000') : io())
export const API = readable((name: string, ...params: any[]) =>
  axios.post(`${window.location.protocol}//${window.location.hostname}:2000/${name}`, ...params)
)

export const provider = writable<Nullable<ethers.providers.Web3Provider>>(null)
export const address = writable<Nullable<string>>(null)
export const cuid = writable<Nullable<string>>(null)
export const balance = writable<Nullable<number>>(null)
export const roundedBalance = derived<typeof balance, Nullable<number>>(balance, ($balance, set) =>
  set($balance === null ? null : Math.floor($balance))
)
