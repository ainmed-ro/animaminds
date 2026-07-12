'use client'

import { useState } from 'react'

interface RelationItem {
  id: string
  name: string
}

interface RelationSelectorProps {
  name: string
  label: string
  items: RelationItem[]
  defaultSelectedIds?: string[]
}

export function RelationSelector({ name, label, items, defaultSelectedIds = [] }: RelationSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(defaultSelectedIds))

  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-1 max-h-48 overflow-y-auto border rounded-md p-3">
        {items.length === 0 && <p className="text-sm text-gray-500">No items available.</p>}
        {items.map((item) => (
          <label key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              value={item.id}
              checked={selected.has(item.id)}
              onChange={() => toggle(item.id)}
            />
            <span className="text-sm text-gray-700">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
