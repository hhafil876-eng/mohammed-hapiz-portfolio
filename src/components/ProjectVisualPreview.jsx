import React from 'react'
import { Play, Sparkles, Shield, Cpu, Layers, Terminal, ExternalLink, Activity, CheckCircle, Database } from 'lucide-react'

export default function ProjectVisualPreview({ project, isExpanded = false }) {
  if (!project) return null

  const heightClass = isExpanded ? 'h-64 sm:h-80' : 'h-48 sm:h-52'

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden bg-[#1F2227] border border-[#C0C0C0]/15 group-hover:border-[#FFD600]/40 transition-all select-none flex flex-col shadow-inner`}>
      {/* ─── BROWSER / OS HEADER BAR ─── */}
      <div className="h-8 bg-[#2B2E34] border-b border-[#C0C0C0]/10 px-3.5 flex items-center justify-between text-xs text-silver-500 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-electric/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Simulated Address Bar */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#17191D]/70 border border-[#C0C0C0]/10 text-[10px] text-silver-400 max-w-[240px] sm:max-w-xs truncate font-mono">
          <span className="text-[#FFD600]">https://</span>
          <span className="truncate">{project.demo?.replace('https://', '') || 'preview.internal'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="px-1.5 py-0.5 rounded bg-[#FFD600]/10 border border-[#FFD600]/25 text-[#FFD600] text-[9px]">
            TELEMETRY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] animate-pulse ml-1" />
          <span className="hidden sm:inline text-silver-300">PREVIEW</span>
        </div>
      </div>

      {/* ─── HIGH-FIDELITY PROJECT SPECIFIC UI MOCKUP ─── */}
      <div className="relative flex-1 p-3.5 sm:p-4 overflow-hidden flex flex-col justify-between font-sans">
        
        {/* ================= 01: DECOSPACE AI ================= */}
        {project.num === '01' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FFD600]/15 text-[#FFD600] text-[10px] font-mono font-semibold border border-[#FFD600]/25">
                  3D SPATIAL STUDIO
                </span>
                <span className="text-[11px] text-silver-400">Preset: Nordic Loft</span>
              </div>
              <span className="text-[10px] font-mono text-silver-500">Grid: 16x16m</span>
            </div>

            {/* Room 3D Mesh Preview Simulation */}
            <div className="relative my-auto py-2 flex items-center justify-center">
              <div className="w-4/5 h-20 rounded-xl border border-dashed border-[#FFD600]/30 bg-[#FFD600]/[0.03] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#C0C0C0_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                <div className="relative z-10 flex items-center gap-3 text-center">
                  <div className="w-8 h-8 rounded-lg bg-[#343840] border border-[#C0C0C0]/20 flex items-center justify-center text-[#FFD600]">
                    <Layers size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-semibold text-silver-100">Spatial Layout Engine</div>
                    <div className="text-[9px] text-silver-500">Dynamic materials & lighting vectors</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Bar Preview */}
            <div className="p-2 rounded-lg bg-[#2B2E34]/80 border border-[#C0C0C0]/10 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 text-silver-300 truncate">
                <Sparkles size={11} className="text-[#FFD600] flex-shrink-0" />
                <span className="truncate">"Minimalist silver accents, diffused graphite tones"</span>
              </div>
              <span className="text-[#FFD600] font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#FFD600]/10 flex-shrink-0 border border-[#FFD600]/20">
                AI Rendered
              </span>
            </div>
          </div>
        )}

        {/* ================= 02: PORTFOLIO MANAGEMENT SYSTEM ================= */}
        {project.num === '02' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-silver-100">
                <Database size={13} className="text-[#FFD600]" />
                <span>MERN Full-Stack Console</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                JWT Auth: Verified
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded-lg bg-[#2B2E34]/70 border border-[#C0C0C0]/10">
                <div className="text-[9px] text-silver-500 uppercase font-mono">Requests</div>
                <div className="text-sm font-bold text-silver-100 font-mono">14.8k</div>
              </div>
              <div className="p-2 rounded-lg bg-[#2B2E34]/70 border border-[#C0C0C0]/10">
                <div className="text-[9px] text-silver-500 uppercase font-mono">Latency P99</div>
                <div className="text-sm font-bold text-[#FFD600] font-mono">38ms</div>
              </div>
              <div className="p-2 rounded-lg bg-[#2B2E34]/70 border border-[#C0C0C0]/10">
                <div className="text-[9px] text-silver-500 uppercase font-mono">Database</div>
                <div className="text-sm font-bold text-silver-200 font-mono">Connected</div>
              </div>
            </div>

            {/* CRUD Table Strip */}
            <div className="flex items-center justify-between text-[10px] p-2 rounded-lg bg-[#2B2E34]/50 border border-[#C0C0C0]/10 font-mono">
              <span className="text-silver-400">GET /api/v1/projects</span>
              <span className="text-[#FFD600]">200 OK · Cloud Deployed</span>
            </div>
          </div>
        )}

        {/* ================= 03: BLADEQUEST RPG ================= */}
        {project.num === '03' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FFD600]/15 text-[#FFD600] text-[10px] font-mono font-semibold border border-[#FFD600]/25">
                  PHASER CANVAS 2D
                </span>
                <span className="text-[11px] text-silver-300 font-mono">60 FPS</span>
              </div>
              <span className="text-[10px] font-mono text-[#FFD600]">✦ 3,420 Stars</span>
            </div>

            {/* Combat / Game Canvas Simulation */}
            <div className="my-auto p-2.5 rounded-xl bg-[#17191D] border border-[#C0C0C0]/15 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-silver-100">Hero: Astral Wanderer</span>
                <span className="text-[#FFD600]">HP: 850 / 850</span>
              </div>
              {/* Health Bar */}
              <div className="w-full h-2 rounded-full bg-[#343840] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FFD600] to-[#FFE45C] w-full shadow-[0_0_8px_rgba(255,214,0,0.5)]" />
              </div>
              <div className="flex items-center justify-between text-[9px] text-silver-500 font-mono">
                <span>Dungeon: Astral Realm Floor 4</span>
                <span className="text-[#FFE45C]">Boss: Shadow Archon</span>
              </div>
            </div>

            <div className="text-[10px] text-silver-400 font-mono truncate">
              Engine: Modular Physics Loop · Vite ES6+ Runtime
            </div>
          </div>
        )}

        {/* ================= 04: SCAMSHIELD DEFENSE ================= */}
        {project.num === '04' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-silver-100">
                <Shield size={13} className="text-[#FFD600]" />
                <span>Threat Intelligence Center</span>
              </div>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-500/20">
                CRITICAL THREAT
              </span>
            </div>

            {/* Heuristic Scanner */}
            <div className="my-auto p-2.5 rounded-xl bg-[#2B2E34] border border-[#C0C0C0]/15 flex flex-col gap-1.5">
              <div className="text-[9px] font-mono text-silver-400">Heuristic Vector Match:</div>
              <div className="text-[10px] font-mono text-silver-200 truncate">
                Detected: Spoofed VTU Domain & Credential Harvester
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono pt-1 border-t border-[#C0C0C0]/10">
                <span className="text-silver-500">Risk Score: 98/100</span>
                <span className="text-[#FFD600] font-semibold">ACTION: INTERCEPTED</span>
              </div>
            </div>

            <div className="text-[10px] text-silver-400 font-mono flex items-center justify-between">
              <span>Interactive Safety Sandbox</span>
              <span className="text-emerald-400 font-mono">Live on Vercel</span>
            </div>
          </div>
        )}

        {/* ================= 05: RAPHAEL AI ASSISTANT ================= */}
        {project.num === '05' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-silver-100">
                <Cpu size={13} className="text-[#FFD600]" />
                <span>Autonomous Agent Pipeline</span>
              </div>
              <span className="text-[10px] font-mono text-[#FFD600] bg-[#FFD600]/10 px-2 py-0.5 rounded border border-[#FFD600]/25">
                Eval Match: 98.6%
              </span>
            </div>

            {/* Terminal Waveform Simulation */}
            <div className="my-auto p-2.5 rounded-xl bg-[#17191D] border border-[#C0C0C0]/15 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center gap-1 text-silver-400">
                <span className="text-[#FFD600]">&gt;</span>
                <span className="text-silver-200 truncate">Task: "Analyze telemetry & optimize cache"</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1 h-3">
                  {[40, 75, 90, 60, 30, 85, 100, 45, 60, 80, 50].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1 bg-[#FFD600] rounded-full inline-block"
                    />
                  ))}
                </div>
                <span className="text-[9px] text-silver-400 font-mono flex-shrink-0">Buffer: 8k tokens</span>
              </div>
            </div>

            <div className="text-[10px] text-silver-400 font-mono truncate">
              Chain: Intent Parser → Vector Store → Executed in 120ms
            </div>
          </div>
        )}

        {/* ================= 06: H&N CREATIONS MEDIA ================= */}
        {project.num === '06' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-silver-100">
                <Play size={13} className="text-[#FFD600]" />
                <span>Cinematic Production Suite</span>
              </div>
              <span className="text-[10px] font-mono text-[#FFD600] bg-[#FFD600]/10 px-2 py-0.5 rounded border border-[#FFD600]/25">
                4K 60FPS ProRes
              </span>
            </div>

            {/* Video Multi-Track Timeline */}
            <div className="my-auto p-2.5 rounded-xl bg-[#17191D] border border-[#C0C0C0]/15 space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-silver-400">
                <span>Timeline: Abhigyan Official Reel</span>
                <span className="text-[#FFD600]">Rec.709 Mastered</span>
              </div>
              {/* Visual Tracks */}
              <div className="space-y-1">
                <div className="h-2 rounded bg-silver-500/20 flex items-center px-1">
                  <span className="text-[7px] text-silver-300 font-mono">V1: A-Roll 4K</span>
                </div>
                <div className="h-2 rounded bg-[#FFD600]/25 flex items-center px-1">
                  <span className="text-[7px] text-[#FFE45C] font-mono">V2: Color Grade LUT</span>
                </div>
                <div className="h-2 rounded bg-[#343840] flex items-center px-1">
                  <span className="text-[7px] text-silver-400 font-mono">A1: Master Sound</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-silver-400 font-mono flex items-center justify-between">
              <span>Audience Reach: 500k+</span>
              <span className="text-[#FFD600]">2nd Place State Award</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
