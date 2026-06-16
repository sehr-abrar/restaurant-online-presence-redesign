import { Link } from 'react-router-dom'
import DishCard from '../components/DishCard'
import { MENU, RESTAURANT } from '../data/restaurant'
import { onImgError } from '../utils/img'
import './Home.css'

// Featured = every dish flagged "popular", flattened across categories.
const featured = MENU.flatMap((c) => c.items).filter((i) => i.tags?.includes('popular')).slice(0, 3)

export default function Home() {
  return (
    <div className="home">
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy fade-up">
            <span className="eyebrow">{RESTAURANT.neighborhood}</span>
            <h1>
              Wok-fired <span className="hero__accent">Chinese classics</span>, made by hand.
            </h1>
            <p>{RESTAURANT.blurb}</p>
            <div className="hero__actions">
              <Link to="/menu" className="btn btn-primary">
                View the Menu
              </Link>
              <Link to="/order" className="btn btn-ghost">
                Order Online →
              </Link>
            </div>
            <div className="hero__meta">
              <span>★ 4.8 · 1,200+ reviews</span>
              <span aria-hidden>·</span>
              <span>Open today until 9:30 PM</span>
            </div>
          </div>

          <div className="hero__art fade-up">
            <img
              src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=75"
              alt="A spread of Chinese dishes on a table"
              onError={onImgError('WokWise table')}
            />
            <div className="hero__badge">
              <strong>小笼包</strong>
              <span>Handmade daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Quick actions ---- */}
      <section className="container quickrow">
        {[
          { to: '/menu', icon: '🥢', title: 'Browse Menu', sub: 'Noodles, mains & specials' },
          { to: '/order', icon: '🛵', title: 'Order Online', sub: 'Delivery or pickup' },
          { to: '/location', icon: '📍', title: 'Find Us', sub: RESTAURANT.neighborhood },
        ].map((q) => (
          <Link key={q.to} to={q.to} className="quickcard">
            <span className="quickcard__icon">{q.icon}</span>
            <span>
              <strong>{q.title}</strong>
              <small>{q.sub}</small>
            </span>
          </Link>
        ))}
      </section>

      {/* ---- Featured dishes ---- */}
      <section className="section container">
        <div className="section__head">
          <div>
            <span className="eyebrow">Crowd favorites</span>
            <h2 className="section-title">Popular this week</h2>
            <p className="section-lead">
              Not sure where to start? These are the dishes our regulars order again and again.
            </p>
          </div>
          <Link to="/menu" className="btn btn-ghost section__head-cta">
            See full menu
          </Link>
        </div>
        <div className="grid-3">
          {featured.map((item) => (
            <DishCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* ---- Story strip ---- */}
      <section className="story">
        <div className="container story__inner">
          <div className="story__art">
            <img
              src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=75"
              alt="Chef working in the kitchen"
              onError={onImgError('Our kitchen')}
            />
          </div>
          <div className="story__copy">
            <span className="eyebrow">Our story</span>
            <h2 className="section-title">From a family recipe book to Mott Street</h2>
            <p>
              WokWise began with a simple idea: the food we grew up eating deserved a home of its own —
              not buried inside a delivery app. We pull our noodles by hand each morning and braise our
              broths low and slow, the way our grandmother taught us.
            </p>
            <Link to="/about" className="btn btn-secondary">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>Hungry yet?</h2>
          <p>Order in a few taps for delivery or pickup — ready in about 20 minutes.</p>
          <Link to="/order" className="btn btn-primary">
            Order Online
          </Link>
        </div>
      </section>
    </div>
  )
}
