// Futuristic Cyber Audio Synthesizer (Zero-dependency Web Audio API)
class CyberAudioEngine {
  constructor() {
    this.ctx = null
    this.muted = true
    this.initialized = false

    // Load persisted mute preference
    try {
      const saved = localStorage.getItem('hapiz_audio_muted')
      if (saved !== null) {
        this.muted = saved === 'true'
      } else {
        this.muted = true
      }
    } catch (e) {
      this.muted = true
    }
  }

  init() {
    if (this.initialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      return
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        this.initialized = true
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e)
    }
  }

  isMuted() {
    return this.muted
  }

  toggleMute() {
    this.muted = !this.muted
    try {
      localStorage.setItem('hapiz_audio_muted', this.muted ? 'true' : 'false')
    } catch (e) {}
    return this.muted
  }

  // Soft high-tech hover blip (pleasant, glassy, subtle)
  playHover() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      // Quick pitch glide
      osc.frequency.setValueAtTime(820, now)
      osc.frequency.exponentialRampToValueAtTime(1240, now + 0.04)

      gain.gain.setValueAtTime(0.018, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.05)
    } catch (e) {}
  }

  // Tactile cyber click
  playClick() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch (e) {}
  }

  // Uplink transmission sound (chime sequence)
  playTransmit() {
    if (this.muted) return
    this.init()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const freqs = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 arpeggio

      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        const start = now + i * 0.06

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0.03, start)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(start)
        osc.stop(start + 0.22)
      })
    } catch (e) {}
  }
}

export const cyberAudio = new CyberAudioEngine()
