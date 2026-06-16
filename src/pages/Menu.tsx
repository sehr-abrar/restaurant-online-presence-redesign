import { useState } from 'react'
import { Link } from 'react-router-dom'
import DishCard from '../components/DishCard'
import { MENU } from '../data/restaurant'
import './Menu.css'

export default function Menu() {
  const [active, setActive] = useState<string>('all')
  const categories = active === 'all' ? MENU : MENU.filter((c) => c.id === active)

  return (
    <div className="menu-page">
      <header className="page-head">
        <span className="eyebrow">Our kitchen</span>
        <h1>The Menu</h1>
        <p>
          Hand-pulled noodles, wok-fired classics, and chef specials. Tap a category to jump,
          and look for ★ to spot our most-loved dishes.
        </p>
      </header>

      {/* Sticky category filter */}
      <div className="menu-filter">
        <div className="container menu-filter__inner">
          <button
            className={active === 'all' ? 'is-active' : ''}
            onClick={() => setActive('all')}
          >
            All
          </button>
          {MENU.map((c) => (
            <button
              key={c.id}
              className={active === c.id ? 'is-active' : ''}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container section-sm">
        {categories.map((cat) => (
          <section key={cat.id} className="menu-cat" id={cat.id}>
            <h2 className="menu-cat__title">{cat.label}</h2>
            <div className="grid-3">
              {cat.items.map((item) => (
                <DishCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>Ready to order?</h2>
          <p>Choose delivery or pickup and we'll get cooking.</p>
          <Link to="/order" className="btn btn-primary">
            Order Online
          </Link>
        </div>
      </section>
    </div>
  )
}
