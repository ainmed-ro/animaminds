import { PrismaClient, Role, DeliveryFormat, ProgrammeStatus, PriceStatus, PriceType } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const DEFAULT_PASSWORD = 'Animaminds2026!'

async function seedUser(email: string, name: string, role: Role) {
  const password = await bcrypt.hash(DEFAULT_PASSWORD, 10)
  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: {
      email,
      name,
      role,
      password,
    },
  })
}

async function main() {
  // 1. Roles and users
  await seedUser('admin@animaminds.ro', 'Super Admin', Role.SUPER_ADMIN)
  await seedUser('content@animaminds.ro', 'Content Manager', Role.CONTENT_MANAGER)
  await seedUser('commercial@animaminds.ro', 'Commercial Manager', Role.COMMERCIAL_MANAGER)

  // 2. Taxonomies
  const targetAudienceNames = [
    'Profesori',
    'Directori',
    'Manageri',
    'Lideri',
    'Formatori',
    'Specialiști HR',
    'Medici',
    'Asistenți medicali',
    'Personal administrativ',
    'Antreprenori',
    'Funcționari publici',
    'Instituții publice',
    'Companii',
    'ONG-uri',
    'Alte categorii',
  ]

  for (const name of targetAudienceNames) {
    await prisma.targetAudience.upsert({
      where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
      update: {},
      create: {
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name,
      },
    })
  }

  const applicationAreaNames = [
    'Educație',
    'Sănătate',
    'Administrație publică',
    'Business',
    'Industrie',
    'ONG',
    'Alte domenii',
  ]

  for (const name of applicationAreaNames) {
    await prisma.applicationArea.upsert({
      where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
      update: {},
      create: {
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name,
      },
    })
  }

  // 3. Programmes with placeholder prices
  const programmes = [
    {
      programmeCode: 'PMD_001',
      slug: 'ai-fara-haos',
      name: 'AI Fără Haos',
      subtitle: 'Stăpânește inteligența artificială fără să pierzi controlul',
      duration: 'Online Live 3 sesiuni (2h + 2h + 2.5h), Online pentru Organizații 3,500 RON / grup',
      learningHours: 7.5,
      contactHours: 6.5,
      individualActivitiesHours: 1,
      totalLearningHours: 7.5,
      cpdCredits: 8,
      onlineMinParticipants: 15,
      onlineMaxParticipants: 30,
      onsiteMinParticipants: 15,
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONLINE_DEDICATED],
      onlineLaunchPriceAmount: 19900,
      whatParticipantsReceive: [
        'participare live la programul de formare',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'acces la resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'studii de caz și exemple relevante',
        'instrumente și modele de lucru utilizabile imediat',
        'oportunități de interacțiune și schimb de experiență',
        'sesiuni de întrebări și răspunsuri',
        'suport pentru clarificări după finalizarea programului',
      ],
      onlineDedicatedIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'studii de caz',
        'exemple adaptate contextului organizațional',
        'instrumente aplicabile imediat',
      ],
      experienceIncludedServices: [
        'workshop-uri experiențiale',
        'activități aplicate și exerciții practice',
        'studii de caz și simulări',
        'reflecție ghidată',
        'learning walks și activități de învățare contextualizată',
        'networking profesional',
        'schimb de bune practici',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse digitale',
      ],
      onsiteIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'coffee break organizat pe durata programului',
        'cafea, ceai, apă și băuturi răcoritoare',
        'gustare individuală pentru fiecare participant',
        'transportul formatorului la sediul beneficiarului în limita a 300 km',
      ],
    },
    {
      programmeCode: 'PMD_002',
      slug: 'conversatii-care-conteaza',
      name: 'Conversații care Contează',
      subtitle: 'Feedback, ascultare și conversații dificile',
      duration: 'Online Live 3 sesiuni (2h + 2h + 2.5h), la sediu 1 zi (6.5h), Experience Edition 2 zile',
      learningHours: 7.5,
      contactHours: 6.5,
      individualActivitiesHours: 1,
      totalLearningHours: 7.5,
      cpdCredits: 8,
      onlineMinParticipants: 15,
      onlineMaxParticipants: 30,
      onsiteMinParticipants: 15,
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONLINE_DEDICATED, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 19900,
      whatParticipantsReceive: [
        'participare live la programul de formare',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'acces la resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'studii de caz și exemple relevante',
        'instrumente și modele de lucru utilizabile imediat',
        'oportunități de interacțiune și schimb de experiență',
        'sesiuni de întrebări și răspunsuri',
        'suport pentru clarificări după finalizarea programului',
      ],
      onlineDedicatedIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'studii de caz',
        'exemple adaptate contextului organizațional',
        'instrumente aplicabile imediat',
      ],
      experienceIncludedServices: [
        'workshop-uri experiențiale',
        'activități aplicate și exerciții practice',
        'studii de caz și simulări',
        'reflecție ghidată',
        'learning walks și activități de învățare contextualizată',
        'networking profesional',
        'schimb de bune practici',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse digitale',
      ],
      onsiteIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'coffee break organizat pe durata programului',
        'cafea, ceai, apă și băuturi răcoritoare',
        'gustare individuală pentru fiecare participant',
        'transportul formatorului la sediul beneficiarului în limita a 300 km',
      ],
    },
    {
      programmeCode: 'PMD_003',
      slug: 'calm-sub-presiune',
      name: 'Calm sub Presiune',
      subtitle: 'Gestionează situațiile tensionate și escaladările',
      duration: 'Online Live 3 sesiuni (2h + 2h + 2h), la sediu 1 zi (6h), Experience Edition 2 zile',
      learningHours: 7,
      contactHours: 6,
      individualActivitiesHours: 1,
      totalLearningHours: 7,
      cpdCredits: 7,
      onlineMinParticipants: 15,
      onlineMaxParticipants: 30,
      onsiteMinParticipants: 15,
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONLINE_DEDICATED, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 17900,
      whatParticipantsReceive: [
        'participare live la programul de formare',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'acces la resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'studii de caz și exemple relevante',
        'instrumente și modele de lucru utilizabile imediat',
        'oportunități de interacțiune și schimb de experiență',
        'sesiuni de întrebări și răspunsuri',
        'suport pentru clarificări după finalizarea programului',
      ],
      onlineDedicatedIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'studii de caz',
        'exemple adaptate contextului organizațional',
        'instrumente aplicabile imediat',
      ],
      experienceIncludedServices: [
        'workshop-uri experiențiale',
        'activități aplicate și exerciții practice',
        'studii de caz și simulări',
        'reflecție ghidată',
        'learning walks și activități de învățare contextualizată',
        'networking profesional',
        'schimb de bune practici',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse digitale',
      ],
      onsiteIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'coffee break organizat pe durata programului',
        'cafea, ceai, apă și băuturi răcoritoare',
        'gustare individuală pentru fiecare participant',
        'transportul formatorului la sediul beneficiarului în limita a 300 km',
      ],
    },
    {
      programmeCode: 'PMD_004',
      slug: 'busola-deciziilor',
      name: 'Busola Deciziilor',
      subtitle: 'Claritate și direcție în decizii complexe',
      duration: 'Online Live 3 sesiuni (2h + 2h + 2.5h), la sediu 1 zi (6.5h), Experience Edition 2 zile',
      learningHours: 7.5,
      contactHours: 6.5,
      individualActivitiesHours: 1,
      totalLearningHours: 7.5,
      cpdCredits: 8,
      onlineMinParticipants: 15,
      onlineMaxParticipants: 30,
      onsiteMinParticipants: 15,
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONLINE_DEDICATED, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 19900,
      whatParticipantsReceive: [
        'participare live la programul de formare',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'acces la resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'studii de caz și exemple relevante',
        'instrumente și modele de lucru utilizabile imediat',
        'oportunități de interacțiune și schimb de experiență',
        'sesiuni de întrebări și răspunsuri',
        'suport pentru clarificări după finalizarea programului',
      ],
      onlineDedicatedIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'studii de caz',
        'exemple adaptate contextului organizațional',
        'instrumente aplicabile imediat',
      ],
      experienceIncludedServices: [
        'workshop-uri experiențiale',
        'activități aplicate și exerciții practice',
        'studii de caz și simulări',
        'reflecție ghidată',
        'learning walks și activități de învățare contextualizată',
        'networking profesional',
        'schimb de bune practici',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse digitale',
      ],
      onsiteIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'coffee break organizat pe durata programului',
        'cafea, ceai, apă și băuturi răcoritoare',
        'gustare individuală pentru fiecare participant',
        'transportul formatorului la sediul beneficiarului în limita a 300 km',
      ],
    },
    {
      programmeCode: 'PMD_005',
      slug: 'avantajul-uman',
      name: 'Avantajul Uman',
      subtitle: 'Gândește clar, decide bine, rămâi relevant',
      duration: 'Online Live 3 sesiuni (2h + 2h + 2h), la sediu 1 zi (6h), Online pentru Organizații 3,500 RON / grup',
      learningHours: 7,
      contactHours: 6,
      individualActivitiesHours: 1,
      totalLearningHours: 7,
      cpdCredits: 7,
      onlineMinParticipants: 15,
      onlineMaxParticipants: 30,
      onsiteMinParticipants: 15,
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONLINE_DEDICATED, DeliveryFormat.ONSITE],
      onlineLaunchPriceAmount: 17900,
      whatParticipantsReceive: [
        'participare live la programul de formare',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'acces la resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'studii de caz și exemple relevante',
        'instrumente și modele de lucru utilizabile imediat',
        'oportunități de interacțiune și schimb de experiență',
        'sesiuni de întrebări și răspunsuri',
        'suport pentru clarificări după finalizarea programului',
      ],
      onlineDedicatedIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'studii de caz',
        'exemple adaptate contextului organizațional',
        'instrumente aplicabile imediat',
      ],
      experienceIncludedServices: [
        'workshop-uri experiențiale',
        'activități aplicate și exerciții practice',
        'studii de caz și simulări',
        'reflecție ghidată',
        'learning walks și activități de învățare contextualizată',
        'networking profesional',
        'schimb de bune practici',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse digitale',
      ],
      onsiteIncludedServices: [
        'livrarea integrală a programului',
        'workshop-uri aplicate',
        'certificat de participare',
        'fișa competențelor dobândite',
        'resurse și materiale digitale',
        'activități practice și exerciții aplicate',
        'coffee break organizat pe durata programului',
        'cafea, ceai, apă și băuturi răcoritoare',
        'gustare individuală pentru fiecare participant',
        'transportul formatorului la sediul beneficiarului în limita a 300 km',
      ],
    },
  ]

  const targetAudiences = await prisma.targetAudience.findMany()
  const applicationAreas = await prisma.applicationArea.findMany()

  for (const p of programmes) {
    const standardPrice = await prisma.price.upsert({
      where: { priceCode: `${p.programmeCode}-STANDARD-ON-REQUEST` },
      update: {},
      create: {
        priceCode: `${p.programmeCode}-STANDARD-ON-REQUEST`,
        priceType: PriceType.STANDARD,
        status: PriceStatus.ON_REQUEST,
        displayLabel: 'Preț standard',
        currency: 'RON',
      },
    })

    const onlineLaunchIncludedServices = (p as any).whatParticipantsReceive as string[]
    const launchPriceAmount = (p as any).onlineLaunchPriceAmount as number
    const launchPrice = await prisma.price.upsert({
      where: { priceCode: `${p.programmeCode}-ONLINE-LAUNCH` },
      update: {},
      create: {
        priceCode: `${p.programmeCode}-ONLINE-LAUNCH`,
        priceType: PriceType.LAUNCH,
        deliveryFormat: DeliveryFormat.ONLINE,
        status: PriceStatus.ACTIVE,
        amount: launchPriceAmount,
        displayLabel: 'Preț de lansare — Online Live',
        currency: 'RON',
        vatIncluded: true,
        includedServices: onlineLaunchIncludedServices,
      } as any,
    })

    const onlineDedicatedIncludedServices = (p as any).onlineDedicatedIncludedServices as string[]
    const onlineDedicatedPrice = await prisma.price.upsert({
      where: { priceCode: `${p.programmeCode}-ONLINE-DEDICATED` },
      update: {},
      create: {
        priceCode: `${p.programmeCode}-ONLINE-DEDICATED`,
        priceType: PriceType.STANDARD,
        deliveryFormat: DeliveryFormat.ONLINE_DEDICATED,
        status: PriceStatus.ACTIVE,
        amount: 350000,
        displayLabel: 'Online Dedicated Group — 3,500 RON / grup',
        currency: 'RON',
        vatIncluded: true,
        includedServices: onlineDedicatedIncludedServices,
      } as any,
    })

    const onsiteIncludedServices = (p as any).onsiteIncludedServices as string[]
    const onsitePrice = await prisma.price.upsert({
      where: { priceCode: `${p.programmeCode}-ONSITE-STANDARD` },
      update: {
        amount: 500000,
        status: PriceStatus.ACTIVE,
        displayLabel: 'Pachet la sediul organizației — 5,000 RON / grup',
      },
      create: {
        priceCode: `${p.programmeCode}-ONSITE-STANDARD`,
        priceType: PriceType.STANDARD,
        deliveryFormat: DeliveryFormat.ONSITE,
        status: PriceStatus.ACTIVE,
        amount: 500000,
        displayLabel: 'Pachet la sediul organizației — 5,000 RON / grup',
        currency: 'RON',
        vatIncluded: true,
        includedServices: onsiteIncludedServices,
      } as any,
    })

    // Add Experience Edition price for programmes that support it
    if (p.availableDeliveryFormats.includes(DeliveryFormat.EXPERIENCE_EDITION)) {
      const experienceIncludedServices = (p as any).experienceIncludedServices as string[]
      const experiencePrice = await prisma.price.upsert({
        where: { priceCode: `${p.programmeCode}-EXPERIENCE` },
        update: {},
        create: {
          priceCode: `${p.programmeCode}-EXPERIENCE`,
          priceType: PriceType.STANDARD,
          deliveryFormat: DeliveryFormat.EXPERIENCE_EDITION,
          status: PriceStatus.ON_REQUEST,
          displayLabel: 'Program rezidențial — Prețul se stabilește per ediție',
          currency: 'RON',
          vatIncluded: true,
          includedServices: experienceIncludedServices,
        } as any,
      })
    }

    const programmeData = {
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle,
      status: ProgrammeStatus.DRAFT,
      availableDeliveryFormats: p.availableDeliveryFormats,
      duration: p.duration,
      learningHours: p.learningHours,
      contactHours: p.contactHours,
      individualActivitiesHours: p.individualActivitiesHours,
      totalLearningHours: p.totalLearningHours,
      cpdCredits: p.cpdCredits,
      onlineMinParticipants: p.onlineMinParticipants,
      onlineMaxParticipants: p.onlineMaxParticipants,
      onsiteMaxParticipants: p.onsiteMaxParticipants,
      experienceMinParticipants: p.experienceMinParticipants,
      experienceMaxParticipants: p.experienceMaxParticipants,
      whatParticipantsReceive: p.whatParticipantsReceive,
      defaultStandardPriceId: standardPrice.id,
      defaultLaunchPriceId: launchPrice.id,
      pmdVersion: `${p.programmeCode.replace('_', '_')}_v2.md`,
    }

    const createdProgramme = await prisma.programme.upsert({
      where: { programmeCode: p.programmeCode },
      update: programmeData as any,
      create: {
        programmeCode: p.programmeCode,
        ...programmeData,
      } as any,
    })

    // Link prices to the programme via programmeId to keep SSOT and enable relation traversal
    await prisma.price.updateMany({
      where: { id: { in: [standardPrice.id, launchPrice.id, onsitePrice.id] } },
      data: { programmeId: createdProgramme.id },
    })

    // Link the Onsite package as an additional default price on the programme
    await prisma.programme.update({
      where: { id: createdProgramme.id },
      data: {
        additionalDefaultPrices: { connect: { id: onsitePrice.id } },
      },
    })

    // Link sample taxonomies to the programme
    const sampleTargetAudience = targetAudiences.find((ta) =>
      ['Profesori', 'Manageri', 'Formatori', 'Antreprenori', 'Funcționari publici'].includes(ta.name)
    )?.id
    const sampleApplicationArea = applicationAreas.find((aa) =>
      ['Educație', 'Business'].includes(aa.name)
    )?.id

    if (sampleTargetAudience) {
      await prisma.programmeTargetAudience.upsert({
        where: {
          programmeId_targetAudienceId: {
            programmeId: createdProgramme.id,
            targetAudienceId: sampleTargetAudience,
          },
        },
        update: {},
        create: {
          programmeId: createdProgramme.id,
          targetAudienceId: sampleTargetAudience,
        },
      })
    }

    if (sampleApplicationArea) {
      await prisma.programmeApplicationArea.upsert({
        where: {
          programmeId_applicationAreaId: {
            programmeId: createdProgramme.id,
            applicationAreaId: sampleApplicationArea,
          },
        },
        update: {},
        create: {
          programmeId: createdProgramme.id,
          applicationAreaId: sampleApplicationArea,
        },
      })
    }
  }

  // 4. Sample FAQ
  await prisma.fAQ.createMany({
    skipDuplicates: true,
    data: [
      {
        question: 'Cum mă înscriu la un program?',
        answer: 'Alege ediția dorită și completează formularul de înscriere. Vei primi confirmarea și instrucțiunile de plată pe email.',
      },
      {
        question: 'Există condiții de predare în instituții publice?',
        answer: 'Da. AnimaMinds poate livra programele la sediul instituției sau prin achiziție publică. Detalii pe pagina Achiziții publice.',
      },
    ],
  })

  // 5. Site settings placeholder
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      brandName: 'AnimaMinds',
      tagline: 'Locul unde oamenii și ideile cresc împreună.',
    },
  })

  console.log('Seed completed: users, taxonomies, programmes, prices, FAQ, site settings.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
