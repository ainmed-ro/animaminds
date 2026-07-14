const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addOnlineLiveEdition() {
  try {
    // Găsește programul "Conversații care Contează"
    const programme = await prisma.programme.findFirst({
      where: {
        slug: 'conversatii-care-conteaza'
      }
    });

    if (!programme) {
      console.log('Programul "Conversații care Contează" nu a fost găsit');
      return;
    }

    // Creează prețul pentru ediție
    const price = await prisma.price.create({
      data: {
        amount: 199,
        currency: 'RON',
        description: 'Preț participant Online Live'
      }
    });

    // Creează ediția Online Live
    const edition = await prisma.edition.create({
      data: {
        programmeId: programme.id,
        editionTitle: 'Conversații care Contează - Online Live',
        slug: 'conversatii-care-conteaza-online-live-2026',
        deliveryFormat: 'ONLINE',
        status: 'OPEN',
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
    });

    console.log('Ediția Online Live a fost creată cu succes:', edition);
    console.log('Preț creat:', price);

  } catch (error) {
    console.error('Eroare la crearea ediției:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addOnlineLiveEdition();
