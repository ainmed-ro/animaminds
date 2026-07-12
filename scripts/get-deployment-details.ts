const token = process.env.VERCEL_TOKEN
const deploymentId = process.env.DEPLOYMENT_ID || 'dpl_Ls3YGV6kgoyzDSYzJtBr2p6B2mi5'

async function main() {
  if (!token) throw new Error('Missing VERCEL_TOKEN')

  const res = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  console.log('status:', data.status)
  console.log('error:', JSON.stringify(data.error, null, 2))
  console.log('readyState:', data.readyState)
  console.log('target:', data.target)
  console.log('alias:', JSON.stringify(data.alias, null, 2))
  console.log('aliasAssigned:', data.aliasAssigned)
}

main().catch(console.error)
export {} 
