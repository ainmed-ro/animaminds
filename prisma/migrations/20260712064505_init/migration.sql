-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'CONTENT_MANAGER', 'COMMERCIAL_MANAGER', 'VIEWER', 'FACILITATOR');

-- CreateEnum
CREATE TYPE "ProgrammeStatus" AS ENUM ('DRAFT', 'PILOT', 'ACTIVE', 'UNDER_REVIEW', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EditionStatus" AS ENUM ('DRAFT', 'OPEN', 'FULL', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DeliveryFormat" AS ENUM ('ONLINE', 'ONSITE', 'OPEN_COHORT', 'EXPERIENCE_EDITION');

-- CreateEnum
CREATE TYPE "OnlinePlatform" AS ENUM ('GOOGLE_MEET', 'GOOGLE_CLASSROOM', 'OTHER');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('STANDARD', 'LAUNCH', 'PROMOTIONAL', 'PER_PERSON', 'GROUP', 'B2B', 'B2G', 'EXPERIENCE');

-- CreateEnum
CREATE TYPE "PriceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMING_SOON', 'ON_REQUEST');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AWAITING_INVOICE', 'PAID', 'CANCELLED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('INDIVIDUAL', 'PFA', 'SRL', 'MEDICAL_PRACTICE', 'COMPANY', 'NGO', 'PUBLIC_INSTITUTION');

-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('GENERAL_OFFER', 'PUBLIC_PROCUREMENT', 'INDIVIDUAL_REGISTRATION', 'GROUP_REGISTRATION', 'CONTACT');

-- CreateEnum
CREATE TYPE "FormSubmissionStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'CLOSED', 'SPAM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetAudience" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetAudience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationArea" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeTargetAudience" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "targetAudienceId" TEXT NOT NULL,

    CONSTRAINT "ProgrammeTargetAudience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeApplicationArea" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "applicationAreaId" TEXT NOT NULL,

    CONSTRAINT "ProgrammeApplicationArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programme" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "programmeCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "shortDescription" TEXT,
    "fullDescription" TEXT,
    "problemSolved" TEXT,
    "programmePromise" TEXT,
    "mainBenefits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "whatParticipantsReceive" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "whatParticipantsCanDoNextDay" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "availableDeliveryFormats" "DeliveryFormat"[] DEFAULT ARRAY[]::"DeliveryFormat"[],
    "registrationCTA" TEXT NOT NULL DEFAULT 'Înscrie-te',
    "offerRequestCTA" TEXT NOT NULL DEFAULT 'Solicită ofertă',
    "featuredImageUrl" TEXT,
    "status" "ProgrammeStatus" NOT NULL DEFAULT 'DRAFT',
    "duration" TEXT,
    "learningHours" INTEGER,
    "cpdHours" INTEGER,
    "accreditationBody" TEXT,
    "cpdProviderReference" TEXT,
    "cpdApprovalDate" TIMESTAMP(3),
    "competenciesDeveloped" JSONB,
    "learningOutcomes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "programmeObjectives" TEXT,
    "learningMethods" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "assessmentMethods" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "resourcesOffered" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "certificationInfo" TEXT,
    "followUpProcess" TEXT,
    "industryAdaptations" JSONB,
    "emotionalSafetyProtocol" TEXT,
    "dataRetentionPolicy" TEXT,
    "pmdVersion" TEXT,
    "displayProfessionalLevel" BOOLEAN NOT NULL DEFAULT true,
    "displayGovernanceFields" BOOLEAN NOT NULL DEFAULT false,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "programmeOwnerId" TEXT,
    "reviewerId" TEXT,
    "dateApproved" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "defaultStandardPriceId" TEXT,
    "defaultLaunchPriceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeSEO" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageUrl" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "structuredData" JSONB,

    CONSTRAINT "ProgrammeSEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edition" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "editionTitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deliveryFormat" "DeliveryFormat" NOT NULL,
    "status" "EditionStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "durationText" TEXT,
    "registrationDeadline" TIMESTAMP(3),
    "maxSeats" INTEGER,
    "availableSeats" INTEGER,
    "displayPriceId" TEXT,
    "featuredImageUrl" TEXT,
    "notes" TEXT,
    "platform" "OnlinePlatform",
    "meetLink" TEXT,
    "classroomLink" TEXT,
    "sessionDates" TIMESTAMP(3)[],
    "sessionCount" INTEGER,
    "recordingPolicy" TEXT,
    "city" TEXT,
    "locationName" TEXT,
    "address" TEXT,
    "startTime" TEXT,
    "endTime" TEXT,
    "includedServices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "excludedServices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hasOwnRoom" BOOLEAN NOT NULL DEFAULT false,
    "roomCostIncluded" BOOLEAN NOT NULL DEFAULT false,
    "destination" TEXT,
    "hotelName" TEXT,
    "hotelAddress" TEXT,
    "period" TEXT,
    "minParticipants" INTEGER,
    "maxParticipants" INTEGER,
    "roomTypes" JSONB,
    "includedMeals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "includedFacilities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "complementaryActivities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "indicativeSchedule" TEXT,
    "confirmationPolicy" TEXT,
    "cancellationPolicy" TEXT,
    "priceStatus" "PriceStatus" NOT NULL DEFAULT 'ON_REQUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Edition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "priceCode" TEXT NOT NULL,
    "programmeId" TEXT,
    "priceType" "PriceType" NOT NULL,
    "amount" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'RON',
    "vatIncluded" BOOLEAN NOT NULL DEFAULT true,
    "vatRate" DOUBLE PRECISION,
    "maxParticipantsIncluded" INTEGER,
    "extraParticipantCost" INTEGER,
    "includedServices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "excludedServices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "status" "PriceStatus" NOT NULL DEFAULT 'ON_REQUEST',
    "displayLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditionAdditionalPrice" (
    "id" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,

    CONSTRAINT "EditionAdditionalPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "entityType" "EntityType" NOT NULL DEFAULT 'INDIVIDUAL',
    "entityName" TEXT,
    "cui" TEXT,
    "participantsJson" JSONB,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "authorName" TEXT,
    "authorRole" TEXT,
    "authorSector" TEXT,
    "consentRecord" TEXT,
    "approvedUses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeTestimonial" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "testimonialId" TEXT NOT NULL,

    CONSTRAINT "ProgrammeTestimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "programmeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeDocument" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "ProgrammeDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammeGallery" (
    "id" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "ProgrammeGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditionGallery" (
    "id" TEXT NOT NULL,
    "editionId" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "EditionGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSEO" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageUrl" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "structuredData" JSONB,

    CONSTRAINT "PageSEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "formType" "FormType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "submitLabel" TEXT NOT NULL DEFAULT 'Trimite',
    "successMessage" TEXT,
    "notifyEmails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gdprText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "FormSubmissionStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "brandName" TEXT NOT NULL DEFAULT 'AnimaMinds',
    "tagline" TEXT NOT NULL DEFAULT 'Locul unde oamenii și ideile cresc împreună.',
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "paymentInstructions" TEXT,
    "defaultMetaTitle" TEXT,
    "defaultMetaDescription" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Navigation" (
    "id" TEXT NOT NULL,
    "header" JSONB,
    "footer" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Navigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicProcurement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Achiziții publice',
    "content" TEXT,
    "ctaLabel" TEXT NOT NULL DEFAULT 'Solicită oferta pentru achiziție publică',
    "notifyEmails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicProcurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportInfo" (
    "id" TEXT NOT NULL,
    "content" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransportInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TargetAudience_slug_key" ON "TargetAudience"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TargetAudience_name_key" ON "TargetAudience"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationArea_slug_key" ON "ApplicationArea"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationArea_name_key" ON "ApplicationArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammeTargetAudience_programmeId_targetAudienceId_key" ON "ProgrammeTargetAudience"("programmeId", "targetAudienceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammeApplicationArea_programmeId_applicationAreaId_key" ON "ProgrammeApplicationArea"("programmeId", "applicationAreaId");

-- CreateIndex
CREATE UNIQUE INDEX "Programme_slug_key" ON "Programme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Programme_programmeCode_key" ON "Programme"("programmeCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammeSEO_programmeId_key" ON "ProgrammeSEO"("programmeId");

-- CreateIndex
CREATE UNIQUE INDEX "Edition_programmeId_slug_key" ON "Edition"("programmeId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Price_priceCode_key" ON "Price"("priceCode");

-- CreateIndex
CREATE UNIQUE INDEX "EditionAdditionalPrice_editionId_priceId_key" ON "EditionAdditionalPrice"("editionId", "priceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammeTestimonial_programmeId_testimonialId_key" ON "ProgrammeTestimonial"("programmeId", "testimonialId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammeDocument_programmeId_documentId_key" ON "ProgrammeDocument"("programmeId", "documentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammeGallery_programmeId_galleryId_key" ON "ProgrammeGallery"("programmeId", "galleryId");

-- CreateIndex
CREATE UNIQUE INDEX "EditionGallery_editionId_galleryId_key" ON "EditionGallery"("editionId", "galleryId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PageSEO_pageId_key" ON "PageSEO"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "Form_formType_key" ON "Form"("formType");

-- AddForeignKey
ALTER TABLE "ProgrammeTargetAudience" ADD CONSTRAINT "ProgrammeTargetAudience_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeTargetAudience" ADD CONSTRAINT "ProgrammeTargetAudience_targetAudienceId_fkey" FOREIGN KEY ("targetAudienceId") REFERENCES "TargetAudience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeApplicationArea" ADD CONSTRAINT "ProgrammeApplicationArea_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeApplicationArea" ADD CONSTRAINT "ProgrammeApplicationArea_applicationAreaId_fkey" FOREIGN KEY ("applicationAreaId") REFERENCES "ApplicationArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_programmeOwnerId_fkey" FOREIGN KEY ("programmeOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_defaultStandardPriceId_fkey" FOREIGN KEY ("defaultStandardPriceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_defaultLaunchPriceId_fkey" FOREIGN KEY ("defaultLaunchPriceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeSEO" ADD CONSTRAINT "ProgrammeSEO_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edition" ADD CONSTRAINT "Edition_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edition" ADD CONSTRAINT "Edition_displayPriceId_fkey" FOREIGN KEY ("displayPriceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditionAdditionalPrice" ADD CONSTRAINT "EditionAdditionalPrice_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "Edition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditionAdditionalPrice" ADD CONSTRAINT "EditionAdditionalPrice_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "Edition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeTestimonial" ADD CONSTRAINT "ProgrammeTestimonial_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeTestimonial" ADD CONSTRAINT "ProgrammeTestimonial_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeDocument" ADD CONSTRAINT "ProgrammeDocument_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeDocument" ADD CONSTRAINT "ProgrammeDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeGallery" ADD CONSTRAINT "ProgrammeGallery_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgrammeGallery" ADD CONSTRAINT "ProgrammeGallery_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditionGallery" ADD CONSTRAINT "EditionGallery_editionId_fkey" FOREIGN KEY ("editionId") REFERENCES "Edition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditionGallery" ADD CONSTRAINT "EditionGallery_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSEO" ADD CONSTRAINT "PageSEO_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSubmission" ADD CONSTRAINT "FormSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
