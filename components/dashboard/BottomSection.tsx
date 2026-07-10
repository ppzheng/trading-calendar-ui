"use client";

import { useLocale } from "@/lib/locale";
import { useTradingPlan } from "@/lib/trading-plan-context";

export function BottomSection() {
  const { locale } = useLocale();
  const { plan } = useTradingPlan();
  const { bestWindows, riskWindows, strategy, suggestions, cycleGanzhi } = plan;

  const joiner = locale === "zh" ? "、" : ", ";

  // Expand risk window into one row per date
  const riskItems = riskWindows.flatMap((w) =>
    w.dates.map((date) => {
      const day = plan.calendar.find((d) => d.displayDate === date);
      return {
        date,
        reason: w.reason[locale],
        advice: day ? day.advice[locale] : w.advice[locale],
      };
    })
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          {locale === "zh" ? "月度分析" : "Monthly Analysis"}
        </h2>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {locale === "zh"
            ? `${cycleGanzhi}月交易窗口、风险提示与操作建议`
            : `Trading windows, risk alerts, and suggestions for ${cycleGanzhi} month`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Best Windows */}
        <div
          id="best-trading-windows"
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-4 scroll-mt-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {locale === "zh" ? "最佳交易窗口" : "Best Trading Windows"}
            </span>
          </div>
          <div className="space-y-4">
            {bestWindows.map((w, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-900">{w.title[locale]}</span>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
                    {w.period}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {w.features.map((f, j) => (
                    <span key={j} className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-full">
                      {f[locale]}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {locale === "zh" ? "适合：" : "Suitable for: "}
                  {w.suitableFor.map((s) => s[locale]).join(joiner)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Windows */}
        <div
          id="high-risk-days"
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-4 scroll-mt-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {locale === "zh" ? "高风险日" : "High Risk Days"}
            </span>
          </div>
          <div className="space-y-3">
            {riskItems.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-900">{item.reason}</span>
                  <span className="text-[10px] font-mono text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">
                    {item.date}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">{item.advice}</p>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-50 space-y-1">
            <p className="text-[10px] font-semibold text-rose-600">
              {locale === "zh" ? "注意事项" : "Risk Factors"}
            </p>
            <div className="flex flex-wrap gap-1">
              {(riskWindows[0]?.risks ?? []).map((r, i) => (
                <span key={i} className="text-[10px] text-rose-500 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded-full">
                  {r[locale]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Suggestions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              {locale === "zh" ? "月度建议" : "Monthly Suggestions"}
            </span>
          </div>
          <div className="space-y-5">
            {suggestions.map((s) => (
              <div key={s.index} className="flex gap-3">
                <span className="text-[11px] font-mono font-semibold text-gray-300 mt-0.5 shrink-0">{s.index}</span>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-900 leading-tight">{s.title[locale]}</div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{s.body[locale]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-50 space-y-2">
            <p className="text-[10px] font-semibold text-gray-400">
              {locale === "zh" ? "适合策略" : "Suitable Strategies"}
            </p>
            <div className="flex flex-wrap gap-1">
              {strategy.suitable.map((s, i) => (
                <span key={i} className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                  {s[locale]}
                </span>
              ))}
            </div>
            <p className="text-[10px] font-semibold text-gray-400 mt-1">
              {locale === "zh" ? "避免行为" : "Behaviors to Avoid"}
            </p>
            <div className="flex flex-wrap gap-1">
              {strategy.notSuitable.map((s, i) => (
                <span key={i} className="text-[10px] text-rose-500 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded-full">
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
