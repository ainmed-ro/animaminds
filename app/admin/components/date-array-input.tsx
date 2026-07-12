'use client'

import { useState } from 'react'

interface DateArrayInputProps {
  name: string
  label: string
  defaultValues?: string[]
}

export function DateArrayInput({ name, label, defaultValues = [] }: DateArrayInputProps) {
  const [items, setItems] = useState<string[]>(defaultValues.length > 0 ? defaultValues : [''])

  const updateItem = (index: number, value: string) => {
    const next = [...items]
    next[index] = value
    setItems(next)
  }

  const addItem = () => setItems([...items, ''])
  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index)
    setItems(next.length > 0 ? next : [''])
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="date"
            name={name}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 rounded-md border-gray-300 px-3 py-2 border"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-3 py-2 text-red-600 hover:text-red-900"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-sm text-blue-600 hover:text-blue-900"
      >
        + Add date
      </button>
    </div>
  )
}
