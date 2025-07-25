'use client';

import { useEffect, useState } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomInitial = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export function useUserAvatar() {
  const [initial, setInitial] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    let storedInitial = localStorage.getItem('userAvatarInitial');
    let storedColor = localStorage.getItem('userAvatarColor');

    if (!storedInitial || !storedColor) {
      storedInitial = getRandomInitial();
      storedColor = getRandomColor();

      localStorage.setItem('userAvatarInitial', storedInitial);
      localStorage.setItem('userAvatarColor', storedColor);
    }

    setInitial(storedInitial);
    setColor(storedColor);
  }, []);

  return { initial, color };
}
