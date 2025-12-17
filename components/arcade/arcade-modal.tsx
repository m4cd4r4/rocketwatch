'use client';

import { useEffect, useState } from 'react';
import { GameSelection, type GameType } from './game-selection';
import { AsteroidsGame } from './asteroids-game';
import { InvadersGame } from './invaders-game';
import { SnakeGame } from './snake-game';
import { BreakoutGame } from './breakout-game';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArcadeModal({ isOpen, onClose }: ArcadeModalProps): JSX.Element | null {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset game selection when modal closes
      setSelectedGame(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBack = () => {
    setSelectedGame(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-void/95 backdrop-blur-sm overflow-auto"
      onClick={selectedGame ? undefined : onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-fit">
          {!selectedGame && (
            <GameSelection onSelectGame={setSelectedGame} onClose={onClose} />
          )}
          {selectedGame === 'asteroids' && <AsteroidsGame onClose={onClose} onBack={handleBack} />}
          {selectedGame === 'invaders' && <InvadersGame onClose={onClose} onBack={handleBack} />}
          {selectedGame === 'snake' && <SnakeGame onClose={onClose} onBack={handleBack} />}
          {selectedGame === 'breakout' && <BreakoutGame onClose={onClose} onBack={handleBack} />}
        </div>
      </div>
    </div>
  );
}
