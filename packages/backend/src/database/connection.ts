import Redis from 'ioredis'

export const db = new Redis();

console.log('Connected to Valkey...')
