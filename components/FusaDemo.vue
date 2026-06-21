<script setup lang="ts">
import { ref, computed } from "vue";

type WS = "hara" | "fta" | "fmea";

const workspaces: {
  key: WS;
  label: string;
  views: { key: string; label: string }[];
}[] = [
  {
    key: "hara",
    label: "HARA",
    views: [
      { key: "hier", label: "Hierarchy" },
      { key: "table", label: "Tables" },
    ],
  },
  {
    key: "fta",
    label: "FTA",
    views: [
      { key: "cuts", label: "Minimal Cut Sets" },
      { key: "cross", label: "Cross-ASIL Audit" },
    ],
  },
  {
    key: "fmea",
    label: "FMEA",
    views: [
      { key: "overview", label: "Risk Overview" },
      { key: "summary", label: "Action Summary" },
    ],
  },
];

const ws = ref<WS>("hara");
const view = ref("hier");

const currentViews = computed(() => workspaces.find((w) => w.key === ws.value)?.views ?? []);

const legendOpen = ref(false);

function selectWs(k: WS) {
  ws.value = k;
  view.value = workspaces.find((w) => w.key === k)?.views[0].key ?? "";
}

function asilClass(a: string) {
  const m: Record<string, string> = {
    D: "bg-[#f9996c]/20 text-[#f9996c] border-[#f9996c]/40",
    C: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    B: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    A: "bg-[#95b9ba]/15 text-[#95b9ba] border-[#95b9ba]/30",
    QM: "bg-white/10 text-white/50 border-white/15",
  };
  return m[a] ?? "bg-white/10 text-white/50 border-white/15";
}
function rpnClass(n: number) {
  if (n > 300) return "text-[#f9996c] font-bold";
  if (n > 100) return "text-amber-300 font-semibold";
  return "text-[#95b9ba]";
}
function pillClass(level: string) {
  const m: Record<string, string> = {
    H: "bg-[#f9996c]/20 text-[#f9996c] border-[#f9996c]/40",
    Critical: "bg-[#f9996c]/20 text-[#f9996c] border-[#f9996c]/40",
    Gap: "bg-[#f9996c]/20 text-[#f9996c] border-[#f9996c]/40",
    M: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    High: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    L: "bg-[#95b9ba]/15 text-[#95b9ba] border-[#95b9ba]/30",
    Covered: "bg-[#95b9ba]/15 text-[#95b9ba] border-[#95b9ba]/30",
  };
  return m[level] ?? "bg-white/10 text-white/50 border-white/15";
}

const explanation = computed(() => {
  const m: Record<string, string> = {
    "hara-hier":
      "Safety goals grouped by their highest ASIL — a quick read of where the risk concentrates.",
    "hara-table":
      "The full ASIL assessment: each hazardous event rated by Severity, Exposure and Controllability to set its ASIL.",
    "fta-cuts":
      "Minimal cut sets — the smallest failure combinations that trigger the top event; order 1 is a single point of failure.",
    "fta-cross":
      "Cross-ASIL audit — verifies each interface between components of differing ASIL is covered by a safety mechanism.",
    "fmea-overview":
      "Risk overview — every failure mode scored by S × O × D into an RPN, then ranked by Action Priority.",
    "fmea-summary":
      "Action summary — mitigations for the high-priority failures, with the RPN recalculated after each action.",
  };
  return m[`${ws.value}-${view.value}`] ?? "";
});
</script>

