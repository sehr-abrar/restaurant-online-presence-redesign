import { useState, type FormEvent } from 'react'
import { useCart } from '../context/CartContext'
import { money, RESTAURANT } from '../data/restaurant'
import './CartDrawer.css'

type Step = 'cart' | 'checkout' | 'done'
type Fulfillment = 'pickup' | 'delivery'

export default function CartDrawer() {
  const { lines, subtotal, tax, total, count, drawerOpen, closeDrawer, setQty, removeLine, clear } =
    useCart()

  const [step, setStep] = useState<Step>('cart')
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')
  const [orderNo, setOrderNo] = useState('')

  const deliveryFee = fulfillment === 'delivery' ? 3.5 : 0
  const grandTotal = total + deliveryFee

  const placeOrder = (e: FormEvent) => {
    e.preventDefault()
    // Frontend prototype — no backend. Generate a believable order number.
    setOrderNo('WW-' + Math.floor(1000 + Math.random() * 9000))
    setStep('done')
  }

  const handleClose = () => {
    closeDrawer()
    // Reset to a clean state after the closing animation if the order finished.
    if (step === 'done') {
      clear()
      setStep('cart')
    }
  }

  return (
    <>
      <div
        className={`drawer__scrim ${drawerOpen ? 'is-open' : ''}`}
        onClick={handleClose}
        aria-hidden={!drawerOpen}
      />
      <aside className={`drawer ${drawerOpen ? 'is-open' : ''}`} aria-label="Your cart">
        <header className="drawer__head">
          <h2>
            {step === 'cart' && 'Your Cart'}
            {step === 'checkout' && 'Checkout'}
            {step === 'done' && 'Order Confirmed'}
          </h2>
          <button className="drawer__close" onClick={handleClose} aria-label="Close cart">
            ✕
          </button>
        </header>

        {/* ---- CART STEP ---- */}
        {step === 'cart' && (
          <>
            <div className="drawer__body">
              {lines.length === 0 ? (
                <div className="drawer__empty">
                  <span>🥢</span>
                  <p>Your cart is empty.</p>
                  <small>Add a few dishes from the menu to get started.</small>
                </div>
              ) : (
                lines.map((l) => (
                  <article key={l.lineId} className="cartline">
                    <div className="cartline__main">
                      <h3>{l.name}</h3>
                      {l.options.map((o) => (
                        <span key={o.group} className="cartline__opt">
                          {o.group}: {o.values.join(', ')}
                        </span>
                      ))}
                      {l.notes ? <span className="cartline__notes">“{l.notes}”</span> : null}
                    </div>
                    <div className="cartline__side">
                      <span className="cartline__price">{money(l.unitPrice * l.quantity)}</span>
                      <div className="cartline__qty">
                        <button onClick={() => setQty(l.lineId, l.quantity - 1)} aria-label="Decrease">
                          −
                        </button>
                        <span>{l.quantity}</span>
                        <button onClick={() => setQty(l.lineId, l.quantity + 1)} aria-label="Increase">
                          +
                        </button>
                      </div>
                      <button className="cartline__remove" onClick={() => removeLine(l.lineId)}>
                        Remove
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <footer className="drawer__foot">
                <Totals subtotal={subtotal} tax={tax} total={total} />
                <button className="btn btn-primary drawer__cta" onClick={() => setStep('checkout')}>
                  Proceed to Checkout · {money(total)}
                </button>
              </footer>
            )}
          </>
        )}

        {/* ---- CHECKOUT STEP ---- */}
        {step === 'checkout' && (
          <form className="drawer__body drawer__checkout" onSubmit={placeOrder}>
            <div className="seg" role="group" aria-label="Fulfillment">
              <button
                type="button"
                className={fulfillment === 'pickup' ? 'is-active' : ''}
                onClick={() => setFulfillment('pickup')}
              >
                🥡 Pickup
              </button>
              <button
                type="button"
                className={fulfillment === 'delivery' ? 'is-active' : ''}
                onClick={() => setFulfillment('delivery')}
              >
                🛵 Delivery
              </button>
            </div>

            <label>
              Full name
              <input type="text" required placeholder="Your name" />
            </label>
            <label>
              Phone
              <input type="tel" required placeholder="(718) 555-0147" />
            </label>
            {fulfillment === 'delivery' && (
              <label>
                Delivery address
                <input type="text" required placeholder="Street address, apt, ZIP" />
              </label>
            )}
            <label>
              Order notes
              <textarea rows={2} placeholder="Allergies, buzzer code, etc." />
            </label>

            <div className="drawer__summary">
              <Totals subtotal={subtotal} tax={tax} total={total} />
              {deliveryFee > 0 && (
                <Row label="Delivery fee" value={money(deliveryFee)} />
              )}
              <Row label="Total" value={money(grandTotal)} strong />
            </div>

            <div className="drawer__actions">
              <button type="button" className="btn btn-ghost" onClick={() => setStep('cart')}>
                ← Back
              </button>
              <button type="submit" className="btn btn-primary">
                Place Order · {money(grandTotal)}
              </button>
            </div>
            <p className="drawer__disclaimer">
              This is a prototype — no payment is taken and no order is actually placed.
            </p>
          </form>
        )}

        {/* ---- DONE STEP ---- */}
        {step === 'done' && (
          <div className="drawer__body drawer__done">
            <span className="drawer__done-icon">✅</span>
            <h3>Thanks for your order!</h3>
            <p className="drawer__order-no">Order {orderNo}</p>
            <p>
              {fulfillment === 'pickup'
                ? `We'll have it ready for pickup at ${RESTAURANT.address.split(',')[0]} in about 20 minutes.`
                : "Your food is on its way — estimated delivery in 35–45 minutes."}
            </p>
            <div className="drawer__receipt">
              {lines.map((l) => (
                <Row key={l.lineId} label={`${l.quantity}× ${l.name}`} value={money(l.unitPrice * l.quantity)} />
              ))}
              <Row label="Total paid" value={money(grandTotal)} strong />
            </div>
            <p className="drawer__count">{count} item{count === 1 ? '' : 's'} · prototype order</p>
            <button className="btn btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

function Totals({ subtotal, tax, total }: { subtotal: number; tax: number; total: number }) {
  return (
    <div className="totals">
      <Row label="Subtotal" value={money(subtotal)} />
      <Row label={`Tax (${(RESTAURANT.taxRate * 100).toFixed(3)}%)`} value={money(tax)} />
      <Row label="Estimated total" value={money(total)} strong />
    </div>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`row ${strong ? 'row--strong' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
