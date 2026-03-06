export const imageBase = '/images' as const;

export const assets = {
  hero: {
    portalBg: `${imageBase}/hero/portal-bg.png`,
    portalBgAlt: `${imageBase}/hero/portal-bg-alt.webp`,
    moonOverlay: `${imageBase}/hero/moon-overlay.webp`,
  },
  symbols: {
    elvenSigil: `${imageBase}/symbols/elven-sigil.png`,
    riderSeal: `${imageBase}/symbols/rider-seal.svg`,
    sacredRing: `${imageBase}/symbols/sacred-ring.svg`,
  },
  decor: {
    dragonSilhouette: `${imageBase}/decor/dragon-silhouette.webp`,
    elvenArch: `${imageBase}/decor/elven-arch.webp`,
    moonGate: `${imageBase}/decor/moon-gate.webp`,
  },
  textures: {
    mistSoft: `${imageBase}/textures/mist-soft.webp`,
    mistDeep: `${imageBase}/textures/mist-deep.webp`,
    dustLayer: `${imageBase}/textures/dust-layer.webp`,
    grainFine: `${imageBase}/textures/grain-fine.webp`,
  },
} as const;

export type AssetRegistry = typeof assets;
