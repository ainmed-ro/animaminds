import { prisma } from '../lib/prisma'

/**
 * Manual verification script for the Resend webhook handler.
 *
 * Usage:
 * 1. Start the dev server: npm run dev
 * 2. Make sure you have at least one Email row with a known resendId, OR
 *    create one by submitting a contact/registration form.
 * 3. Run this script with the resendId you want to test:
 *    npx tsx scripts/verify-email-webhook.ts <resendId>
 *
 * The script will POST a simulated `email.delivered` event to
 * http://localhost:3000/api/webhooks/resend and then verify that an
 * EmailEvent row was created in the database.
 */

async function main() {
  const resendId = process.argv[2]
  if (!resendId) {
    console.error('Usage: npx tsx scripts/verify-email-webhook.ts <resendId>')
    process.exit(1)
  }

  const email = await prisma.email.findUnique({ where: { resendId } })
  if (!email) {
    console.error(`No Email row found with resendId ${resendId}. Submit a form first or seed data.`)
    process.exit(1)
  }

  const payload = {
    type: 'email.delivered',
    created_at: new Date().toISOString(),
    data: {
      id: resendId,
      to: [email.recipient],
      from: email.fromAddress,
      subject: email.subject,
    },
  }

  const res = await fetch('http://localhost:3000/api/webhooks/resend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const responseBody = await res.json()
  console.log('Webhook response status:', res.status)
  console.log('Webhook response body:', responseBody)

  if (!res.ok) {
    console.error('Webhook did not return success.')
    process.exit(1)
  }

  // Wait briefly for the DB write
  await new Promise((resolve) => setTimeout(resolve, 500))

  const events = await prisma.emailEvent.findMany({
    where: { emailId: email.id },
    orderBy: { occurredAt: 'desc' },
  })

  console.log(`EmailEvent rows for email ${email.id}:`, events)

  if (events.length === 0) {
    console.error('No EmailEvent row was created. Verification FAILED.')
    process.exit(1)
  }

  console.log('Verification PASSED: webhook event was received and stored.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
