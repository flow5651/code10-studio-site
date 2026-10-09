// =================== ПОРТФОЛИО: 5 демо-проектов ===================
// Данные взяты из orgs.db (реальные лиды с Яндекс.Карт: название, адрес,
// телефон, рейтинг, отзывы, фото). Сайты собраны из шаблона ниши.

export type Project = {
  slug: string
  niche: string
  name: string
  address: string
  phone: string
  rating: number
  reviews: number
  accent: string // акцентный цвет ниши
  image: string // главное фото (из Яндекс.Карт)
  tagline: string
  services: string[]
  desc: string
  cta: string
}

export const projects: Project[] = [
  {
    slug: 'cheskyt-stolovaya',
    niche: 'столовая · предзаказ обедов',
    name: 'Ческыт № 1',
    address: 'Удмуртская ул., 304, Ижевск',
    phone: '+7 (3412) 67-07-07',
    rating: 5.0,
    reviews: 1074,
    accent: '#2f7d6a',
    image:
      'https://avatars.mds.yandex.net/get-altay/15434262/2a000001974997734d86ccd179684666eb83/XXL_height',
    tagline: 'Домашние обеды каждый день',
    services: ['Комплексные обеды', 'Первые и вторые блюда', 'Выпечка и десерты', 'Предзаказ обедов в офис'],
    desc: 'Столовая с кухней домашнего типа. Собственная выпечка, обеды по будням, предзаказ на неделю прямо с сайта или бота.',
    cta: 'Записаться на обед',
  },
  {
    slug: 'forvard-pro-auto',
    niche: 'автоэлектрик · диагностика',
    name: 'Форвард Про',
    address: 'Воткинское ш., 170Ж, Ижевск',
    phone: '+7 (3412) 99-80-08',
    rating: 4.9,
    reviews: 468,
    accent: '#3b6ea5',
    image:
      'https://avatars.mds.yandex.net/get-altay/11860411/2a0000018d5e417aaa45eaefe867b763543d/XXL_height',
    tagline: 'Автоэлектрик и диагностика',
    services: ['Компьютерная диагностика', 'Ремонт электрооборудования', 'Автоэлектрик на выезд', 'Схемы и жгуты'],
    desc: 'Автоэлектрик с выездом и диагностикой. Прайс на услуги на сайте, запись по кнопке или в боте.',
    cta: 'Записаться на диагностику',
  },
  {
    slug: 'okaziya-pekarnya',
    niche: 'пекарня · каталог',
    name: 'Оказия',
    address: 'ул. Ленина, 19, Ижевск',
    phone: '+7 (3412) 36-66-39',
    rating: 4.4,
    reviews: 398,
    accent: '#d98e3d',
    image:
      'https://avatars.mds.yandex.net/get-altay/11421909/2a00000190cc71f5214bb3785d0bbb4b3e99/XXL_height',
    tagline: 'Хлеб и выпечка каждый день',
    services: ['Хлеб на закваске', 'Пироги и пирожки', 'Торты на заказ', 'Кофе с собой'],
    desc: 'Пекарня с собственной выпечкой. Каталог продукции, торты на заказ через сайт.',
    cta: 'Сделать заказ',
  },
  {
    slug: 'doctor-plus-dent',
    niche: 'стоматология · запись',
    name: 'Доктор Плюс',
    address: 'ул. Азина, 135, Ижевск',
    phone: '+7 (3412) 33-33-60',
    rating: 5.0,
    reviews: 209,
    accent: '#7a5fb0',
    image:
      'https://avatars.mds.yandex.net/get-altay/18100231/2a0000019ebc8e9b13a1441db5f0843a5fe3/XXL_height',
    tagline: 'Стоматология со своим подходом',
    services: ['Лечение зубов', 'Профессиональная гигиена', 'Установка брекетов', 'Отбеливание'],
    desc: 'Стоматологическая клиника. Запись онлайн на сайте, напоминания о приёме в боте.',
    cta: 'Записаться на приём',
  },
  {
    slug: 'katti-wow-beauty',
    niche: 'маникюр · beauty-запись',
    name: 'Katti Wow Studio',
    address: 'Пушкинская ул., 229, Ижевск',
    phone: '+7 (982) 822-20-58',
    rating: 5.0,
    reviews: 188,
    accent: '#c8568a',
    image:
      'https://avatars.mds.yandex.net/get-altay/13461681/2a000001915f493bb239e154e93e5529d16c/S',
    tagline: 'Ногтевая студия',
    services: ['Маникюр и педикюр', 'Наращивание', 'Покрытие гель-лак', 'Дизайн ногтей'],
    desc: 'Ногтевая студия. База клиентов, онлайн-запись и напоминания — всё в боте.',
    cta: 'Записаться на маникюр',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

// Реальные сайты, сделанные студией (ссылки во внешний мир, не демо)
export type LiveSite = {
  name: string
  niche: string
  url: string
  desc: string
  accent: string
  featured?: boolean
}

export const liveSites: LiveSite[] = [
  {
    name: 'famounts.ru',
    niche: 'производство · астрооборудование',
    url: 'https://famounts.ru/',
    accent: '#31517a',
    featured: true,
    desc: 'Каталог астрономического оборудования ручной работы: 3D-модели, готовые изделия, услуги OnStep и лазерной гравировки. Работающий сайт.',
  },
]

export function fmtPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

export function yandexMapsUrl(p: Project): string {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(p.name + ', ' + p.address)}`
}