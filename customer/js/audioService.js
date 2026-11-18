/**
 * Cross-Device Emergency Phone & Computer Ringing + Sound Synthesizer Service
 * Customer Portal — Boda 360 Fleet Telematics Platform
 *
 * Capabilities:
 * 1. Continuous Incoming Security Phone/Computer Ringtone (`startSiren` / `stopSiren`)
 *    - Dual-engine audio: Web Audio API procedural dual-tone ring + in-memory 16-bit PCM WAV
 *      HTML5 `<audio loop>` fallback so phones & computers keep ringing even in background tabs!
 *    - Mobile Haptic Vibration cadence (`navigator.vibrate`) on Android/mobile browsers
 *    - Spoken Voice Caller-ID Announcement (`window.speechSynthesis`) for hands-free awareness
 *    - Automatic first-gesture AudioContext + HTML5 Audio unlock for iOS Safari, Android Chrome & Desktop
 * 2. Heavy-duty 12V automotive relay mechanical click (`playRelayClick`)
 * 3. Short tamper alarm & telemetry chirps (`playTamperAlarm`, `playChirp`)
 */

class AudioService {
  constructor() {
    if (window.bodaAudio instanceof AudioService) {
      return window.bodaAudio;
    }

    this.ctx = null;
    this.compressor = null;
    this.isSirenPlaying = false;
    this.isUnlocked = false;
    this.isMuted = false;

    try {
      this.isMuted = localStorage.getItem('boda_ring_muted') === '1';
    } catch (_) {
      this.isMuted = false;
    }

    this.ringInterval = null;
    this.autoStopTimeout = null;
    this.voiceTimeout = null;
    this.activeOscillators = [];
    this.ringtoneAudio = null;
    this.stateListeners = [];

    this._buildHtml5RingtoneFallback();
    this._setupAutoGestureUnlock();
  }

  onStateChange(callback) {
    if (typeof callback === 'function') {
      this.stateListeners.push(callback);
    }
  }

