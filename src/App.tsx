import './index.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Logo, Mark } from './Logo'
import { Calculator } from './Calculator'
import { CONTACTS } from './site'
import { PRICING } from './pricing'
import { projects, liveSites } from './projects'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Услуги', id: 'uslugi' },
  { label: 'Портфолио', id: 'portfolio' },
  { label: 'Калькулятор', id: 'kalkulyator' },
  { label: 'Тарифы', id: 'tarify' },
  { label: 'FAQ', id: 'faq' },
]

const products = [
  {
    code: '001',
    title: 'Сайты и лендинги',
    desc: 'От одностраничника до каталога с записью. Адаптив, скорость, SEO-база. Запуск за 3–7 дней.',
    tags: ['Next.js', 'SEO-first', 'Адаптив'],
  },
  {
    code: '002',
    title: 'Боты и онлайн-запись',
    desc: 'Виджет записи на сайте + боты во всех мессенджерах: Telegram, MAX и VK. Слоты, напоминания, база, рассылки.',
    tags: ['Telegram', 'MAX', 'VK', 'Mini Apps'],
  },
  {
    code: '003',
    title: 'Автоматизация',
    desc: 'Избавляем от рутины: заявка сама попадает нужному сотруднику, триггеры и интеграции.',
    tags: ['CRM', 'Workflow'],
  },
  {
    code: '004',
    title: 'Яндекс Бизнес',
    desc: 'Кнопка сайта на вашей карточке, свежие фото, ответы на отзывы. Карта организации.',
    tags: ['Карты API', 'Карточка'],
  },
  {
    code: '005',
    title: 'Свой софт и парсеры',
    desc: 'Внутренние инструменты, парсинг и аналитика рынка. Автоматизируем ручные процессы.',
    tags: ['Python', 'FastAPI'],
  },
]

const niches = [
  { name: 'Автосервисы и шиномонтаж', note: 'прайс + запись по услугам' },
  { name: 'Салон красоты и барбершоп', note: 'запись + база + YClients-детект' },
  { name: 'Кафе, пекарни, доставка', note: 'меню + предзаказ' },
  { name: 'Стоматология и клиники', note: 'запись + напоминания' },
  { name: 'Производство и мастерские', note: 'каталог + калькулятор цены' },
  { name: 'Выездные услуги', note: 'лендинг + бот-диспетчер' },
]

const steps = [
  { n: '01', t: 'Аналитика', d: 'Данные бизнеса и рынка уже у нас — из собственного парсера. Никаких недель «на сбор требований».' },
  { n: '02', t: 'Прототип за 30 минут', d: 'Готовый шаблон ниши с реальными данными клиента. Превью до первого звонка.' },
  { n: '03', t: 'Запуск 3–7 дней', d: 'Сайт + виджет записи + бот. Настройка профиля Яндекс Бизнес и карточки.' },
  { n: '04', t: 'Поддержка', d: 'Обновления, отзывы, аналитика. Подписка от 1 490 ₽/мес — работа на результат.' },
]

const stack = [
  ['Frontend', 'React · Next.js · TypeScript · Tailwind'],
  ['Backend', 'Python · FastAPI · REST / WebSocket'],
  ['Боты', 'Telegram Bot API · MAX · VK Mini Apps'],
  ['Данные', 'PostgreSQL · SQLite · парсинг'],
  ['Интеграции', 'Яндекс Карты API · платёжные · CRM'],
  ['Deploy', 'Docker · CI/CD · VPS / облако'],
]

const plans = PRICING.plans

