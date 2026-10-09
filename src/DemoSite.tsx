import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, fmtPhone, yandexMapsUrl, type Project } from './projects'
import { getMenu, type MenuCategory } from './menu'
import { Mark } from './Logo'
import './index.css'

function Stars({ value }: { value: number }) {
  const full = Math.round(value)
  return (
    <span className="inline-flex gap-0.5" aria-label={`Рейтинг ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? 'text-amber-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </span>
  )
}

function Menu({ categories, accent }: { categories: MenuCategory[]; accent: string }) {
  const [tab, setTab] = useState(categories[0].title)
  const active = categories.find((c) => c.title === tab) ?? categories[0]
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
        Меню
      </h2>
      <h3 className="mt-2 text-3xl font-extrabold">Актуальный прайс кафе</h3>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.title}
            onClick={() => setTab(c.title)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              c.title === active.title ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={c.title === active.title ? { backgroundColor: accent } : undefined}
          >
            {c.title}
          </button>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-edge">
        {active.items.map((it) => (
          <li key={it.name} className="flex items-baseline justify-between gap-4 py-3">
            <div>
              <div className="font-medium">{it.name}</div>
              {it.desc && <div className="text-sm text-gray-500">{it.desc}</div>}
            </div>
            <div className="shrink-0 font-semibold" style={{ color: accent }}>
              {it.price} ₽
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function DemoTemplate({ p }: { p: Project }) {
  const accent = p.accent
  const link = { color: accent }
  const menu = getMenu(p.slug)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Гостевой бар поверх демо */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-edge bg-ink px-4 py-2.5 text-white">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium">
          <Mark className="text-lg" />
          <span className="hidden text-white/70 sm:inline">Демо-лендинг из шаблона CODE10</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-white/50 md:inline">это макет сайта для «{p.name}»</span>
          <Link
            to="/"
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/20"
          >
            ← К портфолио
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-14 text-white">
          <span className="font-mono text-xs uppercase tracking-[0.25em]" style={link}>
            {p.niche}
          </span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold sm:text-5xl">{p.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/80">{p.tagline}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
            <Stars value={p.rating} /> <span>{p.rating.toFixed(1)}</span>
            <span className="text-white/40">·</span>
            <span>{p.reviews} отзывов на Яндекс.Картах</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${fmtPhone(p.phone)}`}
              className="rounded-lg px-5 py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              {p.cta} · {p.phone}
            </a>
            <a
              href={yandexMapsUrl(p)}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-5 py-3 font-semibold ring-1 ring-white/40 transition hover:bg-white/10"
            >
              Как добраться
            </a>
          </div>
        </div>
      </header>

      {/* Услуги */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em]" style={link}>
          Услуги
        </h2>
        <h3 className="mt-2 text-3xl font-extrabold">Что мы предлагаем</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {p.services.map((s, i) => (
            <div key={s} className="rounded-2xl border border-edge bg-gray-50 p-5">
              <div className="font-mono text-sm" style={link}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-1 font-semibold">{s}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-gray-600">{p.desc}</p>
      </section>

      {menu && menu.length > 0 && <Menu categories={menu} accent={accent} />}

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Запишитесь / оформите заказ онлайн</h3>
          <p className="mt-3 text-gray-600">
            Кнопка записи, бот в Telegram · MAX · VK и напоминания — без агрегаторов и комиссий.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${fmtPhone(p.phone)}`}
              className="rounded-lg px-6 py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              {p.phone}
            </a>
            <a
              href={yandexMapsUrl(p)}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-6 py-3 font-semibold ring-1 ring-edge transition hover:ring-gray-400"
            >
              Открыть на карте
            </a>
          </div>
        </div>
      </section>

      {/* Футер демо: адрес + контакты */}
      <footer className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-gray-500 sm:flex-row">
        <span className="font-semibold text-gray-800">{p.name}</span>
        <span>{p.address}</span>
        <a href={`tel:${fmtPhone(p.phone)}`} className="font-medium" style={link}>
          {p.phone}
        </a>
      </footer>
    </div>
  )
}

export default function DemoSite() {
  const { slug } = useParams()
  const p = getProject(slug || '')
  if (!p) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold">Проект не найден</p>
        <Link to="/" className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white">
          ← На главную
        </Link>
      </div>
    )
  }
  return <DemoTemplate p={p} />
}