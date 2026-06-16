import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { RESTAURANT } from '../data/restaurant'

export type CartOption = { group: string; values: string[] }

export type CartLine = {
  lineId: string
  itemId: string
  name: string
  unitPrice: number // base price + selected option deltas, per single unit
  quantity: number
  options: CartOption[]
  notes?: string
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  tax: number
  total: number
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addLine: (line: Omit<CartLine, 'lineId'>) => void
  setQty: (lineId: string, qty: number) => void
  removeLine: (lineId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

let lineCounter = 0

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const addLine = (line: Omit<CartLine, 'lineId'>) => {
    lineCounter += 1
    setLines((prev) => [...prev, { ...line, lineId: `line-${lineCounter}` }])
  }

  const setQty = (lineId: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.lineId !== lineId)
        : prev.map((l) => (l.lineId === lineId ? { ...l, quantity: qty } : l)),
    )

  const removeLine = (lineId: string) =>
    setLines((prev) => prev.filter((l) => l.lineId !== lineId))

  const clear = () => setLines([])

  const { count, subtotal, tax, total } = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0)
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0)
    const tax = subtotal * RESTAURANT.taxRate
    return { count, subtotal, tax, total: subtotal + tax }
  }, [lines])

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    tax,
    total,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addLine,
    setQty,
    removeLine,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
