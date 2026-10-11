
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  MapPin,
  Music2,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'

const WEDDING_DATE = new Date('2026-12-06T18:20:00+05:30')

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Dhaneshwar%20Mangal%20Karylaye%2C%20Vangani%2C%20Maharashtra%2C%20India'

// Add your music file at: public/music/wedding.mp3
// const MUSIC_URL = '/1.mp3'

// Optional: replace this with the family's WhatsApp number.
const WHATSAPP_NUMBER = '91xxxxxxxx'

const photos = {
  hero: '/hero-bg.png',
  couple: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=90',
  flowers: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85',
  celebration: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=90',
}

const gold = '#C8B7A6'

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children, light = false }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <span className={`h-px w-9 ${light ? 'bg-[#C8B7A6]/60' : 'bg-[#5A728A]/50'}`} />
      <span
        className={`text-[9px] uppercase tracking-[0.32em] sm:text-[10px] ${
          light ? 'text-[#F6F1EB]' : 'text-[#5A728A]'
        }`}
      >
        {children}
      </span>
      <span className={`h-px w-9 ${light ? 'bg-[#C8B7A6]/60' : 'bg-[#5A728A]/50'}`} />
    </div>
  )
}

function IslamicArchCrest({ className = 'text-[#C8B7A6]' }) {
  return (
    <svg viewBox="0 0 80 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 2 C36 11 26 17 10 22 C4 24 0 26 0 30 L80 30 C80 26 76 24 70 22 C54 17 44 11 40 2 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="40" cy="16" r="3" fill="currentColor" />
      <path
        d="M40 7 L40 11 M40 21 L40 25 M33 16 L37 16 M43 16 L47 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ArabesqueCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 38 V14 C2 7.37 7.37 2 14 2 H38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 38 V16 C8 11.58 11.58 8 16 8 H38" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
      <path d="M14 6 V10 M14 18 V22 M6 14 H10 M18 14 H22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  )
}

function RubElHizbStar({ className = 'text-[#C8B7A6]', size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="5" width="14" height="14" stroke="currentColor" strokeWidth="1.2" rx="1" />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        stroke="currentColor"
        strokeWidth="1.2"
        rx="1"
        transform="rotate(45 12 12)"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

const COUNTDOWN_CONFIG = {
  Days: { ar: 'أَيَّام', en: 'DAYS' },
  Hours: { ar: 'سَاعَات', en: 'HOURS' },
  Minutes: { ar: 'دَقَائِق', en: 'MINUTES' },
  Seconds: { ar: 'ثَوَانِي', en: 'SECONDS' },
}

function Countdown() {
  const calculate = () => {
    const difference = Math.max(0, WEDDING_DATE.getTime() - Date.now())

    return {
      Days: Math.floor(difference / 86400000),
      Hours: Math.floor((difference / 3600000) % 24),
      Minutes: Math.floor((difference / 60000) % 60),
      Seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [remaining, setRemaining] = useState(calculate)

  useEffect(() => {
    const timer = setInterval(() => setRemaining(calculate()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5">
      {Object.entries(remaining).map(([label, value]) => {
        const config = COUNTDOWN_CONFIG[label] || { ar: '', en: label }
        const isSeconds = label === 'Seconds'

        return (
          <div
            key={label}
            className="group relative flex flex-col items-center overflow-hidden rounded-t-[40px] sm:rounded-t-[54px] rounded-b-2xl border border-[#C8B7A6]/55 bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F6F1EB] px-3 py-6 shadow-[0_12px_28px_-12px_rgba(200,183,166,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-12px_rgba(90,114,138,0.22)]"
          >
            {/* Inner architectural arched hairline */}
            <div className="pointer-events-none absolute inset-1.5 rounded-t-[34px] sm:rounded-t-[48px] rounded-b-xl border border-[#C8B7A6]/30" />

            {/* Arch Apex Finial Accent */}
            <div className="mb-1 flex items-center justify-center text-[#C8B7A6]">
              <RubElHizbStar size={13} className="opacity-75 transition-transform duration-500 group-hover:rotate-45" />
            </div>

            {/* Arabic Script Label */}
            <p className="font-arabic text-sm text-[#5A728A] tracking-wider">
              {config.ar}
            </p>

            {/* Animated Royal Number Display */}
            <div className="relative my-2 flex h-14 sm:h-16 items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: 14, opacity: 0, scale: 0.88 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -14, opacity: 0, scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="font-wedding text-4xl font-medium tracking-tight text-[#1A2A44] sm:text-5xl md:text-6xl"
                >
                  {String(value).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Subtle Divider */}
            <div className="my-1 h-px w-8 bg-[#C8B7A6]/45" />

            {/* English Label */}
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#5A728A] sm:text-[10px]">
              {config.en}
            </p>

            {/* Live Indicator on Seconds */}
            {isSeconds && (
              <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8B7A6] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5A728A]" />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function FloralDivider({ light = false }) {
  return (
    <div className="my-7 flex items-center justify-center gap-3 text-[#C8B7A6]">
      <span className={`h-px w-12 ${light ? 'bg-[#C8B7A6]/50' : 'bg-[#C8B7A6]/70'}`} />
      <Sparkles size={15} strokeWidth={1.2} />
      <span className={`h-px w-12 ${light ? 'bg-[#C8B7A6]/50' : 'bg-[#C8B7A6]/70'}`} />
    </div>
  )
}

function EnvelopeScene({ onOpen }) {
  // stages: idle → flapOpen → cardRise → cardBack → done
  const [stage, setStage] = useState('idle')
  const W = 340, H = 220, MID = 170, FLAP_H = 115

  const handleClick = () => {
    if (stage !== 'idle') return
    setStage('flapOpen')
    setTimeout(() => setStage('cardRise'), 700)
    setTimeout(() => setStage('cardBack'), 2200)
    setTimeout(() => setStage('done'), 3400)
    setTimeout(() => onOpen(), 3500)
  }

  const isOpen = stage !== 'idle'
  const cardRising = stage === 'cardRise'
  const cardBack = stage === 'cardBack' || stage === 'done'

  return (
    <>
      {/* envelope wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: stage === 'done' ? 0 : 1, y: stage === 'done' ? 30 : 0 }}
        transition={{ duration: stage === 'done' ? 0.5 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
      >
        <motion.div animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.3 }} style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Amiri, serif', fontSize: 22, color: '#5A728A', marginBottom: 4, letterSpacing: '0.05em' }}>بَارَكَ اللهُ لَكُمَا</p>
          <p style={{ fontSize: 8, letterSpacing: '0.32em', color: '#8E7966', textTransform: 'uppercase' }}>Bismillah-ir-Rahman-ir-Raheem</p>
        </motion.div>

        {/* ROPE + swinging envelope */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            animate={{ rotate: isOpen ? 0 : [0, 5, -5, 3, -3, 1, -1, 0] }}
            transition={{ duration: 4, repeat: isOpen ? 0 : Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* rope */}
            <svg width="16" height="50" viewBox="0 0 16 50" style={{ display: 'block' }}>
              {[0,1,2,3,4,5,6,7,8,9].map(i => (
                <line key={i} x1="8" y1={i*5} x2="8" y2={i*5+5} stroke={i%2===0?'#A89684':'#C8B7A6'} strokeWidth="3" strokeLinecap="round" />
              ))}
              <circle cx="8" cy="3" r="4" fill="#C8B7A6" />
            </svg>

            <div onClick={handleClick} style={{ width: W, height: H, position: 'relative', cursor: stage === 'idle' ? 'pointer' : 'default', perspective: 1000 }}>

              {/* CARD */}
              <motion.div
                animate={
                  cardBack
                    ? { y: 0, scale: 1, opacity: 0, transition: { duration: 0.9, ease: [0.4, 0, 0.6, 1] } }
                    : cardRising
                    ? { y: -150, scale: 1, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
                    : { y: 0, scale: 1, opacity: 0, transition: { duration: 0.3 } }
                }
                style={{ position: 'absolute', left: 28, right: 28, top: 20, bottom: 20, zIndex: 20, transformStyle: 'preserve-3d' }}
              >
            {/* front face */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              background: 'linear-gradient(150deg,#FFFFFF,#FBF8F4)',
              border: '1px solid rgba(200,183,166,0.7)',
              boxShadow: '0 12px 35px rgba(90,114,138,0.18)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '16px 20px',
            }}>
              <div style={{ position: 'absolute', inset: 7, border: '1px solid rgba(200,183,166,0.35)', pointerEvents: 'none' }} />
              <Sparkles size={14} strokeWidth={1.2} style={{ color: '#5A728A' }} />
              <p style={{ fontSize: 8, letterSpacing: '0.3em', color: '#5A728A', textTransform: 'uppercase' }}>Nikkah Invitation</p>
              <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 26, color: '#1A2A44', lineHeight: 1.1, textAlign: 'center' }}>
                Tuba <span style={{ color: '#C8B7A6', fontStyle: 'italic' }}>&amp;</span> Mahafuz
              </p>
              <div style={{ width: 40, height: 1, background: 'rgba(200,183,166,0.6)' }} />
              <p style={{ fontSize: 8, letterSpacing: '0.22em', color: '#5A728A', textTransform: 'uppercase' }}>06 · 12 · 2026</p>
            </div>
            {/* back face */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(145deg,#F6F1EB,#EDE5D8)',
              border: '1px solid rgba(200,183,166,0.5)',
              boxShadow: '0 12px 35px rgba(90,114,138,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(200,183,166,0.3)' }} />
              <Heart size={26} strokeWidth={1} style={{ color: '#5A728A' }} />
            </div>
          </motion.div>

          {/* envelope body */}
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            <defs>
              <linearGradient id="eB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5D0000" />
                <stop offset="50%" stopColor="#550000" />
                <stop offset="100%" stopColor="#430000" />
              </linearGradient>
              <linearGradient id="eL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4B0000" /><stop offset="100%" stopColor="#5C0000" /></linearGradient>
              <linearGradient id="eR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5C0000" /><stop offset="100%" stopColor="#4B0000" /></linearGradient>
              <linearGradient id="eBt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4D0000" /><stop offset="100%" stopColor="#350000" /></linearGradient>
              <linearGradient id="goldShine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E7D4B3" />
                <stop offset="40%" stopColor="#F7EAD7" />
                <stop offset="60%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E7D4B3" />
              </linearGradient>
              {/* Islamic 8-pointed star tessellation */}
              <pattern id="geo" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <polygon points="16,1 19.2,11 29.5,11 21.5,17.5 24.5,27.5 16,21.5 7.5,27.5 10.5,17.5 2.5,11 12.8,11"
                  fill="none" stroke="rgba(200,183,166,0.3)" strokeWidth="0.7" />
                <circle cx="16" cy="16" r="3" fill="none" stroke="rgba(200,183,166,0.2)" strokeWidth="0.5" />
                <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(200,183,166,0.12)" strokeWidth="0.4" />
                <line x1="16" y1="0" x2="16" y2="32" stroke="rgba(200,183,166,0.12)" strokeWidth="0.4" />
                <line x1="0" y1="0" x2="32" y2="32" stroke="rgba(200,183,166,0.08)" strokeWidth="0.4" />
                <line x1="32" y1="0" x2="0" y2="32" stroke="rgba(200,183,166,0.08)" strokeWidth="0.4" />
                <circle cx="0" cy="0" r="2" fill="none" stroke="rgba(200,183,166,0.15)" strokeWidth="0.5" />
                <circle cx="32" cy="0" r="2" fill="none" stroke="rgba(200,183,166,0.15)" strokeWidth="0.5" />
                <circle cx="0" cy="32" r="2" fill="none" stroke="rgba(200,183,166,0.15)" strokeWidth="0.5" />
                <circle cx="32" cy="32" r="2" fill="none" stroke="rgba(200,183,166,0.15)" strokeWidth="0.5" />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* base body */}
            <rect x="0" y="0" width={W} height={H} fill="url(#eB)" />
            {/* tessellation overlay */}
            <rect x="0" y="0" width={W} height={H} fill="url(#geo)" />

            {/* side + bottom flap shading */}
            <polygon points={`0,0 0,${H} ${MID},${H*0.56}`} fill="url(#eL)" opacity="0.35" />
            <polygon points={`${W},0 ${W},${H} ${MID},${H*0.56}`} fill="url(#eR)" opacity="0.35" />
            <polygon points={`0,${H} ${W},${H} ${MID},${H*0.56}`} fill="url(#eBt)" opacity="0.45" />

            {/* outer gold shimmer border */}
            <rect x="0" y="0" width={W} height={H} fill="none" stroke="url(#goldShine)" strokeWidth="1.5" />
            {/* inner border */}
            <rect x="7" y="7" width={W-14} height={H-14} fill="none" stroke="rgba(200,183,166,0.45)" strokeWidth="0.7" />
            <rect x="12" y="12" width={W-24} height={H-24} fill="none" stroke="rgba(200,183,166,0.25)" strokeWidth="0.5" />

            {/* corner arabesque ornaments */}
            <g stroke="url(#goldShine)" strokeWidth="1.2" fill="none" filter="url(#glow)">
              {/* top-left */}
              <path d="M7,22 L7,7 L22,7" />
              <path d="M7,14 Q14,7 22,7" strokeWidth="0.6" opacity="0.6" />
              <circle cx="7" cy="7" r="2.5" fill="rgba(200,183,166,0.5)" stroke="none" />
              {/* top-right */}
              <path d={`M${W-7},22 L${W-7},7 L${W-22},7`} />
              <path d={`M${W-7},14 Q${W-14},7 ${W-22},7`} strokeWidth="0.6" opacity="0.6" />
              <circle cx={W-7} cy={7} r="2.5" fill="rgba(200,183,166,0.5)" stroke="none" />
              {/* bottom-left */}
              <path d={`M7,${H-22} L7,${H-7} L22,${H-7}`} />
              <path d={`M7,${H-14} Q14,${H-7} 22,${H-7}`} strokeWidth="0.6" opacity="0.6" />
              <circle cx="7" cy={H-7} r="2.5" fill="rgba(200,183,166,0.5)" stroke="none" />
              {/* bottom-right */}
              <path d={`M${W-7},${H-22} L${W-7},${H-7} L${W-22},${H-7}`} />
              <path d={`M${W-7},${H-14} Q${W-14},${H-7} ${W-22},${H-7}`} strokeWidth="0.6" opacity="0.6" />
              <circle cx={W-7} cy={H-7} r="2.5" fill="rgba(200,183,166,0.5)" stroke="none" />
            </g>

            {/* بَارَكَ اللهُ لَكُمَا — bottom center */}
            <text
              x={MID} y={H - 18}
              textAnchor="middle"
              fontFamily="Amiri, serif"
              fontSize="13"
              fill="#F6EDE3"
              letterSpacing="1"
            >
              بَارَكَ اللهُ لَكُمَا
            </text>
          </svg>

          {/* flap — Arabic pointed arch */}
          <motion.div
            animate={{ rotateX: isOpen ? -178 : 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', top: 0, left: 0, width: W, transformOrigin: 'top center', transformStyle: 'preserve-3d', zIndex: 6 }}
          >
            <svg width={W} height={FLAP_H} viewBox={`0 0 ${W} ${FLAP_H}`} style={{ display: 'block' }}>
              <defs>
                <linearGradient id="fF" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5D0000" />
                  <stop offset="100%" stopColor="#430000" />
                </linearGradient>
                <linearGradient id="fB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5C0000" />
                  <stop offset="100%" stopColor="#3D0000" />
                </linearGradient>
                <linearGradient id="fGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E7D4B3" />
                  <stop offset="50%" stopColor="#F7EAD7" />
                  <stop offset="100%" stopColor="#E7D4B3" />
                </linearGradient>
                <pattern id="geoF" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <polygon points="16,1 19.2,11 29.5,11 21.5,17.5 24.5,27.5 16,21.5 7.5,27.5 10.5,17.5 2.5,11 12.8,11"
                    fill="none" stroke="rgba(200,183,166,0.3)" strokeWidth="0.7" />
                  <circle cx="16" cy="16" r="3" fill="none" stroke="rgba(200,183,166,0.18)" strokeWidth="0.5" />
                </pattern>
                <clipPath id="flapClip">
                  <polygon points={`0,0 ${W},0 ${MID},${FLAP_H}`} />
                </clipPath>
              </defs>

              {/* front face */}
              <polygon points={`0,0 ${W},0 ${MID},${FLAP_H}`} fill="url(#fF)" style={{ backfaceVisibility: 'hidden' }} />
              <rect x="0" y="0" width={W} height={FLAP_H} fill="url(#geoF)" clipPath="url(#flapClip)" style={{ backfaceVisibility: 'hidden' }} />

              {/* Arabic pointed arch on flap front */}
              <path
                d={`M ${MID-44},${FLAP_H*0.22} C ${MID-44},${FLAP_H*0.0} ${MID-10},${FLAP_H*0.0} ${MID},${FLAP_H*0.1} C ${MID+10},${FLAP_H*0.0} ${MID+44},${FLAP_H*0.0} ${MID+44},${FLAP_H*0.22} L ${MID+30},${FLAP_H*0.48} L ${MID},${FLAP_H*0.62} L ${MID-30},${FLAP_H*0.48} Z`}
                fill="none" stroke="url(#fGold)" strokeWidth="1"
                style={{ backfaceVisibility: 'hidden' }}
              />
              {/* small diamond at arch tip */}
              <polygon
                points={`${MID},${FLAP_H*0.04} ${MID+5},${FLAP_H*0.1} ${MID},${FLAP_H*0.16} ${MID-5},${FLAP_H*0.1}`}
                fill="rgba(200,183,166,0.7)" stroke="none"
                style={{ backfaceVisibility: 'hidden' }}
              />

              {/* gold top edge */}
              <line x1="0" y1="1" x2={W} y2="1" stroke="url(#fGold)" strokeWidth="1.5" style={{ backfaceVisibility: 'hidden' }} />

              {/* back face ivory */}
              <polygon points={`0,0 ${W},0 ${MID},${FLAP_H}`} fill="url(#fB)" stroke="rgba(200,183,166,0.4)" strokeWidth="0.8"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', transformOrigin: `${MID}px 0px` }} />
            </svg>
          </motion.div>

          {/* wax seal */}
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.2 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* outer glow ring */}
            <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px solid rgba(200,183,166,0.45)', boxShadow: '0 0 16px rgba(200,183,166,0.25)' }} />
              <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', border: '1px solid rgba(200,183,166,0.65)' }} />
              <div style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'radial-gradient(circle at 32% 28%, #728DA7, #485E75)',
                border: '1.5px solid rgba(246,241,235,0.95)',
                boxShadow: '0 6px 20px rgba(90,114,138,0.35), inset 0 1px 3px rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="44" height="44" viewBox="0 0 44 44">
                  {/* crescent */}
                  <path d="M22,5 A17,17 0 1,0 22,39 A12,12 0 1,1 22,5 Z" fill="#F6F1EB" />
                  {/* 5-pointed star */}
                  <polygon
                    points="32,12 33.5,17 38.5,17 34.5,20 36,25 32,22 28,25 29.5,20 25.5,17 30.5,17"
                    fill="#F6F1EB"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
            </div>
          </motion.div>
        </div>

        {/* TAP HINT */}
        <motion.p
          animate={{ opacity: isOpen ? 0 : [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.2, repeat: isOpen ? 0 : Infinity }}
          style={{ fontSize: 8, letterSpacing: '0.28em', color: '#5A728A', textTransform: 'uppercase' }}
        >
          Tap to open
        </motion.p>
      </motion.div>
    </>
  )
}

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicError, setMusicError] = useState(false)
  const [copied, setCopied] = useState(false)
  const audioRef = useRef(null)

  // useEffect(() => {
  //   const audio = new Audio(MUSIC_URL)
  //   audio.loop = true
  //   audio.volume = 0.35
  //   audioRef.current = audio

  //   return () => {
  //     audio.pause()
  //     audioRef.current = null
  //   }
  // }, [])

  // const toggleMusic = async () => {
  //   const audio = audioRef.current
  //   if (!audio) return

  //   if (musicPlaying) {
  //     audio.pause()
  //     setMusicPlaying(false)
  //     return
  //   }

  //   try {
  //     setMusicError(false)
  //     await audio.play()
  //     setMusicPlaying(true)
  //   } catch {
  //     setMusicError(true)
  //     setMusicPlaying(false)
  //   }
  // }

  const rsvpUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Assalamu Alaikum! I would like to RSVP for the Nikkah of Tuba Mujawar and Mahafuz Khan on 6 December 2026.',
  )}`

  const shareInvitation = async () => {
    const shareData = {
      title: 'Tuba & Mahafuz Khan | Nikkah Invitation',
      text: 'You are cordially invited to celebrate the Nikkah of Tuba Mujawar and Mahafuz Khan on 6 December 2026.',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // The visitor may simply close the native share menu.
    }
  }

  return (
    <main className="w-full overflow-hidden bg-[#F6F1EB] text-[#1A2A44]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Amiri:wght@400;700&display=swap');

        .font-wedding {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .font-arabic {
          font-family: 'Amiri', 'Traditional Arabic', serif;
        }

        .font-body-wedding {
          font-family: 'DM Sans', sans-serif;
        }

        .wedding-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .gold-shimmer {
          background: linear-gradient(110deg, #A89684 10%, #E8E0D7 35%, #C8B7A6 55%, #F6F1EB 75%, #A89684 90%);
          background-size: 220% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 6s linear infinite;
        }

        @keyframes shimmer {
          to { background-position: 220% center; }
        }

        @keyframes petalFall {
          0% { transform: translate3d(0,-12vh,0) rotate(0deg); opacity: 0; }
          12% { opacity: .65; }
          85% { opacity: .55; }
          100% { transform: translate3d(35px,105vh,0) rotate(330deg); opacity: 0; }
        }

        @keyframes gentleFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes breathe {
          0%,100% { opacity: .5; }
          50% { opacity: 1; }
        }

        .falling-petal {
          position: absolute;
          top: -30px;
          width: 9px;
          height: 13px;
          border-radius: 90% 5% 90% 5%;
          background: linear-gradient(145deg, #F6F1EB, #C8B7A6);
          animation: petalFall linear infinite;
          pointer-events: none;
        }

        .gentle-float { animation: gentleFloat 5s ease-in-out infinite; }
        .soft-breathe { animation: breathe 3s ease-in-out infinite; }

        .royal-frame::before,
        .royal-frame::after {
          content: '';
          position: absolute;
          inset: 13px;
          border: 1px solid rgba(200, 183, 166, .45);
          pointer-events: none;
        }

        .royal-frame::after {
          inset: 19px;
          border-color: rgba(200, 183, 166, .2);
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* ENVELOPE COVER */}
      <AnimatePresence>
        {!invitationOpen && (
          <motion.section
            key="envelope-cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F6F1EB 50%, #ECE3D6 100%)' }}
          >
            {/* bg petals */}
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="falling-petal" style={{ left: `${(i * 37 + 5) % 100}%`, animationDelay: `${(i % 7) * -1.8}s`, animationDuration: `${12 + (i % 6) * 2}s` }} />
            ))}

            <EnvelopeScene onOpen={() => {
              setInvitationOpen(true)
              audioRef.current?.play().then(() => setMusicPlaying(true)).catch(() => {})
            }} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* FLOATING MUSIC CONTROL */}
      {/* <button
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Pause wedding music' : 'Play wedding music'}
        title={musicError ? 'Add public/music/wedding.mp3 to enable music' : 'Toggle wedding music'}
        className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full border border-[#C8B7A6]/60 bg-[#FFFFFF]/95 px-4 text-[#1A2A44] shadow-xl backdrop-blur-md transition hover:bg-[#F6F1EB] sm:bottom-7 sm:right-7"
      >
        {musicPlaying ? <Pause size={15} /> : <Music2 size={16} />}
        <span className="text-[9px] uppercase tracking-[0.17em]">
          {musicPlaying ? 'Pause music' : 'Play music'}
        </span>
        {musicPlaying && <Volume2 size={14} className="soft-breathe" />}
        {musicError && <VolumeX size={14} />}
      </button> */}

      {/* NAVIGATION */}
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          <a href="#home" className="font-wedding text-2xl italic text-[#1A2A44]">
            T <span className="text-[#C8B7A6]">&amp;</span> M
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {[
              ['Our Families', '#families'],
              ['The Nikkah', '#occasion'],
              ['Haldi & Mehndi', '#mehndi'],
              ['The Venue', '#venue'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[9px] uppercase tracking-[0.19em] text-[#1A2A44]/75 transition hover:text-[#5A728A]"
              >
                {label}
              </a>
            ))}
            <a
              href="#rsvp"
              className="border border-[#C8B7A6] bg-[#FFFFFF]/80 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-[#1A2A44] shadow-sm transition hover:bg-[#C8B7A6] hover:text-[#1A2A44]"
            >
              Join us
            </a>
          </div>
          <a
            href="#rsvp"
            className="border border-[#C8B7A6] bg-[#FFFFFF]/80 px-4 py-2.5 text-[9px] uppercase tracking-[0.17em] text-[#1A2A44]"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="royal-frame relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#F6F1EB]"
      >
        <img
          src={photos.hero}
          alt="An elegant wedding celebration"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F6F1EB]/15 to-[#F6F1EB]" />
        <div className="wedding-grain absolute inset-0 opacity-10" />

        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="falling-petal"
            style={{
              left: `${(i * 43 + 8) % 100}%`,
              animationDelay: `${(i % 6) * -2.1}s`,
              animationDuration: `${14 + (i % 5) * 2}s`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-28 text-center text-[#1A2A44]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 flex justify-center text-[#C8B7A6]"
          >
            <Sparkles size={27} strokeWidth={1} />
          </motion.div>

          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#5A728A] sm:text-xs">
            With the blessings of Allah &amp; our families
          </p>

          <h1 className="font-wedding text-[clamp(4.8rem,15vw,10rem)] leading-[0.78] tracking-[-0.045em] text-[#1A2A44]">
            Tuba
          </h1>
          <div className="my-5 flex items-center justify-center gap-5 sm:my-7">
            <span className="h-px w-12 bg-[#C8B7A6]/70 sm:w-24" />
            <span className="gold-shimmer font-wedding text-5xl italic sm:text-7xl">
              &amp;
            </span>
            <span className="h-px w-12 bg-[#C8B7A6]/70 sm:w-24" />
          </div>
          <h2 className="font-wedding text-[clamp(3.6rem,12vw,8rem)] leading-[0.85] tracking-[-0.04em] text-[#1A2A44]">
            Mahafuz Khan
          </h2>

          <FloralDivider light />

          <p className="font-wedding text-2xl italic text-[#1A2A44]/90 sm:text-3xl">
            Two hearts, one beautiful promise.
          </p>
          <p className="mt-3 text-[9px] uppercase tracking-[0.28em] text-[#5A728A] sm:text-[10px]">
            We invite you to our Nikkah
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[10px] tracking-[0.15em] text-[#1A2A44] sm:text-xs">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#5A728A]" />
              Sunday, 06 December 2026
            </span>
            <span className="hidden h-4 w-px bg-[#C8B7A6]/60 sm:block" />
            <span className="flex items-center gap-2">
              <Clock3 size={15} className="text-[#5A728A]" />
              6:20 PM
            </span>
          </div>

          <motion.a
            whileHover={{ y: -3 }}
            href="#families"
            className="mt-10 inline-flex items-center gap-3 border border-[#C8B7A6] bg-[#C8B7A6] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#1A2A44] shadow-sm transition hover:bg-[#DDD0C2]"
          >
            Explore the invitation
            <ArrowDown size={14} />
          </motion.a>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-[#5A728A] sm:flex">
          <span className="h-8 w-px bg-[#C8B7A6]/60" />
          A new chapter begins
        </div>
      </section>

      {/* OPENING MESSAGE */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="pointer-events-none absolute -left-28 top-12 h-64 w-64 rounded-full border border-[#C8B7A6]/25" />
        <div className="pointer-events-none absolute -right-28 bottom-4 h-72 w-72 rounded-full border border-[#C8B7A6]/25" />

        <Reveal>
          <SectionLabel>A blessed beginning</SectionLabel>
          <h2 className="mx-auto max-w-3xl font-wedding text-4xl leading-tight text-[#1A2A44] sm:text-6xl">
            In the name of Allah,
            <br />
            <span className="italic text-[#5A728A]">
              the Most Merciful
            </span>
          </h2>
          <FloralDivider />
          <p className="mx-auto max-w-2xl text-sm leading-8 text-[#5A728A]">
            Alhamdulillah, with grateful hearts and the blessings of our
            families, we are beginning a beautiful new chapter together.
            Your presence and duas would make this special day even more
            meaningful to us.
          </p>
          <p className="mt-7 font-wedding text-2xl italic text-[#1A2A44]">
            It would be our honour to celebrate with you.
          </p>
        </Reveal>
      </section>

      {/* FAMILY BLESSINGS */}
      <section id="families" className="relative bg-[#F3EDE4] px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,183,166,0.22),transparent_65%)]" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-3 text-center font-arabic text-xl sm:text-2xl text-[#5A728A]">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </div>
            <SectionLabel>Our roots, our blessings</SectionLabel>
            <h2 className="text-center font-wedding text-5xl leading-tight text-[#1A2A44] sm:text-7xl">
              With The Blessings
              <br />
              <span className="italic text-[#5A728A]">Of Their Families</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-7 text-[#5A728A] sm:text-sm">
              Two families joined by faith, love, and the sacred promise
              of a lifetime together.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* THE BRIDE CARD */}
            <Reveal delay={0.08}>
              <article className="group relative flex h-full flex-col items-center rounded-t-[80px] sm:rounded-t-[110px] rounded-b-3xl border border-[#C8B7A6]/60 bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#FFFFFF] px-6 py-12 text-center shadow-[0_15px_35px_-12px_rgba(200,183,166,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-15px_rgba(90,114,138,0.2)] sm:px-10 sm:py-16">
                {/* Inner Arched Hairline Frame */}
                <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-t-[70px] sm:rounded-t-[98px] rounded-b-2xl border border-[#C8B7A6]/30" />

                {/* Arabesque Corners on bottom */}
                <div className="pointer-events-none absolute bottom-5 left-5 text-[#C8B7A6]/50">
                  <ArabesqueCorner className="h-6 w-6" />
                </div>
                <div className="pointer-events-none absolute bottom-5 right-5 text-[#C8B7A6]/50 -scale-x-100">
                  <ArabesqueCorner className="h-6 w-6" />
                </div>

                {/* Top Royal Dome Finial Crest */}
                <div className="relative -mt-2 mb-3 flex items-center justify-center">
                  <IslamicArchCrest className="h-9 w-24 text-[#C8B7A6]" />
                </div>

                {/* Arabic Calligraphy: Al-'Aroos (The Bride) */}
                <p className="font-arabic text-3xl sm:text-4xl text-[#5A728A] tracking-wider">
                  العَرُوس
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C8B7A6]">
                  The Bride
                </p>

                {/* Bride's Name */}
                <h3 className="mt-5 font-wedding text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#1A2A44]">
                  Tuba Mujawar
                </h3>

                {/* Royal Star Divider */}
                <div className="my-6 flex items-center justify-center gap-3 text-[#C8B7A6]">
                  <span className="h-px w-10 bg-[#C8B7A6]/50" />
                  <RubElHizbStar size={16} />
                  <span className="h-px w-10 bg-[#C8B7A6]/50" />
                </div>

                {/* Lineage */}
                <p className="font-wedding text-xl italic text-[#5A728A]">
                  Daughter of
                </p>

                <p className="mt-3 font-wedding text-2xl sm:text-3xl text-[#1A2A44] tracking-wide">
                  Sajid Mujawar
                </p>

                <div className="my-1.5 flex items-center justify-center gap-2 text-[#C8B7A6]">
                  <span className="h-px w-4 bg-[#C8B7A6]/40" />
                  <span className="font-wedding text-xl italic text-[#C8B7A6]">&amp;</span>
                  <span className="h-px w-4 bg-[#C8B7A6]/40" />
                </div>

                <p className="font-wedding text-2xl sm:text-3xl text-[#1A2A44] tracking-wide">
                  Shabana Mujawar
                </p>

                {/* Islamic Blessing Footer */}
                <div className="mt-8 pt-6 border-t border-[#C8B7A6]/30 w-full">
                  <p className="font-arabic text-lg sm:text-xl text-[#5A728A]">
                    بَارَكَ اللهُ لَهَا وَعَلَيْهَا
                  </p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.26em] text-[#C8B7A6]">
                    With love and duas
                  </p>
                </div>
              </article>
            </Reveal>

            {/* THE GROOM CARD */}
            <Reveal delay={0.18}>
              <article className="group relative flex h-full flex-col items-center rounded-t-[80px] sm:rounded-t-[110px] rounded-b-3xl border border-[#C8B7A6]/60 bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#FFFFFF] px-6 py-12 text-center shadow-[0_15px_35px_-12px_rgba(200,183,166,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-15px_rgba(90,114,138,0.2)] sm:px-10 sm:py-16">
                {/* Inner Arched Hairline Frame */}
                <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-t-[70px] sm:rounded-t-[98px] rounded-b-2xl border border-[#C8B7A6]/30" />

                {/* Arabesque Corners on bottom */}
                <div className="pointer-events-none absolute bottom-5 left-5 text-[#C8B7A6]/50">
                  <ArabesqueCorner className="h-6 w-6" />
                </div>
                <div className="pointer-events-none absolute bottom-5 right-5 text-[#C8B7A6]/50 -scale-x-100">
                  <ArabesqueCorner className="h-6 w-6" />
                </div>

                {/* Top Royal Dome Finial Crest */}
                <div className="relative -mt-2 mb-3 flex items-center justify-center">
                  <IslamicArchCrest className="h-9 w-24 text-[#C8B7A6]" />
                </div>

                {/* Arabic Calligraphy: Al-'Arees (The Groom) */}
                <p className="font-arabic text-3xl sm:text-4xl text-[#5A728A] tracking-wider">
                  العَرِيس
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C8B7A6]">
                  The Groom
                </p>

                {/* Groom's Name */}
                <h3 className="mt-5 font-wedding text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#1A2A44]">
                  Mahafuz Khan
                </h3>

                {/* Royal Star Divider */}
                <div className="my-6 flex items-center justify-center gap-3 text-[#C8B7A6]">
                  <span className="h-px w-10 bg-[#C8B7A6]/50" />
                  <RubElHizbStar size={16} />
                  <span className="h-px w-10 bg-[#C8B7A6]/50" />
                </div>

                {/* Lineage */}
                <p className="font-wedding text-xl italic text-[#5A728A]">
                  Son of
                </p>

                <p className="mt-3 font-wedding text-2xl sm:text-3xl text-[#1A2A44] tracking-wide">
                  Raza Khan
                </p>

                <div className="my-1.5 flex items-center justify-center gap-2 text-[#C8B7A6]">
                  <span className="h-px w-4 bg-[#C8B7A6]/40" />
                  <span className="font-wedding text-xl italic text-[#C8B7A6]">&amp;</span>
                  <span className="h-px w-4 bg-[#C8B7A6]/40" />
                </div>

                <p className="font-wedding text-2xl sm:text-3xl text-[#1A2A44] tracking-wide">
                  Shahanabano Khan
                </p>

                {/* Islamic Blessing Footer */}
                <div className="mt-8 pt-6 border-t border-[#C8B7A6]/30 w-full">
                  <p className="font-arabic text-lg sm:text-xl text-[#5A728A]">
                    بَارَكَ اللهُ لَهُ وَعَلَيْهِ
                  </p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.26em] text-[#C8B7A6]">
                    With love and duas
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE OCCASION */}
      <section id="occasion" className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mb-3 text-center font-arabic text-2xl sm:text-3xl text-[#5A728A]">
              عَقْدُ النِّكَاحِ المُبَارَك
            </div>
            <SectionLabel>The occasion</SectionLabel>
            <h2 className="font-wedding text-6xl text-[#1A2A44] sm:text-8xl">
              The Nikkah
            </h2>
            <p className="mt-3 font-wedding text-2xl italic text-[#5A728A] sm:text-3xl">
              A sacred promise made with love, honor and faith.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-12 rounded-3xl border-2 border-[#C8B7A6]/60 bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F8F3EC] p-6 shadow-[0_20px_50px_-15px_rgba(200,183,166,0.35)] sm:mt-16 sm:p-12">
              {/* Inner Frame */}
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#C8B7A6]/30 sm:inset-5" />

              {/* Corner Arabesques */}
              <div className="pointer-events-none absolute left-5 top-5 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>
              <div className="pointer-events-none absolute right-5 top-5 -scale-x-100 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 -scale-y-100 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>
              <div className="pointer-events-none absolute bottom-5 right-5 -scale-x-100 -scale-y-100 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>

              {/* Top Bismillah in Card */}
              <div className="relative mb-8 text-center">
                <p className="font-arabic text-xl sm:text-2xl text-[#5A728A]">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <div className="mx-auto mt-2 h-px w-16 bg-[#C8B7A6]/50" />
              </div>

              {/* 3 Royal Portals */}
              <div className="relative grid items-center gap-4 sm:grid-cols-3 sm:gap-6">
                {/* PORTAL 1: DAY */}
                <div className="flex flex-col items-center rounded-t-[36px] sm:rounded-t-[48px] rounded-b-2xl border border-[#C8B7A6]/40 bg-[#FAF7F2]/90 p-6 shadow-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C8B7A6]/60 bg-white text-[#5A728A] shadow-sm">
                    <CalendarDays size={20} strokeWidth={1.3} />
                  </div>
                  <p className="font-arabic text-sm text-[#5A728A]">
                    يَوْمُ الأَحَد
                  </p>
                  <p className="mt-1 font-wedding text-3xl sm:text-4xl font-medium text-[#1A2A44]">
                    Sunday
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#C8B7A6] font-semibold">
                    The Blessed Day
                  </p>
                </div>

                {/* PORTAL 2: HERO DATE JEWEL */}
                <div className="relative -my-2 flex flex-col items-center rounded-t-[48px] sm:rounded-t-[65px] rounded-b-2xl border-2 border-[#C8B7A6]/70 bg-gradient-to-b from-white via-[#FAF7F2] to-[#F6F1EB] p-7 sm:p-9 shadow-[0_16px_36px_-12px_rgba(200,183,166,0.35)]">
                  {/* Top Arch Crest */}
                  <div className="-mt-3 mb-2">
                    <IslamicArchCrest className="h-8 w-20 text-[#C8B7A6]" />
                  </div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#5A728A]">
                    Wedding Date
                  </p>

                  {/* Monumental Date Digit */}
                  <p className="mt-1 font-wedding text-6xl sm:text-8xl font-semibold tracking-tight text-[#1A2A44] leading-none">
                    06
                  </p>

                  <p className="mt-2 font-wedding text-xl sm:text-2xl font-semibold tracking-[0.2em] text-[#5A728A] uppercase">
                    December 2026
                  </p>

                  <p className="mt-1 font-arabic text-sm text-[#C8B7A6] tracking-wide">
                    ٢٦ جُمَادَىٰ الآخِرَة ١٤٤٨ هـ
                  </p>
                </div>

                {/* PORTAL 3: AUSPICIOUS TIME */}
                <div className="flex flex-col items-center rounded-t-[36px] sm:rounded-t-[48px] rounded-b-2xl border border-[#C8B7A6]/40 bg-[#FAF7F2]/90 p-6 shadow-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C8B7A6]/60 bg-white text-[#5A728A] shadow-sm">
                    <Clock3 size={20} strokeWidth={1.3} />
                  </div>
                  <p className="font-arabic text-sm text-[#5A728A]">
                    وَقْتُ النِّكَاح
                  </p>
                  <p className="mt-1 font-wedding text-3xl sm:text-4xl font-medium text-[#1A2A44]">
                    6:20 PM
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#C8B7A6] font-semibold">
                    Evening Ceremony
                  </p>
                </div>
              </div>

              {/* Royal Venue Footer */}
              <div className="mt-10 pt-8 border-t border-[#C8B7A6]/35 text-center">
                <div className="mb-3 inline-flex items-center justify-center gap-2 text-[#5A728A]">
                  <MapPin size={17} className="text-[#C8B7A6]" />
                  <span className="font-wedding text-2xl text-[#1A2A44] sm:text-3xl">
                    Dnyaneshwar Mangal Karyalaya
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#5A728A]">
                  Vangani, Maharashtra — Mumbai, India
                </p>

                <div className="mt-5">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#C8B7A6]/70 bg-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1A2A44] shadow-sm transition hover:bg-[#F6F1EB] hover:shadow-md"
                  >
                    <span>View Venue on Google Maps</span>
                    <ArrowUpRight size={13} className="text-[#5A728A]" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HALDI & MEHNDI */}
      <section id="mehndi" className="relative px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mb-3 text-center font-arabic text-2xl text-[#5A728A] sm:text-3xl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <SectionLabel>Join us in celebration</SectionLabel>
            <h2 className="font-wedding text-5xl text-[#1A2A44] sm:text-7xl">
              Haldi &amp; Mehndi
            </h2>
            <p className="mt-3 font-wedding text-2xl italic text-[#5A728A] sm:text-3xl">
              A joyful gathering filled with love, laughter and blessings.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-12 rounded-3xl border-2 border-[#C8B7A6]/60 bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F8F3EC] p-6 shadow-[0_20px_50px_-15px_rgba(200,183,166,0.35)] sm:mt-16 sm:p-12">
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#C8B7A6]/30 sm:inset-5" />

              <div className="pointer-events-none absolute left-5 top-5 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>
              <div className="pointer-events-none absolute right-5 top-5 -scale-x-100 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 -scale-y-100 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>
              <div className="pointer-events-none absolute bottom-5 right-5 -scale-x-100 -scale-y-100 text-[#C8B7A6]/40">
                <ArabesqueCorner className="h-6 w-6" />
              </div>

              <div className="relative">
                <p className="font-wedding text-2xl italic text-[#5A728A] sm:text-3xl">
                  Assalamu Alaikum!
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#1A2A44]/80 sm:text-base sm:leading-8">
                  By the grace of Allah (SWT), we invite you to join us in
                  celebrating the Haldi &amp; Mehndi function of our dear
                </p>
                <h3 className="mt-2 font-wedding text-5xl font-medium text-[#1A2A44] sm:text-6xl">
                  Tuba
                </h3>
                <p className="mt-2 font-wedding text-xl italic text-[#5A728A] sm:text-2xl">
                  as she steps into this new chapter of her life.
                </p>

                <div className="mx-auto my-8 flex max-w-2xl items-center justify-center gap-3 text-[#C8B7A6]">
                  <span className="h-px w-12 bg-[#C8B7A6]/50" />
                  <RubElHizbStar size={16} />
                  <span className="h-px w-12 bg-[#C8B7A6]/50" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                  <div className="flex flex-col items-center rounded-t-[36px] rounded-b-2xl border border-[#C8B7A6]/40 bg-white/70 p-6 shadow-sm sm:rounded-t-[48px]">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C8B7A6]/60 bg-white text-[#5A728A] shadow-sm">
                      <CalendarDays size={20} strokeWidth={1.3} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8B7A6]">
                      Date
                    </p>
                    <p className="mt-2 font-wedding text-2xl font-medium text-[#1A2A44] sm:text-3xl">
                      5th December
                    </p>
                    <p className="mt-1 font-wedding text-xl text-[#5A728A]">
                      2026
                    </p>
                  </div>

                  <div className="flex flex-col items-center rounded-t-[36px] rounded-b-2xl border border-[#C8B7A6]/40 bg-white/70 p-6 shadow-sm sm:rounded-t-[48px]">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C8B7A6]/60 bg-white text-[#5A728A] shadow-sm">
                      <Clock3 size={20} strokeWidth={1.3} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8B7A6]">
                      Timing &amp; Schedule
                    </p>
                    <p className="mt-2 font-wedding text-2xl font-medium text-[#1A2A44] sm:text-3xl">
                      Lunch: 1:00 PM
                    </p>
                    <p className="mt-1 font-wedding text-xl text-[#5A728A]">
                      Ceremony Starts: 4:00 PM
                    </p>
                  </div>

                  <div className="flex flex-col items-center rounded-t-[36px] rounded-b-2xl border border-[#C8B7A6]/40 bg-white/70 p-6 shadow-sm sm:rounded-t-[48px]">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#C8B7A6]/60 bg-white text-[#5A728A] shadow-sm">
                      <MapPin size={20} strokeWidth={1.3} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8B7A6]">
                      Venue
                    </p>
                    <address className="mt-2 not-italic leading-6 text-[#1A2A44]">
                      203 / 1 WING, Green Lawns,
                      <br />
                      United Developers, Sai Nagar,
                      <br />
                      Vangani (W) – 421 503
                    </address>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#C8B7A6]/35 pt-7">
                  <p className="font-wedding text-xl italic text-[#5A728A] sm:text-2xl">
                    We kindly ask for your valuable du’as and look forward to
                    celebrating together!
                  </p>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8B7A6]">
                    Warmly
                  </p>
                  <p className="mt-1 font-wedding text-2xl text-[#1A2A44] sm:text-3xl">
                    Sajid Mujawar
                  </p>
                  <a
                    href="tel:+918356854527"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-[#5A728A] transition hover:text-[#1A2A44]"
                  >
                    <span>Contact: 8356854527</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative overflow-hidden bg-[#FAF6F0] px-6 py-24 sm:py-32">
        <img
          src={photos.flowers}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F1EB]/90 via-[#FAF6F0]/85 to-[#F3EDE4]/95" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center justify-center gap-2 font-arabic text-xl sm:text-2xl text-[#5A728A]">
              <span>✦</span>
              <span>وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا</span>
              <span>✦</span>
            </div>
            <SectionLabel>The special moment approaches</SectionLabel>
            <h2 className="mb-3 font-wedding text-4xl italic text-[#1A2A44] sm:text-6xl">
              Counting Down to Forever
            </h2>
            <p className="mx-auto mb-10 max-w-md text-xs sm:text-sm text-[#5A728A] tracking-wide">
              Every passing moment brings us closer to the sacred beginning.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Countdown />
          </Reveal>

          <Reveal delay={0.2}>
            <FloralDivider />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#5A728A]">
              Every moment brings us closer
            </p>
          </Reveal>
        </div>
      </section>

      {/* VENUE */}
      {/* <section id="venue" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="relative">
            <div className="absolute -bottom-3 -left-3 h-full w-full border border-[#C8B7A6]/70" />
            <img
              src={photos.celebration}
              alt="Elegant wedding venue inspiration"
              className="relative aspect-[4/4.4] w-full object-cover sm:aspect-[4/3.5]"
            />
            <div className="absolute bottom-5 left-5 border border-[#C8B7A6]/50 bg-[#FFFFFF]/90 px-5 py-4 backdrop-blur-sm shadow-sm">
              <p className="font-wedding text-2xl italic text-[#1A2A44]">
                The place we unite
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionLabel>The venue</SectionLabel>
            <h2 className="font-wedding text-5xl leading-[1.05] text-[#1A2A44] sm:text-6xl">
              Join us
              <br />
              <span className="italic text-[#5A728A]">in celebration</span>
            </h2>

            <div className="my-7 h-px w-16 bg-[#C8B7A6]" />

            <h3 className="font-wedding text-3xl leading-tight text-[#1A2A44] sm:text-4xl">
              Dnyaneshwar mangal karyalaya
            </h3>

            <div className="mt-6 space-y-3 text-sm leading-7 text-[#5A728A]">
              <p>In front of Sampada Hospital</p>
              <p>Near Railway Fatak</p>
              <p>Vangani, Maharashtra, India</p>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-[#C8B7A6] bg-[#C8B7A6] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#1A2A44] shadow-sm transition hover:bg-[#DDD0C2]"
            >
              View location <ArrowUpRight size={15} />
            </a>

            <p className="mt-4 text-[10px] text-[#5A728A]">
              We look forward to welcoming you.
            </p>
          </Reveal>
        </div>
      </section> */}

      {/* RSVP */}
      <section id="rsvp" className="relative overflow-hidden bg-[#F3EDE4] px-6 py-24 text-center sm:py-32">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full border border-[#C8B7A6]/35" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-[#C8B7A6]/35" />

        <Reveal className="relative mx-auto max-w-3xl">
          <Heart className="mx-auto mb-6 text-[#5A728A]" size={25} strokeWidth={1.2} />
          <SectionLabel>With love, from our families</SectionLabel>

          <h2 className="font-wedding text-5xl leading-tight text-[#1A2A44] sm:text-7xl">
            Your presence
            <br />
            <span className="italic text-[#5A728A]">is our blessing</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-[#5A728A]">
            As we begin this beautiful journey, your presence and heartfelt
            duas would mean the world to us. We cannot wait to celebrate
            this special day with you.
          </p>

          <a
            href={rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 bg-[#C8B7A6] px-8 py-4 text-[9px] font-semibold uppercase tracking-[0.23em] text-[#1A2A44] shadow-md transition hover:bg-[#DDD0C2]"
          >
            <Heart size={15} />
            Send your wishes
            <ArrowUpRight size={14} />
          </a>

          <div className="mt-4">
            <button
              onClick={shareInvitation}
              className="inline-flex items-center gap-2 border border-[#5A728A]/40 bg-[#FFFFFF]/60 px-6 py-3 text-[9px] uppercase tracking-[0.18em] text-[#1A2A44] transition hover:border-[#1A2A44] hover:bg-[#FFFFFF]"
            >
              {copied ? <Check size={14} /> : <ArrowUpRight size={14} />}
              {copied ? 'Link copied' : 'Share invitation'}
            </button>
          </div>

          <FloralDivider />

          <p className="font-wedding text-2xl italic text-[#5A728A]">
            With duas and love, always.
          </p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-[#E9E0D4] px-6 py-14 text-center">
        <div className="wedding-grain absolute inset-0 opacity-15" />
        <div className="relative">
          <p className="mb-3 text-[8px] uppercase tracking-[0.35em] text-[#5A728A]">
            The beginning of forever
          </p>
          <h2 className="font-wedding text-4xl text-[#1A2A44] sm:text-6xl">
            Tuba <span className="italic text-[#C8B7A6]">&amp;</span> Mahafuz Khan
          </h2>
          <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-[#5A728A]">
            Mumbai · 06 December 2026
          </p>

          <div className="mx-auto my-7 h-px w-16 bg-[#C8B7A6]/50" />

          <p className="font-wedding text-xl italic text-[#5A728A]">
            Made memorable by love, blessed by family.
          </p>
          <p className="mt-8 text-[8px] uppercase tracking-[0.2em] text-[#5A728A]/80">
            With love, from Tuba &amp; Mahafuz Khan
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
