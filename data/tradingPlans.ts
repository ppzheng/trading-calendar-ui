import type { I18nText, SignalType } from "@/lib/types";
import {
  tradingPlanMay2026,
  type BestWindow,
  type RiskWindow,
  type Suggestion,
  type TradingDay,
} from "@/data/tradingPlanMay2026";

export type TradingSignal = "trend" | "normal" | "adjustment" | "risk";

export interface TradingMonthDay {
  date: string;
  displayDate: string;
  ganzhi: string;
  signal: TradingSignal;
  signalLabel: string;
  advice: string;
}

export interface TradingMonthInput {
  id: string;
  title: string;
  monthLabel: string;
  dateRange: string;
  summaryTitle: string;
  summaryPoints: string[];
  indicators: {
    marketMomentum: number;
    emotionalRisk: number;
    trendStrength: number;
  };
  days: TradingMonthDay[];
  bestWindows: {
    range: string;
    description: string;
  }[];
  highRiskDates: {
    date: string;
    description: string;
  }[];
  suitable: string[];
  unsuitable: string[];
}

export type TradingPlan = typeof tradingPlanMay2026 & {
  id: string;
  monthLabel: I18nText;
  cycleGanzhi: string;
  selectorLabel: I18nText;
};

export type TradingPlanId = "may-2026" | "july-2026" | "august-2026";

const signalToType: Record<TradingSignal, SignalType> = {
  trend: "trend",
  normal: "follow",
  adjustment: "adjust",
  risk: "risk",
};

const makeText = (zh: string, en = zh): I18nText => ({ zh, en });

const makeTradingDay = (day: TradingMonthDay): TradingDay => {
  const type = signalToType[day.signal];
  return {
    date: day.date,
    displayDate: day.displayDate,
    ganzhi: day.ganzhi,
    type,
    advice: makeText(day.advice),
  };
};

const makeBestWindow = (window: TradingMonthInput["bestWindows"][number], index: number): BestWindow => ({
  title: makeText(index === 0 ? "最佳交易窗口" : "重点交易窗口", index === 0 ? "Best Trading Window" : "Key Trading Window"),
  period: window.range,
  features: [makeText(window.description)],
  suitableFor: [makeText("趋势交易", "Trend trading"), makeText("顺势波段", "Momentum swing trading")],
});

const makeRiskWindow = (month: TradingMonthInput): RiskWindow => ({
  dates: month.highRiskDates.map((item) => item.date),
  reason: makeText("高风险日", "High-risk day"),
  risks: month.unsuitable.map((item) => makeText(item)),
  advice: makeText(month.highRiskDates.map((item) => `${item.date}: ${item.description}`).join("；")),
});

const makeSuggestions = (month: TradingMonthInput): Suggestion[] => [
  {
    index: "01",
    title: makeText("优先捕捉趋势窗口", "Prioritize Trend Windows"),
    body: makeText(month.bestWindows.map((item) => `${item.range}: ${item.description}`).join("；")),
  },
  {
    index: "02",
    title: makeText("远离风险日", "Avoid Risk Days"),
    body: makeText(month.highRiskDates.map((item) => `${item.date}: ${item.description}`).join("；")),
  },
  {
    index: "03",
    title: makeText("月度核心逻辑", "Monthly Core Logic"),
    body: makeText(month.summaryPoints.join("；")),
  },
];

