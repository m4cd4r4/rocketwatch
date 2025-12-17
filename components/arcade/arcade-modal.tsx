'use client';

import { useEffect, useState } from 'react';
import { GameSelection, type GameType } from './game-selection';
import { AsteroidsGame } from './asteroids-game';
import { InvadersGame } from './invaders-game';
import { SnakeGame } from './snake-game';
import { BreakoutGame } from './breakout-game';
import { MissileCommandGame } from './missile-command-game';
import { ThrustGame } from './thrust-game';
import { DefenderGame } from './defender-game';
import { LunarLanderGame } from './lunar-lander-game';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArcadeModal({ isOpen, onClose }: ArcadeModalProps): JSX.Element | null {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset game selection when modal opens
      setSelectedGame(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBack = () => {
    setSelectedGame(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8"
      onClick={selectedGame ? undefined : onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-fit px-4">
        {!selectedGame && (
          <GameSelection onSelectGame={setSelectedGame} onClose={onClose} />
        )}
        {selectedGame === 'asteroids' && <AsteroidsGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'invaders' && <InvadersGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'snake' && <SnakeGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'breakout' && <BreakoutGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'missile-command' && <MissileCommandGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'thrust' && <ThrustGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'defender' && <DefenderGame onClose={onClose} onBack={handleBack} />}
        {selectedGame === 'lunar-lander' && <LunarLanderGame onClose={onClose} onBack={handleBack} />}
      </div>
    </div>
  );
}
