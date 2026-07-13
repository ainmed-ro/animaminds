'use client'

import { useState } from 'react'
import { DeliveryFormat, EditionStatus, OnlinePlatform, PriceStatus } from '@prisma/client'
import { StringArrayInput } from '@/app/admin/components/string-array-input'
import { DateArrayInput } from '@/app/admin/components/date-array-input'
import { RoomTypeArrayInput } from '@/app/admin/components/room-type-array-input'
import { RelationSelector } from '@/app/admin/components/relation-selector'
import type { getEdition } from '@/app/admin/actions/cms'
import type { getEditionEditOptions } from '@/app/admin/actions/cms'

type Edition = Awaited<ReturnType<typeof getEdition>>
type Options = Awaited<ReturnType<typeof getEditionEditOptions>>

interface EditionFormProps {
  edition: NonNullable<Edition> | null
  options: Options
  action: (formData: FormData) => void
}

export function EditionForm({ edition, options, action }: EditionFormProps) {
  const [format, setFormat] = useState<DeliveryFormat>(edition?.deliveryFormat || DeliveryFormat.ONLINE)
  const isOnline = format === DeliveryFormat.ONLINE
  const isOnsite = format === DeliveryFormat.ONSITE
  const isExperience = format === DeliveryFormat.EXPERIENCE_EDITION

  const e = edition || {
    id: '',
    editionTitle: '',
    slug: '',
    programmeId: '',
    deliveryFormat: DeliveryFormat.ONLINE,
    status: EditionStatus.DRAFT,
    startDate: null,
    endDate: null,
    durationText: null,
    registrationDeadline: null,
    maxSeats: null,
    availableSeats: null,
    displayPriceId: null,
    featuredImageUrl: null,
    notes: null,
    contactHours: null,
    individualActivitiesHours: null,
    totalLearningHours: null,
    cpdCredits: null,
    platform: null,
    meetLink: null,
    classroomLink: null,
    sessionDates: [],
    sessionCount: null,
    recordingPolicy: null,
    city: null,
    locationName: null,
    address: null,
    startTime: null,
    endTime: null,
    includedServices: [],
    excludedServices: [],
    hasOwnRoom: false,
    roomCostIncluded: false,
    destination: null,
    hotelName: null,
    hotelAddress: null,
    period: null,
    minParticipants: null,
    maxParticipants: null,
    roomTypes: null,
    includedMeals: [],
    includedFacilities: [],
    complementaryActivities: [],
    indicativeSchedule: null,
    confirmationPolicy: null,
    cancellationPolicy: null,
    priceStatus: PriceStatus.ON_REQUEST,
    programme: null,
    displayPrice: null,
    additionalPrices: [],
    galleries: [],
    registrations: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: null,
    updatedById: null,
  }

  const selectedAdditionalPriceIds = e.additionalPrices.map((ap: any) => ap.price.id)
  const selectedGalleryIds = e.galleries.map((g: any) => g.gallery.id)
  const sessionDateStrings = e.sessionDates.map((d: any) => new Date(d).toISOString().split('T')[0])
  const roomTypes = (e.roomTypes as Array<{ name?: string; price?: number; description?: string }> | undefined) || []

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }

  const p = e.programme
  const effectiveCapacity = (format: DeliveryFormat) => {
    if (!p) {
      if (format === DeliveryFormat.EXPERIENCE_EDITION) return { min: 20, max: 30 }
      return { min: 15, max: 30 }
    }
    switch (format) {
      case DeliveryFormat.ONLINE:
        return {
          min: p.onlineMinParticipants ?? 15,
          max: p.onlineMaxParticipants ?? 30,
        }
      case DeliveryFormat.ONSITE:
        return {
          min: 15,
          max: p.onsiteMaxParticipants ?? 30,
        }
      case DeliveryFormat.EXPERIENCE_EDITION:
        return {
          min: p.experienceMinParticipants ?? 20,
          max: p.experienceMaxParticipants ?? 30,
        }
    }
  }

  const effectiveHours = () => {
    return {
      contactHours: e.contactHours ?? p?.contactHours ?? undefined,
      individualActivitiesHours: e.individualActivitiesHours ?? p?.individualActivitiesHours ?? undefined,
      totalLearningHours: e.totalLearningHours ?? p?.totalLearningHours ?? undefined,
      cpdCredits: e.cpdCredits ?? p?.cpdCredits ?? undefined,
    }
  }

  const capacity = effectiveCapacity(format)
  const hours = effectiveHours()

  return (
    <form action={action} className="max-w-4xl space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Programme</label>
          <select
            name="programmeId"
            defaultValue={e.programmeId}
            disabled={!!edition}
            required
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border disabled:bg-gray-100"
          >
            <option value="">Select programme</option>
            {options.programmes.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Edition Title</label>
            <input name="editionTitle" defaultValue={e.editionTitle} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input name="slug" defaultValue={e.slug} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Format</label>
            <select
              name="deliveryFormat"
              value={format}
              onChange={(e) => setFormat(e.target.value as DeliveryFormat)}
              className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border"
            >
              {Object.values(DeliveryFormat).map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" defaultValue={e.status} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              {Object.values(EditionStatus).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
          <input name="featuredImageUrl" defaultValue={e.featuredImageUrl || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea name="notes" defaultValue={e.notes || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Learning & CPD Overrides</h3>
        <p className="text-sm text-gray-600">
          Leave these fields blank to inherit values from the parent programme. Enter a value only when this edition genuinely differs from the programme defaults.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Hours</label>
            <input name="contactHours" type="number" step="0.5" placeholder={hours.contactHours?.toString() || '—'} defaultValue={e.contactHours ?? ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Individual Activities Hours</label>
            <input name="individualActivitiesHours" type="number" step="0.5" placeholder={hours.individualActivitiesHours?.toString() || '—'} defaultValue={e.individualActivitiesHours ?? ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Learning Hours</label>
            <input name="totalLearningHours" type="number" step="0.5" placeholder={hours.totalLearningHours?.toString() || '—'} defaultValue={e.totalLearningHours ?? ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPD Credits</label>
            <input name="cpdCredits" type="number" placeholder={hours.cpdCredits?.toString() || '—'} defaultValue={e.cpdCredits ?? ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Schedule & Capacity</h3>
        <p className="text-sm text-gray-600">
          Default capacity for the selected format is shown in each field placeholder. Leave the override fields blank to keep the programme default. Use Max Seats / Available Seats for operational seat management.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input name="startDate" type="date" defaultValue={formatDate(e.startDate)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input name="endDate" type="date" defaultValue={formatDate(e.endDate)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Deadline</label>
            <input name="registrationDeadline" type="date" defaultValue={formatDate(e.registrationDeadline)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration Text</label>
          <input name="durationText" defaultValue={e.durationText || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Seats</label>
            <input name="maxSeats" type="number" defaultValue={e.maxSeats || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Seats</label>
            <input name="availableSeats" type="number" defaultValue={e.availableSeats || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Participants (override)</label>
            <input name="minParticipants" type="number" placeholder={capacity.min.toString()} defaultValue={e.minParticipants ?? ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Participants (override)</label>
            <input name="maxParticipants" type="number" placeholder={capacity.max.toString()} defaultValue={e.maxParticipants ?? ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Display Price</label>
          <select name="displayPriceId" defaultValue={e.displayPriceId || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
            <option value="">No price</option>
            {options.prices.map((price) => (
              <option key={price.id} value={price.id}>{price.priceCode} ({price.priceType}) — {price.displayLabel || '—'}</option>
            ))}
          </select>
        </div>
        <RelationSelector
          name="additionalPriceIds"
          label="Additional Prices"
          items={options.prices.map((price) => ({ id: price.id, name: `${price.priceCode} (${price.priceType})` }))}
          defaultSelectedIds={selectedAdditionalPriceIds}
        />
      </section>

      {isOnline && (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Online Delivery</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Platform</label>
            <select name="platform" defaultValue={e.platform || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              <option value="">Select platform</option>
              {Object.values(OnlinePlatform).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meet Link</label>
              <input name="meetLink" defaultValue={e.meetLink || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Classroom Link</label>
              <input name="classroomLink" defaultValue={e.classroomLink || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <DateArrayInput name="sessionDates" label="Session Dates" defaultValues={sessionDateStrings} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Session Count</label>
            <input name="sessionCount" type="number" defaultValue={e.sessionCount || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recording Policy</label>
            <input name="recordingPolicy" defaultValue={e.recordingPolicy || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </section>
      )}

      {isOnsite && (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">On-site</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input name="city" defaultValue={e.city || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location Name</label>
              <input name="locationName" defaultValue={e.locationName || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input name="address" defaultValue={e.address || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input name="startTime" defaultValue={e.startTime || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input name="endTime" defaultValue={e.endTime || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StringArrayInput name="includedServices" label="Included Services" defaultValues={e.includedServices} placeholder="Service" />
            <StringArrayInput name="excludedServices" label="Excluded Services" defaultValues={e.excludedServices} placeholder="Service" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="hasOwnRoom" value="true" defaultChecked={e.hasOwnRoom} />
              <span className="text-sm text-gray-700">Has Own Room</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="roomCostIncluded" value="true" defaultChecked={e.roomCostIncluded} />
              <span className="text-sm text-gray-700">Room Cost Included</span>
            </label>
          </div>
        </section>
      )}

      {isExperience && (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Experience Edition</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input name="destination" defaultValue={e.destination || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Period</label>
              <input name="period" defaultValue={e.period || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
              <input name="hotelName" defaultValue={e.hotelName || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hotel Address</label>
              <input name="hotelAddress" defaultValue={e.hotelAddress || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Participants</label>
              <input name="minParticipants" type="number" defaultValue={e.minParticipants || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Participants</label>
              <input name="maxParticipants" type="number" defaultValue={e.maxParticipants || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <RoomTypeArrayInput name="roomTypes" label="Room Types" defaultValue={roomTypes} />
          <div className="grid grid-cols-3 gap-4">
            <StringArrayInput name="includedMeals" label="Included Meals" defaultValues={e.includedMeals} placeholder="Meal" />
            <StringArrayInput name="includedFacilities" label="Included Facilities" defaultValues={e.includedFacilities} placeholder="Facility" />
            <StringArrayInput name="complementaryActivities" label="Complementary Activities" defaultValues={e.complementaryActivities} placeholder="Activity" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Indicative Schedule</label>
            <textarea name="indicativeSchedule" defaultValue={e.indicativeSchedule || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmation Policy</label>
              <input name="confirmationPolicy" defaultValue={e.confirmationPolicy || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
              <input name="cancellationPolicy" defaultValue={e.cancellationPolicy || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Status</label>
            <select name="priceStatus" defaultValue={e.priceStatus} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              {Object.values(PriceStatus).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </section>
      )}

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Related Content</h3>
        <RelationSelector
          name="galleryIds"
          label="Galleries"
          items={options.galleries.map((g) => ({ id: g.id, name: g.name }))}
          defaultSelectedIds={selectedGalleryIds}
        />
      </section>

      <div className="pt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {edition ? 'Update Edition' : 'Create Edition'}
        </button>
      </div>
    </form>
  )
}
