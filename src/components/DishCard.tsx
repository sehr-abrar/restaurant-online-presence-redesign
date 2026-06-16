import type { MenuItem } from '../data/restaurant'
import { money } from '../data/restaurant'
import { onImgError } from '../utils/img'
import './DishCard.css'

const TAG_META: Record<string, { label: string; cls: string }> = {
  popular: { label: '★ Popular', cls: 'tag-pop' },
  spicy: { label: '🌶 Spicy', cls: 'tag-spicy' },
  veg: { label: '🌱 Veg', cls: 'tag-veg' },
}

export default function DishCard({ item }: { item: MenuItem }) {
  return (
    <article className="dish">
      <div className="dish__media">
        <img src={item.image} alt={item.name} loading="lazy" onError={onImgError(item.name)} />
        {item.tags?.length ? (
          <div className="dish__tags">
            {item.tags.map((t) => (
              <span key={t} className={`tag ${TAG_META[t].cls}`}>
                {TAG_META[t].label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="dish__body">
        <div className="dish__head">
          <h3>
            {item.name}
            {item.zh ? <span className="dish__zh">{item.zh}</span> : null}
          </h3>
          <span className="dish__price">{money(item.price)}</span>
        </div>
        <p>{item.desc}</p>
      </div>
    </article>
  )
}
