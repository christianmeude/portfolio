import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { PhoneFrame, MockDot } from './frames'

gsap.registerPlugin(useGSAP)

type Screen = 0 | 1 | 2

const SCREEN_TITLES = ['Session', 'Offline simulation', 'Reconnected'] as const

function StatusRow({ title, sub, right }: { title: string; sub: string; right: string }) {
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-card) p-3">
      <p className="text-[13px] font-semibold text-(--color-foreground)">{title}</p>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <p className="text-[11px] text-(--color-muted-foreground)">{sub}</p>
        <p className="text-[11px] font-semibold text-(--color-accent)">{right}</p>
      </div>
    </div>
  )
}

function EmuButton({
  children,
  onPress,
  primary = false,
}: {
  children: string
  onPress: () => void
  primary?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={
        primary
          ? 'inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full bg-(--color-accent) px-5 text-[13px] font-semibold text-(--color-on-accent)'
          : 'inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-full border border-(--color-border) px-5 text-[13px] font-semibold text-(--color-foreground)'
      }
    >
      {children}
    </button>
  )
}

/**
 * Nucleus Mobile Capstone as a navigable 3-screen emulator: session → offline
 * simulation → reconnect. Copy stays at the static scene's fidelity; the
 * offline leg is explicitly labelled simulated — local state only, no backend.
 */
export function NucleusEmu() {
  const [[screen, direction], setNav] = useState<[Screen, 1 | -1]>([0, 1])
  const frameRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const firstRender = useRef(true)

  const go = (next: Screen) => setNav([next, next > screen ? 1 : -1])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        screenRef.current,
        { x: 28 * direction, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
      )
    },
    { dependencies: [screen, direction], scope: frameRef },
  )

  // Keep keyboard focus inside the tour when the tapped button unmounts.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    titleRef.current?.focus({ preventScroll: true })
  }, [screen])

  return (
    <PhoneFrame label="Nucleus app interactive preview — simulated walkthrough" interactive>
      <div ref={frameRef} className="flex min-h-[420px] flex-col gap-3 sm:min-h-[450px]">
        <p aria-live="polite" className="sr-only">
          Screen {screen + 1} of 3: {SCREEN_TITLES[screen]}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-bold text-(--color-foreground)">Nucleus</p>
          {screen === 1 ? (
            <span className="inline-flex items-center rounded-full border border-(--color-border) px-2.5 py-1 text-[11px] font-semibold text-(--color-muted-foreground)">
              Simulated offline
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-muted) px-2.5 py-1 text-[11px] font-semibold text-(--color-foreground)">
              <MockDot className="size-1.5 bg-(--color-accent)" />
              Live sync
            </span>
          )}
        </div>

        <div ref={screenRef}>
          <p ref={titleRef} tabIndex={-1} className="sr-only">
            {SCREEN_TITLES[screen]}
          </p>
          {screen === 0 && (
            <div className="flex flex-col gap-3">
              <StatusRow title="Signed in" sub="Supabase auth session" right="Active" />
              <StatusRow title="Data sync" sub="Backed by Supabase" right="Synced" />
              <StatusRow title="Offline queue" sub="Tolerant UI, retries on reconnect" right="Empty" />
            </div>
          )}
          {screen === 1 && (
            <div className="flex flex-col gap-3">
              <StatusRow title="Signed in" sub="Supabase auth session" right="Active" />
              <StatusRow title="Data sync" sub="Paused until reconnect" right="Paused" />
              <StatusRow title="Offline queue" sub="2 changes waiting to retry" right="2 pending" />
            </div>
          )}
          {screen === 2 && (
            <div className="flex flex-col gap-3">
              <StatusRow title="Signed in" sub="Supabase auth session" right="Active" />
              <StatusRow title="Data sync" sub="Backed by Supabase" right="Synced" />
              <StatusRow title="Offline queue" sub="Retried on reconnect" right="Empty" />
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {screen === 0 && (
            <EmuButton primary onPress={() => go(1)}>
              Simulate going offline →
            </EmuButton>
          )}
          {screen === 1 && (
            <>
              <EmuButton primary onPress={() => go(2)}>
                Reconnect and retry
              </EmuButton>
              <EmuButton onPress={() => go(0)}>← Back to session</EmuButton>
            </>
          )}
          {screen === 2 && (
            <EmuButton onPress={() => go(0)}>↺ Restart walkthrough</EmuButton>
          )}
        </div>
      </div>
    </PhoneFrame>
  )
}