const faq = [
  ['Как быстро сделаете сайт?', 'Прототип — за 30 минут из шаблона ниши, финальный запуск — за 3–7 рабочих дней. Доступно превью до начала работы.'],
  ['Что нужно от меня как от клиента?', 'Название, адрес, телефон, услуги и фотографии. Остальное соберём сами — часто данные уже есть у нас.'],
  ['В каких каналах работает запись?', 'Во всех сразу: виджет на вашем сайте + боты в Telegram, MAX и VK. Клиент выбирает, где ему удобнее, основная запись всегда живёт у вас — без зависимости от одного мессенджера и комиссий агрегаторов.'],
  ['Смогу ли я редактировать сайт сам?', 'Да, базовая редактура (цены, фото, акции) доступна из панели. Технические правки — при сопровождении.'],
  ['Где вы работаете?', 'Локально в Удмуртии — лично на связи. Удалённо — по всей России и для клиентов из Казахстана и Узбекистана.'],
  ['А как же YClients и другие?', 'Мы не конкурируем за «платформу». Запись живёт на вашем сайте: без подписки за 5 440 ₽/мес, без комиссии агрегатора, база — ваша.'],
]

const marquee = ['САЙТЫ', 'БОТЫ', 'ОНЛАЙН-ЗАПИСЬ', 'АВТОМАТИЗАЦИЯ', 'ЯНДЕКС БИЗНЕС', 'ПАРСЕРЫ']

