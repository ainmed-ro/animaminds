import { readFileSync } from 'fs'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const token = process.env.VERCEL_TOKEN
const projectId = 'prj_zvy01LZt8ciku91ctNYhkm5JahZt'
const envPath = resolve('.env.local')

const envFile = readFileSync(envPath, 'utf-8')
const vars: Record<string, string> = {}

for (const line of envFile.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eq = trimmed.indexOf('=')
  if (eq === -1) continue
  const key = trimmed.slice(0, eq).trim()
  let value = trimmed.slice(eq + 1).trim()
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n')
  }
  if (['DATABASE_URL', 'DIRECT_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'FROM_EMAIL', 'ADMIN_EMAIL', 'CRON_SECRET'].includes(key)) {
    vars[key] = value
  }
}

if (!vars.NEXTAUTH_URL) vars.NEXTAUTH_URL = 'https://animaminds.vercel.app'
if (!vars.NEXTAUTH_SECRET) vars.NEXTAUTH_SECRET = randomBytes(32).toString('base64')
if (!vars.CRON_SECRET) vars.CRON_SECRET = randomBytes(32).toString('base64')
if (!vars.FROM_EMAIL) vars.FROM_EMAIL = 'AnimaMinds <noreply@animaminds.ro>'
if (!vars.ADMIN_EMAIL) vars.ADMIN_EMAIL = 'contact@animaminds.ro'

if (!token) {
  console.error('Missing VERCEL_TOKEN env var')
  process.exit(1)
}

async function addEnv(key: string, value: string, target: string) {
  const res = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key,
      value,
      target: [target],
      type: 'encrypted',
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error(`Failed to add ${key}:`, JSON.stringify(data))
  } else {
    console.log(`Added ${key} for ${target}`)
  }
}

async function main() {
  for (const [key, value] of Object.entries(vars)) {
    await addEnv(key, value, 'production')
    await addEnv(key, value, 'preview')
  }
}

main().catch(console.error)
