const vToken = process.env.VERCEL_TOKEN
const vProjectId = 'prj_zvy01LZt8ciku91ctNYhkm5JahZt'
const deploymentId = process.env.DEPLOYMENT_ID || 'dpl_4X5Xz9QngaWgMEjftBJVr2BPmrff'

async function fetchLogs() {
  if (!vToken) throw new Error('Missing VERCEL_TOKEN')

  const res = await fetch(`https://api.vercel.com/v2/deployments/${deploymentId}/events?limit=200`, {
    headers: { Authorization: `Bearer ${vToken}` },
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('Failed:', JSON.stringify(data, null, 2))
    process.exit(1)
  }

  const events = data.events || []
  const filtered = events.filter((e: any) => {
    const text = JSON.stringify(e).toLowerCase()
    return text.includes('inscriere') || text.includes('registration') || text.includes('notification') || text.includes('sheets') || text.includes('resend') || text.includes('error') || text.includes('failed')
  })
  console.log('Total events:', events.length)
  console.log('Filtered events:', filtered.length)
  console.log(JSON.stringify(filtered.slice(-50), null, 2))
}

fetchLogs().catch(console.error)
export {} 
