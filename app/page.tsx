import { Header } from "@/components/dashboard/Header";
import { MonthlyIndicators } from "@/components/dashboard/MonthlyIndicators";
import { TradingCalendar } from "@/components/dashboard/TradingCalendar";
import { BottomSection } from "@/components/dashboard/BottomSection";

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(155deg, #f5fbf7 0%, #edf8f1 55%, #f1f9f4 100%)" }}
    >
      {/* ── Ambient background layer — sits below all content ───────────── */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Top-left static radial glow */}
        <div style={{
          position: "absolute",
          top: "-8%",
          left: "-6%",
          width: "54%",
          height: "54%",
          background: "radial-gradient(ellipse at center, rgba(134,239,172,0.12) 0%, transparent 68%)",
        }} />

        {/* Bottom-right static radial glow */}
        <div style={{
          position: "absolute",
          bottom: "-10%",
          right: "-6%",
          width: "52%",
          height: "52%",
          background: "radial-gradient(ellipse at center, rgba(52,211,153,0.09) 0%, transparent 68%)",
        }} />

        {/* Floating blob A — large soft emerald, upper-left */}
        <div style={{
          position: "absolute",
          top: "-60px",
          left: "4%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(134,239,172,0.14) 0%, transparent 72%)",
          filter: "blur(72px)",
          willChange: "transform",
          animation: "ambient-float-a 20s ease-in-out infinite",
        }} />

        {/* Floating blob B — medium teal-green, lower-right */}
        <div style={{
          position: "absolute",
          bottom: "-50px",
          right: "6%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.10) 0%, transparent 72%)",
          filter: "blur(80px)",
          willChange: "transform",
          animation: "ambient-float-b 25s ease-in-out infinite",
        }} />

        {/* Floating blob C — small mint, center-right */}
        <div style={{
          position: "absolute",
          top: "38%",
          left: "58%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,243,208,0.09) 0%, transparent 72%)",
          filter: "blur(60px)",
          willChange: "transform",
          animation: "ambient-float-c 17s ease-in-out infinite",
        }} />

        {/* Subtle dot-grid texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
      </div>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <main className="max-w-[1450px] mx-auto px-4 sm:px-6 py-6 space-y-6 pb-12">
          <MonthlyIndicators />
          <TradingCalendar />
          <BottomSection />
        </main>
      </div>
    </div>
  );
}
