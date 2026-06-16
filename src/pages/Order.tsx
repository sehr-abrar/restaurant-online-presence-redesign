import { Link } from 'react-router-dom'
import { ORDER_PLATFORMS, RESTAURANT } from '../data/restaurant'
import './Order.css'

export default function Order() {
  return (
    <div className="order">
      <header className="page-head">
        <span className="eyebrow">Order online</span>
        <h1>Delivery &amp; pickup</h1>
        <p>
          Choose how you'd like to get your food. You'll be taken to your platform of choice — your cart
          and account stay with them.
        </p>
      </header>

      <section className="container section-sm">
        {/* Primary, recommended option: order directly on the WokWise site */}
        <Link to="/order/menu" className="order__primary">
          <div className="order__primary-text">
            <span className="order__primary-badge">Recommended · No fees</span>
            <h2>Order on our website</h2>
            <p>
              Build your order right here — customize each dish, review your cart, and check out.
              Ordering direct supports the kitchen with no third-party markups.
            </p>
            <span className="order__primary-cta">Start your order →</span>
          </div>
          <div className="order__primary-art" aria-hidden>
            🥡
          </div>
        </Link>

        <div className="order__divider">
          <span>or order through a delivery partner</span>
        </div>

        <div className="order__grid">
          {ORDER_PLATFORMS.map((p) => {
            const external = p.url.startsWith('http')
            return (
              <a
                key={p.name}
                href={p.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="order__card"
              >
                <span className="order__dot" style={{ background: p.color }} />
                <div className="order__card-body">
                  <div className="order__card-head">
                    <h3>{p.name}</h3>
                    <span className="order__eta">{p.eta}</span>
                  </div>
                  <p>{p.desc}</p>
                </div>
                <span className="order__arrow">→</span>
              </a>
            )
          })}
        </div>

        <div className="order__note">
          <strong>Prefer to call?</strong>
          <span>
            Ring us at{' '}
            <a href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a> and we'll have it ready for pickup in
            about 20 minutes.
          </span>
        </div>
      </section>
    </div>
  )
}
