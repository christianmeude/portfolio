import { useCallback, useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/projects'
import WorkCard from './WorkCard'

function CarouselArrow({ direction, onPress }: { direction: 'prev' | 'next'; onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={direction === 'prev' ? 'Previous project' : 'Next project'}
      className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-(--color-border) bg-(--color-card) transition-colors duration-200 hover:border-(--color-accent)"
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={direction === 'prev' ? 'M10 4l-4 4 4 4' : 'M6 4l4 4-4 4'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function Work() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const count = PROJECTS.length

  const slideTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const clamped = (index + count) % count
    const slide = track.children[clamped] as HTMLElement | undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    slide?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', inline: 'center', block: 'nearest' })
  }, [count])

  const onTrackKeyDown = (e: React.KeyboardEvent) => {
    const track = trackRef.current
    if (!track) return
    // Stacked (non-scrollable) on desktop: leave arrow keys to normal scrolling.
    if (track.scrollWidth <= track.clientWidth + 1) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      slideTo(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      slideTo(active - 1)
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth
        if (width > 0) {
          setActive(Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / width))))
        }
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [count])

  return (
    <section id="work" aria-labelledby="work-heading" className="section-pad">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="reveal text-sm font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
          Work
        </p>
        <div className="reveal mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 id="work-heading" className="font-display text-4xl font-bold sm:text-5xl">
            Projects with live code
          </h2>
          <div className="flex items-center gap-2 lg:hidden" role="group" aria-label="Carousel controls">
            <CarouselArrow direction="prev" onPress={() => slideTo(active - 1)} />
            <CarouselArrow direction="next" onPress={() => slideTo(active + 1)} />
          </div>
        </div>
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects. Use left and right arrow keys to move between projects."
          tabIndex={0}
          onKeyDown={onTrackKeyDown}
          data-lenis-prevent
          className="carousel reveal -mx-5 mt-10 flex gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:gap-12 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="carousel-slide min-w-full lg:min-w-0" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}: ${p.title}`}>
              <WorkCard project={p} index={String(i + 1).padStart(2, '0')} />
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 lg:hidden" role="group" aria-label="Choose project">
          {PROJECTS.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-current={i === active ? true : undefined}
              aria-label={`Show ${p.title}`}
              onClick={() => slideTo(i)}
              className={`inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
                i === active ? 'text-(--color-accent)' : 'text-(--color-muted-foreground)'
              }`}
            >
              <span aria-hidden="true" className={`mx-auto block size-2 rounded-full ${i === active ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`} />
            </button>
          ))}
        </div>
        <p aria-live="polite" className="sr-only">
          Showing project {active + 1} of {count}: {PROJECTS[active]?.title}
        </p>
      </div>
    </section>
  )
}
