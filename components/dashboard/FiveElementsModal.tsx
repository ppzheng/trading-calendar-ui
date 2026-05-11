"use client";

import { useLocale } from "@/lib/locale";
import { Modal } from "@/components/ui/modal";
import { fiveElementsData, type ElementColorScheme } from "@/data/analysisData";

// ── Color maps ───────────────────────────────────────────────────────────────

const colorMap: Record<
  ElementColorScheme,
  { bar: string; text: string; badge: string; badgeText: string; symbol: string; ring: string }
> = {
  emerald: {
    bar:       "bg-emerald-400",
    text:      "text-emerald-600",
    badge:     "bg-emerald-50 border-emerald-100",
    badgeText: "text-emerald-700",
    symbol:    "bg-emerald-100 text-emerald-700 border-emerald-200",
    ring:      "ring-emerald-200",
  },
  orange: {
    bar:       "bg-orange-400",
    text:      "text-orange-600",
    badge:     "bg-orange-50 border-orange-100",
    badgeText: "text-orange-700",
    symbol:    "bg-orange-100 text-orange-700 border-orange-200",
    ring:      "ring-orange-200",
  },
  amber: {
    bar:       "bg-amber-400",
    text:      "text-amber-600",
    badge:     "bg-amber-50 border-amber-100",
    badgeText: "text-amber-700",
    symbol:    "bg-amber-100 text-amber-700 border-amber-200",
    ring:      "ring-amber-200",
  },
  slate: {
    bar:       "bg-slate-400",
    text:      "text-slate-500",
    badge:     "bg-slate-50 border-slate-100",
    badgeText: "text-slate-600",
    symbol:    "bg-slate-100 text-slate-600 border-slate-200",
    ring:      "ring-slate-200",
  },
  sky: {
    bar:       "bg-sky-400",
    text:      "text-sky-600",
    badge:     "bg-sky-50 border-sky-100",
    badgeText: "text-sky-700",
    symbol:    "bg-sky-100 text-sky-700 border-sky-200",
    ring:      "ring-sky-200",
  },
};

const qualityStyle = {
  positive: "text-emerald-700 bg-emerald-50 border-emerald-100",
  neutral:  "text-sky-700 bg-sky-50 border-sky-100",
  negative: "text-rose-600 bg-rose-50 border-rose-100",
};

// ── Shared section label ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-0.5 h-3.5 rounded-full bg-emerald-500 shrink-0" />
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}

// ── Section 1: Five elements bars ────────────────────────────────────────────

