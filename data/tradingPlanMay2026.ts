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
    { date: "2026-05-05", displayDate: "5/5",  ganzhi: "癸巳", type: "follow", advice: { zh: "市场感启动，可顺势",         en: "Market awareness activates. Follow the trend." } },
    { date: "2026-05-06", displayDate: "5/6",  ganzhi: "甲午", type: "trend",  advice: { zh: "趋势感强，适合主动交易",     en: "Trend feel is strong. Trade actively." } },
    { date: "2026-05-07", displayDate: "5/7",  ganzhi: "乙未", type: "adjust", advice: { zh: "土气介入，避免执念",         en: "Earth energy intervenes. Avoid fixation." } },
    { date: "2026-05-08", displayDate: "5/8",  ganzhi: "丙申", type: "follow", advice: { zh: "节奏稳定，可波段",           en: "Rhythm is stable. Swing trade." } },
    { date: "2026-05-09", displayDate: "5/9",  ganzhi: "丁酉", type: "follow", advice: { zh: "适合止盈兑现",               en: "Good day to take profits." } },
    { date: "2026-05-10", displayDate: "5/10", ganzhi: "戊戌", type: "risk",   advice: { zh: "火土燥化，禁止重仓",         en: "Fire-earth dryness. No heavy positions." } },
    { date: "2026-05-11", displayDate: "5/11", ganzhi: "己亥", type: "adjust", advice: { zh: "情绪偏冷，适合观察",         en: "Emotions run cold. Observe only." } },
    { date: "2026-05-12", displayDate: "5/12", ganzhi: "庚子", type: "adjust", advice: { zh: "降低频率，等待确认",         en: "Reduce frequency. Wait for confirmation." } },
    { date: "2026-05-13", displayDate: "5/13", ganzhi: "辛丑", type: "adjust", advice: { zh: "判断易钝化",                 en: "Judgment tends to dull. Stay patient." } },
    { date: "2026-05-14", displayDate: "5/14", ganzhi: "壬寅", type: "trend",  advice: { zh: "木气启动，盘感增强",         en: "Wood energy rises. Market feel improves." } },
    { date: "2026-05-15", displayDate: "5/15", ganzhi: "癸卯", type: "trend",  advice: { zh: "本月优质趋势日",             en: "Top-quality trend day this month." } },
    { date: "2026-05-16", displayDate: "5/16", ganzhi: "甲辰", type: "adjust", advice: { zh: "土木相困，轻仓",             en: "Wood-earth conflict. Keep positions light." } },
    { date: "2026-05-17", displayDate: "5/17", ganzhi: "乙巳", type: "trend",  advice: { zh: "火势流动，适合进攻",         en: "Fire flows smoothly. Good for active trading." } },
    { date: "2026-05-18", displayDate: "5/18", ganzhi: "丙午", type: "trend",  advice: { zh: "市场感强，可做趋势",         en: "Strong market feel. Ride the trend." } },
    { date: "2026-05-19", displayDate: "5/19", ganzhi: "丁未", type: "risk",   advice: { zh: "火土结块，高风险",           en: "Fire-earth blockage. High risk day." } },
    { date: "2026-05-20", displayDate: "5/20", ganzhi: "戊申", type: "adjust", advice: { zh: "调整节奏，减少频率",         en: "Adjust pace. Reduce trading frequency." } },
    { date: "2026-05-21", displayDate: "5/21", ganzhi: "己酉", type: "adjust", advice: { zh: "适合止盈与复盘",             en: "Good day for profit-taking and review." } },
    { date: "2026-05-22", displayDate: "5/22", ganzhi: "庚戌", type: "risk",   advice: { zh: "易情绪交易",                 en: "Prone to emotional trading. Exercise restraint." } },
    { date: "2026-05-23", displayDate: "5/23", ganzhi: "辛亥", type: "adjust", advice: { zh: "观察优先",                   en: "Observe first. No rush to trade." } },
    { date: "2026-05-24", displayDate: "5/24", ganzhi: "壬子", type: "adjust", advice: { zh: "市场感偏弱",                 en: "Market feel is weak. Stay cautious." } },
    { date: "2026-05-25", displayDate: "5/25", ganzhi: "癸丑", type: "adjust", advice: { zh: "易陷执念，勿扛单",           en: "Prone to fixation. Do not hold losers." } },
    { date: "2026-05-26", displayDate: "5/26", ganzhi: "甲寅", type: "trend",  advice: { zh: "适合主动进攻",               en: "Well-suited for active, aggressive trading." } },
    { date: "2026-05-27", displayDate: "5/27", ganzhi: "乙卯", type: "trend",  advice: { zh: "本月最佳交易日之一",         en: "One of the best trading days this month." } },
    { date: "2026-05-28", displayDate: "5/28", ganzhi: "丙辰", type: "adjust", advice: { zh: "土气回升，控仓",             en: "Earth energy returns. Control position size." } },
    { date: "2026-05-29", displayDate: "5/29", ganzhi: "丁巳", type: "trend",  advice: { zh: "火势流动，适合顺势",         en: "Fire flows. Follow the trend." } },
    { date: "2026-05-30", displayDate: "5/30", ganzhi: "戊午", type: "adjust", advice: { zh: "有交易欲，避免冲动",         en: "Trading urge is elevated. Avoid impulse." } },
    { date: "2026-05-31", displayDate: "5/31", ganzhi: "己未", type: "risk",   advice: { zh: "火土燥化，本月高风险",       en: "Fire-earth dryness. Highest risk day this month." } },
    { date: "2026-06-01", displayDate: "6/1",  ganzhi: "庚申", type: "follow", advice: { zh: "节奏恢复",                   en: "Rhythm normalizes. Resume measured trading." } },
    { date: "2026-06-02", displayDate: "6/2",  ganzhi: "辛酉", type: "follow", advice: { zh: "适合利润兑现",               en: "Good day to realize profits." } },
    { date: "2026-06-03", displayDate: "6/3",  ganzhi: "壬戌", type: "adjust", advice: { zh: "易执念，减少主观判断",       en: "Prone to fixation. Reduce subjectivity." } },
    { date: "2026-06-04", displayDate: "6/4",  ganzhi: "癸亥", type: "adjust", advice: { zh: "收尾观察日",                 en: "Closing observation day for this cycle." } },
  ] satisfies TradingDay[],

  bestWindows: [
    {
      title:      { zh: "第一阶段", en: "Phase 1" },
      period:     "5/14 — 5/18",
      features:   [
        { zh: "木火流动", en: "Wood-fire flow"       },
        { zh: "盘感强",   en: "Strong market feel"   },
        { zh: "行动力强", en: "High execution drive" },
        { zh: "趋势敏锐", en: "Sharp trend instinct" },
      ],
      suitableFor: [
        { zh: "趋势交易", en: "Trend trading"      },
        { zh: "主动进攻", en: "Active positioning" },
      ],
    },
    {
      title:      { zh: "第二阶段", en: "Phase 2" },
      period:     "5/26 — 5/29",
      features:   [
        { zh: "市场节奏恢复", en: "Rhythm normalizes"         },
        { zh: "判断清晰",     en: "Judgment is clear"        },
        { zh: "容易抓波段",   en: "Swing opportunities open" },
      ],
      suitableFor: [
        { zh: "趋势交易", en: "Trend trading"         },
        { zh: "顺势波段", en: "Momentum swing trades" },
      ],
    },
  ] satisfies BestWindow[],

  riskWindows: [
    {
      dates:  ["5/10", "5/19", "5/22", "5/31"],
      reason: { zh: "火土燥化明显",                         en: "Fire-earth dryness is pronounced" },
      risks:  [
        { zh: "情绪上头",   en: "Emotional overreach"              },
        { zh: "连续交易",   en: "Overtrading"                      },
        { zh: "不止损",     en: "Ignoring stop-losses"             },
        { zh: "情绪化加仓", en: "Emotionally adding to positions"  },
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
    sentence: { zh: "这是一个市场感增强的月份。",              en: "This is a month of heightened market awareness." } satisfies I18nText,
    keyPoint: { zh: "真正需要控制的不是机会，而是情绪失控后的连续交易。", en: "What truly needs to be controlled is not opportunity, but the chain of trades that follows emotional breakdown." } satisfies I18nText,
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
        zh: "5/14–5/18（第一阶段）和 5/26–5/29（第二阶段）是本月最佳做单窗口，适合趋势交易、顺势波段、主动进攻型策略。",
        en: "May 14–18 (Phase 1) and May 26–29 (Phase 2) are the best trading windows this month. Suitable for trend trading, momentum swings, and active directional strategies.",
      } satisfies I18nText,
    },
    {
      index: "02",
      title: { zh: "远离风险日",         en: "Avoid Risk Days" } satisfies I18nText,
      body:  {
        zh: "5/10、5/19、5/22、5/31 为高风险日（火土燥化明显）。控仓、减少频率、禁止赌反转。",
        en: "May 10, 19, 22, and 31 are high-risk days (fire-earth dryness). Reduce position size, lower frequency, no revenge trading.",
      } satisfies I18nText,
    },
    {
      index: "03",
      title: { zh: "控制情绪，防止失控", en: "Control Emotions" } satisfies I18nText,
      body:  {
        zh: "这是一个市场感增强的月份。真正需要控制的不是机会，而是情绪失控后的连续交易。",
        en: "This is a month of heightened market awareness. What truly needs to be controlled is not opportunity, but the chain of trades that follows emotional breakdown.",
      } satisfies I18nText,
    },
  ] satisfies Suggestion[],
};
