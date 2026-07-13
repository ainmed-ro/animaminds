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
      duration: 'Online Live 3 sesiuni (2h + 2h + 2.5h), la sediu 1 zi (6.5h), Experience Edition 2 zile',
      learningHours: 7.5,
      contactHours: 6.5,
      individualActivitiesHours: 1,
      totalLearningHours: 7.5,
      cpdCredits: 8,
      onlineMinParticipants: 15,
      onlineMaxParticipants: 30,
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 14900,
      whatParticipantsReceive: [
        'Participare la toate sesiunile programului',
        'Workbook digital',
        'Materiale digitale de lucru',
        'Instrumente, șabloane și resurse utilizate în program',
        'Exerciții practice și activități aplicate',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului și formatului de livrare)',
        'Acces la resursele distribuite în cadrul programului',
      ],
      onsiteIncludedServices: [
        'Pregătirea și livrarea programului',
        'Materiale digitale pentru participanți',
        'Workbook digital',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului)',
        'Coffee break',
        'Apă, cafea și ceai',
        'Gustare / sandwich',
        'Suport administrativ pentru documentele programului',
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
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 9900,
      whatParticipantsReceive: [
        'Participare la toate sesiunile programului',
        'Workbook digital',
        'Materiale digitale de lucru',
        'Instrumente, șabloane și resurse utilizate în program',
        'Exerciții practice și activități aplicate',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului și formatului de livrare)',
        'Acces la resursele distribuite în cadrul programului',
      ],
      onsiteIncludedServices: [
        'Pregătirea și livrarea programului',
        'Materiale digitale pentru participanți',
        'Workbook digital',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului)',
        'Coffee break',
        'Apă, cafea și ceai',
        'Gustare / sandwich',
        'Suport administrativ pentru documentele programului',
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
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 9900,
      whatParticipantsReceive: [
        'Participare la toate sesiunile programului',
        'Workbook digital',
        'Materiale digitale de lucru',
        'Instrumente, șabloane și resurse utilizate în program',
        'Exerciții practice și activități aplicate',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului și formatului de livrare)',
        'Acces la resursele distribuite în cadrul programului',
      ],
      onsiteIncludedServices: [
        'Pregătirea și livrarea programului',
        'Materiale digitale pentru participanți',
        'Workbook digital',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului)',
        'Coffee break',
        'Apă, cafea și ceai',
        'Gustare / sandwich',
        'Suport administrativ pentru documentele programului',
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
      onsiteMaxParticipants: 30,
      experienceMinParticipants: 20,
      experienceMaxParticipants: 30,
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 14900,
      whatParticipantsReceive: [
        'Participare la toate sesiunile programului',
        'Workbook digital',
        'Materiale digitale de lucru',
        'Instrumente, șabloane și resurse utilizate în program',
        'Exerciții practice și activități aplicate',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului și formatului de livrare)',
        'Acces la resursele distribuite în cadrul programului',
      ],
      onsiteIncludedServices: [
        'Pregătirea și livrarea programului',
        'Materiale digitale pentru participanți',
        'Workbook digital',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului)',
        'Coffee break',
        'Apă, cafea și ceai',
        'Gustare / sandwich',
        'Suport administrativ pentru documentele programului',
      ],
    },
    {
      programmeCode: 'PMD_005',
      slug: 'avantajul-uman',
      name: 'Avantajul Uman',
      subtitle: 'Gândește clar, decide bine, rămâi relevant',
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
      availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION],
      onlineLaunchPriceAmount: 9900,
      whatParticipantsReceive: [
        'Participare la toate sesiunile programului',
        'Workbook digital',
        'Materiale digitale de lucru',
        'Instrumente, șabloane și resurse utilizate în program',
        'Exerciții practice și activități aplicate',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului și formatului de livrare)',
        'Acces la resursele distribuite în cadrul programului',
      ],
      onsiteIncludedServices: [
        'Pregătirea și livrarea programului',
        'Materiale digitale pentru participanți',
        'Workbook digital',
        'Certificate of Completion',
        'Competency Achievement Record',
        'Credite CPD (conform programului)',
        'Coffee break',
        'Apă, cafea și ceai',
        'Gustare / sandwich',
        'Suport administrativ pentru documentele programului',
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

    const onsiteIncludedServices = (p as any).onsiteIncludedServices as string[]
    const onsitePrice = await prisma.price.upsert({
      where: { priceCode: `${p.programmeCode}-ONSITE-STANDARD` },
      update: {},
      create: {
        priceCode: `${p.programmeCode}-ONSITE-STANDARD`,
        priceType: PriceType.STANDARD,
        deliveryFormat: DeliveryFormat.ONSITE,
        status: PriceStatus.ON_REQUEST,
        displayLabel: 'Pachet la sediul organizației',
        currency: 'RON',
        vatIncluded: true,
        includedServices: onsiteIncludedServices,
      } as any,
    })

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
