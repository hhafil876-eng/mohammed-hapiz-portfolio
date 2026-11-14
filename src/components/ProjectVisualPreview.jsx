import React from 'react'
import { Play, Sparkles, Shield, Cpu, Layers, Terminal, ExternalLink, Activity, CheckCircle, Database } from 'lucide-react'

export default function ProjectVisualPreview({ project, isExpanded = false }) {
  if (!project) return null

  const heightClass = isExpanded ? 'h-64 sm:h-80' : 'h-48 sm:h-52'

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden bg-[#070b12] border border-white/10 group-hover:border-lime-400/40 transition-all select-none flex flex-col`}>
      {/* ─── BROWSER / OS HEADER BAR ─── */}
      <div className="h-8 bg-[#0a101d] border-b border-white/[0.08] px-3.5 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Simulated Address Bar */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-gray-400 max-w-[240px] sm:max-w-xs truncate font-mono">
          <span className="text-lime-400">https://</span>
          <span className="truncate">{project.demo?.replace('https://', '') || 'preview.internal'}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[9px]">
            DEMO DATA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse ml-1" />
          <span className="hidden sm:inline text-lime-400">UI PREVIEW</span>
        </div>
      </div>

      {/* ─── HIGH-FIDELITY PROJECT SPECIFIC UI MOCKUP ─── */}
      <div className="relative flex-1 p-3.5 sm:p-4 overflow-hidden flex flex-col justify-between font-sans">
        
        {/* ================= 01: DECOSPACE AI ================= */}
        {project.num === '01' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-lime-400/20 text-lime-300 text-[10px] font-mono font-semibold">
                  3D SPATIAL STUDIO
                </span>
                <span className="text-[11px] text-gray-400">Preset: Nordic Loft</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">Grid: 16x16m</span>
            </div>

            {/* Room 3D Mesh Preview Simulation */}
            <div className="relative my-auto py-2 flex items-center justify-center">
              <div className="w-4/5 h-20 rounded-xl border border-dashed border-lime-400/30 bg-lime-400/[0.03] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#a3e635_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
                <div className="relative z-10 flex items-center gap-3 text-center">
                  <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-300">
                    <Layers size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-semibold text-white">Spatial Layout Engine</div>
                    <div className="text-[9px] text-gray-400">Generating dynamic lighting &amp; textures...</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Bar Preview */}
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5 text-gray-300 truncate">
                <Sparkles size={11} className="text-lime-400 flex-shrink-0" />
                <span className="truncate">"Warm minimalist oak accents, diffused sunlight"</span>
              </div>
              <span className="text-lime-400 font-mono text-[9px] px-1.5 py-0.5 rounded bg-lime-400/10 flex-shrink-0">
                AI Rendered
              </span>
            </div>
          </div>
        )}

        {/* ================= 02: PORTFOLIO MANAGEMENT SYSTEM ================= */}
        {project.num === '02' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
                <Database size={13} className="text-lime-400" />
                <span>MERN Admin Dashboard</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                JWT Auth: Active
              </span>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[9px] text-gray-400 uppercase font-mono">Visitors (Demo)</div>
                <div className="text-sm font-bold text-white font-mono">14.8k</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[9px] text-gray-400 uppercase font-mono">API P99 (Bench)</div>
                <div className="text-sm font-bold text-lime-400 font-mono">38ms</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[9px] text-gray-400 uppercase font-mono">MongoDB (Mock)</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">Sync</div>
              </div>
            </div>

            {/* CRUD Table Strip */}
            <div className="flex items-center justify-between text-[10px] p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] font-mono">
              <span className="text-gray-300">GET /api/v1/projects</span>
              <span className="text-lime-400">200 OK · 14 Items</span>
            </div>
          </div>
        )}

        {/* ================= 03: BLADEQUEST RPG ================= */}
        {project.num === '03' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-lime-400/20 text-lime-300 text-[10px] font-mono font-semibold">
                  PHASER CANVAS 2D
                </span>
                <span className="text-[11px] text-gray-300 font-mono">60 FPS</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300">✦ 3,420 Stars</span>
            </div>

            {/* Combat / Game Canvas Simulation */}
            <div className="my-auto p-2.5 rounded-xl bg-obsidian-950/80 border border-lime-400/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-white">Player: Astral Hero</span>
                <span className="text-lime-400">HP: 850 / 850</span>
              </div>
              {/* Health Bar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-lime-500 to-lime-300 w-full shadow-[0_0_8px_#a3e635]" />
              </div>
              <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono">
                <span>Dungeon: Astral Realm Floor 4</span>
                <span className="text-amber-400">Boss: Shadow Archon</span>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-mono truncate">
              Engine: Modular Physics Engine · Vite Runtime
            </div>
          </div>
        )}

        {/* ================= 04: SCAMSHIELD DEFENSE ================= */}
        {project.num === '04' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
                <Shield size={13} className="text-red-400" />
                <span>Threat Intelligence Center</span>
              </div>
              <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-500/20">
                CRITICAL THREAT
              </span>
            </div>

            {/* Heuristic Scanner */}
            <div className="my-auto p-2.5 rounded-xl bg-red-950/20 border border-red-500/30 flex flex-col gap-1.5">
              <div className="text-[9px] font-mono text-gray-400">Heuristic Vector Match:</div>
              <div className="text-[10px] font-mono text-red-300 truncate">
                Detected: Spoofed VTU Domain &amp; Credential Harvester
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono pt-1 border-t border-red-500/20">
                <span className="text-gray-400">Risk Score: 98/100</span>
                <span className="text-lime-400 font-semibold">ACTION: BLOCKED</span>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-mono flex items-center justify-between">
              <span>Interactive Safety Sandbox</span>
              <span className="text-lime-400">Defenses Active</span>
            </div>
          </div>
        )}

        {/* ================= 05: RAPHAEL AI ASSISTANT ================= */}
        {project.num === '05' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
                <Cpu size={13} className="text-lime-400" />
                <span>Autonomous Agent Pipeline</span>
              </div>
              <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded">
                Eval Match: 98.6% (Test Run)
              </span>
            </div>

            {/* Terminal Waveform Simulation */}
            <div className="my-auto p-2.5 rounded-xl bg-obsidian-950/80 border border-lime-400/20 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-lime-400">&gt;</span>
                <span className="text-white truncate">Task: "Analyze telemetry &amp; optimize cache"</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1 h-3">
                  {[40, 75, 90, 60, 30, 85, 100, 45, 60, 80, 50].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1 bg-lime-400 rounded-full inline-block"
                    />
                  ))}
                </div>
                <span className="text-[9px] text-lime-400 font-mono flex-shrink-0">Context Buffer: 8k</span>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-mono truncate">
              Chain: Intent Parser → Vector DB → Executed in 120ms
            </div>
          </div>
        )}

        {/* ================= 06: H&N CREATIONS MEDIA ================= */}
        {project.num === '06' && (
          <div className="h-full flex flex-col justify-between text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
                <Play size={13} className="text-lime-400" />
                <span>Cinematic Production Suite</span>
              </div>
              <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded">
                4K 60FPS ProRes
              </span>
            </div>

            {/* Video Multi-Track Timeline */}
            <div className="my-auto p-2.5 rounded-xl bg-obsidian-950/80 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-gray-400">
                <span>Timeline: Abhigyan Official Reel</span>
                <span className="text-lime-400">Rec.709 Mastered</span>
              </div>
              {/* Visual Tracks */}
              <div className="space-y-1">
                <div className="h-2 rounded bg-sky-500/30 flex items-center px-1">
                  <span className="text-[7px] text-sky-300 font-mono">V1: A-Roll 4K</span>
                </div>
                <div className="h-2 rounded bg-lime-500/30 flex items-center px-1">
                  <span className="text-[7px] text-lime-300 font-mono">V2: Color Grade LUT</span>
                </div>
                <div className="h-2 rounded bg-amber-500/30 flex items-center px-1">
                  <span className="text-[7px] text-amber-300 font-mono">A1: Master Sound</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-gray-400 font-mono flex items-center justify-between">
              <span>Audience Reach: 500k+</span>
              <span className="text-lime-400">Award: 2nd Place</span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