<template>
  <div
    class="relative w-full rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden text-sm"
  >
    <!-- header + workspace switcher -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
      <span class="font-semibold tracking-tight">Functional Safety</span>
      <div class="flex gap-1">
        <button
          v-for="w in workspaces"
          :key="w.key"
          class="px-3 py-1 rounded-md text-xs transition-colors"
          :class="
            ws === w.key
              ? 'bg-[#f9996c] text-[#0c0c0c] font-semibold'
              : 'bg-white/5 hover:bg-white/10 opacity-80'
          "
          @click="selectWs(w.key)"
        >
          {{ w.label }}
        </button>
      </div>
    </div>

    <!-- view toggle (shared shell element) -->
    <div class="flex gap-1 px-3 pt-3 items-center">
      <button
        v-for="v in currentViews"
        :key="v.key"
        class="px-2.5 py-1 rounded text-[11px] transition-colors border"
        :class="
          view === v.key
            ? 'border-[#f9996c]/50 bg-[#f9996c]/10 text-[#f9996c]'
            : 'border-white/10 opacity-65 hover:opacity-100'
        "
        @click="view = v.key"
      >
        {{ v.label }}
      </button>
      <button
        class="ml-auto px-2.5 py-1 rounded text-[11px] border transition-colors"
        :class="
          legendOpen
            ? 'border-[#f9996c]/50 bg-[#f9996c]/10 text-[#f9996c]'
            : 'border-white/10 opacity-65 hover:opacity-100'
        "
        @click="legendOpen = !legendOpen"
      >
        Reference
      </button>
    </div>

    <!-- body -->
    <div class="p-3 min-h-[210px]">
      <!-- HARA · Hierarchy -->
      <div v-if="ws === 'hara' && view === 'hier'" class="space-y-2">
        <div class="card">
          <div class="flex items-center justify-between">
            <span class="font-medium">Prevent unintended acceleration</span>
            <span class="bdg" :class="asilClass('D')">ASIL D</span>
          </div>
          <div class="text-xs opacity-55 mt-1">
            Unintended torque request · S: S3 · E: E4 · C: C3
          </div>
        </div>
        <div class="card">
          <div class="flex items-center justify-between">
            <span class="font-medium">Maintain steering availability</span>
            <span class="bdg" :class="asilClass('C')">ASIL C</span>
          </div>
          <div class="text-xs opacity-55 mt-1">Loss of steering assist · S: S3 · E: E3 · C: C2</div>
        </div>
      </div>

      <!-- HARA · Tables -->
      <table v-else-if="ws === 'hara' && view === 'table'" class="tbl">
        <thead>
          <tr>
            <th>Hazardous Event</th>
            <th>S</th>
            <th>E</th>
            <th>C</th>
            <th>ASIL</th>
            <th>Safety Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unintended torque request</td>
            <td>S3</td>
            <td>E4</td>
            <td>C3</td>
            <td><span class="bdg" :class="asilClass('D')">D</span></td>
            <td>Prevent unintended acceleration</td>
          </tr>
          <tr>
            <td>Loss of steering assist</td>
            <td>S3</td>
            <td>E3</td>
            <td>C2</td>
            <td><span class="bdg" :class="asilClass('C')">C</span></td>
            <td>Maintain steering availability</td>
          </tr>
        </tbody>
      </table>

      <!-- FTA · Minimal Cut Sets -->
      <table v-else-if="ws === 'fta' && view === 'cuts'" class="tbl">
        <thead>
          <tr>
            <th>MCS</th>
            <th>Order</th>
            <th>Basic Events</th>
            <th>Flags</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr class="spf">
            <td class="mono">MCS-01</td>
            <td><span class="bdg" :class="pillClass('Critical')">1 · SPF</span></td>
            <td>Torque sensor stuck-high</td>
            <td class="opacity-50">—</td>
            <td><span class="bdg" :class="pillClass('Critical')">Critical</span></td>
          </tr>
          <tr>
            <td class="mono">MCS-02</td>
            <td>2</td>
            <td>Watchdog failure + MCU hang</td>
            <td class="text-xs opacity-70">Latent · Cross-ASIL</td>
            <td><span class="bdg" :class="pillClass('High')">High</span></td>
          </tr>
        </tbody>
      </table>

      <!-- FTA · Cross-ASIL Audit -->
      <table v-else-if="ws === 'fta' && view === 'cross'" class="tbl">
        <thead>
          <tr>
            <th>Interface</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Coverage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Torque command → Inverter</td>
            <td><span class="bdg" :class="asilClass('D')">D</span></td>
            <td><span class="bdg" :class="asilClass('D')">D</span></td>
            <td><span class="bdg" :class="pillClass('Covered')">Covered</span></td>
          </tr>
          <tr>
            <td>Diagnostics → Telematics</td>
            <td><span class="bdg" :class="asilClass('B')">B</span></td>
            <td><span class="bdg" :class="asilClass('QM')">QM</span></td>
            <td><span class="bdg" :class="pillClass('Gap')">Gap</span></td>
          </tr>
        </tbody>
      </table>

      <!-- FMEA · Risk Overview -->
      <table v-else-if="ws === 'fmea' && view === 'overview'" class="tbl">
        <thead>
          <tr>
            <th>Component</th>
            <th>Failure Mode</th>
            <th>S</th>
            <th>O</th>
            <th>D</th>
            <th>RPN</th>
            <th>AP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brake-by-wire ECU</td>
            <td>No actuation</td>
            <td>10</td>
            <td>4</td>
            <td>8</td>
            <td class="mono" :class="rpnClass(320)">320</td>
            <td><span class="bdg" :class="pillClass('H')">H</span></td>
          </tr>
          <tr>
            <td>Torque sensor</td>
            <td>Stuck-high output</td>
            <td>9</td>
            <td>3</td>
            <td>4</td>
            <td class="mono" :class="rpnClass(108)">108</td>
            <td><span class="bdg" :class="pillClass('M')">M</span></td>
          </tr>
          <tr>
            <td>HV contactor</td>
            <td>Welded closed</td>
            <td>8</td>
            <td>2</td>
            <td>5</td>
            <td class="mono" :class="rpnClass(80)">80</td>
            <td><span class="bdg" :class="pillClass('L')">L</span></td>
          </tr>
        </tbody>
      </table>

      <!-- FMEA · Action Summary -->
      <table v-else-if="ws === 'fmea' && view === 'summary'" class="tbl">
        <thead>
          <tr>
            <th>Failure</th>
            <th>RPN₁</th>
            <th>Recommended Action</th>
            <th>RPNᵣ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Brake-by-wire: no actuation</td>
            <td class="mono" :class="rpnClass(320)">320</td>
            <td>Redundant actuation channel</td>
            <td class="mono text-[#95b9ba]">80</td>
          </tr>
          <tr>
            <td>Torque sensor stuck-high</td>
            <td class="mono" :class="rpnClass(108)">108</td>
            <td>Sensor plausibility check</td>
            <td class="mono text-[#95b9ba]">36</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="px-4 py-2 border-t border-white/10 text-xs opacity-60 leading-relaxed">
      {{ explanation }}
    </div>

    <!-- slide-out reference sheet -->
    <Transition name="slide">
      <div
        v-if="legendOpen"
        class="absolute inset-y-0 right-0 w-[58%] bg-[#0c0c0c] border-l border-white/15 shadow-2xl p-4 overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="font-semibold text-sm">Reference</span>
          <button class="text-xs opacity-50 hover:opacity-100" @click="legendOpen = false">
            ✕
          </button>
        </div>
        <div class="space-y-3 text-xs">
          <div>
            <div class="opacity-50 mb-1">ASIL — Severity × Exposure × Controllability</div>
            <div class="flex gap-1 flex-wrap">
              <span class="bdg" :class="asilClass('QM')">QM</span>
              <span class="bdg" :class="asilClass('A')">A</span>
              <span class="bdg" :class="asilClass('B')">B</span>
              <span class="bdg" :class="asilClass('C')">C</span>
              <span class="bdg" :class="asilClass('D')">D</span>
            </div>
          </div>
          <div>
            <div class="opacity-50 mb-1">FMEA — RPN = S × O × D</div>
            <div class="flex gap-4 mono">
              <span :class="rpnClass(320)">&gt; 300</span>
              <span :class="rpnClass(150)">&gt; 100</span>
              <span :class="rpnClass(50)">≤ 100</span>
            </div>
          </div>
          <div>
            <div class="opacity-50 mb-1">Risk / priority</div>
            <div class="flex gap-1 flex-wrap">
              <span class="bdg" :class="pillClass('Critical')">Critical</span>
              <span class="bdg" :class="pillClass('High')">High</span>
              <span class="bdg" :class="pillClass('M')">Medium</span>
              <span class="bdg" :class="pillClass('L')">Low</span>
            </div>
          </div>
          <div class="opacity-50">Cut-set order 1 = single point of failure.</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.02);
}
.bdg {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.05rem 0.5rem;
  border-radius: 0.3rem;
  border-width: 1px;
}
.mono {
  font-family: "Fira Code", monospace;
}
.tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.tbl th {
  text-align: left;
  font-weight: 600;
  opacity: 0.55;
  padding: 0.3rem 0.55rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.7rem;
}
.tbl td {
  padding: 0.4rem 0.55rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  vertical-align: middle;
}
.tbl tr.spf td:first-child {
  border-left: 2px solid #ef4444;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.28s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
