import { useState } from 'react'
import { RESTAURANT } from '../data/restaurant'
import './Contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Frontend-only prototype: no backend yet, so we just confirm locally.
    setSent(true)
  }

  return (
    <div className="contact">
      <header className="page-head">
        <span className="eyebrow">Get in touch</span>
        <h1>Contact us</h1>
        <p>Questions, large orders, or catering? We'd love to hear from you.</p>
      </header>

      <section className="container section-sm">
        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__row">
              <span className="contact__icon">📞</span>
              <div>
                <strong>Phone</strong>
                <a href={RESTAURANT.phoneHref}>{RESTAURANT.phone}</a>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__icon">✉️</span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__icon">📍</span>
              <div>
                <strong>Address</strong>
                <a href={RESTAURANT.mapsUrl} target="_blank" rel="noreferrer">
                  {RESTAURANT.address}
                </a>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__icon">💬</span>
              <div>
                <strong>Social</strong>
                <a href={RESTAURANT.socials.instagram} target="_blank" rel="noreferrer">
                  @wokwise.nyc
                </a>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap">
            {sent ? (
              <div className="contact__sent">
                <span className="contact__sent-icon">🥡</span>
                <h3>Thanks for reaching out!</h3>
                <p>This is a frontend prototype, so nothing is actually sent — but we got the gist.</p>
                <button className="btn btn-ghost" onClick={() => setSent(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="you@email.com" required />
                </label>
                <label>
                  Message
                  <textarea name="message" rows={5} placeholder="How can we help?" required />
                </label>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
