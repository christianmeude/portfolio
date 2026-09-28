export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="w-full overflow-hidden border-y-[3px] border-[#0a0a0a] bg-black py-4 text-white">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {row.map((t, i) => (
              <span key={`${half}-${i}`} className="font-display mx-6 text-2xl font-bold uppercase tracking-wide">
                ★ {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
