import './index.css'

/* Монограмма <C10> в стиле логотипа:
   угловые скобки — sage, C — navy, 10 — grey */
export function Mark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-mono font-extrabold leading-none tracking-tight ${className}`}>
      <span className="bracket">&lt;</span>
      <span className="text-ink">C</span>
      <span className="text-grey">10</span>
      <span className="bracket">&gt;</span>
    </span>
  )
}

/* Полный логотип (логотип из макета):
   <C10>  CODE10 | CUSTOM SOFTWARE & BOTS DEVELOPMENT
          STUDIO */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3">
      <Mark className="text-2xl" />

      {!compact && (
        <>
          <span className="flex flex-col leading-none">
            <span className="block font-sans text-[15px] font-bold tracking-[0.14em] text-ink">
              CODE10
            </span>
            <span className="mt-1 block font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-grey">
              Studio
            </span>
          </span>

          <span className="hidden h-9 w-px bg-edge md:block" aria-hidden />

          <span className="hidden font-sans text-[9px] font-medium uppercase leading-tight tracking-[0.16em] text-grey lg:block">
            <span className="block">Custom Software</span>
            <span className="block">&amp; Bots</span>
            <span className="block">Development</span>
          </span>
        </>
      )}
    </a>
  )
}