function ElementBarsSection() {
  const { locale } = useLocale();
  const { elements } = fiveElementsData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "五行结构" : "Elemental Structure"}
      </SectionLabel>
      <div className="space-y-3">
        {elements.map((el) => {
          const c = colorMap[el.colorScheme];
          return (
            <div key={el.symbol} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 font-mono ${c.symbol}`}>
                    {el.symbol}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-gray-700">{el.name[locale]}</span>
                    <p className="text-[10px] text-gray-400 leading-snug line-clamp-1">{el.role[locale]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.badge} ${c.badgeText}`}>
                    {el.level[locale]}
                  </span>
                  <span className={`text-[11px] font-semibold font-mono w-7 text-right ${c.text}`}>
                    {el.strength}
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${c.bar}`}
                  style={{ width: `${el.strength}%` }}
                />
              </div>
              <p className="text-[10px] text-rose-500 leading-snug pl-9">{el.risk[locale]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Section 2: Behavior model table ─────────────────────────────────────────

function BehaviorModelSection() {
  const { locale } = useLocale();
  const { behaviorModel } = fiveElementsData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "五行交易行为模型" : "Elemental Trading Behavior Model"}
      </SectionLabel>
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto] bg-gray-50 border-b border-gray-100 px-4 py-2">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider w-24">
            {locale === "zh" ? "能量状态" : "Energy State"}
          </span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            {locale === "zh" ? "交易行为表现" : "Trading Behavior"}
          </span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider w-16 text-right">
            {locale === "zh" ? "评级" : "Rating"}
          </span>
        </div>
        <div className="divide-y divide-gray-50">
          {behaviorModel.map((row, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr_auto] px-4 py-3 items-start gap-3 hover:bg-gray-50/50 transition-colors">
              <span className="text-xs font-semibold text-gray-700 font-mono w-24 shrink-0">
                {row.condition[locale]}
              </span>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {row.effect[locale]}
              </p>
              <div className="w-16 flex justify-end shrink-0">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${qualityStyle[row.quality]}`}>
                  {row.quality === "positive"
                    ? locale === "zh" ? "利好" : "Positive"
                    : row.quality === "neutral"
                    ? locale === "zh" ? "中性" : "Neutral"
                    : locale === "zh" ? "风险" : "Risk"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section 3: Best environment ──────────────────────────────────────────────

function BestEnvironmentSection() {
  const { locale } = useLocale();
  const { bestEnvironment } = fiveElementsData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "最佳交易环境" : "Optimal Trading Environment"}
      </SectionLabel>
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-bold text-emerald-800">{bestEnvironment.title[locale]}</span>
          <span className="text-[10px] text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
            {locale === "zh" ? "理想条件" : "Ideal Conditions"}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
              {locale === "zh" ? "特征" : "Characteristics"}
            </p>
            <div className="space-y-1.5">
              {bestEnvironment.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[11px] text-emerald-800">{f[locale]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
              {locale === "zh" ? "适合" : "Suitable Styles"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bestEnvironment.suitable.map((s, i) => (
                <span key={i} className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  {s[locale]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section 4: High risk environment ────────────────────────────────────────

function HighRiskSection() {
  const { locale } = useLocale();
  const { highRiskEnvironment } = fiveElementsData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "高风险环境" : "High-Risk Environment"}
      </SectionLabel>
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <span className="text-sm font-bold text-rose-700">{highRiskEnvironment.title[locale]}</span>
          <span className="text-[10px] text-rose-600 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full font-semibold">
            {locale === "zh" ? "高度警戒" : "High Alert"}
          </span>
        </div>
        <div className="space-y-1.5">
          {highRiskEnvironment.risks.map((r, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </div>
              <span className="text-[11px] text-rose-700 leading-relaxed">{r[locale]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section 5: Trading personality ──────────────────────────────────────────

function TradingPersonalitySection() {
  const { locale } = useLocale();
  const { tradingPersonality } = fiveElementsData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "交易人格模型" : "Trader Personality Model"}
      </SectionLabel>
      <div className="bg-white border border-gray-100 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Title bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">{tradingPersonality.title[locale]}</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-emerald-700">
              {locale === "zh" ? "高进攻型" : "HIGH AGGRESSION"}
            </span>
          </div>
        </div>

        <div className="p-5 grid sm:grid-cols-3 gap-5">
          {/* Features */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {locale === "zh" ? "人格特征" : "Profile Features"}
            </p>
            <div className="space-y-1.5">
              {tradingPersonality.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 shrink-0 mt-1.5" />
                  <span className="text-[11px] text-gray-600 leading-relaxed">{f[locale]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
              {locale === "zh" ? "适合" : "Best Fit"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tradingPersonality.suitable.map((s, i) => (
                <span key={i} className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                  {s[locale]}
                </span>
              ))}
            </div>
          </div>

          {/* Not suitable */}
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider">
              {locale === "zh" ? "不适合" : "Avoid"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tradingPersonality.notSuitable.map((s, i) => (
                <span key={i} className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                  {s[locale]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────

interface FiveElementsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FiveElementsModal({ open, onOpenChange }: FiveElementsModalProps) {
  const { locale } = useLocale();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={locale === "zh" ? "五行交易偏好分析" : "Five Elements Trading Analysis"}
      subtitle={locale === "zh" ? "五行结构 · 行为模型 · 交易人格" : "Elemental Structure · Behavior Model · Trader Profile"}
    >
      <div className="space-y-6">
        <ElementBarsSection />
        <div className="border-t border-gray-100" />
        <BehaviorModelSection />
        <div className="border-t border-gray-100" />
        <BestEnvironmentSection />
        <div className="border-t border-gray-100" />
        <HighRiskSection />
        <div className="border-t border-gray-100" />
        <TradingPersonalitySection />
      </div>
    </Modal>
  );
}
