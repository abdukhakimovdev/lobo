/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  loadUserProgress,
  saveUserProgress,
  loadUserPrefs,
  saveUserPrefs,
  UserPrefs,
} from './utils/storage';
import { UserProgress, StageId, Language } from './types';
import { sounds } from './utils/audio';
import { Navbar } from './components/Navbar';
import { StageNavigator } from './components/StageNavigator';
import { FloatingXP } from './components/FloatingXP';
import { Stage1Intro } from './components/Stage1Intro';
import { Stage2Author } from './components/Stage2Author';
import { Stage3Story } from './components/Stage3Story';
import { Stage4Characters } from './components/Stage4Characters';
import { Stage5Games } from './components/Stage5Games';
import { Stage6CaseStudy } from './components/Stage6CaseStudy';
import { Stage7Test } from './components/Stage7Test';
import { TeacherModal } from './components/TeacherModal';
import { ProjectorMode } from './components/ProjectorMode';
import { CertificateModal } from './components/CertificateModal';
import { BadgesModal } from './components/BadgesModal';
import { BonusSections } from './components/BonusSections';

export default function App() {
  const [prefs, setPrefs] = useState<UserPrefs>(loadUserPrefs);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [currentStage, setCurrentStage] = useState<StageId>(progress.currentStage || 1);

  // Modals state
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isProjectorOpen, setIsProjectorOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  // Floating XP toast events
  const [xpEvents, setXpEvents] = useState<Array<{ id: number; amount: number; label?: string }>>([]);

  // Sync preferences with HTML document class
  useEffect(() => {
    if (prefs.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    sounds.enabled = prefs.soundOn;
    saveUserPrefs(prefs);
  }, [prefs]);

  // Persist progress changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const handleUpdatePrefs = (updated: Partial<UserPrefs>) => {
    setPrefs(prev => ({ ...prev, ...updated }));
  };

  const handleUpdateProgress = (updated: Partial<UserProgress>) => {
    setProgress(prev => ({ ...prev, ...updated }));
  };

  const handleAwardXP = (amount: number, label?: string) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount,
    }));
    setXpEvents(prev => [...prev, { id: Date.now() + Math.random(), amount, label }]);
  };

  const handleRemoveXpEvent = (id: number) => {
    setXpEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (!progress.unlockedBadges.includes(badgeId)) {
      sounds.playFanfare();
      setProgress(prev => ({
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      }));
      handleAwardXP(50, 'Yangi nishon!');
    }
  };

  const handleCompleteStage = (stageId: StageId, stars: number) => {
    setProgress(prev => {
      const nextCompleted = prev.completedStages.includes(stageId)
        ? prev.completedStages
        : [...prev.completedStages, stageId];
      const nextStars = {
        ...prev.stageStars,
        [stageId]: Math.max(prev.stageStars[stageId] || 0, stars),
      };
      return {
        ...prev,
        completedStages: nextCompleted,
        stageStars: nextStars,
      };
    });
  };

  const handleSelectStage = (stageId: StageId) => {
    sounds.playClick();
    setCurrentStage(stageId);
    setProgress(prev => ({ ...prev, currentStage: stageId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStage = () => {
    sounds.playClick();
    if (currentStage < 7) {
      const next = (currentStage + 1) as StageId;
      handleSelectStage(next);
    }
  };

  // Font size classes
  const fontClass =
    prefs.fontSize === 'large'
      ? 'text-base sm:text-lg'
      : prefs.fontSize === 'xl'
      ? 'text-lg sm:text-xl'
      : 'text-sm sm:text-base';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${fontClass} ${
        prefs.highContrast ? 'contrast-125' : ''
      }`}
    >
      {/* Top Floating XP Toasts */}
      <FloatingXP events={xpEvents} onFinish={handleRemoveXpEvent} />

      {/* Main Navbar */}
      <Navbar
        progress={progress}
        prefs={prefs}
        onUpdatePrefs={handleUpdatePrefs}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenTeacher={() => setIsTeacherOpen(true)}
        onOpenProjector={() => setIsProjectorOpen(true)}
      />

      {/* App Body Container */}
      <main className="grow max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-6">
        {/* Stage Trail Navigator */}
        <StageNavigator
          currentStage={currentStage}
          progress={progress}
          lang={prefs.lang}
          onSelectStage={handleSelectStage}
        />

        {/* Dynamic Stage Content */}
        {currentStage === 1 && (
          <Stage1Intro
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onNextStage={handleNextStage}
          />
        )}

        {currentStage === 2 && (
          <Stage2Author
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onNextStage={handleNextStage}
          />
        )}

        {currentStage === 3 && (
          <Stage3Story
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onNextStage={handleNextStage}
          />
        )}

        {currentStage === 4 && (
          <Stage4Characters
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onNextStage={handleNextStage}
          />
        )}

        {currentStage === 5 && (
          <Stage5Games
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onNextStage={handleNextStage}
          />
        )}

        {currentStage === 6 && (
          <Stage6CaseStudy
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onUpdateProgress={handleUpdateProgress}
            onNextStage={handleNextStage}
          />
        )}

        {currentStage === 7 && (
          <Stage7Test
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUnlockBadge={handleUnlockBadge}
            onCompleteStage={handleCompleteStage}
            onUpdateProgress={handleUpdateProgress}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {/* Bonus Creative & Educational Sections */}
        <div className="pt-6">
          <BonusSections
            lang={prefs.lang}
            progress={progress}
            onAwardXP={handleAwardXP}
            onUpdateProgress={handleUpdateProgress}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-amber-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🐺</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Lobo — Karrumpo Qiroli
            </span>
            <span>• 7-sinf adabiyot darsi</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Ernest Seton-Tompson (1860–1946)</span>
            <span>•</span>
            <button
              onClick={() => setIsTeacherOpen(true)}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              {prefs.lang === 'uz' ? 'O‘qituvchi rejimi (PIN 1234)' : 'Учительская (PIN 1234)'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TeacherModal
        isOpen={isTeacherOpen}
        onClose={() => setIsTeacherOpen(false)}
        lang={prefs.lang}
        progress={progress}
      />

      <ProjectorMode
        isOpen={isProjectorOpen}
        onClose={() => setIsProjectorOpen(false)}
        lang={prefs.lang}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        lang={prefs.lang}
        progress={progress}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        lang={prefs.lang}
        progress={progress}
      />
    </div>
  );
}
