import { useMemo, useState } from 'react'
import type { MenuItem } from '../data/restaurant'
import { money } from '../data/restaurant'
import { useCart, type CartOption } from '../context/CartContext'
import './DishModal.css'

type Props = {
  item: MenuItem
  onClose: () => void
}

export default function DishModal({ item, onClose }: Props) {
  const { addLine, openDrawer } = useCart()

  // selected[groupId] = array of chosen choice labels (single = length 1)
  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {}
    item.options?.forEach((g) => {
      // pre-select the first choice for required single-select groups
      init[g.id] = g.type === 'single' && g.required ? [g.choices[0].label] : []
    })
    return init
  })
  const [qty, setQty] = useState(1)
  const [notes, setNotes] = useState('')

  // Live unit price = base + every selected option's price delta.
  const unitPrice = useMemo(() => {
    let price = item.price
    item.options?.forEach((g) => {
      g.choices.forEach((c) => {
        if (c.priceDelta && selected[g.id]?.includes(c.label)) price += c.priceDelta
      })
    })
    return price
  }, [item, selected])

  const toggle = (groupId: string, type: 'single' | 'multi', label: string) => {
    setSelected((prev) => {
      if (type === 'single') return { ...prev, [groupId]: [label] }
      const current = prev[groupId] ?? []
      return {
        ...prev,
        [groupId]: current.includes(label)
          ? current.filter((l) => l !== label)
          : [...current, label],
      }
    })
  }

  const handleAdd = () => {
    const options: CartOption[] = (item.options ?? [])
      .map((g) => ({ group: g.label, values: selected[g.id] ?? [] }))
      .filter((o) => o.values.length > 0)

    addLine({
      itemId: item.id,
      name: item.name,
      unitPrice,
      quantity: qty,
      options,
      notes: notes.trim() || undefined,
    })
    onClose()
    openDrawer()
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={item.name}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal__head">
          <h2>
            {item.name}
            {item.zh ? <span className="modal__zh">{item.zh}</span> : null}
          </h2>
          <p>{item.desc}</p>
          <span className="modal__base">{money(item.price)}</span>
        </div>

        <div className="modal__body">
          {item.options?.map((g) => (
            <fieldset key={g.id} className="modal__group">
              <legend>
                {g.label}
                {g.required ? <span className="modal__req">Required</span> : <span className="modal__opt">Optional</span>}
              </legend>
              <div className="modal__choices">
                {g.choices.map((c) => {
                  const active = selected[g.id]?.includes(c.label)
                  return (
                    <button
                      type="button"
                      key={c.label}
                      className={`modal__choice ${active ? 'is-active' : ''}`}
                      onClick={() => toggle(g.id, g.type, c.label)}
                    >
                      <span>{c.label}</span>
                      {c.priceDelta ? <em>+{money(c.priceDelta)}</em> : null}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}

          <label className="modal__notes">
            Special instructions
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. no peanuts, sauce on the side"
            />
          </label>
        </div>

        <div className="modal__foot">
          <div className="modal__qty" role="group" aria-label="Quantity">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
              −
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">
              +
            </button>
          </div>
          <button className="btn btn-primary modal__add" onClick={handleAdd}>
            Add to cart · {money(unitPrice * qty)}
          </button>
        </div>
      </div>
    </div>
  )
}
