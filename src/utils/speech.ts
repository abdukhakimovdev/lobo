// Web Speech API wrapper for reading story scenes aloud
import { Language } from '../types';

class SpeechReader {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private listeners: Array<(speaking: boolean) => void> = [];

  speak(text: string, lang: Language, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Brauzeringiz ovozli o‘qishni qo‘llab-quvvatlamaydi (Web Speech API)');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Pick language tag
    if (lang === 'uz') {
      utterance.lang = 'uz-UZ';
    } else if (lang === 'ru') {
      utterance.lang = 'ru-RU';
    } else {
      utterance.lang = 'en-US';
    }

    // Attempt to pick optimal voice if available
    const voices = window.speechSynthesis.getVoices();
    const voicePrefix = lang === 'uz' ? 'uz' : lang === 'ru' ? 'ru' : 'en';
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(voicePrefix));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95; // comfortable educational pace
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.notify(true);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.notify(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.notify(false);
    }
  }

  subscribe(callback: (speaking: boolean) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify(speaking: boolean) {
    this.listeners.forEach(cb => cb(speaking));
  }
}

export const speechReader = new SpeechReader();
