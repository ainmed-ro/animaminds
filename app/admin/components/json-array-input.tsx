'use client'

import { useState } from 'react'

interface CompetencyItem {
  name?: string
  description?: string
}

interface JsonArrayInputProps {
  name: string
  label: string
  defaultValue?: CompetencyItem[]
}

export function CompetencyArrayInput({ name, label, defaultValue = [] }: JsonArrayInputProps) {
  const [items, setItems] = useState<CompetencyItem[]>(defaultValue.length > 0 ? defaultValue : [{ name: '', description: '' }])

  const updateItem = (index: number, field: keyof CompetencyItem, value: string) => {
    const next = [...items]
    next[index] = { ...next[index], [field]: value }
    setItems(next)
  }

  const addItem = () => setItems([...items, { name: '', description: '' }])
  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index)
    setItems(next.length > 0 ? next : [{ name: '', description: '' }])
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-2 items-start">
          <input
            value={item.name}
            onChange={(e) => updateItem(index, 'name', e.target.value)}
            placeholder="Competency name"
            className="rounded-md border-gray-300 px-3 py-2 border"
          />
          <div className="flex gap-2">
            <input
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              placeholder="Description"
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
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-sm text-blue-600 hover:text-blue-900"
      >
        + Add competency
      </button>
    </div>
  )
}
