export const REGEX = {
  address: /^0x[a-fA-F0-9]{40}$/,
  signature: /^0x[a-fA-F0-9]{130}$/
}

export const SIG_MESSAGE =
  'Signing this message confirms you control {address}. This message is not a transaction and will cost nothing to sign.'
