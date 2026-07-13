'use server'

import { prisma } from '@/lib/prisma'
import { DeliveryFormat, EditionStatus } from '@prisma/client'

export async function addOnlineLiveEdition() {
  try {
    // Găsește programul "Conversații care Contează"
    const programme = await prisma.programme.findFirst({
      where: {
        slug: 'conversatii-care-conteaza'
      }
    })

    if (!programme) {
      return { success: false, error: 'Programul "Conversații care Contează" nu a fost găsit' }
    }

    // Verifică dacă ediția deja există
    const existingEdition = await prisma.edition.findFirst({
      where: {
        slug: 'conversatii-care-conteaza-online-live-2026'
      }
    })

    if (existingEdition) {
      return { success: false, error: 'Ediția Online Live există deja' }
    }

    // Creează prețul pentru ediție
    const price = await prisma.price.create({
      data: {
        amount: 199,
        currency: 'RON',
        description: 'Preț participant Online Live',
        priceCode: 'ONLINE_LIVE_2026'
      }
    })

    // Creează ediția Online Live
    const edition = await prisma.edition.create({
      data: {
        programmeId: programme.id,
        editionTitle: 'Conversații care Contează - Online Live',
        slug: 'conversatii-care-conteaza-online-live-2026',
        deliveryFormat: DeliveryFormat.ONLINE,
        status: EditionStatus.OPEN,
        startDate: new Date('2026-09-08T18:00:00Z'),
        endDate: new Date('2026-09-22T20:00:00Z'),
        durationText: '3 întâlniri + 1h individual',
        registrationDeadline: new Date('2026-09-07T23:59:59Z'),
        maxSeats: 30,
        availableSeats: 30,
        minParticipants: 8,
        maxParticipants: 30,
        contactHours: 9,
        individualActivitiesHours: 1,
        totalLearningHours: 12,
        cpdCredits: 8,
        displayPriceId: price.id,
        notes: 'Ediție Online Live - 8, 15, 22 Septembrie 2026 + 1h sesiune individuală'
      }
    })

    return { 
      success: true, 
      message: 'Ediția Online Live a fost creată cu succes',
      edition,
      price 
    }

  } catch (error) {
    console.error('Eroare la crearea ediției:', error)
    return { 
      success: false, 
      error: 'Eroare la crearea ediției: ' + (error as Error).message 
    }
  }
}
