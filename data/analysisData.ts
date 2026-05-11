import type { I18nText } from "@/lib/types";

// ─── Destiny Analysis (个人八字分析) ─────────────────────────────────────────

export interface BaziBasic {
  label: I18nText;
  value: string;
  highlight?: boolean;
}

export interface CoreTrait {
  label: I18nText;
  description: I18nText;
}

export interface DestinyData {
  basics: BaziBasic[];
  highlights: I18nText[];
  coreTraits: CoreTrait[];
  personalityKeywords: I18nText[];
  strengths: I18nText[];
  weaknesses: I18nText[];
}

// ─── Five Elements Analysis (五行交易偏好分析) ────────────────────────────────

export type ElementColorScheme = "emerald" | "orange" | "amber" | "slate" | "sky";

export interface ElementEntry {
  symbol: string;
  name: I18nText;
  strength: number;
  level: I18nText;
  role: I18nText;
  risk: I18nText;
  colorScheme: ElementColorScheme;
}

export type BehaviorQuality = "positive" | "neutral" | "negative";

export interface BehaviorRow {
  condition: I18nText;
  effect: I18nText;
  quality: BehaviorQuality;
}

export interface FiveElementsData {
  elements: ElementEntry[];
  behaviorModel: BehaviorRow[];
  bestEnvironment: {
    title: I18nText;
    features: I18nText[];
    suitable: I18nText[];
  };
  highRiskEnvironment: {
    title: I18nText;
    risks: I18nText[];
  };
  tradingPersonality: {
    title: I18nText;
    features: I18nText[];
    suitable: I18nText[];
    notSuitable: I18nText[];
  };
}

// ─── Personal Profile (header badges) ────────────────────────────────────────

export interface PersonalProfile {
  dayMaster: { zh: string; en: string };
  destinyType: { zh: string; en: string };
  tradingPersona: { zh: string; en: string };
  month: { zh: string; en: string };
}

