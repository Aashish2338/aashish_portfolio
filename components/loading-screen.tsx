"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Cpu,
  Globe,
  Layers,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

interface TechModule {
  id: string;
  label: string;
  sub: string;
  icon: typeof Smartphone;
}

const TECH_MODULES: TechModule[] = [
  { id: "android", label: "Android SDK", sub: "Architecture & Compose", icon: Smartphone },
  { id: "kmp", label: "Kotlin Multiplatform", sub: "Shared Core Logic", icon: Zap },
  { id: "compose", label: "Jetpack Compose", sub: "Declarative UI", icon: Layers },
  { id: "web", label: "Next.js & React", sub: "Full-Stack Web", icon: Globe },
  { id: "backend", label: "Spring Boot & Java", sub: "Microservices & APIs", icon: Server },
  { id: "devops", label: "CI/CD & Cloud", sub: "Release Automation", icon: Workflow },
];

const LOG_STREAM = [
  { time: "0.10s", tag: "CORE", text: "Initializing Senior Developer Runtime [Aashish Vishavkarma]" },
  { time: "0.38s", tag: "MOBILE", text: "Mounting Kotlin, Compose & KMP architectural foundations" },
  { time: "0.72s", tag: "STACK", text: "Hydrating Next.js web ecosystem & Spring Boot microservices" },
  { time: "1.10s", tag: "METRIC", text: "Benchmarked 5+ years experience & 100K+ production installs" },
  { time: "1.45s", tag: "STATUS", text: "All systems synchronized. Welcome to the portfolio." },
];

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [activeModuleIdx, setActiveModuleIdx] = useState(-1);
  const [logIdx, setLogIdx] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth 60fps progress interpolation
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  targetProgressRef.current = targetProgress;

  useEffect(() => {
    let animId: number;
    const updateProgress = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.2) {
        currentProgressRef.current += diff * 0.15;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }
      setDisplayProgress(Math.min(100, Math.round(currentProgressRef.current)));
      animId = requestAnimationFrame(updateProgress);
    };
    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Sequence timings
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // Trigger initial progress
    setTargetProgress(18);

    // Stagger module activation
    TECH_MODULES.forEach((_, index) => {
      const t = setTimeout(() => {
        setActiveModuleIdx(index);
        const nextProgress = Math.round(18 + ((index + 1) / TECH_MODULES.length) * 78);
        setTargetProgress(nextProgress);
      }, 150 + index * 220);
      timeouts.push(t);
    });

    // Stagger stream logs
    LOG_STREAM.forEach((_, index) => {
      const t = setTimeout(() => {
        setLogIdx(index);
      }, 200 + index * 300);
      timeouts.push(t);
    });

    // Complete sequence
    const completeTimeout = setTimeout(() => {
      setTargetProgress(100);
      setActiveModuleIdx(TECH_MODULES.length);
      const closeTimeout = setTimeout(() => {
        setLoading(false);
      }, 480);
      timeouts.push(closeTimeout);
    }, 1850);
    timeouts.push(completeTimeout);

    // Keyboard escape listener
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        setLoading(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050811]/95 p-4 select-none backdrop-blur-3xl"
        >
          {/* Ambient Lighting & Holographic Grid Background */}
          <div className="absolute inset-0 bg-grid-slate bg-grid opacity-30 pointer-events-none" />
          <div className="absolute h-[500px] w-[500px] rounded-full bg-android/15 blur-[140px] pointer-events-none" />
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          {/* Smart Console Window */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-android/30 bg-[#090D1A]/90 shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(61,220,132,0.18)] backdrop-blur-2xl"
          >
            {/* Top Glowing Shimmer Border Runner */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-android to-transparent shadow-[0_0_12px_rgba(61,220,132,1)]" />

            {/* Smart Console Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-white/70">
                  <Terminal size={13} className="text-android" />
                  <span className="font-semibold text-white">AV Studio Console</span>
                  <span className="text-white/30">•</span>
                  <span className="text-android-light text-[11px]">v5.4.0</span>
                </div>
              </div>

              {/* Live Telemetry & Quick Skip */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-android/20 bg-android/5 px-2.5 py-0.5 text-[11px] font-mono text-android">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-android opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-android" />
                  </span>
                  <span>ONLINE</span>
                </div>

                <button
                  onClick={() => setLoading(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/50 transition-all hover:border-android/50 hover:bg-android/10 hover:text-android focus:outline-none"
                  title="Skip to portfolio"
                >
                  [esc to skip]
                </button>
              </div>
            </div>

            {/* Smart Center: Modular Stack Visualizer */}
            <div className="p-6 space-y-5">
              {/* Title & Live Status Bar */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-android font-medium">
                    // System Initializing
                  </p>
                  <h3 className="font-display text-lg font-semibold text-white mt-0.5">
                    Mounting Developer Architecture
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_12px_rgba(61,220,132,0.4)]">
                    {displayProgress}
                    <span className="text-xs text-android ml-0.5">%</span>
                  </span>
                </div>
              </div>

              {/* 6 High-Tech Module Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {TECH_MODULES.map((module, i) => {
                  const Icon = module.icon;
                  const isReady = activeModuleIdx >= i;
                  const isCurrent = activeModuleIdx === i;

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className={`relative flex items-center gap-3 rounded-xl border p-2.5 transition-all duration-300 ${isReady
                          ? "border-android/40 bg-gradient-to-br from-android/15 to-transparent text-white shadow-[0_0_20px_rgba(61,220,132,0.15)]"
                          : isCurrent
                            ? "border-cyan-400/50 bg-cyan-500/10 text-white animate-pulse"
                            : "border-white/5 bg-white/[0.02] text-white/40"
                        }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${isReady
                            ? "bg-android/20 text-android"
                            : isCurrent
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-white/5 text-white/30"
                          }`}
                      >
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="truncate font-display text-xs font-semibold">
                            {module.label}
                          </p>
                          {isReady && (
                            <CheckCircle2 size={13} className="shrink-0 text-android" />
                          )}
                        </div>
                        <p className="truncate font-mono text-[10px] text-white/50">
                          {module.sub}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Dynamic Live Command Stream Bar */}
              <div className="rounded-xl border border-white/10 bg-[#060A14]/80 px-4 py-2.5 font-mono text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="shrink-0 rounded bg-android/15 px-1.5 py-0.5 text-[10px] font-bold text-android">
                      {LOG_STREAM[logIdx]?.tag ?? "INIT"}
                    </span>
                    <span className="shrink-0 text-white/30 text-[11px]">
                      [{LOG_STREAM[logIdx]?.time ?? "0.00s"}]
                    </span>
                    <span className="truncate text-paper/85">
                      {LOG_STREAM[logIdx]?.text ?? "Starting runtime..."}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block h-3 w-1.5 animate-pulse bg-android shrink-0" />
                </div>
              </div>
            </div>

            {/* Smart Progress Footer */}
            <div className="border-t border-white/10 bg-white/[0.02] px-6 py-4">
              <div className="mb-2 flex items-center justify-between font-mono text-xs text-white/60">
                <span className="flex items-center gap-2">
                  <Activity size={14} className="animate-pulse text-android" />
                  <span>Booting architecture modules...</span>
                </span>
                <span className="text-[11px] text-android">
                  {activeModuleIdx < TECH_MODULES.length
                    ? `${Math.max(0, activeModuleIdx + 1)} / ${TECH_MODULES.length} Loaded`
                    : "Ready"}
                </span>
              </div>

              {/* Glowing High-Tech Segmented Progress Bar */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 p-[1px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-android-dark via-android to-cyan-400 shadow-[0_0_16px_rgba(61,220,132,0.9)] transition-[width] duration-150 ease-out"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
