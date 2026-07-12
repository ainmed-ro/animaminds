const vToken = process.env.VERCEL_TOKEN
const vProjectId = 'prj_zvy01LZt8ciku91ctNYhkm5JahZt'

async function disableSsoProtection() {
  if (!vToken) throw new Error('Missing VERCEL_TOKEN')

  const res = await fetch(`https://api.vercel.com/v9/projects/${vProjectId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${vToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ssoProtection: {
        deploymentType: 'preview',
      },
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('Failed:', JSON.stringify(data, null, 2))
    process.exit(1)
  }
  console.log('SSO protection updated to preview-only:', JSON.stringify(data.ssoProtection, null, 2))
}

disableSsoProtection().catch(console.error)
export {} 
