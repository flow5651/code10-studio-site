import { useMemo, useState } from 'react'
import { PRICING, discountFor, fmt, type Option } from './pricing'

const { bases, options, maintenance } = PRICING

function OptionRow({ opt, checked, onToggle }: { opt: Option; checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
        checked ? 'border-sage bg-sage/10' : 'border-edge bg-white hover:border-sage/50'
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs transition ${
            checked ? 'border-sage bg-sage text-white' : 'border-edge text-transparent'
          }`}
        >
          ✓
        </span>
        <span className="font-medium leading-snug text-ink">{opt.label}</span>
      </span>
      <span className="shrink-0 whitespace-nowrap pt-0.5 font-mono text-sm text-mist">+ {fmt(opt.price)} ₽</span>
    </button>
  )
}

const defaultSelected = () => new Set<string>(['booking', 'map'])

export function Calculator() {
  const [baseId, setBaseId] = useState<string>('catalog')
  const [selected, setSelected] = useState<Set<string>>(defaultSelected)
  const [withMaint, setWithMaint] = useState(true)

  const baseObj = bases.find((b) => b.id === baseId) ?? bases[0]

  const total = useMemo(() => {
    const addons = options.filter((o) => selected.has(o.id)).reduce((s, o) => s + o.price, 0)
    return baseObj.price + addons
  }, [baseId, selected, baseObj])

  const discount = discountFor(total)
  const final = total - discount

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const selectedOptions = options.filter((o) => selected.has(o.id))

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-[1.4fr_1fr]">
      {/* Левая часть — настройки */}
      <div className="space-y-6 rounded-2xl border border-edge bg-paper p-5 sm:p-6">
        <div>
          <h3 className="mb-3 font-semibold text-ink">Тип сайта</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {bases.map((b) => {
              const active = b.id === baseId
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBaseId(b.id)}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition ${
                    active ? 'border-sage bg-white ring-1 ring-sage shadow-sm' : 'border-edge bg-white hover:border-sage/50'
                  }`}
                >
                  <span>
                    <span className="block font-semibold text-ink">{b.label}</span>
                    <span className="mt-1 block text-xs text-mist">{b.desc}</span>
                  </span>
                  <span className={`mt-3 font-mono text-sm ${active ? 'text-sage' : 'text-ink'}`}>
                    {fmt(b.price)} ₽
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-ink">Опции</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {options.map((o) => (
              <OptionRow key={o.id} opt={o} checked={selected.has(o.id)} onToggle={() => toggle(o.id)} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-edge bg-white px-4 py-3">
          <span className="font-medium text-ink">Сопровождение (подписка)</span>
          <button
            type="button"
            onClick={() => setWithMaint(!withMaint)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              withMaint ? 'bg-sage' : 'bg-edge'
            }`}
            aria-pressed={withMaint}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                withMaint ? 'left-[22px]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Правая часть — итог (липкий на десктопе) */}
      <div className="flex flex-col rounded-2xl bg-ink p-6 text-white md:sticky md:top-24">
        <h3 className="font-mono text-xs uppercase tracking-widest text-sage-soft">Ваша смета</h3>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex justify-between gap-2">
            <span className="text-white/70">{baseObj.label}</span>
            <span className="whitespace-nowrap">{fmt(baseObj.price)} ₽</span>
          </li>
          {selectedOptions.map((o) => (
            <li key={o.id} className="flex justify-between gap-2">
              <span className="text-white/70">{o.label}</span>
              <span className="whitespace-nowrap">+ {fmt(o.price)} ₽</span>
            </li>
          ))}
          {withMaint && (
            <li className="flex justify-between gap-2">
              <span className="text-white/70">Подписка / мес</span>
              <span className="whitespace-nowrap">{fmt(maintenance)} ₽</span>
            </li>
          )}
        </ul>
        <div className="mt-6 border-t border-white/15 pt-4">
          {discount > 0 && (
            <div className="mb-2 flex justify-between text-sm text-sage">
              <span>Скидка от объёма</span>
              <span>− {fmt(discount)} ₽</span>
            </div>
          )}
          <div className="flex items-end justify-between gap-3">
            <span className="text-white/70">Разовый запуск</span>
            <div className="text-right">
              <div className="font-mono text-3xl font-extrabold">{fmt(final)} ₽</div>
              <div className="text-xs text-white/50">
                {withMaint ? `+ ${fmt(maintenance)} ₽/мес подписка` : 'без подписки'}
              </div>
            </div>
          </div>
          <a
            href="#cta"
            className="mt-5 block rounded-lg bg-sage py-3 text-center font-semibold text-white transition hover:bg-sage-soft"
          >
            Заказать сайт за «{fmt(final)} ₽»
          </a>
          <p className="mt-3 text-center text-xs text-white/50">
            Итог ориентировочный — точную смету посчитаем под вашу нишу.
          </p>
        </div>
      </div>
    </div>
  )
}