const makePlan = (month: TradingMonthInput, cycleGanzhi: string): TradingPlan => ({
  ...tradingPlanMay2026,
  id: month.id,
  title: makeText("交易计划", "TRADING PLAN"),
  monthTitle: makeText(`${cycleGanzhi}月 · ${month.monthLabel}`, month.title.replace(" · Trading Plan · ", " · ")),
  monthLabel: makeText(month.monthLabel, month.monthLabel.replace("2026年", "2026 ")),
  selectorLabel: makeText(month.monthLabel, month.title.split(" · ")[0]),
  cycleGanzhi,
  period: month.dateRange,
  monthlyTheme: {
    keyword: makeText(month.summaryTitle),
    summary: makeText(month.summaryPoints.join("；")),
    highlights: month.summaryPoints.slice(0, 3).map((item) => makeText(item)),
    risks: month.summaryPoints.slice(3).map((item) => makeText(item)),
  },
  calendar: month.days.map(makeTradingDay),
  bestWindows: month.bestWindows.map(makeBestWindow),
  riskWindows: [makeRiskWindow(month)],
  strategy: {
    suitable: month.suitable.map((item) => makeText(item)),
    notSuitable: month.unsuitable.map((item) => makeText(item)),
  },
  summary: {
    sentence: makeText(month.summaryTitle),
    keyPoint: makeText(month.summaryPoints[month.summaryPoints.length - 1] ?? month.summaryTitle),
  },
  radarData: [
    { label: "Momentum", value: month.indicators.marketMomentum },
    { label: "Trend", value: month.indicators.trendStrength },
    { label: "Volume", value: Math.round((month.indicators.marketMomentum + month.indicators.trendStrength) / 2) },
    { label: "Sentiment", value: month.indicators.emotionalRisk },
    { label: "Stability", value: 100 - month.indicators.emotionalRisk },
  ],
  signalBars: [
    {
      label: makeText("月度市场感", "Market Momentum"),
      value: month.indicators.marketMomentum,
      description: makeText(month.summaryPoints[0]),
    },
    {
      label: makeText("情绪风险指数", "Emotional Risk"),
      value: month.indicators.emotionalRisk,
      isRisk: true,
      description: makeText(month.highRiskDates.map((item) => `${item.date} ${item.description}`).join("；")),
    },
    {
      label: makeText("趋势敏锐度", "Trend Strength"),
      value: month.indicators.trendStrength,
      description: makeText(month.bestWindows.map((item) => item.range).join("、")),
    },
  ],
  suggestions: makeSuggestions(month),
});

const tradingPlanMay: TradingPlan = {
  ...tradingPlanMay2026,
  id: "may-2026",
  monthLabel: makeText("2026年5月", "May 2026"),
  selectorLabel: makeText("2026年5月", "May 2026"),
  cycleGanzhi: "癸巳",
};

