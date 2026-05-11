"use client";

import { useLocale } from "@/lib/locale";
import { Modal } from "@/components/ui/modal";
import { destinyData } from "@/data/analysisData";

// ── Shared section header ────────────────────────────────────────────────────

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

// ── Section 1: Bazi basics ───────────────────────────────────────────────────

function BasicsSection() {
  const { locale } = useLocale();
  const { basics, highlights } = destinyData;

  return (
    <div className="space-y-4">
      <SectionLabel>
        {locale === "zh" ? "基础命格" : "Chart Fundamentals"}
      </SectionLabel>

      {/* Stat grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {basics.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border p-3 space-y-1 ${
              item.highlight
                ? "bg-emerald-50 border-emerald-100"
                : "bg-gray-50 border-gray-100"
            }`}
          >
            <p className={`text-[10px] font-medium uppercase tracking-wider ${item.highlight ? "text-emerald-600" : "text-gray-400"}`}>
              {item.label[locale]}
            </p>
            <p className={`text-xs font-semibold font-mono leading-snug ${item.highlight ? "text-emerald-800" : "text-gray-700"}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Highlight badges */}
      <div className="flex flex-wrap gap-2">
        {highlights.map((h, i) => (
          <span
            key={i}
            className="text-[11px] font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            {h[locale]}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section 2: Core traits ───────────────────────────────────────────────────

function CoreTraitsSection() {
  const { locale } = useLocale();
  const { coreTraits } = destinyData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "核心命格特征" : "Core Chart Characteristics"}
      </SectionLabel>
      <div className="space-y-2.5">
        {coreTraits.map((trait, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-semibold text-gray-800">{trait.label[locale]}</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{trait.description[locale]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section 3: Personality keywords ─────────────────────────────────────────

function PersonalitySection() {
  const { locale } = useLocale();
  const { personalityKeywords } = destinyData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "性格关键词" : "Personality Profile"}
      </SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {personalityKeywords.map((kw, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-[11px] font-semibold text-gray-700 leading-tight">{kw[locale]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section 4: Strengths ─────────────────────────────────────────────────────

function StrengthsSection() {
  const { locale } = useLocale();
  const { strengths } = destinyData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "核心优势" : "Core Strengths"}
      </SectionLabel>
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 space-y-2.5">
        {strengths.map((s, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">{s[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section 5: Weaknesses ────────────────────────────────────────────────────

function WeaknessesSection() {
  const { locale } = useLocale();
  const { weaknesses } = destinyData;

  return (
    <div className="space-y-3">
      <SectionLabel>
        {locale === "zh" ? "风险弱点" : "Risk Weaknesses"}
      </SectionLabel>
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 space-y-2.5">
        <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider">
            {locale === "zh" ? "需警觉的交易弱点" : "Trading Vulnerabilities — Stay Alert"}
          </span>
        </div>
        {weaknesses.map((w, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
            <p className="text-[11px] text-rose-700 leading-relaxed">{w[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────

interface DestinyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DestinyModal({ open, onOpenChange }: DestinyModalProps) {
  const { locale } = useLocale();

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={locale === "zh" ? "个人命理分析" : "Personal Destiny Analysis"}
      subtitle={locale === "zh" ? "八字结构 · 命格特征 · 交易人格" : "Bazi Structure · Chart Pattern · Trading Personality"}
    >
      <div className="space-y-6">
        <BasicsSection />
        <div className="border-t border-gray-100" />
        <CoreTraitsSection />
        <div className="border-t border-gray-100" />
        <PersonalitySection />
        <div className="border-t border-gray-100" />
        <StrengthsSection />
        <div className="border-t border-gray-100" />
        <WeaknessesSection />
      </div>
    </Modal>
  );
}
