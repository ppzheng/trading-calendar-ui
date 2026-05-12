import type { SignalType, I18nText } from "@/lib/types";

// ─── Per-day entry ────────────────────────────────────────────────────────────

export interface TradingDay {
  date: string;        // ISO "2026-05-05"
  displayDate: string; // "5/5"
  ganzhi: string;      // "癸巳"  (not translated — proper name)
  type: SignalType;
  advice: I18nText;
}

// ─── Signal type UI config ───────────────────────────────────────────────────

export interface SignalTypeConfig {
  icon: string;
  label: I18nText;
  advice: I18nText;
  tooltip: I18nText;
  color: "green" | "yellow" | "blue" | "red";
}

// ─── Best / risk windows ──────────────────────────────────────────────────────

export interface BestWindow {
  title: I18nText;
  period: string;        // same in both locales
  features: I18nText[];
  suitableFor: I18nText[];
}

export interface RiskWindow {
  dates: string[];       // ["5/10", …]  same in both locales
  reason: I18nText;
  risks: I18nText[];
  advice: I18nText;
}

export interface Suggestion {
  index: string;         // "01"
  title: I18nText;
  body: I18nText;
}

// ─── Full plan ────────────────────────────────────────────────────────────────

export const tradingPlanMay2026 = {
  title: {
    zh: "交易计划",
    en: "TRADING PLAN",
  } satisfies I18nText,

  monthTitle: {
    zh: "癸巳月 · 2026年5月",
    en: "MAY 2026 · 癸巳月",
  } satisfies I18nText,

  period: "2026/5/5 — 2026/6/4",

  monthlyTheme: {
    keyword: {
      zh: "火势启动，市场感增强",
      en: "Fire energy ignites, market awareness sharpens",
    } satisfies I18nText,

    summary: {
      zh: "这是适合交易的月份，但风险不在火，而在火土燥化。",
      en: "A month well-suited for trading, but the real risk lies not in fire itself — it lies in the dry convergence of fire and earth.",
    } satisfies I18nText,

    highlights: [
      { zh: "巳火激活原局火势",      en: "Snake-fire activates the natal fire pattern" },
      { zh: "市场感明显增强",        en: "Market awareness significantly enhanced" },
      { zh: "出手欲望提升",          en: "Desire to act and trade is elevated" },
      { zh: "更容易主动判断趋势",    en: "Trend judgment becomes more intuitive" },
    ] satisfies I18nText[],

    risks: [
      { zh: "情绪上头",   en: "Emotional overreach" },
      { zh: "连续交易",   en: "Overtrading" },
      { zh: "扛单",       en: "Holding losing positions" },
      { zh: "不止损",     en: "Ignoring stop-losses" },
      { zh: "赌性增强",   en: "Increased gambling impulse" },
    ] satisfies I18nText[],
  },

  signalTypes: {
    trend: {
      icon: "🟢", color: "green",
      label:   { zh: "趋势日", en: "Trend Day" },
      advice:  { zh: "可主动进攻", en: "Actively trade trends" },
      tooltip: { zh: "木火流动，盘感增强，可主动进攻，适合趋势交易。", en: "Wood-fire flow active — market sensitivity heightens. Trade trends actively." },
    },
    follow: {
      icon: "🟡", color: "yellow",
      label:   { zh: "顺势日", en: "Follow Day" },
      advice:  { zh: "正常交易", en: "Trade normally" },
      tooltip: { zh: "节奏稳定，可正常交易，适合顺势波段与利润兑现。", en: "Rhythm is stable. Normal trading — suitable for momentum swings and profit-taking." },
    },
    adjust: {
      icon: "🔵", color: "blue",
      label:   { zh: "调整日", en: "Adjust Day" },
      advice:  { zh: "降低频率", en: "Reduce trading frequency" },
      tooltip: { zh: "土或水介入，建议降低频率，观察优先，避免执念。", en: "Earth or water energy intervenes — lower frequency, observe first, avoid fixation." },
    },
    risk: {
      icon: "🔴", color: "red",
      label:   { zh: "风险日", en: "Risk Day" },
      advice:  { zh: "禁止情绪交易", en: "No emotional trading allowed" },
      tooltip: { zh: "火土燥化，高风险情绪交易日，禁止重仓、连续交易和赌反转。", en: "Fire-earth dryness — high-risk emotional day. No heavy positions, no overtrading, no revenge trades." },
    },
  } satisfies Record<SignalType, SignalTypeConfig>,

  calendar: [
    // ── 5/5–5/11 ────────────────────────────────────────────────────────────
    { date: "2026-05-05", displayDate: "5/5",  ganzhi: "己卯", type: "adjust", advice: { zh: "天干土，卯木可用，轻仓顺势",       en: "Earth stem present. Wood remains active. Trade lightly with the trend." } },
    { date: "2026-05-06", displayDate: "5/6",  ganzhi: "庚辰", type: "adjust", advice: { zh: "辰土钝化，少主观判断",             en: "Chen earth slows judgment. Reduce subjective trading." } },
    { date: "2026-05-07", displayDate: "5/7",  ganzhi: "辛巳", type: "follow", advice: { zh: "火金并见，可交易可兑现",           en: "Fire and metal coexist. Suitable for trading and profit-taking." } },
    { date: "2026-05-08", displayDate: "5/8",  ganzhi: "壬午", type: "trend",  advice: { zh: "午火激活，市场感强",               en: "Wu fire activates momentum. Strong market sensitivity." } },
    { date: "2026-05-09", displayDate: "5/9",  ganzhi: "癸未", type: "adjust", advice: { zh: "未土介入，避免扛单",               en: "Wei earth enters. Avoid holding losing positions." } },
    { date: "2026-05-10", displayDate: "5/10", ganzhi: "甲申", type: "follow", advice: { zh: "木透带金，适合波段",               en: "Wood with metal. Good for swing trading." } },
    { date: "2026-05-11", displayDate: "5/11", ganzhi: "乙酉", type: "follow", advice: { zh: "木金并见，适合止盈",               en: "Wood and metal balance. Suitable for taking profits." } },
    // ── 5/12–5/18 ───────────────────────────────────────────────────────────
    { date: "2026-05-12", displayDate: "5/12", ganzhi: "丙戌", type: "risk",   advice: { zh: "火土燥，禁重仓",                   en: "Dry fire-earth clash. Avoid heavy positions." } },
    { date: "2026-05-13", displayDate: "5/13", ganzhi: "丁亥", type: "trend",  advice: { zh: "丁火有水调，可交易",               en: "Fire moderated by water. Tradable environment." } },
    { date: "2026-05-14", displayDate: "5/14", ganzhi: "戊子", type: "adjust", advice: { zh: "天干土，观察为主",                 en: "Earth stem dominates. Observation preferred." } },
    { date: "2026-05-15", displayDate: "5/15", ganzhi: "己丑", type: "adjust", advice: { zh: "土重，判断易钝",                   en: "Heavy earth energy. Judgment may become dull." } },
    { date: "2026-05-16", displayDate: "5/16", ganzhi: "庚寅", type: "trend",  advice: { zh: "寅木生火，盘感增强",               en: "Yin wood fuels fire. Stronger market intuition." } },
    { date: "2026-05-17", displayDate: "5/17", ganzhi: "辛卯", type: "trend",  advice: { zh: "卯木流动，适合顺势",               en: "Flowing wood energy. Ideal for trend following." } },
    { date: "2026-05-18", displayDate: "5/18", ganzhi: "壬辰", type: "adjust", advice: { zh: "辰土拖慢节奏",                     en: "Chen earth slows momentum." } },
    // ── 5/19–5/25 ───────────────────────────────────────────────────────────
    { date: "2026-05-19", displayDate: "5/19", ganzhi: "癸巳", type: "follow", advice: { zh: "巳火启动，可轻进攻",               en: "Si fire activates. Light offensive trading possible." } },
    { date: "2026-05-20", displayDate: "5/20", ganzhi: "甲午", type: "trend",  advice: { zh: "木火流动，适合主动交易",           en: "Wood-fire flow. Great for active trading." } },
    { date: "2026-05-21", displayDate: "5/21", ganzhi: "乙未", type: "adjust", advice: { zh: "未土介入，轻仓调整",               en: "Wei earth enters. Reduce positions and adjust." } },
    { date: "2026-05-22", displayDate: "5/22", ganzhi: "丙申", type: "follow", advice: { zh: "火金并见，适合兑现",               en: "Fire and metal coexist. Good for profit-taking." } },
    { date: "2026-05-23", displayDate: "5/23", ganzhi: "丁酉", type: "follow", advice: { zh: "丁火有金制，可正常交易",           en: "Fire moderated by metal. Normal trading conditions." } },
    { date: "2026-05-24", displayDate: "5/24", ganzhi: "戊戌", type: "risk",   advice: { zh: "火土燥化，禁止情绪交易",           en: "Fire-earth imbalance. No emotional trading." } },
    { date: "2026-05-25", displayDate: "5/25", ganzhi: "己亥", type: "adjust", advice: { zh: "天干土，亥水稍调，降低频率",       en: "Earth stem present, water slightly offsets. Reduce frequency." } },
    // ── 5/26–6/1 ────────────────────────────────────────────────────────────
    { date: "2026-05-26", displayDate: "5/26", ganzhi: "庚子", type: "follow", advice: { zh: "金水流动，适合止盈波段",           en: "Metal-water flow. Suitable for swing profit-taking." } },
    { date: "2026-05-27", displayDate: "5/27", ganzhi: "辛丑", type: "adjust", advice: { zh: "丑土较重，观察为主",               en: "Chou earth is heavy. Observation preferred." } },
    { date: "2026-05-28", displayDate: "5/28", ganzhi: "壬寅", type: "trend",  advice: { zh: "水木流动，趋势感增强",             en: "Water-wood flow. Trend intuition sharpens." } },
    { date: "2026-05-29", displayDate: "5/29", ganzhi: "癸卯", type: "trend",  advice: { zh: "卯木流动，适合顺势",               en: "Flowing wood energy. Trend-following conditions." } },
    { date: "2026-05-30", displayDate: "5/30", ganzhi: "甲辰", type: "follow", advice: { zh: "木气仍在，辰土稍阻",               en: "Wood energy persists with slight earth resistance." } },
    { date: "2026-05-31", displayDate: "5/31", ganzhi: "乙巳", type: "trend",  advice: { zh: "木火激活，盘感增强",               en: "Wood-fire activates. Market intuition heightens." } },
    { date: "2026-06-01", displayDate: "6/1",  ganzhi: "丙午", type: "trend",  advice: { zh: "午火强势，市场感极强",             en: "Wu fire is strong. Exceptional market sensitivity." } },
    // ── 6/2–6/4 ─────────────────────────────────────────────────────────────
    { date: "2026-06-02", displayDate: "6/2",  ganzhi: "丁未", type: "risk",   advice: { zh: "火土燥化，本周期高风险日",         en: "Fire-earth imbalance. High-risk day for this cycle." } },
    { date: "2026-06-03", displayDate: "6/3",  ganzhi: "戊申", type: "adjust", advice: { zh: "天干戊土，观察优先",               en: "Earth stem dominates. Observation preferred." } },
    { date: "2026-06-04", displayDate: "6/4",  ganzhi: "己酉", type: "adjust", advice: { zh: "天干己土，收尾调整日",             en: "Earth stem present. Closing adjustment day." } },
  ] satisfies TradingDay[],

  bestWindows: [
    {
      title:      { zh: "最佳交易窗口", en: "Best Trading Window" },
      period:     "5/16 — 5/17",
      features:   [
        { zh: "木火流动", en: "Wood-fire flow"              },
        { zh: "盘感增强", en: "Enhanced market intuition"   },
      ],
      suitableFor: [
        { zh: "趋势交易", en: "Trend trading"      },
        { zh: "主动进攻", en: "Active positioning" },
      ],
    },
    {
      title:      { zh: "重点趋势窗口", en: "Momentum Window" },
      period:     "5/20",
      features:   [
        { zh: "主动进攻", en: "Active offensive trading" },
      ],
      suitableFor: [
        { zh: "趋势交易",       en: "Trend trading"                 },
        { zh: "主动进攻型策略", en: "Active directional strategies" },
      ],
    },
    {
      title:      { zh: "月末强势窗口", en: "Late-Month Strong Window" },
      period:     "5/28 — 6/1",
      features:   [
        { zh: "趋势恢复", en: "Trend recovery"             },
        { zh: "盘感增强", en: "Improved market sensitivity" },
      ],
      suitableFor: [
        { zh: "趋势交易", en: "Trend trading"         },
        { zh: "顺势波段", en: "Momentum swing trades" },
      ],
    },
  ] satisfies BestWindow[],

  riskWindows: [
    {
      dates:  ["5/12", "5/24", "6/2"],
      reason: { zh: "火土燥化明显",           en: "Strong fire-earth imbalance" },
      risks:  [
        { zh: "情绪化交易", en: "Emotional trading"              },
        { zh: "连续加仓",   en: "Repeated position adding"       },
        { zh: "止损失效",   en: "Loss of stop-loss discipline"   },
      ],
      advice: { zh: "控仓、减少频率、禁止赌反转。", en: "Reduce position size, lower frequency, no revenge trading." },
    },
  ] satisfies RiskWindow[],

  strategy: {
    suitable: [
      { zh: "趋势交易",       en: "Trend trading"                 },
      { zh: "顺势波段",       en: "Momentum swing trading"        },
      { zh: "主动进攻型策略", en: "Active directional strategies" },
    ] satisfies I18nText[],
    notSuitable: [
      { zh: "死扛亏损单", en: "Holding losing trades"       },
      { zh: "情绪重仓",   en: "Emotional position sizing"   },
      { zh: "连续加仓",   en: "Averaging down"              },
      { zh: "赌反转",     en: "Betting on reversals"        },
    ] satisfies I18nText[],
  },

  summary: {
    sentence: { zh: "鹏哥不是怕火。",                                       en: "Peng is not afraid of fire." } satisfies I18nText,
    keyPoint: { zh: "真正需要防的是火土燥化后的节奏失控。", en: "The real danger is losing rhythm during fire-earth imbalance." } satisfies I18nText,
  },

  radarData: [
    { label: "Momentum", value: 75 },
    { label: "Trend",    value: 68 },
    { label: "Volume",   value: 60 },
    { label: "Sentiment",value: 72 },
    { label: "Stability",value: 42 },
  ],

  signalBars: [
    {
      label:       { zh: "月度市场感",   en: "Market Awareness" } satisfies I18nText,
      value:       72,
      description: { zh: "火势启动，盘感显著提升，出手欲望增强", en: "Fire energy ignites, market feel rises sharply, desire to act increases" } satisfies I18nText,
    },
    {
      label:       { zh: "情绪风险指数", en: "Emotional Risk" } satisfies I18nText,
      value:       68,
      isRisk:      true,
      description: { zh: "火土燥化带来情绪风险，防止失控后连续交易", en: "Fire-earth dryness creates emotional risk — prevent overtrading after losing control" } satisfies I18nText,
    },
    {
      label:       { zh: "趋势敏锐度",  en: "Trend Clarity" } satisfies I18nText,
      value:       75,
      description: { zh: "木火流动期判断敏锐，趋势把握力增强", en: "Wood-fire flow period sharpens judgment, trend perception strengthens" } satisfies I18nText,
    },
  ],

  // Pre-composed suggestions (avoids locale-conditional template strings in components)
  suggestions: [
    {
      index: "01",
      title: { zh: "优先捕捉趋势窗口",   en: "Prioritize Trend Windows" } satisfies I18nText,
      body:  {
        zh: "5/16–5/17、5/20 和 5/28–6/1 是本月最佳做单窗口，适合趋势交易、顺势波段、主动进攻型策略。",
        en: "May 16–17, May 20, and May 28–June 1 are the best trading windows this month. Suitable for trend trading, momentum swings, and active directional strategies.",
      } satisfies I18nText,
    },
    {
      index: "02",
      title: { zh: "远离风险日",         en: "Avoid Risk Days" } satisfies I18nText,
      body:  {
        zh: "5/12、5/24、6/2 为高风险日（火土燥化明显）。控仓、减少频率、禁止赌反转。",
        en: "May 12, May 24, and June 2 are high-risk days (fire-earth imbalance). Reduce position size, lower frequency, no revenge trading.",
      } satisfies I18nText,
    },
    {
      index: "03",
      title: { zh: "鹏哥不是怕火",       en: "Fire Is Not the Enemy" } satisfies I18nText,
      body:  {
        zh: "鹏哥不是怕火。真正需要防的是火土燥化后的节奏失控。",
        en: "Peng is not afraid of fire. The real danger is losing rhythm during fire-earth imbalance.",
      } satisfies I18nText,
    },
  ] satisfies Suggestion[],
};
