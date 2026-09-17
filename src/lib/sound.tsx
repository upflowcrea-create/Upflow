import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

type SoundKind = 'hover' | 'click' | 'toggle-on' | 'whoosh'

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  play: (kind: SoundKind) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

function playTone(ctx: AudioContext, freq: number, start: number, duration: number, gain: number, type: OscillatorType = 'sine') {
  const osc = ctx.createOscillator()
  const amp = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start)
  amp.gain.setValueAtTime(0, ctx.currentTime + start)
  amp.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.01)
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration)
  osc.connect(amp)
  amp.connect(ctx.destination)
  osc.start(ctx.currentTime + start)
  osc.stop(ctx.currentTime + start + duration + 0.02)
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    return ctxRef.current
  }, [])

  const play = useCallback(
    (kind: SoundKind) => {
      if (!enabled) return
      const ctx = getCtx()
      switch (kind) {
        case 'hover':
          playTone(ctx, 1400, 0, 0.08, 0.03)
          break
        case 'click':
          playTone(ctx, 900, 0, 0.09, 0.05)
          playTone(ctx, 1800, 0.02, 0.08, 0.03)
          break
        case 'toggle-on':
          playTone(ctx, 660, 0, 0.12, 0.05)
          playTone(ctx, 990, 0.09, 0.16, 0.05)
          break
        case 'whoosh':
          playTone(ctx, 220, 0, 0.35, 0.02, 'sawtooth')
          break
      }
    },
    [enabled, getCtx],
  )

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      if (next) {
        const ctx = getCtx()
        playTone(ctx, 660, 0, 0.12, 0.05)
        playTone(ctx, 990, 0.09, 0.16, 0.05)
      }
      return next
    })
  }, [getCtx])

  return <SoundContext.Provider value={{ enabled, toggle, play }}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}
