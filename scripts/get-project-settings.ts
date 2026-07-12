const vercelToken = process.env.VERCEL_TOKEN
const vercelProjectId = 'prj_zvy01LZt8ciku91ctNYhkm5JahZt'

async function fetchProjectSettings() {
  if (!vercelToken) throw new Error('Missing VERCEL_TOKEN')

  const res = await fetch(`https://api.vercel.com/v9/projects/${vercelProjectId}`, {
    headers: { Authorization: `Bearer ${vercelToken}` },
  })
  const data = await res.json()
  console.log('ssoProtection:', JSON.stringify(data.ssoProtection, null, 2))
  console.log('passwordProtection:', JSON.stringify(data.passwordProtection, null, 2))
  console.log('trustedIps:', JSON.stringify(data.trustedIps, null, 2))
  console.log('private:', data.private)
}

fetchProjectSettings().catch(console.error)
export {} 
