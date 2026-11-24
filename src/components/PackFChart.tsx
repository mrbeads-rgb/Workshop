import { useState } from 'react';
import type { PackFZone } from '../data/masterclassData';
import { calculatePackFMetrics } from '../utils/workbookLogic';

interface PackFChartProps {
  zones: PackFZone[];
}

export function PackFChart({ zones }: PackFChartProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const metrics = calculatePackFMetrics(zones);

  const width = 520;
  const height = 280;
  const margin = { top: 20, right: 16, bottom: 48, left: 42 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const maxVal = 110;

  const groupW = plotW / metrics.zones.length;
  const barW = Math.min(22, groupW * 0.3);
  const gap = 4;

  const yPos = (val: number) => margin.top + plotH - (val / maxVal) * plotH;
  const yTicks = [0, 25, 50, 75, 100];

  const activeZone =
    metrics.zones.find((z) => z.zone === hoveredZone) ??
    metrics.zones.find((z) => z.zone === 'Kano') ??
    metrics.zones[0];

  return (
    <div className="bg-paper border border-rule rounded-md p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
          Completion % vs. Budget Utilisation % by Zone
        </span>
        <div className="flex items-center gap-3 text-[11px] font-mono text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-[#1f4e5f] rounded-[1px]" />
            Completion %
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-[#b84a39] rounded-[1px]" />
            Outlier (Kano)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-[#d99000] rounded-[1px]" />
            Budget Util. %
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto block"
        role="img"
        aria-label="Grouped bar chart comparing Q3 completion rate and budget utilisation across six zones"
      >
        {/* Gridlines & Y-axis ticks */}
        {yTicks.map((tick) => {
          const y = yPos(tick);
          return (
            <g key={tick}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={y}
                y2={y}
                stroke={tick === 0 ? '#17181a' : '#dedad0'}
                strokeWidth={tick === 0 ? 1.2 : 1}
                strokeDasharray={tick === 0 ? undefined : '3 3'}
              />
              <text
                x={margin.left - 8}
                y={y + 3.5}
                textAnchor="end"
                fontSize="10"
                fontFamily="IBM Plex Mono, monospace"
                fill="#56585c"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* Grouped Bars */}
        {metrics.zones.map((z, idx) => {
          const cx = margin.left + groupW * idx + groupW / 2;
          const xComp = cx - barW - gap / 2;
          const xUtil = cx + gap / 2;
          const yComp = yPos(z.completionPct);
          const yUtil = yPos(z.utilisationPct);
          const hComp = margin.top + plotH - yComp;
          const hUtil = margin.top + plotH - yUtil;
          const isFocused = hoveredZone === z.zone;
          const compFill = z.zone === 'Kano' ? '#b84a39' : '#1f4e5f';

          return (
            <g
              key={z.zone}
              onMouseEnter={() => setHoveredZone(z.zone)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => setHoveredZone(z.zone)}
              className="cursor-pointer"
            >
              {isFocused && (
                <rect
                  x={margin.left + groupW * idx + 4}
                  y={margin.top}
                  width={groupW - 8}
                  height={plotH}
                  fill="#e7f0f3"
                  opacity={0.55}
                  rx={2}
                />
              )}

              <rect
                x={xComp}
                y={yComp}
                width={barW}
                height={Math.max(1, hComp)}
                fill={compFill}
                rx={1.5}
              />
              <text
                x={xComp + barW / 2}
                y={yComp - 5}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="IBM Plex Mono, monospace"
                fontWeight="600"
                fill={compFill}
              >
                {z.completionPct.toFixed(0)}
              </text>

              <rect
                x={xUtil}
                y={yUtil}
                width={barW}
                height={Math.max(1, hUtil)}
                fill="#d99000"
                rx={1.5}
              />
              <text
                x={xUtil + barW / 2}
                y={yUtil - 5}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="IBM Plex Mono, monospace"
                fontWeight="600"
                fill="#785008"
              >
                {z.utilisationPct.toFixed(0)}
              </text>

              <text
                x={cx}
                y={height - 20}
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight={isFocused ? '700' : '500'}
                fill="#17181a"
              >
                {z.zone === 'Port Harcourt' ? 'P. Harcourt' : z.zone}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Live Zone Inspector Readout */}
      <div className="mt-2 pt-2.5 border-t border-rule flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-ink-muted tabular-nums">
        <span>
          Inspecting <strong className="text-ink">{activeZone.zone}</strong>: Completion{' '}
          <strong className="text-ink">{activeZone.completionPct}%</strong> · Budget{' '}
          <strong className="text-ink">{activeZone.utilisationPct}%</strong> · Cost/done{' '}
          <strong className="text-ink">₦{activeZone.costPerCompleted}m</strong>
        </span>
        <span>Turnaround: {activeZone.turnaround.toFixed(1)}d (target ≤ 5.0d)</span>
      </div>
    </div>
  );
}
