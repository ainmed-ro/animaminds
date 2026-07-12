import { prisma } from '../lib/prisma'

async function main() {
  const prices = await prisma.price.findMany({
    select: { id: true, priceCode: true, priceType: true, amount: true, currency: true, displayLabel: true },
    orderBy: { createdAt: 'desc' },
  })
  console.log(JSON.stringify(prices, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
