import React from 'react';

// ============================================================================
// NARRATIVE MOTION REMOTION KIT (kit.tsx)
// Deterministic 1920x1080 @ 30fps tokens and layout primitives
// ============================================================================

export const FPS = 30;
export const JOIN_FRAMES = 4; // 133.3ms camera <-> PiP box morph duration

export interface Theme {
  mode: 'dark' | 'light';
  bezel: string;
  bg: string;
  grid: string;
  card: string;
  cardElevated: string;
  cardCode: string;
  cardBorder: string;
  cardDashedBorder: string;
  cardShadow: string;
  ink: string;
  muted: string;
  dim: string;
  accent: string;
  accentMid: string;
  accentPillBg: string;
}

export const DARK_THEME: Theme = {
  mode: 'dark',
  bezel: '#060808',
  bg: '#16221C',
  grid: 'rgba(242, 244, 238, 0.045)',
  card: '#1A2720',
  cardElevated: '#1A2820',
  cardCode: '#131A16',
  cardBorder: 'rgba(242, 244, 238, 0.08)',
  cardDashedBorder: 'rgba(122, 230, 168, 0.35)',
  cardShadow: '0 18px 44px rgba(0,0,0,0.42), 0 2px 6px rgba(0,0,0,0.28)',
  ink: '#F2F4EE',
  muted: '#8FA196',
  dim: '#627369',
  accent: '#7AE6A8',
  accentMid: '#59A67D',
  accentPillBg: '#1E3A2B',
};

export const LIGHT_THEME: Theme = {
  mode: 'light',
  bezel: '#060808',
  bg: '#F2F4EE',
  grid: 'rgba(22, 34, 28, 0.055)',
  card: '#FFFFFF',
  cardElevated: '#F7F8F4',
  cardCode: '#EAECE5',
  cardBorder: 'rgba(22, 34, 28, 0.10)',
  cardDashedBorder: 'rgba(29, 122, 76, 0.40)',
  cardShadow: '0 16px 36px rgba(22,34,28,0.10), 0 2px 6px rgba(22,34,28,0.06)',
  ink: '#16221C',
  muted: '#5A655E',
  dim: '#8FA196',
  accent: '#1D7A4C',
  accentMid: '#2E9462',
  accentPillBg: '#DCEEE4',
};

export const THEME = DARK_THEME;

export const TOK = {
  amber: '#E7B24A',
  amberPillBg: '#382D18',
  red: '#E86B60',
  redPillBg: '#3A1D1B',
  soft: '#1A2720',
  deep: '#101814',
};

// Spatial coordinates in 1920x1080 design pixels
export const BEZEL = { thickness: 20, radius: 20 };
export const BOX = { x: 1657, y: 368, w: 223, h: 344, r: 20 };
export const ZONE_X = 1617;
export const PLANE = { x: 60, w: 1557, h: 1080, centre: 121 };
export const SAFE = { x0: 96, x1: 1824, y0: 54, y1: 1026, inkFloor: 0.08 };
export const CROP = { cx: 0.488, top: 0.02, hf: 0.82 };
export const FACE: [number, number] = [937, 330];

// Vertical 9:16 (1080x1920) adaptation constants
export const VERTICAL_9_16 = {
  width: 1080,
  height: 1920,
  safeZone: { x0: 90, x1: 920, y0: 140, y1: 1520 },
  bottomSpeakerBox: { x: 120, y: 1280, w: 840, h: 440, r: 28, headOverflowTopPx: 40 },
};

// Dynamic elevation shadow for speaker cutout box (k = 0 at fullscreen, k = 1 at PiP BOX)
export const boxShadow = (k: number): string =>
  `0 1px 2px rgba(0,0,0,${(0.35 * k).toFixed(3)}), ` +
  `0 10px 24px rgba(0,0,0,${(0.45 * k).toFixed(3)}), ` +
  `0 26px 60px rgba(0,0,0,${(0.55 * k).toFixed(3)}), ` +
  `0 0 0 1px rgba(242,244,238,${(0.08 * k).toFixed(3)})`;

// Cubic ease-out helper for 4-frame joins
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);

// Interpolate speaker container between Full A-Roll (k=0) and Right PiP Box (k=1)
export function getSpeakerBoxRect(kRaw: number) {
  const k = easeOutCubic(kRaw);
  return {
    x: 0 + (BOX.x - 0) * k,
    y: 0 + (BOX.y - 0) * k,
    w: 1920 + (BOX.w - 1920) * k,
    h: 1080 + (BOX.h - 1080) * k,
    r: 0 + (BOX.r - 0) * k,
    cx: 0.5 + (CROP.cx - 0.5) * k,
    top: 0.0 + (CROP.top - 0.0) * k,
    hf: 1.0 + (CROP.hf - 1.0) * k,
    shadow: boxShadow(k),
  };
}
