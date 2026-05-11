"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CALENDAR_EVENTS, CATEGORY_META, ECONOMIC_INDICATORS, IMPACT_DOT } from "@/lib/mock-data";
import { CalendarEvent, EventCategory } from "@/lib/types";
import { CalendarDays, ExternalLink, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventPanelProps {
  activeFilters: EventCategory[];
  selectedEvent: CalendarEvent | null;
  onSelectEvent: (event: CalendarEvent | null) => void;
}

const TODAY = new Date(2026, 4, 11);

function relDate(date: Date) {
  const diff = Math.round((date.getTime() - TODAY.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 0) return `In ${diff}d`;
  return `${Math.abs(diff)}d ago`;
}

function fmtDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
}

export function EventPanel({ activeFilters, selectedEvent, onSelectEvent }: EventPanelProps) {
  const upcoming = CALENDAR_EVENTS
    .filter(e => {
      const diff = Math.round((e.date.getTime() - TODAY.getTime()) / 86400000);
      return diff >= 0 && diff <= 30 && (activeFilters.length === 0 || activeFilters.includes(e.category));
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const highImpact = upcoming.filter(e => e.impact === "high");

  return (
    <div className="flex flex-col h-full border-l border-border bg-sidebar">
      {selectedEvent ? (
        <EventDetail event={selectedEvent} onClose={() => onSelectEvent(null)} />
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-5">
            {/* High impact alerts */}
            {highImpact.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">High Impact</span>
                  <Badge variant="outline" className="ml-auto text-[10px] h-4 px-1.5 border-rose-500/40 text-rose-400">{highImpact.length}</Badge>
                </div>
                <div className="space-y-2">
                  {highImpact.slice(0, 4).map(event => (
                    <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event)} />
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* All upcoming */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming (30d)</span>
                <Badge variant="outline" className="ml-auto text-[10px] h-4 px-1.5">{upcoming.length}</Badge>
              </div>
              <div className="space-y-2">
                {upcoming.map(event => (
                  <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event)} />
                ))}
              </div>
            </div>

            <Separator />

            {/* Economic indicators */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Economic Calendar</span>
              </div>
              <div className="space-y-2">
                {ECONOMIC_INDICATORS.slice(0, 6).map(ind => (
                  <div key={ind.id} className="bg-card/60 rounded-lg p-2.5 border border-border/50 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium leading-tight">{ind.name}</span>
                      <div className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${IMPACT_DOT[ind.impact]}`} />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <span className="font-mono bg-muted px-1 rounded">{ind.country}</span>
                      <span>{fmtDate(ind.date)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <div className="text-center bg-muted/50 rounded p-1">
                        <div className="text-muted-foreground mb-0.5">Prev</div>
                        <div className="font-mono font-medium">{ind.previous}</div>
                      </div>
                      <div className="text-center bg-muted/50 rounded p-1">
                        <div className="text-muted-foreground mb-0.5">Fcst</div>
                        <div className="font-mono font-medium text-primary">{ind.forecast}</div>
                      </div>
                      <div className="text-center bg-muted/50 rounded p-1">
                        <div className="text-muted-foreground mb-0.5">Act</div>
                        <div className="font-mono font-medium text-muted-foreground">{ind.actual ?? "—"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function EventCard({ event, onClick }: { event: CalendarEvent; onClick: () => void }) {
  const meta = CATEGORY_META[event.category];
  const today = new Date(2026, 4, 11);
  const diff = Math.round((event.date.getTime() - today.getTime()) / 86400000);
  const rel = diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : `In ${diff}d`;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card/60 rounded-lg p-2.5 border border-border/50 hover:border-border transition-all hover:bg-card/90 space-y-1.5`}
    >
      <div className="flex items-start gap-2">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${IMPACT_DOT[event.impact]}`} />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium leading-tight truncate">{event.title}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 ml-3.5">
        <Badge variant="outline" className={`text-[10px] h-4 px-1.5 ${meta.bg} ${meta.color} ${meta.border}`}>
          {meta.label}
        </Badge>
        <span className="text-[10px] text-muted-foreground">{rel}</span>
        {event.assets && event.assets.slice(0, 2).map(a => (
          <span key={a} className="text-[10px] font-mono bg-muted px-1 rounded text-muted-foreground">{a}</span>
        ))}
      </div>
    </button>
  );
}

function EventDetail({ event, onClose }: { event: CalendarEvent; onClose: () => void }) {
  const meta = CATEGORY_META[event.category];
  const today = new Date(2026, 4, 11);
  const diff = Math.round((event.date.getTime() - today.getTime()) / 86400000);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Detail</span>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className={`p-3 rounded-lg border ${meta.bg} ${meta.border}`}>
            <div className="flex items-start gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${IMPACT_DOT[event.impact]}`} />
              <h3 className={`text-sm font-semibold leading-tight ${meta.color}`}>{event.title}</h3>
            </div>
            <div className="flex gap-2 flex-wrap ml-3.5">
              <Badge variant="outline" className={`text-[10px] h-4 px-1.5 ${meta.bg} ${meta.color} ${meta.border}`}>{meta.label}</Badge>
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">{event.impact} impact</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Date</span>
              <div className="text-right">
                <div className="text-xs font-medium">{event.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
                <div className="text-[10px] text-muted-foreground">{diff === 0 ? "Today" : diff > 0 ? `In ${diff} days` : `${Math.abs(diff)} days ago`}</div>
              </div>
            </div>

            <Separator />

            <div>
              <span className="text-xs text-muted-foreground block mb-1.5">Description</span>
              <p className="text-xs leading-relaxed">{event.description}</p>
            </div>

            {event.assets && event.assets.length > 0 && (
              <>
                <Separator />
                <div>
                  <span className="text-xs text-muted-foreground block mb-1.5">Affected Assets</span>
                  <div className="flex gap-2 flex-wrap">
                    {event.assets.map(a => (
                      <span key={a} className="font-mono text-xs bg-muted px-2 py-0.5 rounded font-semibold">{a}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {event.source && (
              <>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Source</span>
                  <div className="flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer">
                    <span>{event.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
