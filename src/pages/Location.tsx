import { RESTAURANT } from '../data/restaurant'
import './Location.css'

// Embed uses the public Google Maps query URL (no API key needed for the prototype).
const MAP_EMBED =
  'https://maps.google.com/maps?q=7524%2018th%20Ave%20Brooklyn%20NY%2011214&t=&z=15&ie=UTF8&iwloc=&output=embed'

export default function Location() {
  return (
    <div className="location">
      <header className="page-head">
        <span className="eyebrow">Visit us</span>
        <h1>Location &amp; Hours</h1>
        <p>Find us in the heart of Chinatown — easy to reach, easier to crave.</p>
      </header>

      <section className="container section-sm">
        <div className="location__grid">
          <div className="location__info">
            <div className="location__block">
              <h3>Address</h3>
              <p>{RESTAURANT.address}</p>
              <span className="location__muted">{RESTAURANT.neighborhood}</span>
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary location__btn">
                Get Directions →
              </a>
            </div>

            <div className="location__block">
              <h3>Hours</h3>
              <ul className="location__hours">
                {RESTAURANT.hours.map((h) => (
                  <li key={h.day}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="location__block">
              <h3>Contact</h3>
              <p>
                <a href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a>
              </p>
              <p>
                <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
              </p>
            </div>
          </div>

          <div className="location__map">
            <iframe
              title="Map to WokWise"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
