import type { Theme } from '../hooks/useTheme'

interface Props {
  theme: Theme
  onToggle: () => void
}

export default function Header({ theme, onToggle }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-background)/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-(--color-accent) focus:px-4 focus:py-2 focus:text-(--color-on-accent)"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
          CM<span className="text-(--color-accent)">.</span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-3 text-sm font-medium sm:gap-5 sm:text-base">
          <a href="#work" className="flex min-h-[44px] items-center">
            Work
          </a>
          <a href="#stack" className="hidden min-h-[44px] items-center md:flex">
            Stack
          </a>
          <a href="#about" className="flex min-h-[44px] items-center">
            About
          </a>
          <a href="#contact" className="flex min-h-[44px] items-center">
            Contact
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border border-(--color-border) px-3 transition-colors duration-200 hover:border-(--color-accent)"
          >
            <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
            <span className="sr-only">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
