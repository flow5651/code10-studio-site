// =================== ЦЕНЫ СТУДИИ ===================
// Единый источник правды: калькулятор и блок «Тарифы» берут суммы отсюда.
// Меняете цены здесь — обновляются везде.

export type Base = { id: string; label: string; desc: string; price: number }
export type Option = { id: string; label: string; price: number }

export const PRICING = {
  // Типы сайтов
  bases: [
    { id: 'land', label: 'Лендинг', desc: 'одностраничник по нише', price: 2000 },
    { id: 'catalog', label: 'Сайт-каталог', desc: 'услуги / прайс, до 20 стр.', price: 5000 },
    { id: 'shop', label: 'Каталог с записью', desc: 'услуги + онлайн-запись', price: 7000 },
    { id: 'redesign', label: 'Редизайн сайта', desc: 'обновление дизайна и скорости', price: 3500 },
  ] as Base[],

  // Опции-добавки
  options: [
    { id: 'booking', label: 'Виджет онлайн-записи', price: 6000 },
    { id: 'bot', label: 'Бот записи (MAX + VK)', price: 1000 },
    { id: 'tg', label: '+ Telegram-бот', price: 1000 },
    { id: 'dispatch', label: 'Бот-диспетчер заявок', price: 2000 },
    { id: 'map', label: 'Яндекс-карта организации', price: 3000 },
    { id: 'calc', label: 'Калькулятор цены', price: 4000 },
    { id: 'yabiz', label: 'Настройка Яндекс Бизнес', price: 1000 },
    { id: 'seo', label: 'SEO-база и контент', price: 1000 },
  ] as Option[],

  // Подписка на сопровождение (мес)
  maintenance: 990,

  // Скидки от объёма заказа: [порог, скидка]
  discounts: [
    { threshold: 50000, amount: 5000 },
    { threshold: 30000, amount: 2000 },
  ] as { threshold: number; amount: number }[],

  // Блок «Тарифы»
  plans: [
    {
      name: 'Старт',
      price: 'от 1 000 ₽',
      once: 'разовый запуск',
      features: ['Лендинг по нише', 'Форма заявки', 'Яндекс-карта', 'Домен и хостинг'],
    },
    {
      name: 'Бизнес',
      price: 'от 3 000 ₽',
      once: 'разовый запуск',
      hot: true,
      features: ['Всё из «Старт»', 'Виджет онлайн-записи', 'Боты в Telegram + MAX + VK', 'Клиентская база и рассылки'],
    },
    {
      name: 'Подписка',
      price: 'от 990 ₽/мес',
      once: 'ежемесячно',
      features: ['Поддержка и правки', 'Напоминания о записи', 'Аналитика и отчёты', 'Обновления без простоев'],
    },
  ],
}

export function fmt(n: number): string {
  return n.toLocaleString('ru-RU')
}

export function discountFor(total: number): number {
  for (const d of PRICING.discounts) {
    if (total >= d.threshold) return d.amount
  }
  return 0
}