const july2026: TradingMonthInput = {
  id: "july-2026",
  title: "JULY 2026 · Trading Plan · 乙未月",
  monthLabel: "2026年7月",
  dateRange: "2026/7/7 — 2026/8/6",
  summaryTitle: "七月土气较重，风险点较多",
  summaryPoints: [
    "喜木火，忌土",
    "天干见戊己，降为调整日",
    "未、戌火土燥化，优先判为风险",
    "七月土气较重，风险点较多",
    "趋势日可以主动交易，调整日应控仓降频",
  ],
  indicators: {
    marketMomentum: 68,
    emotionalRisk: 76,
    trendStrength: 66,
  },
  days: [
    { date: "2026-07-07", displayDate: "7/7", ganzhi: "壬午", signal: "trend", signalLabel: "趋势日", advice: "火势激活，盘感强" },
    { date: "2026-07-08", displayDate: "7/8", ganzhi: "癸未", signal: "adjustment", signalLabel: "调整日", advice: "未土介入，控仓" },
    { date: "2026-07-09", displayDate: "7/9", ganzhi: "甲申", signal: "normal", signalLabel: "顺势日", advice: "可波段，注意兑现" },
    { date: "2026-07-10", displayDate: "7/10", ganzhi: "乙酉", signal: "normal", signalLabel: "顺势日", advice: "适合止盈" },
    { date: "2026-07-11", displayDate: "7/11", ganzhi: "丙戌", signal: "risk", signalLabel: "风险日", advice: "火土燥，禁重仓" },
    { date: "2026-07-12", displayDate: "7/12", ganzhi: "丁亥", signal: "trend", signalLabel: "趋势日", advice: "丁火有水调，可交易" },
    { date: "2026-07-13", displayDate: "7/13", ganzhi: "戊子", signal: "adjustment", signalLabel: "调整日", advice: "天干土，观察为主" },
    { date: "2026-07-14", displayDate: "7/14", ganzhi: "己丑", signal: "adjustment", signalLabel: "调整日", advice: "土重，勿执念" },
    { date: "2026-07-15", displayDate: "7/15", ganzhi: "庚寅", signal: "trend", signalLabel: "趋势日", advice: "寅木生火，盘感回升" },
    { date: "2026-07-16", displayDate: "7/16", ganzhi: "辛卯", signal: "trend", signalLabel: "趋势日", advice: "木气流动，适合顺势" },
    { date: "2026-07-17", displayDate: "7/17", ganzhi: "壬辰", signal: "adjustment", signalLabel: "调整日", advice: "辰土拖慢节奏" },
    { date: "2026-07-18", displayDate: "7/18", ganzhi: "癸巳", signal: "normal", signalLabel: "顺势日", advice: "火势启动，轻进攻" },
    { date: "2026-07-19", displayDate: "7/19", ganzhi: "甲午", signal: "trend", signalLabel: "趋势日", advice: "木火流动，适合主动交易" },
    { date: "2026-07-20", displayDate: "7/20", ganzhi: "乙未", signal: "adjustment", signalLabel: "调整日", advice: "未土介入，控仓" },
    { date: "2026-07-21", displayDate: "7/21", ganzhi: "丙申", signal: "normal", signalLabel: "顺势日", advice: "火金并见，可波段" },
    { date: "2026-07-22", displayDate: "7/22", ganzhi: "丁酉", signal: "normal", signalLabel: "顺势日", advice: "适合利润兑现" },
    { date: "2026-07-23", displayDate: "7/23", ganzhi: "戊戌", signal: "risk", signalLabel: "风险日", advice: "土燥极重，禁情绪交易" },
    { date: "2026-07-24", displayDate: "7/24", ganzhi: "己亥", signal: "adjustment", signalLabel: "调整日", advice: "天干土，观察优先" },
    { date: "2026-07-25", displayDate: "7/25", ganzhi: "庚子", signal: "adjustment", signalLabel: "调整日", advice: "水金偏冷，降频" },
    { date: "2026-07-26", displayDate: "7/26", ganzhi: "辛丑", signal: "adjustment", signalLabel: "调整日", advice: "丑土钝化，勿扛单" },
    { date: "2026-07-27", displayDate: "7/27", ganzhi: "壬寅", signal: "trend", signalLabel: "趋势日", advice: "寅木起势，适合交易" },
    { date: "2026-07-28", displayDate: "7/28", ganzhi: "癸卯", signal: "trend", signalLabel: "趋势日", advice: "木气强，佳日" },
    { date: "2026-07-29", displayDate: "7/29", ganzhi: "甲辰", signal: "adjustment", signalLabel: "调整日", advice: "辰土压木，轻仓" },
    { date: "2026-07-30", displayDate: "7/30", ganzhi: "乙巳", signal: "trend", signalLabel: "趋势日", advice: "木火流动，可进攻" },
    { date: "2026-07-31", displayDate: "7/31", ganzhi: "丙午", signal: "trend", signalLabel: "趋势日", advice: "火势强，市场感好" },
    { date: "2026-08-01", displayDate: "8/1", ganzhi: "丁未", signal: "risk", signalLabel: "风险日", advice: "火土结块，防上头" },
    { date: "2026-08-02", displayDate: "8/2", ganzhi: "戊申", signal: "adjustment", signalLabel: "调整日", advice: "天干土，控频率" },
    { date: "2026-08-03", displayDate: "8/3", ganzhi: "己酉", signal: "adjustment", signalLabel: "调整日", advice: "适合止盈复盘" },
    { date: "2026-08-04", displayDate: "8/4", ganzhi: "庚戌", signal: "risk", signalLabel: "风险日", advice: "戌土燥，防情绪单" },
    { date: "2026-08-05", displayDate: "8/5", ganzhi: "辛亥", signal: "adjustment", signalLabel: "调整日", advice: "观察为主" },
    { date: "2026-08-06", displayDate: "8/6", ganzhi: "壬子", signal: "adjustment", signalLabel: "调整日", advice: "水重偏冷，少操作" },
  ],
  bestWindows: [
    { range: "7/15 — 7/16", description: "木气连续流动，盘感回升，适合趋势交易" },
    { range: "7/19", description: "木火流动，适合主动交易" },
    { range: "7/27 — 7/31", description: "本月最佳连续交易窗口，适合顺势与主动进攻" },
  ],
  highRiskDates: [
    { date: "7/11", description: "火土燥，禁重仓" },
    { date: "7/23", description: "土燥极重，禁情绪交易" },
    { date: "8/1", description: "火土结块，防上头" },
    { date: "8/4", description: "戌土燥，防情绪单" },
  ],
  suitable: ["趋势交易", "顺势波段", "分批止盈", "优质窗口主动进攻"],
  unsuitable: ["重仓扛单", "情绪交易", "连续补仓", "土重风险日主观硬做"],
};

