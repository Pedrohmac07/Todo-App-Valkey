import Redis from 'ioredis'

export const db = new Redis(process.env.DATABASE_URL || '');

console.log('Connected to Valkey...')