function SectionHead({ k, t }: { k: string; t: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-sage uppercase">
        <span className="bracket">&lt;</span> {k} <span className="bracket">&gt;</span>
      </p>
      <h2 className="line-reveal mt-3 pb-2 text-3xl font-extrabold text-ink sm:text-4xl">{t}</h2>
    </div>
  )
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLDivElement>(null)

  // Всё аккуратно чистим через ctx: повторный рендер (StrictMode) не сломает
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Hero-таймлайн */
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('[data-hero-fade]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 })
        .fromTo(
          '[data-hero-mark]',
          { scale: 0.6, opacity: 0, rotate: -8 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
          '-=0.5',
        )

      /* 2. Статы: счётчики */
      const nums = countRef.current?.querySelectorAll('[data-count]') || []
      nums.forEach((el) => {
        const end = Number((el as HTMLElement).dataset.count)
        const txt = (el as HTMLElement).dataset.suffix || ''
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.0,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => ((el as HTMLElement).textContent = Math.floor(obj.v).toLocaleString('ru-RU') + txt),
        })
      })

      /* 3. Плавные появления при скролле */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: (i % 3) * 0.05,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })

      /* 4. Секционные заголовки: линия подчёркивания */
      gsap.utils.toArray<HTMLElement>('.line-reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => el.classList.add('in'),
        })
      })

      /* 5. Параллакс-скобки на фоне hero */
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.speed || 20)
        gsap.to(el, {
          yPercent: speed,
          scrollTrigger: { trigger: heroRef.current, scrub: 1, start: 'top top', end: 'bottom top' },
        })
      })

      /* 6. Бегущая строка */
      const track = rootRef.current?.querySelector('[data-marquee]')
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          duration: 22,
          ease: 'none',
          repeat: -1,
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative min-h-screen grid-bg overflow-hidden">
      <div ref={countRef} />

      {/* Параллакс-скобки (декоративные) */}
      <span data-parallax data-speed="-14" className="parallax-bracket left-[3%] top-[16%] text-[10rem]" aria-hidden>&gt;</span>
      <span data-parallax data-speed="18" className="parallax-bracket right-[5%] top-[28%] text-[6rem]" aria-hidden>&lt;</span>
      <span data-parallax data-speed="-22" className="parallax-bracket left-[10%] top-[70%] text-[4rem]" aria-hidden>&lt;/&gt;</span>
      <span data-parallax data-speed="15" className="parallax-bracket right-[12%] bottom-[18%] text-[8rem]" aria-hidden>&gt;</span>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-edge/70 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-mist md:flex">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#cta"
            className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy"
          >
            Обсудить проект
          </a>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} id="top" className="relative mx-auto max-w-6xl px-5 pt-24 pb-28 text-center">
        <div data-hero-mark className="mb-7 flex justify-center">
          <Mark className="text-7xl tracking-tight" />
        </div>
        <span data-hero-fade className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-sage ring-1 ring-sage/40">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" /> custom software & bots development
        </span>
        <h1 data-hero-fade className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-ink caret sm:text-6xl">
          Даём малому бизнесу цифровой канал за неделю
        </h1>
        <p data-hero-fade className="mx-auto mt-6 max-w-2xl text-lg text-mist">
          Запись попадает на ваш сайт и в боты Telegram, MAX и VK — без агрегаторов с комиссией.
          Данные уже заполнены из Яндекс.Карт. Запуск за 3–7 дней.
        </p>
        <div data-hero-fade className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#cta" className="rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-navy">
            Получить бесплатный прототип
          </a>
          <a
            href="#uslugi"
            className="rounded-lg px-6 py-3 font-semibold text-ink ring-1 ring-edge transition hover:ring-sage"
          >
            Смотреть услуги
          </a>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-5 sm:grid-cols-3">
          {[
            { n: 3900, suffix: '+', l: 'бизнесов проанализировано' },
            { n: 7, suffix: ' дней', l: 'максимальный запуск сайта' },
            { n: PRICING.maintenance, suffix: ' ₽', l: 'подписка на сопровождение' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-edge bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="font-mono text-4xl font-extrabold text-ink">
                <span data-count={s.n} data-suffix={s.suffix}>0</span>
              </div>
              <div className="mt-2 text-sm text-mist">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-edge bg-white py-4 overflow-hidden select-none">
        <div data-marquee className="flex w-max gap-10 whitespace-nowrap font-mono text-sm font-semibold uppercase tracking-widest text-grey">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m} <span className="bracket">&lt;&gt;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Products */}
      <section id="uslugi" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="01 · Услуги" t="Что мы делаем" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.code}
                data-reveal
                className="group relative overflow-hidden rounded-2xl border border-edge bg-white p-6 transition hover:border-sage/70 hover:shadow-xl"
              >
                <span className="font-mono text-xs text-grey">{p.code}</span>
                <div className="mt-3 font-mono text-3xl font-extrabold text-sage">
                  <span className="bracket">&lt;</span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded bg-paper px-2 py-1 text-xs text-navy ring-1 ring-edge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches */}
      <section id="nishi" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="02 · Ниши" t="Шаблоны под вашу отрасль" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {niches.map((n, i) => (
              <div
                key={n.name}
                data-reveal
                className="group rounded-2xl border border-edge bg-paper p-5 transition hover:border-sage/70"
              >
                <div className="font-mono text-xs text-sage">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-1 font-semibold text-ink">{n.name}</div>
                <div className="mt-1 text-sm text-mist">{n.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="· Портфолио" t="Живые демо из нашей базы лидов" />
          <p className="mx-auto -mt-8 mb-10 max-w-2xl text-center text-mist">
            Это не фотошоп. Сайты собраны из шаблонов ниш и мгновенно заполнены реальными данных клиентов
            из Яндекс.Карт (название, адрес, телефон, услуги, фото, отзывы). Клик — и открывается макет.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={`/portfolio/${p.slug}`}
                data-reveal
                className="group overflow-hidden rounded-2xl border border-edge bg-white shadow-sm transition hover:border-sage/60 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden bg-ink">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: p.accent }}>
                      {p.niche}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">{p.name}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-mist">
                    <span style={{ color: p.accent }}>{'★'.repeat(Math.round(p.rating))}</span>
                    <span className="font-medium text-ink">{p.rating.toFixed(1)}</span>
                    <span>· {p.reviews} отзывов</span>
                  </div>
                  <p className="mt-2 text-sm text-mist">{p.address}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: p.accent }}>
                    Смотреть демо
                    <span className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}

            {/* Живые производственные сайты */}
            {liveSites.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-edge bg-white shadow-sm transition hover:border-sage/60 hover:shadow-xl"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: s.accent }}>
                      {s.niche}
                    </span>
                    <span className="rounded-full bg-sage/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sage">
                      в продакшене
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-bold text-ink">{s.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{s.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-edge px-5 py-3">
                  <span className="font-mono text-xs text-grey">https://{s.name}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: s.accent }}>
                    Открыть сайт
                    <span className="transition group-hover:translate-x-1">↗</span>
                  </span>
                </div>
              </a>
            ))}

            {/* Плейсхолдер-приглашение */}
            <div
              data-reveal
              className="flex flex-col justify-center rounded-2xl border border-dashed border-edge bg-paper p-6 text-center"
            >
              <div className="font-mono text-3xl font-extrabold text-sage">&lt;+&gt;</div>
              <h3 className="mt-3 text-lg font-bold text-ink">Ваш бизнес — следующий</h3>
              <p className="mt-2 text-sm text-mist">
                Если вы нашли себя в базе — напишите нам, соберём ваш демо-сайт бесплатно.
              </p>
              <a
                href="#cta"
                className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy"
              >
                Получить свой демо
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="kalkulyator" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="· Калькулятор" t="Калькулятор сметы" />
          <Calculator />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="03 · Процесс" t="Как мы работаем" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} data-reveal className="rounded-2xl border border-edge bg-white p-6">
                <div className="font-mono text-sm text-sage">{s.n}</div>
                <h3 className="mt-2 text-lg font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="tekhnologii" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="04 · Технологии" t="Современный стек" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map(([k, v]) => (
              <div key={k} data-reveal className="rounded-2xl border border-edge bg-paper p-5">
                <div className="font-mono text-xs tracking-widest text-sage uppercase">
                  <span className="bracket">&lt;</span> {k} <span className="bracket">&gt;</span>
                </div>
                <div className="mt-2 text-sm text-ink">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarify" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead k="05 · Тарифы" t="Честные цены" />
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                data-reveal
                className={`relative rounded-2xl border p-7 ${
                  p.hot ? 'border-sage bg-white shadow-xl' : 'border-edge bg-white'
                }`}
              >
                {p.hot && (
                  <span className="absolute -top-3 left-6 rounded-full bg-sage px-3 py-0.5 text-xs font-semibold text-white">
                    Хит
                  </span>
                )}
                <h3 className="font-mono text-sm uppercase tracking-widest text-grey">{p.name}</h3>
                <div className="mt-3 font-mono text-2xl font-extrabold text-ink">{p.price}</div>
                <div className="text-xs text-mist">{p.once}</div>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-ink">
                      <span className="bracket font-bold">&gt;</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead k="06 · FAQ" t="Частые вопросы" />
          <div className="space-y-3">
            {faq.map(([q, a]) => (
              <details key={q} data-reveal className="group rounded-2xl border border-edge bg-paper p-5 open:border-sage/70">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-ink">
                  {q}
                  <span className="bracket font-mono text-xl transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-mist">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — ошибочный текст в прошлой версии заменил на корректный */}
      <section id="cta" className="py-24">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <div className="mb-4 flex justify-center">
            <Mark className="text-5xl" />
          </div>
          <h2 data-reveal className="text-3xl font-extrabold text-ink sm:text-4xl">
            Запустите канал продаж за неделю
          </h2>
          <p data-reveal className="mt-4 text-mist">
            Напишите нам — за 30 минут соберём превью вашего сайта из шаблона ниши бесплатно.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              ['Написать в VK', CONTACTS.vk],
              ['MAX', CONTACTS.max],
              ['Telegram', CONTACTS.tg],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-navy"
              >
                {label}
              </a>
            ))}
          </div>
          {CONTACTS.phone !== '' && (
            <p data-reveal className="mt-6 font-mono text-sm text-ink">
              <a href={`tel:${CONTACTS.phone.replace(/[^+\d]/g, '')}`} className="hover:text-sage">
                {CONTACTS.phone}
              </a>
              {CONTACTS.email !== '' && (
                <span className="text-grey"> · <a href={`mailto:${CONTACTS.email}`} className="hover:text-sage">{CONTACTS.email}</a></span>
              )}
            </p>
          )}
          <p data-reveal className="mt-2 font-mono text-xs text-grey">
            {CONTACTS.manager} · {CONTACTS.city}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-edge bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-sm text-mist sm:flex-row">
          <Logo compact />
          <span className="font-mono text-xs text-grey">
            <span className="bracket">&lt;/&gt;</span>{' '}
            custom software & bots development
          </span>
        </div>
      </footer>
    </div>
  )
}