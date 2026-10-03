import React, { useEffect, useState } from 'react';

interface FloatingXPItem {
  id: number;
  amount: number;
  label?: string;
}

export const FloatingXP: React.FC<{
  events: Array<{ id: number; amount: number; label?: string }>;
  onFinish: (id: number) => void;
}> = ({ events, onFinish }) => {
  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-none flex flex-col gap-2">
      {events.map(item => (
        <XPBadge key={item.id} item={item} onFinish={() => onFinish(item.id)} />
      ))}
    </div>
  );
};

const XPBadge: React.FC<{ item: FloatingXPItem; onFinish: () => void }> = ({ item, onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 1800);
    return () => clearTimeout(timer);
  }, [item, onFinish]);

  if (!visible) return null;

  return (
    <div className="animate-float-xp flex items-center gap-1.5 px-3.5 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm rounded-full shadow-lg border-2 border-amber-200">
      <span>✨</span>
      <span>+{item.amount} XP</span>
      {item.label && <span className="text-xs font-medium text-amber-100">({item.label})</span>}
    </div>
  );
};
