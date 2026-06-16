import { Link } from 'react-router-dom'
import { onImgError } from '../utils/img'
import './About.css'

const VALUES = [
  { icon: '🍜', title: 'Made by hand', text: 'Noodles pulled and dumplings folded fresh every morning.' },
  { icon: '🌿', title: 'Honest ingredients', text: 'Local produce and no shortcuts in our sauces or broths.' },
  { icon: '🏮', title: 'Rooted in tradition', text: 'Family recipes carried from Sichuan to Mott Street.' },
]

export default function About() {
  return (
    <div className="about">
      <header className="page-head">
        <span className="eyebrow">Our story</span>
        <h1>More than a takeout order</h1>
        <p>WokWise is a family kitchen built around the food we grew up eating.</p>
      </header>

      <section className="container section">
        <div className="about__lead">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=75"
            alt="Inside the WokWise dining room"
            onError={onImgError('Our dining room')}
          />
          <div>
            <h2 className="section-title">A neighborhood kitchen with deep roots</h2>
            <p>
              We started WokWise because the dishes we loved most were scattered across delivery apps —
              flattened into thumbnails and star ratings, stripped of the story behind them. We wanted a
              place of our own: a kitchen where the recipes our family has cooked for three generations
              could be served the way they were meant to be.
            </p>
            <p>
              Every day begins the same way — flour on the counter, broth on the stove, and the wok
              warming up. We keep the menu tight and the flavors bold, because that's how we'd cook for
              our own table.
            </p>
          </div>
        </div>

        <div className="about__values">
          {VALUES.map((v) => (
            <div key={v.title} className="about__value">
              <span className="about__value-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="story">
        <div className="container story__inner">
          <div className="story__copy">
            <span className="eyebrow">Why it matters</span>
            <h2 className="section-title">Food worth gathering around</h2>
            <p>
              Whether you're ordering a quick lunch or feeding the whole table, we want WokWise to feel
              like a real place — one with a face, a story, and a point of view. That's something a
              delivery listing can never quite capture.
            </p>
            <Link to="/menu" className="btn btn-secondary">
              Explore the menu
            </Link>
          </div>
          <div className="story__art">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=75"
              alt="A shared table of Chinese dishes"
              onError={onImgError('Food worth sharing')}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
