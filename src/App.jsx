
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
const MUSIC_URL = '/1.mp3'

// Optional: replace this with the family's WhatsApp number.
const WHATSAPP_NUMBER = '91XXXXXXXXXX'

const photos = {
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=90',
  couple: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=90',
  flowers: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85',
  celebration: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=90',
}

const gold = '#d8bc83'

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
      <span className={`h-px w-9 ${light ? 'bg-[#d8bc83]/60' : 'bg-[#a88850]/60'}`} />
      <span
        className={`text-[9px] uppercase tracking-[0.32em] sm:text-[10px] ${
          light ? 'text-[#e1ca9b]' : 'text-[#987744]'
        }`}
      >
        {children}
      </span>
      <span className={`h-px w-9 ${light ? 'bg-[#d8bc83]/60' : 'bg-[#a88850]/60'}`} />
    </div>
  )
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
    <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 sm:gap-5">
      {Object.entries(remaining).map(([label, value]) => (
        <div
          key={label}
          className="border-r border-[#d8bc83]/20 px-1 last:border-0"
        >
          <motion.p
            key={value}
            initial={{ opacity: 0.5, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-wedding text-3xl text-[#ead6a8] sm:text-5xl"
          >
            {String(value).padStart(2, '0')}
          </motion.p>
          <p className="mt-2 text-[8px] uppercase tracking-[0.18em] text-white/55 sm:text-[10px]">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

function FloralDivider({ light = false }) {
  return (
    <div className={`my-7 flex items-center justify-center gap-3 ${light ? 'text-[#d8bc83]' : 'text-[#a88850]'}`}>
      <span className={`h-px w-12 ${light ? 'bg-[#d8bc83]/35' : 'bg-[#a88850]/35'}`} />
      <Sparkles size={15} strokeWidth={1.2} />
      <span className={`h-px w-12 ${light ? 'bg-[#d8bc83]/35' : 'bg-[#a88850]/35'}`} />
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
          <p style={{ fontFamily: 'Amiri, serif', fontSize: 22, color: '#d8bc83', marginBottom: 4, letterSpacing: '0.05em' }}>بَارَكَ اللهُ لَكُمَا</p>
          <p style={{ fontSize: 8, letterSpacing: '0.32em', color: 'rgba(216,188,131,0.5)', textTransform: 'uppercase' }}>Bismillah-ir-Rahman-ir-Raheem</p>
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
                <line key={i} x1="8" y1={i*5} x2="8" y2={i*5+5} stroke={i%2===0?'#a07840':'#c4a060'} strokeWidth="3" strokeLinecap="round" />
              ))}
              <circle cx="8" cy="3" r="4" fill="#d8bc83" />
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
              background: 'linear-gradient(150deg,#fdf8ef,#f5ead6)',
              border: '1px solid rgba(168,136,80,0.55)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '16px 20px',
            }}>
              <div style={{ position: 'absolute', inset: 7, border: '1px solid rgba(168,136,80,0.25)', pointerEvents: 'none' }} />
              <Sparkles size={14} strokeWidth={1.2} style={{ color: '#a48754' }} />
              <p style={{ fontSize: 8, letterSpacing: '0.3em', color: '#987744', textTransform: 'uppercase' }}>Nikkah Invitation</p>
              <p style={{ fontFamily: 'Cormorant Garamond,Georgia,serif', fontSize: 26, color: '#263a2e', lineHeight: 1.1, textAlign: 'center' }}>
                Tuba <span style={{ color: '#a48754', fontStyle: 'italic' }}>&amp;</span> Mahafuz
              </p>
              <div style={{ width: 40, height: 1, background: 'rgba(168,136,80,0.5)' }} />
              <p style={{ fontSize: 8, letterSpacing: '0.22em', color: '#8a8e80', textTransform: 'uppercase' }}>06 · 12 · 2026</p>
            </div>
            {/* back face */}
            <div style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(145deg,#1a3326,#2a4a38)',
              border: '1px solid rgba(216,188,131,0.35)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(216,188,131,0.2)' }} />
              <Heart size={26} strokeWidth={1} style={{ color: 'rgba(216,188,131,0.65)' }} />
            </div>
          </motion.div>

          {/* envelope body */}
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            <defs>
              <linearGradient id="eB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3d2c" />
                <stop offset="50%" stopColor="#152e20" />
                <stop offset="100%" stopColor="#0f2018" />
              </linearGradient>
              <linearGradient id="eL" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0f2018" /><stop offset="100%" stopColor="#1a3326" /></linearGradient>
              <linearGradient id="eR" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#1a3326" /><stop offset="100%" stopColor="#0f2018" /></linearGradient>
              <linearGradient id="eBt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#172a1e" /><stop offset="100%" stopColor="#0d1c14" /></linearGradient>
              <linearGradient id="goldShine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a6a2a" />
                <stop offset="40%" stopColor="#d8bc83" />
                <stop offset="60%" stopColor="#f0dfa8" />
                <stop offset="100%" stopColor="#8a6a2a" />
              </linearGradient>
              {/* Islamic 8-pointed star tessellation */}
              <pattern id="geo" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <polygon points="16,1 19.2,11 29.5,11 21.5,17.5 24.5,27.5 16,21.5 7.5,27.5 10.5,17.5 2.5,11 12.8,11"
                  fill="none" stroke="rgba(216,188,131,0.2)" strokeWidth="0.7" />
                <circle cx="16" cy="16" r="3" fill="none" stroke="rgba(216,188,131,0.15)" strokeWidth="0.5" />
                <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(216,188,131,0.08)" strokeWidth="0.4" />
                <line x1="16" y1="0" x2="16" y2="32" stroke="rgba(216,188,131,0.08)" strokeWidth="0.4" />
                <line x1="0" y1="0" x2="32" y2="32" stroke="rgba(216,188,131,0.05)" strokeWidth="0.4" />
                <line x1="32" y1="0" x2="0" y2="32" stroke="rgba(216,188,131,0.05)" strokeWidth="0.4" />
                <circle cx="0" cy="0" r="2" fill="none" stroke="rgba(216,188,131,0.1)" strokeWidth="0.5" />
                <circle cx="32" cy="0" r="2" fill="none" stroke="rgba(216,188,131,0.1)" strokeWidth="0.5" />
                <circle cx="0" cy="32" r="2" fill="none" stroke="rgba(216,188,131,0.1)" strokeWidth="0.5" />
                <circle cx="32" cy="32" r="2" fill="none" stroke="rgba(216,188,131,0.1)" strokeWidth="0.5" />
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
            <polygon points={`0,0 0,${H} ${MID},${H*0.56}`} fill="url(#eL)" opacity="0.55" />
            <polygon points={`${W},0 ${W},${H} ${MID},${H*0.56}`} fill="url(#eR)" opacity="0.55" />
            <polygon points={`0,${H} ${W},${H} ${MID},${H*0.56}`} fill="url(#eBt)" opacity="0.65" />

            {/* outer gold shimmer border */}
            <rect x="0" y="0" width={W} height={H} fill="none" stroke="url(#goldShine)" strokeWidth="1.5" />
            {/* inner border */}
            <rect x="7" y="7" width={W-14} height={H-14} fill="none" stroke="rgba(216,188,131,0.35)" strokeWidth="0.7" />
            <rect x="12" y="12" width={W-24} height={H-24} fill="none" stroke="rgba(216,188,131,0.15)" strokeWidth="0.5" />

            {/* corner arabesque ornaments */}
            <g stroke="url(#goldShine)" strokeWidth="1.2" fill="none" filter="url(#glow)">
              {/* top-left */}
              <path d="M7,22 L7,7 L22,7" />
              <path d="M7,14 Q14,7 22,7" strokeWidth="0.6" opacity="0.6" />
              <circle cx="7" cy="7" r="2.5" fill="rgba(216,188,131,0.4)" stroke="none" />
              {/* top-right */}
              <path d={`M${W-7},22 L${W-7},7 L${W-22},7`} />
              <path d={`M${W-7},14 Q${W-14},7 ${W-22},7`} strokeWidth="0.6" opacity="0.6" />
              <circle cx={W-7} cy="7" r="2.5" fill="rgba(216,188,131,0.4)" stroke="none" />
              {/* bottom-left */}
              <path d={`M7,${H-22} L7,${H-7} L22,${H-7}`} />
              <path d={`M7,${H-14} Q14,${H-7} 22,${H-7}`} strokeWidth="0.6" opacity="0.6" />
              <circle cx="7" cy={H-7} r="2.5" fill="rgba(216,188,131,0.4)" stroke="none" />
              {/* bottom-right */}
              <path d={`M${W-7},${H-22} L${W-7},${H-7} L${W-22},${H-7}`} />
              <path d={`M${W-7},${H-14} Q${W-14},${H-7} ${W-22},${H-7}`} strokeWidth="0.6" opacity="0.6" />
              <circle cx={W-7} cy={H-7} r="2.5" fill="rgba(216,188,131,0.4)" stroke="none" />
            </g>

            {/* بَارَكَ اللهُ لَكُمَا — bottom center */}
            <text
              x={MID} y={H - 18}
              textAnchor="middle"
              fontFamily="Amiri, serif"
              fontSize="13"
              fill="rgba(216,188,131,0.7)"
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
                  <stop offset="0%" stopColor="#2a5040" />
                  <stop offset="100%" stopColor="#152e20" />
                </linearGradient>
                <linearGradient id="fB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f7edd8" />
                  <stop offset="100%" stopColor="#ede0c4" />
                </linearGradient>
                <linearGradient id="fGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8a6a2a" />
                  <stop offset="50%" stopColor="#f0dfa8" />
                  <stop offset="100%" stopColor="#8a6a2a" />
                </linearGradient>
                <pattern id="geoF" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <polygon points="16,1 19.2,11 29.5,11 21.5,17.5 24.5,27.5 16,21.5 7.5,27.5 10.5,17.5 2.5,11 12.8,11"
                    fill="none" stroke="rgba(216,188,131,0.18)" strokeWidth="0.7" />
                  <circle cx="16" cy="16" r="3" fill="none" stroke="rgba(216,188,131,0.12)" strokeWidth="0.5" />
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
                fill="rgba(216,188,131,0.5)" stroke="none"
                style={{ backfaceVisibility: 'hidden' }}
              />

              {/* gold top edge */}
              <line x1="0" y1="1" x2={W} y2="1" stroke="url(#fGold)" strokeWidth="1.5" style={{ backfaceVisibility: 'hidden' }} />

              {/* back face ivory */}
              <polygon points={`0,0 ${W},0 ${MID},${FLAP_H}`} fill="url(#fB)" stroke="rgba(168,136,80,0.25)" strokeWidth="0.8"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', transformOrigin: `${MID}px 0px` }} />
            </svg>
          </motion.div>

          {/* wax seal — premium crescent + star + بَارَكَ */}
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.2 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* outer glow ring */}
            <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1px solid rgba(216,188,131,0.25)', boxShadow: '0 0 18px rgba(216,188,131,0.15)' }} />
              <div style={{ position: 'absolute', inset: -1, borderRadius: '50%', border: '1px solid rgba(216,188,131,0.45)' }} />
              <div style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'radial-gradient(circle at 32% 28%, #c8973a, #7a4e18)',
                border: '1.5px solid rgba(216,188,131,0.9)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.7), inset 0 1px 3px rgba(255,220,120,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="44" height="44" viewBox="0 0 44 44">
                  {/* crescent */}
                  <path d="M22,5 A17,17 0 1,0 22,39 A12,12 0 1,1 22,5 Z" fill="rgba(253,240,208,0.92)" />
                  {/* 5-pointed star */}
                  <polygon
                    points="32,12 33.5,17 38.5,17 34.5,20 36,25 32,22 28,25 29.5,20 25.5,17 30.5,17"
                    fill="rgba(253,240,208,0.92)"
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
          style={{ fontSize: 8, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}
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

  useEffect(() => {
    const audio = new Audio(MUSIC_URL)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
      return
    }

    try {
      setMusicError(false)
      await audio.play()
      setMusicPlaying(true)
    } catch {
      setMusicError(true)
      setMusicPlaying(false)
    }
  }

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
    <main className="w-full overflow-hidden bg-[#f8f3e9] text-[#263a2e]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Amiri:wght@400;700&display=swap');

        .font-wedding {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .font-body-wedding {
          font-family: 'DM Sans', sans-serif;
        }

        .wedding-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .gold-shimmer {
          background: linear-gradient(110deg, #a9874c 10%, #f1dfad 35%, #b18c4d 55%, #f3e3b6 75%, #a9874c 90%);
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
          background: linear-gradient(145deg, #e8d09b, #a78b59);
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
          border: 1px solid rgba(216,188,131,.42);
          pointer-events: none;
        }

        .royal-frame::after {
          inset: 19px;
          border-color: rgba(216,188,131,.16);
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
            style={{ background: 'linear-gradient(135deg, #0f1f17 0%, #1a3328 50%, #0d1a12 100%)' }}
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
      <button
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Pause wedding music' : 'Play wedding music'}
        title={musicError ? 'Add public/music/wedding.mp3 to enable music' : 'Toggle wedding music'}
        className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full border border-[#d8bc83]/60 bg-[#20382b]/95 px-4 text-[#e6d1a1] shadow-xl backdrop-blur-md transition hover:bg-[#2d4938] sm:bottom-7 sm:right-7"
      >
        {musicPlaying ? <Pause size={15} /> : <Music2 size={16} />}
        <span className="text-[9px] uppercase tracking-[0.17em]">
          {musicPlaying ? 'Pause music' : 'Play music'}
        </span>
        {musicPlaying && <Volume2 size={14} className="soft-breathe" />}
        {musicError && <VolumeX size={14} />}
      </button>

      {/* NAVIGATION */}
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
          <a href="#home" className="font-wedding text-2xl italic text-white">
            T <span className="text-[#dfc28c]">&amp;</span> M
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {[
              ['Our Families', '#families'],
              ['The Nikkah', '#occasion'],
              ['The Venue', '#venue'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[9px] uppercase tracking-[0.19em] text-white/80 transition hover:text-[#e7ce98]"
              >
                {label}
              </a>
            ))}
            <a
              href="#rsvp"
              className="border border-[#d8bc83]/70 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-[#f0dfba] transition hover:bg-[#d8bc83] hover:text-[#20382b]"
            >
              Join us
            </a>
          </div>
          <a
            href="#rsvp"
            className="border border-[#d8bc83]/60 px-4 py-2.5 text-[9px] uppercase tracking-[0.17em] text-[#f0dfba] md:hidden"
          >
            RSVP
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="royal-frame relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#1b3024]"
      >
        <img
          src={photos.hero}
          alt="An elegant wedding celebration"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#112219]/80 via-[#15271e]/55 to-[#14271e]/90" />
        <div className="wedding-grain absolute inset-0 opacity-25" />

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
          className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-28 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 flex justify-center text-[#e0c58f]"
          >
            <Sparkles size={27} strokeWidth={1} />
          </motion.div>

          <p className="mb-4 text-[9px] uppercase tracking-[0.4em] text-[#e3cc9c] sm:text-xs">
            With the blessings of Allah &amp; our families
          </p>

          <h1 className="font-wedding text-[clamp(4.8rem,15vw,10rem)] leading-[0.78] tracking-[-0.045em]">
            Tuba
          </h1>
          <div className="my-5 flex items-center justify-center gap-5 sm:my-7">
            <span className="h-px w-12 bg-[#d8bc83]/70 sm:w-24" />
            <span className="gold-shimmer font-wedding text-5xl italic sm:text-7xl">
              &amp;
            </span>
            <span className="h-px w-12 bg-[#d8bc83]/70 sm:w-24" />
          </div>
          <h2 className="font-wedding text-[clamp(3.6rem,12vw,8rem)] leading-[0.85] tracking-[-0.04em]">
            Mahafuz Khan
          </h2>

          <FloralDivider light />

          <p className="font-wedding text-2xl italic text-white/85 sm:text-3xl">
            Two hearts, one beautiful promise.
          </p>
          <p className="mt-3 text-[9px] uppercase tracking-[0.28em] text-[#e1ca9b] sm:text-[10px]">
            We invite you to our Nikkah
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[10px] tracking-[0.15em] text-white/85 sm:text-xs">
            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#dfc28c]" />
              Sunday, 06 December 2026
            </span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="flex items-center gap-2">
              <Clock3 size={15} className="text-[#dfc28c]" />
              6:20 PM
            </span>
          </div>

          <motion.a
            whileHover={{ y: -3 }}
            href="#families"
            className="mt-10 inline-flex items-center gap-3 border border-[#d8bc83]/70 px-7 py-4 text-[9px] uppercase tracking-[0.22em] text-[#f0dfba] transition hover:bg-[#d8bc83] hover:text-[#1b3024]"
          >
            Explore the invitation
            <ArrowDown size={14} />
          </motion.a>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-white/50 sm:flex">
          <span className="h-8 w-px bg-[#d8bc83]/60" />
          A new chapter begins
        </div>
      </section>

      {/* OPENING MESSAGE */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="pointer-events-none absolute -left-28 top-12 h-64 w-64 rounded-full border border-[#b89b68]/15" />
        <div className="pointer-events-none absolute -right-28 bottom-4 h-72 w-72 rounded-full border border-[#b89b68]/15" />

        <Reveal>
          <SectionLabel>A blessed beginning</SectionLabel>
          <h2 className="mx-auto max-w-3xl font-wedding text-4xl leading-tight sm:text-6xl">
            In the name of Allah,
            <br />
            <span className="italic text-[#a48754]">
              the Most Merciful
            </span>
          </h2>
          <FloralDivider />
          <p className="mx-auto max-w-2xl text-sm leading-8 text-[#69766b]">
            Alhamdulillah, with grateful hearts and the blessings of our
            families, we are beginning a beautiful new chapter together.
            Your presence and duas would make this special day even more
            meaningful to us.
          </p>
          <p className="mt-7 font-wedding text-2xl italic text-[#987744]">
            It would be our honour to celebrate with you.
          </p>
        </Reveal>
      </section>

      {/* FAMILY BLESSINGS */}
      <section id="families" className="relative bg-[#20382b] px-5 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,188,131,0.09),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel light>Our roots, our blessings</SectionLabel>
            <h2 className="text-center font-wedding text-5xl leading-tight text-[#f5ebd8] sm:text-7xl">
              With The Blessings
              <br />
              <span className="italic text-[#d8bc83]">Of Their Families</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-7 text-white/60 sm:text-sm">
              Two families, joined by faith, love and the beautiful promise
              of a lifetime together.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-8">
            <Reveal delay={0.08}>
              <article className="relative h-full border border-[#d8bc83]/30 bg-[#f8f3e9] px-6 py-10 text-center sm:px-10 sm:py-14">
                <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#ae8e54]" />
                <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#ae8e54]" />
                <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#ae8e54]" />
                <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#ae8e54]" />

                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#c6aa74]/50 text-[#9c7c45]">
                  <Sparkles size={19} strokeWidth={1.2} />
                </div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.32em] text-[#a0804d]">
                  The Bride
                </p>
                <h3 className="font-wedding text-4xl text-[#263a2e] sm:text-5xl">
                  Tuba Mujawar
                </h3>
                <p className="mt-5 font-wedding text-xl italic text-[#92794e]">
                  Daughter of
                </p>
                <p className="mt-3 font-wedding text-2xl text-[#263a2e] sm:text-3xl">
                  Sajid Mujawar
                </p>
                <p className="my-1 font-wedding text-xl italic text-[#b3935d]">
                  &amp;
                </p>
                <p className="font-wedding text-2xl text-[#263a2e] sm:text-3xl">
                  Shabana Mujawar
                </p>
                <FloralDivider />
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a8e80]">
                  With love and duas
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.18}>
              <article className="relative h-full border border-[#d8bc83]/30 bg-[#f8f3e9] px-6 py-10 text-center sm:px-10 sm:py-14">
                <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#ae8e54]" />
                <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#ae8e54]" />
                <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#ae8e54]" />
                <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#ae8e54]" />

                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#c6aa74]/50 text-[#9c7c45]">
                  <Heart size={19} strokeWidth={1.2} />
                </div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.32em] text-[#a0804d]">
                  The Groom
                </p>
                <h3 className="font-wedding text-4xl text-[#263a2e] sm:text-5xl">
                  Mahafuz Khan
                </h3>
                <p className="mt-5 font-wedding text-xl italic text-[#92794e]">
                  Son of
                </p>
                <p className="mt-3 font-wedding text-2xl text-[#263a2e] sm:text-3xl">
                  Raza Khan
                </p>
                <p className="my-1 font-wedding text-xl italic text-[#b3935d]">
                  &amp;
                </p>
                <p className="font-wedding text-2xl text-[#263a2e] sm:text-3xl">
                  Shahanabano Khan
                </p>
                <FloralDivider />
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a8e80]">
                  With love and duas
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE OCCASION */}
      <section id="occasion" className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <SectionLabel>The occasion</SectionLabel>
            <h2 className="font-wedding text-6xl text-[#263a2e] sm:text-8xl">
              The Nikkah
            </h2>
            <p className="mt-4 font-wedding text-2xl italic text-[#a48754] sm:text-3xl">
              A promise made with love and faith.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-12 border border-[#c7ae7b]/50 bg-[#f1e9d9] px-5 py-10 sm:mt-16 sm:px-12 sm:py-14">
              <div className="absolute inset-2 border border-[#c7ae7b]/20" />
              <div className="relative">
                <CalendarDays className="mx-auto mb-5 text-[#a48754]" size={25} strokeWidth={1.2} />
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#967747]">
                  Sunday
                </p>
                <p className="mt-3 font-wedding text-4xl text-[#263a2e] sm:text-6xl">
                  06 December 2026
                </p>

                <div className="mx-auto my-7 h-px w-16 bg-[#b89b68]/70" />

                <div className="flex items-center justify-center gap-3">
                  <Clock3 size={19} className="text-[#a48754]" strokeWidth={1.4} />
                  <p className="font-wedding text-3xl text-[#263a2e] sm:text-4xl">
                    6:20 PM
                  </p>
                </div>

                <p className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#7a8276]">
                  <MapPin size={14} />
                  Mumbai, India
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative overflow-hidden bg-[#172c22] px-6 py-20 sm:py-28">
        <img
          src={photos.flowers}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-[#172c22]/65" />

        <Reveal className="relative mx-auto max-w-3xl text-center">
          <SectionLabel light>The special moment approaches</SectionLabel>
          <h2 className="mb-10 font-wedding text-4xl italic text-[#f4e6c8] sm:text-6xl">
            Counting down to forever
          </h2>
          <Countdown />
          <FloralDivider light />
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/55">
            Every moment brings us closer
          </p>
        </Reveal>
      </section>

      {/* VENUE */}
      <section id="venue" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="relative">
            <div className="absolute -bottom-3 -left-3 h-full w-full border border-[#b89b68]/60" />
            <img
              src={photos.celebration}
              alt="Elegant wedding venue inspiration"
              className="relative aspect-[4/4.4] w-full object-cover sm:aspect-[4/3.5]"
            />
            <div className="absolute bottom-5 left-5 border border-white/50 bg-[#172c22]/75 px-5 py-4 backdrop-blur-sm">
              <p className="font-wedding text-2xl italic text-[#f0dfba]">
                The place we unite
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionLabel>The venue</SectionLabel>
            <h2 className="font-wedding text-5xl leading-[1.05] text-[#263a2e] sm:text-6xl">
              Join us
              <br />
              <span className="italic text-[#a48754]">in celebration</span>
            </h2>

            <div className="my-7 h-px w-16 bg-[#b89b68]" />

            <h3 className="font-wedding text-3xl leading-tight text-[#263a2e] sm:text-4xl">
              Dhaneshwar Mangal Karylaye
            </h3>

            <div className="mt-6 space-y-3 text-sm leading-7 text-[#69766b]">
              <p>In front of Sampada Hospital</p>
              <p>Near Railway Fatak</p>
              <p>Vangani, Maharashtra, India</p>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-[#20382b] px-7 py-4 text-[9px] uppercase tracking-[0.22em] text-[#f0dfba] transition hover:bg-[#38533f]"
            >
              View location <ArrowUpRight size={15} />
            </a>

            <p className="mt-4 text-[10px] text-[#8a9084]">
              We look forward to welcoming you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PHOTO MOMENT */}
      <section id="gallery" className="bg-[#eee6d7] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionLabel>A moment to remember</SectionLabel>
          <h2 className="mb-12 text-center font-wedding text-5xl text-[#263a2e] sm:text-7xl">
            Love, in every detail
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-5">
          <Reveal className="col-span-2 sm:col-span-1">
            <div className="group relative overflow-hidden">
              <img
                src={photos.couple}
                alt="Romantic couple photography inspiration"
                className="aspect-[5/4] w-full object-cover transition duration-700 group-hover:scale-105 sm:aspect-[4/5]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15251b]/45 to-transparent opacity-70 transition group-hover:opacity-100" />
            </div>
          </Reveal>

          <div className="grid gap-3 sm:gap-5">
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden">
                <img
                  src={photos.flowers}
                  alt="Elegant floral wedding details"
                  className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="group relative overflow-hidden">
                <img
                  src={photos.celebration}
                  alt="Wedding celebration decor"
                  className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
        <p className="mt-7 text-center font-wedding text-xl italic text-[#8f754b]">
          A beautiful day. A lifetime of memories.
        </p>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="relative overflow-hidden bg-[#20382b] px-6 py-24 text-center sm:py-32">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full border border-[#d8bc83]/15" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-[#d8bc83]/15" />

        <Reveal className="relative mx-auto max-w-3xl">
          <Heart className="mx-auto mb-6 text-[#d8bc83]" size={25} strokeWidth={1.2} />
          <SectionLabel light>With love, from our families</SectionLabel>

          <h2 className="font-wedding text-5xl leading-tight text-[#f5ebd8] sm:text-7xl">
            Your presence
            <br />
            <span className="italic text-[#d8bc83]">is our blessing</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-8 text-white/65">
            As we begin this beautiful journey, your presence and heartfelt
            duas would mean the world to us. We cannot wait to celebrate
            this special day with you.
          </p>

          <a
            href={rsvpUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 bg-[#d8bc83] px-8 py-4 text-[9px] uppercase tracking-[0.23em] text-[#20382b] transition hover:bg-[#efdfb7]"
          >
            <Heart size={15} />
            Send your wishes
            <ArrowUpRight size={14} />
          </a>

          <div className="mt-4">
            <button
              onClick={shareInvitation}
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-[9px] uppercase tracking-[0.18em] text-white/75 transition hover:border-[#d8bc83] hover:text-[#e9d5a7]"
            >
              {copied ? <Check size={14} /> : <ArrowUpRight size={14} />}
              {copied ? 'Link copied' : 'Share invitation'}
            </button>
          </div>

          <FloralDivider light />

          <p className="font-wedding text-2xl italic text-[#e1ca9b]">
            With duas and love, always.
          </p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-[#14251c] px-6 py-14 text-center">
        <div className="wedding-grain absolute inset-0 opacity-20" />
        <div className="relative">
          <p className="mb-3 text-[8px] uppercase tracking-[0.35em] text-[#b99b65]">
            The beginning of forever
          </p>
          <h2 className="font-wedding text-4xl text-[#f4e8d0] sm:text-6xl">
            Tuba <span className="italic text-[#d8bc83]">&amp;</span> Mahafuz Khan
          </h2>
          <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-white/50">
            Mumbai · 06 December 2026
          </p>

          <div className="mx-auto my-7 h-px w-16 bg-[#d8bc83]/50" />

          <p className="font-wedding text-xl italic text-white/65">
            Made memorable by love, blessed by family.
          </p>
          <p className="mt-8 text-[8px] uppercase tracking-[0.2em] text-white/30">
            With love, from Tuba &amp; Mahafuz Khan
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