const august2026: TradingMonthInput = {
  id: "august-2026",
  title: "AUGUST 2026 · Trading Plan · 丙申月",
  monthLabel: "2026年8月",
  dateRange: "2026/8/7 — 2026/9/6",
  summaryTitle: "八月整体比七月顺",
  summaryPoints: [
    "喜木火，忌土",
    "天干见戊己，降为调整日",
    "未、戌火土燥化，优先判为风险",
    "八月整体比七月顺",
    "申金出现后，更适合交易后兑现",
    "戊己、未戌日仍需降频控仓",
  ],
  indicators: {
    marketMomentum: 76,
    emotionalRisk: 58,
    trendStrength: 79,
  },
  days: [
    { date: "2026-08-07", displayDate: "8/7", ganzhi: "癸丑", signal: "adjustment", signalLabel: "调整日", advice: "丑土钝化，轻仓" },
    { date: "2026-08-08", displayDate: "8/8", ganzhi: "甲寅", signal: "trend", signalLabel: "趋势日", advice: "木气强，适合主动交易" },
    { date: "2026-08-09", displayDate: "8/9", ganzhi: "乙卯", signal: "trend", signalLabel: "趋势日", advice: "本月优质趋势日" },
    { date: "2026-08-10", displayDate: "8/10", ganzhi: "丙辰", signal: "adjustment", signalLabel: "调整日", advice: "辰土介入，控仓" },
    { date: "2026-08-11", displayDate: "8/11", ganzhi: "丁巳", signal: "trend", signalLabel: "趋势日", advice: "火势流动，盘感强" },
    { date: "2026-08-12", displayDate: "8/12", ganzhi: "戊午", signal: "adjustment", signalLabel: "调整日", advice: "有交易欲，但天干土，防冲动" },
    { date: "2026-08-13", displayDate: "8/13", ganzhi: "己未", signal: "risk", signalLabel: "风险日", advice: "土重火燥，禁重仓" },
    { date: "2026-08-14", displayDate: "8/14", ganzhi: "庚申", signal: "normal", signalLabel: "顺势日", advice: "节奏稳定，可波段" },
    { date: "2026-08-15", displayDate: "8/15", ganzhi: "辛酉", signal: "normal", signalLabel: "顺势日", advice: "适合兑现利润" },
    { date: "2026-08-16", displayDate: "8/16", ganzhi: "壬戌", signal: "adjustment", signalLabel: "调整日", advice: "戌土燥，降低频率" },
    { date: "2026-08-17", displayDate: "8/17", ganzhi: "癸亥", signal: "adjustment", signalLabel: "调整日", advice: "水重，观察复盘" },
    { date: "2026-08-18", displayDate: "8/18", ganzhi: "甲子", signal: "normal", signalLabel: "顺势日", advice: "木水并见，等确认" },
    { date: "2026-08-19", displayDate: "8/19", ganzhi: "乙丑", signal: "adjustment", signalLabel: "调整日", advice: "丑土压节奏" },
    { date: "2026-08-20", displayDate: "8/20", ganzhi: "丙寅", signal: "trend", signalLabel: "趋势日", advice: "木火流动，适合交易" },
    { date: "2026-08-21", displayDate: "8/21", ganzhi: "丁卯", signal: "trend", signalLabel: "趋势日", advice: "判断敏锐，适合顺势" },
    { date: "2026-08-22", displayDate: "8/22", ganzhi: "戊辰", signal: "adjustment", signalLabel: "调整日", advice: "土重，勿主观硬做" },
    { date: "2026-08-23", displayDate: "8/23", ganzhi: "己巳", signal: "adjustment", signalLabel: "调整日", advice: "火有但土透，控频率" },
    { date: "2026-08-24", displayDate: "8/24", ganzhi: "庚午", signal: "normal", signalLabel: "顺势日", advice: "可交易，注意止盈" },
    { date: "2026-08-25", displayDate: "8/25", ganzhi: "辛未", signal: "adjustment", signalLabel: "调整日", advice: "未土介入，防扛单" },
    { date: "2026-08-26", displayDate: "8/26", ganzhi: "壬申", signal: "normal", signalLabel: "顺势日", advice: "节奏正常，可波段" },
    { date: "2026-08-27", displayDate: "8/27", ganzhi: "癸酉", signal: "normal", signalLabel: "顺势日", advice: "适合兑现" },
    { date: "2026-08-28", displayDate: "8/28", ganzhi: "甲戌", signal: "risk", signalLabel: "风险日", advice: "木被燥土困，防执念" },
    { date: "2026-08-29", displayDate: "8/29", ganzhi: "乙亥", signal: "trend", signalLabel: "趋势日", advice: "木气恢复，可轻进攻" },
    { date: "2026-08-30", displayDate: "8/30", ganzhi: "丙子", signal: "normal", signalLabel: "顺势日", advice: "火水并见，等确认" },
    { date: "2026-08-31", displayDate: "8/31", ganzhi: "丁丑", signal: "adjustment", signalLabel: "调整日", advice: "丑土钝化，轻仓" },
    { date: "2026-09-01", displayDate: "9/1", ganzhi: "戊寅", signal: "adjustment", signalLabel: "调整日", advice: "天干土，降频" },
    { date: "2026-09-02", displayDate: "9/2", ganzhi: "己卯", signal: "adjustment", signalLabel: "调整日", advice: "卯木可用，但土透，轻仓顺势" },
    { date: "2026-09-03", displayDate: "9/3", ganzhi: "庚辰", signal: "adjustment", signalLabel: "调整日", advice: "辰土拖慢节奏" },
    { date: "2026-09-04", displayDate: "9/4", ganzhi: "辛巳", signal: "normal", signalLabel: "顺势日", advice: "火金并见，可波段" },
    { date: "2026-09-05", displayDate: "9/5", ganzhi: "壬午", signal: "trend", signalLabel: "趋势日", advice: "午火激活，盘感强" },
    { date: "2026-09-06", displayDate: "9/6", ganzhi: "癸未", signal: "adjustment", signalLabel: "调整日", advice: "未土介入，控仓" },
  ],
  bestWindows: [
    { range: "8/8 — 8/9", description: "木气连续增强，本月优质趋势窗口" },
    { range: "8/11", description: "火势流动，盘感较强" },
    { range: "8/20 — 8/21", description: "木火流动，适合趋势交易" },
    { range: "8/29", description: "木气恢复，可轻进攻" },
    { range: "9/5", description: "午火激活，盘感强" },
  ],
  highRiskDates: [
    { date: "8/13", description: "土重火燥，禁重仓" },
    { date: "8/28", description: "木被燥土困，防执念" },
  ],
  suitable: ["趋势交易", "确认后进场", "波段交易", "交易后及时兑现"],
  unsuitable: ["戊己日高频操作", "未戌日重仓", "扛单", "盈利后不止盈"],
};

export const tradingPlans = {
  "may-2026": tradingPlanMay,
  "july-2026": makePlan(july2026, "乙未"),
  "august-2026": makePlan(august2026, "丙申"),
} satisfies Record<TradingPlanId, TradingPlan>;

export const tradingPlanOptions = [
  tradingPlans["may-2026"],
  tradingPlans["july-2026"],
  tradingPlans["august-2026"],
] as const;
