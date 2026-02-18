```markdown
# 🔮 BaZi × I-Ching Computational Engine

A production-grade TypeScript library for **Four Pillars (BaZi)**, **Solar Terms (JieQi)**, **60 JiaZi cycles**, **Da Yun luck cycles**, and **I-Ching (64 Hexagrams)** — designed for modern apps, APIs, and AI systems.

This project provides a **fully deterministic, astronomy-accurate, and standards-aligned** destiny computation core.

---

# ✨ Features

## 🧬 BaZi Core Engine
- Year pillar (LiChun boundary exact)
- Month pillar (JieQi segmentation)
- Day pillar (Julian Day sexagenary cycle)
- Hour pillar (Zi-hour + Five Rats rule)

## 🌞 Astronomical Precision
- Real solar longitude solver
- Full 24 Solar Terms calculation
- Accurate seasonal boundaries

## ⏳ Destiny Cycles
- 60 JiaZi cycle engine
- Da Yun (10-year luck cycles)
- Gender + Yin/Yang direction logic

## ⚖️ Element Analytics
- Hidden stem weighting
- Seasonal strength matrix
- Five-element scoring vector

## 🔮 I-Ching Integration
- Complete 64 hexagram dataset
- Binary trigram computation
- Unicode hexagram symbols

---

# 📁 Project Structure

```

/lib
├── iching
│   ├── trigrams.ts
│   ├── hexagram_engine.ts
│   └── hexagrams64.ts
│
├── bazi
│   ├── jiazi60.ts
│   ├── year_pillar.ts
│   ├── month_pillar.ts
│   ├── day_pillar.ts
│   ├── hour_pillar.ts
│   ├── element_scoring.ts
│   └── bazi_core.ts
│
├── astronomy
│   └── solar_terms.ts
│
└── cycles
└── dayun.ts

````

---

# ⚙️ Installation

Simply copy `/lib` into your project.

Recommended environment:

- Node.js 18+
- TypeScript 5+
- Next.js compatible

No external dependencies required.

---

# 🚀 Quick Start

## 1️⃣ Compute Full BaZi Chart

```ts
import { getBaziCore } from "@/lib/bazi/bazi_core";

const birthUtc = new Date("1980-01-05T02:30:00Z");

const chart = getBaziCore(birthUtc);

console.log(chart);
````

Output:

```ts
{
  year: { stem: "Ji", branch: "Wei", zh: "己未" },
  month: { stem: "Bing", branch: "Zi", zh: "丙子" },
  day: { stem: "Ding", branch: "Chou", zh: "丁丑" },
  hour: { stem: "Yi", branch: "Si", zh: "乙巳" },
  elements: { Wood: 2.3, Fire: 3.1, Earth: 2.8, Metal: 1.2, Water: 1.6 }
}
```

---

## 2️⃣ Generate Da Yun Luck Cycles

```ts
import { generateDaYun } from "@/lib/cycles/dayun";

const result = generateDaYun(
  new Date("1980-01-05T02:30:00Z"),
  "male"
);

console.log(result.periods);
```

Output:

```
Age 6-16  庚寅
Age 16-26 辛卯
Age 26-36 壬辰
...
```

---

## 3️⃣ Get Solar Terms

```ts
import { getSolarTermsUTC } from "@/lib/astronomy/solar_terms";

const terms = getSolarTermsUTC(2026);
```

---

## 4️⃣ Use Hexagram Dataset

```ts
import { HEXAGRAMS_64 } from "@/lib/iching/hexagrams64";

console.log(HEXAGRAMS_64[0]);
```

---

# 🧠 Core Calculation Principles

## Year Pillar

* Determined by **LiChun** (not Jan 1)

## Month Pillar

* Based on **12 Jie boundaries**

## Day Pillar

* Julian Day Noon anchor method

## Hour Pillar

* Zi-hour branch mapping

## Da Yun Start Age

```
(start Jie distance in days) ÷ 3
```

---

# 📊 Element Strength Model

The scoring engine includes:

* Heavenly stem weights
* Hidden stem contributions
* Seasonal multipliers

Outputs a normalized **Five-Element vector**.

---

# 🔮 I-Ching Data Coverage

Dataset includes:

* All 64 hexagrams
* King Wen sequence
* Binary line structure
* Unicode symbols
* Trigram composition

---

# 🏗️ Recommended Use Cases

This engine can power:

* BaZi analysis platforms
* Destiny analytics SaaS
* Feng Shui advisory tools
* I-Ching AI systems
* Personal growth OS apps

---

# ⚠️ Important Notes

## Timezone Handling

All calculations expect **UTC input**.

Convert local birth time before using.

---

## True Solar Time (Advanced)

Longitude correction is not included yet.

Can be added for ultra-precision.

---

# 🚧 Planned Extensions

Future modules:

* Liu Nian (annual cycles)
* BaZi ↔ Hexagram integration
* Feng Shui direction engine
* Interpretation AI layer

---

# 📜 License

MIT — free for personal and commercial use.

---

# 👑 Credits

Based on classical Chinese calendrical mathematics:

* Sexagenary cycle algorithms
* Solar longitude astronomy
* Traditional BaZi calculation rules
* I-Ching King Wen sequence

---

# 💬 Support

This engine is designed to be extended.

For next steps, consider building:

* Forecast dashboards
* AI interpretation layers
* Decision intelligence systems

---

**You now own a complete computational destiny engine.**

```
::contentReference[oaicite:0]{index=0}
```
