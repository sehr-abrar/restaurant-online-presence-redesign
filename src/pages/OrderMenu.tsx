import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MENU, money, type MenuItem } from '../data/restaurant'
import { useCart } from '../context/CartContext'
import DishModal from '../components/DishModal'
import './OrderMenu.css'

const TAG_LABEL: Record<string, string> = {
  popular: '★ Popular',
  spicy: '🌶 Spicy',
  veg: '🌱 Veg',
}

export default function OrderMenu() {
  const { count, total, openDrawer } = useCart()
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState<MenuItem | null>(null)

  const categories = active === 'all' ? MENU : MENU.filter((c) => c.id === active)

  return (
    <div className="ordermenu">
      <header className="page-head ordermenu__head">
        <span className="eyebrow">Order direct · no fees</span>
        <h1>Order from WokWise</h1>
        <p>
          Build your order below — customize each dish, then review your cart and check out. Ordering
          direct means no third-party markups.
        </p>
        <Link to="/order" className="ordermenu__back">
          ← Other ordering options
        </Link>
      </header>

      {/* Sticky category filter */}
      <div className="menu-filter ordermenu__filter">
        <div className="container menu-filter__inner">
          <button className={active === 'all' ? 'is-active' : ''} onClick={() => setActive('all')}>
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

      <div className="container section-sm ordermenu__list">
        {categories.map((cat) => (
          <section key={cat.id} className="ordermenu__cat">
            <h2 className="ordermenu__cat-title">{cat.label}</h2>
            <div className="ordermenu__rows">
              {cat.items.map((item) => (
                <button key={item.id} className="orow" onClick={() => setSelected(item)}>
                  <div className="orow__info">
                    <div className="orow__name">
                      <span>{item.name}</span>
                      {item.zh ? <em>{item.zh}</em> : null}
                      {item.tags?.map((t) => (
                        <span key={t} className={`orow__tag orow__tag--${t}`}>
                          {TAG_LABEL[t]}
                        </span>
                      ))}
                    </div>
                    <p>{item.desc}</p>
                  </div>
                  <div className="orow__action">
                    <span className="orow__price">{money(item.price)}</span>
                    <span className="orow__add">Add +</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating cart bar */}
      {count > 0 && (
        <button className="cartbar" onClick={openDrawer}>
          <span className="cartbar__count">{count}</span>
          <span className="cartbar__label">View cart</span>
          <span className="cartbar__total">{money(total)}</span>
        </button>
      )}

      {selected && <DishModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