export const personalProfile: PersonalProfile = {
  dayMaster:    { zh: "丁火日主", en: "Ding Fire" },
  destinyType:  { zh: "火势成局", en: "Fire-Dominant" },
  tradingPersona: { zh: "高攻击型", en: "High-Aggression" },
  month:        { zh: "癸巳月",   en: "Guisi Month" },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const destinyData: DestinyData = {
  basics: [
    {
      label: { zh: "八字", en: "Bazi Pillars" },
      value: "丙子 · 癸巳 · 丁未 · 甲午",
    },
    {
      label: { zh: "日主", en: "Day Master" },
      value: "丁火",
      highlight: true,
    },
    {
      label: { zh: "命格类型", en: "Chart Pattern" },
      value: "火势成局型 · 半专旺",
      highlight: true,
    },
    {
      label: { zh: "格局定性", en: "Profile Class" },
      value: "市场型命格",
    },
  ],

  highlights: [
    { zh: "丁火日主", en: "Ding Fire Day Master" },
    { zh: "火势成局型人格", en: "Fire-Dominant Pattern" },
    { zh: "半专旺结构", en: "Semi-Pure Structure" },
    { zh: "市场型命格", en: "Market-Oriented Destiny" },
  ],

  coreTraits: [
    {
      label: { zh: "巳午未三会火局", en: "Si-Wu-Wei Fire Combination" },
      description: {
        zh: "地支三会成火局，火势根深，结构稳固，不易被短期运势撼动",
        en: "Earthly branches form a fire combination — deep fire roots with a structurally stable, durable energy pattern",
      },
    },
    {
      label: { zh: "火根极深", en: "Deep Fire Roots" },
      description: {
        zh: "原局火气充足，逢木火运势火力大旺，市场感和行动力同步提升",
        en: "Natal fire is abundant; wood-fire transits intensify fire power, simultaneously boosting market sensitivity and execution drive",
      },
    },
    {
      label: { zh: "市场感强", en: "Strong Market Sensitivity" },
      description: {
        zh: "火主感知与直觉，对价格动量和市场情绪有近乎本能的感知能力",
        en: "Fire governs perception and intuition — provides near-instinctive sensitivity to price momentum and market emotion",
      },
    },
    {
      label: { zh: "情绪驱动强", en: "Emotion-Led Decision Engine" },
      description: {
        zh: "火气主冲动，行动往往先于分析，在火土燥化期间风险显著放大",
        en: "Fire drives impulsive action ahead of analysis; risk amplifies significantly during fire-earth dry phases",
      },
    },
    {
      label: { zh: "行动力极强", en: "Extremely High Execution Drive" },
      description: {
        zh: "命格结构赋予极强的出手欲与执行冲动，适合高波动、快节奏的交易环境",
        en: "The chart structure confers an intense drive to execute — well-suited for high-volatility, fast-paced trading environments",
      },
    },
  ],

  personalityKeywords: [
    { zh: "高市场敏感型人格", en: "High Market Sensitivity" },
    { zh: "强主导欲", en: "Strong Control Drive" },
    { zh: "强行动力", en: "High Execution Drive" },
    { zh: "高风险偏好", en: "High Risk Appetite" },
    { zh: "不适合被压制", en: "Resists Constraint" },
    { zh: "天生适合高波动行业", en: "Built for High Volatility" },
  ],

  strengths: [
    { zh: "趋势感极强，能提前捕捉市场节奏变化", en: "Exceptional trend intuition — captures market rhythm shifts early" },
    { zh: "商业嗅觉强，天然适合资本市场", en: "Sharp commercial instinct, naturally suited to capital markets" },
    { zh: "决策速度快，不拖延，执行干净", en: "Fast, clean execution — no hesitation when conviction is present" },
    { zh: "对市场情绪极度敏感，可感知拐点", en: "Highly sensitive to market sentiment shifts and inflection points" },
    { zh: "具备交易直觉与资本判断力", en: "Natural trading intuition and capital allocation judgment" },
  ],

  weaknesses: [
    { zh: "容易情绪交易，感觉良好时仓位失控", en: "Emotional trading risk — position sizing breaks down when confidence peaks" },
    { zh: "上头后不服输，扛单而非止损", en: "Refuses to accept losses under pressure; holds losers instead of cutting them" },
    { zh: "压力大时连续操作，亏损加速", en: "Overtrades under stress, accelerating losses through compulsive action" },
    { zh: "容易过度扩张，低估下行风险", en: "Prone to over-leveraging and underestimating downside risk" },
    { zh: "极度疲劳时判断力显著下降", en: "Judgment deteriorates sharply under extreme fatigue" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────

export const fiveElementsData: FiveElementsData = {
  elements: [
    {
      symbol: "木",
      name: { zh: "木", en: "Wood" },
      strength: 58,
      level: { zh: "中等", en: "Moderate" },
      role: { zh: "判断力来源，支撑火势，趋势感的基础能量", en: "Source of analytical clarity; sustains fire and grounds trend intuition" },
      risk: { zh: "木弱时判断力下降，趋势感变迟钝", en: "Weakened wood dulls judgment and blunts trend sensing" },
      colorScheme: "emerald",
    },
    {
      symbol: "火",
      name: { zh: "火", en: "Fire" },
      strength: 86,
      level: { zh: "极强", en: "Dominant" },
      role: { zh: "日主本气，市场感、行动力、情绪驱动的核心来源", en: "Day master element — core driver of market sensitivity, execution power, and emotional impulse" },
      risk: { zh: "火过旺易情绪失控，遇土则燥化高风险", en: "Excess fire risks emotional loss of control; fire meeting earth creates dry high-risk states" },
      colorScheme: "orange",
    },
    {
      symbol: "土",
      name: { zh: "土", en: "Earth" },
      strength: 46,
      level: { zh: "偏低", en: "Below Average" },
      role: { zh: "理性稳定基础，过旺时与火产生燥化反应", en: "Provides rationality and stability; when excess, combines with fire to create volatile dryness" },
      risk: { zh: "火土燥化是最高风险情绪状态的触发因素", en: "Fire-earth dryness is the primary trigger for peak emotional risk trading states" },
      colorScheme: "amber",
    },
    {
      symbol: "金",
      name: { zh: "金", en: "Metal" },
      strength: 18,
      level: { zh: "极弱", en: "Very Weak" },
      role: { zh: "止盈与兑现能力，交易纪律的执行能量来源", en: "Governs profit-taking capacity and trading discipline enforcement" },
      risk: { zh: "金弱则止盈困难，纪律感低，容易拿着盈利单反转", en: "Weak metal makes profit-taking difficult; discipline is poor, winning trades reverse easily" },
      colorScheme: "slate",
    },
    {
      symbol: "水",
      name: { zh: "水", en: "Water" },
      strength: 20,
      level: { zh: "极弱", en: "Very Weak" },
      role: { zh: "冷静分析、观察力、风险意识的能量来源", en: "Energy source for calm analysis, observational acuity, and risk awareness" },
      risk: { zh: "水弱则冷静不足，风险意识低，难以主动降频", en: "Weak water means insufficient calm; risk awareness is low and frequency reduction is resisted" },
      colorScheme: "sky",
    },
  ],

  behaviorModel: [
    {
      condition: { zh: "木旺", en: "Wood Dominant" },
      effect: { zh: "判断清晰、趋势敏锐，适合主动建仓", en: "Clear judgment, sharp trend sensing — ideal for active position-building" },
      quality: "positive",
    },
    {
      condition: { zh: "火旺", en: "Fire Dominant" },
      effect: { zh: "市场感强、执行力高，可进攻型交易", en: "Strong market feel, high execution drive — aggressive trading conditions" },
      quality: "positive",
    },
    {
      condition: { zh: "金旺", en: "Metal Dominant" },
      effect: { zh: "容易止盈兑现，纪律感增强", en: "Easier profit-taking, improved trading discipline" },
      quality: "positive",
    },
    {
      condition: { zh: "水旺", en: "Water Dominant" },
      effect: { zh: "冷静观察、降低频率，以等待为主", en: "Calm observation mode, reduced frequency — patience-first approach" },
      quality: "neutral",
    },
    {
      condition: { zh: "土旺", en: "Earth Dominant" },
      effect: { zh: "判断钝化、容易执念，避免重仓", en: "Judgment dulls, fixation risk rises — avoid heavy positioning" },
      quality: "negative",
    },
    {
      condition: { zh: "火土燥化", en: "Fire-Earth Dryness" },
      effect: { zh: "高风险情绪交易状态，须严格止损", en: "Peak emotional risk state — strict stop-loss enforcement required" },
      quality: "negative",
    },
  ],

  bestEnvironment: {
    title: { zh: "木火流动", en: "Wood-Fire Flow" },
    features: [
      { zh: "市场感显著增强", en: "Market awareness markedly heightens" },
      { zh: "盘感敏锐，节奏清晰", en: "Trading instinct sharpens, rhythm clarifies" },
      { zh: "趋势判断力增强", en: "Trend judgment improves" },
      { zh: "行动力与决策速度提升", en: "Execution speed and decision clarity improve" },
      { zh: "容易捕捉波段机会", en: "Swing opportunities become easier to capture" },
    ],
    suitable: [
      { zh: "趋势行情", en: "Trending markets" },
      { zh: "波段交易", en: "Swing trading" },
      { zh: "主动进攻型策略", en: "Active directional strategies" },
    ],
  },

  highRiskEnvironment: {
    title: { zh: "火土燥化", en: "Fire-Earth Dryness" },
    risks: [
      { zh: "赌性增强，冲动下注", en: "Gambling impulse intensifies, impulsive entries" },
      { zh: "连续错误判断叠加", en: "Cascading chain of erroneous calls" },
      { zh: "止损纪律失效", en: "Stop-loss discipline breaks down entirely" },
      { zh: "强迫性连续交易", en: "Compulsive overtrading" },
      { zh: "情绪化加仓，扩大亏损", en: "Emotional position-adding amplifies losses" },
    ],
  },

  tradingPersonality: {
    title: { zh: "高攻击型交易人格", en: "High-Aggression Trader Profile" },
    features: [
      { zh: "趋势敏锐，市场感极强", en: "Sharp trend sensing, exceptional market feel" },
      { zh: "风险偏好高，愿意承受波动", en: "High risk appetite, tolerates significant volatility" },
      { zh: "偏好主动判断，不依赖系统信号", en: "Prefers independent judgment over systematic signals" },
      { zh: "不适合被动等待，长期空仓难以坚持", en: "Cannot sustain passive waiting or extended flat periods" },
      { zh: "天然适配高波动、快节奏市场结构", en: "Naturally suited to high-volatility, fast-moving market structures" },
    ],
    suitable: [
      { zh: "加密货币", en: "Crypto" },
      { zh: "Web3 资产", en: "Web3 Assets" },
      { zh: "趋势交易", en: "Trend Trading" },
      { zh: "波段交易", en: "Swing Trading" },
      { zh: "主观交易", en: "Discretionary Trading" },
    ],
    notSuitable: [
      { zh: "纯机械化策略", en: "Pure mechanical systems" },
      { zh: "超保守风险框架", en: "Ultra-conservative risk frameworks" },
      { zh: "长时间空仓等待", en: "Extended idle / flat periods" },
    ],
  },
};