  _notifyStateChange() {
    const snapshot = {
      isRinging: this.isSirenPlaying,
      isMuted: this.isMuted,
      isUnlocked: this.isUnlocked
    };
    this.stateListeners.forEach((fn) => {
      try {
        fn(snapshot);
      } catch (_) {}
    });
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        try {
          this.compressor = this.ctx.createDynamicsCompressor();
          this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
          this.compressor.knee.setValueAtTime(18, this.ctx.currentTime);
          this.compressor.ratio.setValueAtTime(8, this.ctx.currentTime);
          this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
          this.compressor.release.setValueAtTime(0.15, this.ctx.currentTime);
          this.compressor.connect(this.ctx.destination);
        } catch (_) {
          this.compressor = null;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
        this._notifyStateChange();
      }).catch(() => {});
    } else if (this.ctx && this.ctx.state === 'running') {
      this.isUnlocked = true;
    }
  }

  _getOutputNode() {
    return this.compressor || (this.ctx ? this.ctx.destination : null);
  }

  /**
   * Generates a zero-dependency 16-bit PCM WAV emergency phone ringtone in memory
   * so mobile & background browser tabs ring reliably via HTML5 <audio loop>.
   */
  _buildHtml5RingtoneFallback() {
    try {
      const sampleRate = 8000;
      const durationSec = 2.2;
      const numSamples = Math.floor(sampleRate * durationSec);
      const buffer = new ArrayBuffer(44 + numSamples * 2);
      const view = new DataView(buffer);

      const writeStr = (offset, str) => {
        for (let i = 0; i < str.length; i++) {
          view.setUint8(offset + i, str.charCodeAt(i));
        }
      };

      // RIFF WAV Header (Mono, 16-bit PCM, 8000 Hz)
      writeStr(0, 'RIFF');
      view.setUint32(4, 36 + numSamples * 2, true);
      writeStr(8, 'WAVE');
      writeStr(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeStr(36, 'data');
      view.setUint32(40, numSamples * 2, true);

      // Double-ring emergency telephone cadence:
      // Burst 1: 0.00s - 0.46s | Pause: 0.46s - 0.64s | Burst 2: 0.64s - 1.14s | Pause: 1.14s - 2.20s
      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const inBurst1 = t >= 0.0 && t <= 0.46;
        const inBurst2 = t >= 0.64 && t <= 1.14;
        let sample = 0;

        if (inBurst1 || inBurst2) {
          const localT = inBurst1 ? t : (t - 0.64);
          const burstLen = inBurst1 ? 0.46 : 0.50;
          // Smooth attack/release envelope to prevent clicks
          const env = Math.min(1, localT / 0.015) * Math.min(1, (burstLen - localT) / 0.02);
          // 20 Hz mechanical phone-bell trill modulation
          const bellTrill = 0.68 + 0.32 * Math.sin(2 * Math.PI * 20 * localT);
          // Dual-tone telephone ring (440 Hz + 480 Hz) + high-clarity emergency overtone (880 Hz / 1046 Hz)
          const highFreq = (Math.floor(localT * 12) % 2 === 0) ? 880 : 1046.5;
          const wave =
            0.42 * Math.sin(2 * Math.PI * 440 * t) +
            0.38 * Math.sin(2 * Math.PI * 480 * t) +
            0.28 * Math.sin(2 * Math.PI * highFreq * t);
          sample = Math.max(-1, Math.min(1, wave * bellTrill * env * 0.92));
        }

        view.setInt16(44 + i * 2, Math.floor(sample * 32767), true);
      }

      const bytes = new Uint8Array(buffer);
      let binary = '';
      const chunkSize = 4096;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
      }

      const dataUri = 'data:audio/wav;base64,' + btoa(binary);
      const audioEl = new Audio(dataUri);
      audioEl.loop = true;
      audioEl.preload = 'auto';
      audioEl.volume = 1.0;
      this.ringtoneAudio = audioEl;
    } catch (err) {
      console.warn('HTML5 ringtone fallback init warning:', err);
    }
  }

  /**
   * Unlocks Web Audio + HTML5 Audio on first user touch/click/key anywhere in the app
   * so asynchronous WebSocket tamper events can ring on iOS, Android & Desktop.
   */
  _setupAutoGestureUnlock() {
    const unlockHandler = () => {
      this.unlockAudio();
      if (this.isUnlocked) {
        ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
          window.removeEventListener(evt, unlockHandler, true);
        });
      }
    };

    ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, unlockHandler, { capture: true, passive: true });
    });
  }

  unlockAudio() {
    try {
      this.init();
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        // Play a 1-sample silent buffer to unlock iOS/Android WebAudio pipeline
        const silentBuf = this.ctx.createBuffer(1, 1, 22050);
        const src = this.ctx.createBufferSource();
        src.buffer = silentBuf;
        src.connect(this.ctx.destination);
        src.start(0);
        this.isUnlocked = true;
      }

      // Prime HTML5 <audio> element silently if not currently ringing
      if (this.ringtoneAudio && !this.isSirenPlaying && !this._audioPrimed) {
        this._audioPrimed = true;
        const prevMuted = this.ringtoneAudio.muted;
        this.ringtoneAudio.muted = true;
        const playPromise = this.ringtoneAudio.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.then(() => {
            if (!this.isSirenPlaying) {
              this.ringtoneAudio.pause();
              this.ringtoneAudio.currentTime = 0;
            }
            this.ringtoneAudio.muted = prevMuted;
          }).catch(() => {
            this.ringtoneAudio.muted = prevMuted;
            this._audioPrimed = false;
          });
        } else {
          this.ringtoneAudio.muted = prevMuted;
        }
      }

      this._notifyStateChange();
    } catch (_) {}
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    try {
      localStorage.setItem('boda_ring_muted', this.isMuted ? '1' : '0');
    } catch (_) {}
    if (this.isMuted && this.isSirenPlaying) {
      this.stopSiren();
    }
    this._notifyStateChange();
    return this.isMuted;
  }

  toggleMute() {
    this.unlockAudio();
    const nextMuted = !this.isMuted;
    this.setMuted(nextMuted);
    if (!nextMuted) {
      this.playChirp(true);
    }
    return nextMuted;
  }

  /**
   * Synthesizes one crisp double-ring burst via Web Audio API + phone vibration
   */
  _triggerSingleRingCycle() {
    // 1. Mobile Haptic Vibration (Android / supported mobile browsers)
    try {
      if (navigator.vibrate) {
        navigator.vibrate([480, 180, 520, 700]);
      }
    } catch (_) {}

    if (this.isMuted) return;

    // 2. Ensure HTML5 WAV fallback loop is actively playing (vital for background tabs & iOS)
    try {
      if (this.ringtoneAudio && this.ringtoneAudio.paused) {
        this.ringtoneAudio.muted = false;
        this.ringtoneAudio.volume = 1.0;
        const p = this.ringtoneAudio.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    } catch (_) {}

    // 3. Web Audio API High-Clarity Dual-Tone Phone Ring + Urgent Harmonic Cadence
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const out = this._getOutputNode();
      if (!out) return;

      const now = this.ctx.currentTime;
      const bursts = [
        { start: 0.0, len: 0.45 },
        { start: 0.63, len: 0.50 }
      ];

      bursts.forEach((b) => {
        const t0 = now + b.start;
        const t1 = t0 + b.len;

        const oscA = this.ctx.createOscillator();
        const oscB = this.ctx.createOscillator();
        const oscAlert = this.ctx.createOscillator();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const masterGain = this.ctx.createGain();

        oscA.type = 'triangle';
        oscB.type = 'triangle';
        oscAlert.type = 'sawtooth';

        oscA.frequency.setValueAtTime(440, t0);
        oscB.frequency.setValueAtTime(480, t0);

        // Alternating urgent warble on top of the classic phone ring
        for (let step = 0; step < 6; step++) {
          const stepTime = t0 + (step * (b.len / 6));
          oscAlert.frequency.setValueAtTime(step % 2 === 0 ? 880 : 1174.66, stepTime);
        }

        // 20 Hz bell trill LFO
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(20, t0);
        lfoGain.gain.setValueAtTime(0.14, t0);

        masterGain.gain.setValueAtTime(0.001, t0);
        masterGain.gain.linearRampToValueAtTime(0.36, t0 + 0.02);
        masterGain.gain.setValueAtTime(0.36, t1 - 0.03);
        masterGain.gain.exponentialRampToValueAtTime(0.001, t1);

        const alertSubGain = this.ctx.createGain();
        alertSubGain.gain.setValueAtTime(0.16, t0);

        lfo.connect(lfoGain);
        lfoGain.connect(masterGain.gain);

        oscA.connect(masterGain);
        oscB.connect(masterGain);
        oscAlert.connect(alertSubGain);
        alertSubGain.connect(masterGain);
        masterGain.connect(out);

        oscA.start(t0);
        oscB.start(t0);
        oscAlert.start(t0);
        lfo.start(t0);

        oscA.stop(t1 + 0.02);
        oscB.stop(t1 + 0.02);
        oscAlert.stop(t1 + 0.02);
        lfo.stop(t1 + 0.02);

        this.activeOscillators.push(oscA, oscB, oscAlert, lfo);
      });

      // Prune finished oscillator references
      if (this.activeOscillators.length > 24) {
        this.activeOscillators = this.activeOscillators.slice(-12);
      }
    } catch (err) {
      console.warn('Ring cycle synthesis error:', err);
    }
  }

  _speakEmergencyCallout(options = {}) {
    if (this.isMuted) return;
    try {
      if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
      window.speechSynthesis.cancel();

      const plate = options.plate || 'UEV 412K';
      const eventType = options.eventType || 'TAMPER_DETECTED';
      let text = `Emergency alert! Tamper detected on motorcycle ${plate}. Check your dashboard now!`;
      if (eventType === 'BATTERY_DISCONNECTED') {
        text = `Emergency alert! 12 volt battery cut detected on motorcycle ${plate}. Check your dashboard immediately!`;
      } else if (eventType === 'GEOFENCE_BREACH') {
        text = `Security alert! Motorcycle ${plate} has left the safe perimeter zone.`;
      }

      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.04;
      utter.pitch = 1.05;
      utter.volume = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (_) {}
  }

  /**
   * Starts continuous phone & computer ringing on tamper / battery cut / perimeter danger
   */
  startSiren(options = {}) {
    if (this.isMuted) {
      return;
    }

    // Reset existing ring timers cleanly before starting fresh cadence
    this.stopSiren();

    this.isSirenPlaying = true;
    this._notifyStateChange();

    // Start HTML5 WAV loop immediately
    try {
      if (this.ringtoneAudio) {
        this.ringtoneAudio.currentTime = 0;
        this.ringtoneAudio.muted = false;
        this.ringtoneAudio.volume = 1.0;
        const p = this.ringtoneAudio.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    } catch (_) {}

    // Fire first ring burst immediately, then repeat every 2.2 seconds like an incoming phone call
    this._triggerSingleRingCycle();
    this.ringInterval = setInterval(() => {
      if (!this.isSirenPlaying) return;
      this._triggerSingleRingCycle();
    }, 2200);

    // Speak emergency voice caller-ID after first ring burst unless disabled
    if (options.speak !== false) {
      this.voiceTimeout = setTimeout(() => {
        if (this.isSirenPlaying) {
          this._speakEmergencyCallout(options);
        }
      }, 1250);
    }

    // Auto-silence after 45 seconds (standard incoming phone call ring timeout)
    const durationMs = options.durationMs || 45000;
    this.autoStopTimeout = setTimeout(() => {
      this.stopSiren();
    }, durationMs);
  }

  startRinging(options = {}) {
    return this.startSiren(options);
  }

  /**
   * Immediately stops ringing, vibration, HTML5 audio loop, and voice announcement
   */
  stopSiren() {
    this.isSirenPlaying = false;

    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
    if (this.autoStopTimeout) {
      clearTimeout(this.autoStopTimeout);
      this.autoStopTimeout = null;
    }
    if (this.voiceTimeout) {
      clearTimeout(this.voiceTimeout);
      this.voiceTimeout = null;
    }

    // Stop active Web Audio oscillators immediately
    if (this.activeOscillators && this.activeOscillators.length > 0) {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (_) {}
      });
      this.activeOscillators = [];
    }

    // Stop HTML5 WAV ringtone loop
    try {
      if (this.ringtoneAudio) {
        this.ringtoneAudio.pause();
        this.ringtoneAudio.currentTime = 0;
      }
    } catch (_) {}

    // Stop mobile vibration
    try {
      if (navigator.vibrate) {
        navigator.vibrate(0);
      }
    } catch (_) {}

    // Stop spoken voice warning
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}

    this._notifyStateChange();
  }

  stopRinging() {
    return this.stopSiren();
  }

  /**
   * Plays a quick 3.2-second sample ringtone + vibration to test phone/computer speakers & unlock audio
   */
  playTestRing() {
    this.unlockAudio();
    if (this.isMuted) {
      this.setMuted(false);
    }
    this.startSiren({
      durationMs: 3400,
      speak: false
    });
  }

  // Heavy 12V automotive relay mechanical click (double pulse: coil energize + armature snap)
  playRelayClick(isCutOff = true) {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const out = this._getOutputNode();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isCutOff ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(isCutOff ? 120 : 280, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + 0.1);

      // Second micro snap for contact bounce
      setTimeout(() => {
        if (!this.ctx) return;
        const now2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();

        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(220, now2);
        osc2.frequency.exponentialRampToValueAtTime(30, now2 + 0.05);

        gain2.gain.setValueAtTime(0.2, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.05);

        osc2.connect(gain2);
        gain2.connect(out);

        osc2.start(now2);
        osc2.stop(now2 + 0.06);
      }, 40);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // Short two-tone alarm helper (kept for backwards compatibility)
  playTamperAlarm(durationSeconds = 2.5) {
    this.startSiren({
      durationMs: Math.max(2200, Math.round(durationSeconds * 1000)),
      speak: false
    });
  }

  // Soft ping / chirp for telemetry update / UI feedback
  playChirp(isHigh = false) {
    try {
      this.init();
      if (!this.ctx || this.isMuted) return;

      const out = this._getOutputNode();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isHigh ? 880 : 520, now);
      osc.frequency.exponentialRampToValueAtTime(isHigh ? 1320 : 260, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  }
}

window.bodaAudio = new AudioService();
