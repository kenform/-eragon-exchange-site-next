# Assets Workflow (Elven Portal)

Этот файл — единый регламент по работе с изображениями для сайта.

## 1) Куда класть файлы

```text
/public/images/
  hero/      # hero backgrounds, moonlight scenes
  symbols/   # sigils, runes, sacred geometry (лучше SVG)
  decor/     # декоративные атмосферные объекты
  textures/  # mist, dust, grain, soft overlays
```

## 2) Что хранить где

- `hero/`: главные фоновые изображения hero (`portal-bg.webp`)
- `symbols/`: эмблемы и сигилы (`elven-sigil.svg`)
- `decor/`: вторичные визуальные элементы (`dragon-silhouette.webp`)
- `textures/`: туман/пыль/шум (`mist-soft.webp`, `dust-layer.webp`)

## 3) Рекомендуемые форматы

- Hero background: **WEBP** (или AVIF, если стабильный экспорт)
- Symbols/sigils: **SVG**
- Decor: **WEBP** (PNG только если нужно)
- Textures: **WEBP/PNG**

## 4) Рекомендуемые размеры

- Hero: `4096x2304` (или 3840 по ширине)
- Symbols (если не SVG): `2048x2048`
- Decor: `2048–4096` по длинной стороне
- Textures: `2048x2048` или `3072x3072`

## 5) Как загружать через GitHub UI

1. Открыть репозиторий
2. Перейти в нужную папку (`public/images/...`)
3. `Add file` → `Upload files`
4. Загрузить файлы
5. Сделать commit

## 6) Как подключать в коде

Все базовые пути централизованы в:

- `src/config/assets.ts`

Пример:

```ts
import { assets } from '@/config/assets';

const heroBg = assets.hero.portalBg;
const sigil = assets.symbols.elvenSigil;
```

Если alias `@/` не используется, импортируйте относительным путём.

## 7) Важные правила качества

- Не перегружать hero деталями
- Сохранять читаемость текста и CTA
- Проверять mobile и Telegram in-app browser
- Лучше 2–3 тонких слоя, чем 1 громкий эффект
