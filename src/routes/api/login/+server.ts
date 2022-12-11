import type { RequestHandler } from './$types'
import { login } from '$lib/server/server'
import { REGEX } from '$lib/constants'
import { json } from '@sveltejs/kit'
import { z } from 'zod'

const schema = z.object({
  address: z.string().regex(REGEX.address),
  signature: z.string().regex(REGEX.signature)
})

export const POST = (async ({ request, getClientAddress }) => {
  const { address, signature } = schema.parse(await request.json())
  const user = await login(address, signature, getClientAddress())
  return json(user.id)
}) satisfies RequestHandler
