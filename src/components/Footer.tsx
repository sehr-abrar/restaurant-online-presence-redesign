import { Link } from 'react-router-dom'
import Logo from './Logo'
import { RESTAURANT } from '../data/restaurant'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo tone="dark" />
          <p>{RESTAURANT.blurb}</p>
          <div className="footer__socials">
            <a href={RESTAURANT.socials.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={RESTAURANT.socials.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/location">Location &amp; Hours</Link>
          <Link to="/order">Order Online</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer__col">
          <h4>Visit</h4>
          <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
            {RESTAURANT.address}
          </a>
          <span>{RESTAURANT.neighborhood}</span>
          <a href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a>
          <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
        </div>

        <div className="footer__col">
          <h4>Hours</h4>
          {RESTAURANT.hours.map((h) => (
            <span key={h.day} className="footer__hours">
              <span>{h.day}</span>
              <span>{h.time}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.</span>
        <span>Designed in NYC · A UX/UI case study</span>
      </div>
    </footer>
  )
}
