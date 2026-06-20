<script setup lang="ts">
import { ref, nextTick } from "vue";

type TabKey = "threats" | "paths" | "goals";

const tabs: { key: TabKey; label: string }[] = [
  { key: "threats", label: "Threat Scenarios" },
  { key: "paths", label: "Attack Paths" },
  { key: "goals", label: "Cybersecurity Goals" },
];

const active = ref<TabKey>("threats");
const flash = ref<string | null>(null);

function goTo(tab: TabKey, id: string) {
  active.value = tab;
  nextTick(() => {
    flash.value = id;
    document.getElementById(`tara-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => (flash.value = null), 1500);
  });
}
</script>

<template>
  <div class="tara w-full rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden text-sm">
    <!-- header -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
      <span class="font-semibold tracking-tight">TARA Report</span>
      <span class="text-xs opacity-50">ECU · Powertrain Gateway</span>
    </div>

    <!-- tabs -->
    <div class="flex gap-1 px-3 pt-3">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="px-3 py-1.5 rounded-md text-xs transition-colors"
        :class="
          active === t.key
            ? 'bg-[#f9996c] text-[#0c0c0c] font-semibold'
            : 'bg-white/5 hover:bg-white/10 opacity-80'
        "
        @click="active = t.key"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- body -->
    <div class="p-3 min-h-[170px]">
      <!-- Threat Scenarios -->
      <div
        v-if="active === 'threats'"
        id="tara-TS-01"
        class="row"
        :class="{ flash: flash === 'TS-01' }"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="id">TS-01</span>
          <span class="badge bg-[#ac97bf]/20 text-[#cbb6dd]">Spoofing</span>
        </div>
        <div class="font-medium">Spoofed torque-request frames on the powertrain CAN bus</div>
        <div class="opacity-60 text-xs mt-1">
          Asset: Powertrain CAN bus · an attacker forges frames to command unintended torque.
        </div>
        <div class="links">
          <span class="opacity-50 text-xs">Traces forward to</span>
          <button class="link" @click="goTo('paths', 'AP-01')">→ AP-01</button>
          <button class="link" @click="goTo('goals', 'CG-01')">→ CG-01</button>
        </div>
      </div>

      <!-- Attack Paths -->
      <div
        v-if="active === 'paths'"
        id="tara-AP-01"
        class="row"
        :class="{ flash: flash === 'AP-01' }"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="id">AP-01</span>
          <span class="badge bg-[#fbae8c]/20 text-[#fbae8c]">Feasibility: Medium</span>
        </div>
        <div class="font-medium">Compromise telematics gateway → bridge to CAN → inject frames</div>
        <div class="opacity-60 text-xs mt-1">
          Actor: remote attacker · 3 steps · requires specialist knowledge.
        </div>
        <div class="links">
          <button class="link" @click="goTo('threats', 'TS-01')">← TS-01</button>
          <span class="opacity-50 text-xs">realizes the threat · mitigated by</span>
          <button class="link" @click="goTo('goals', 'CG-01')">→ CG-01</button>
        </div>
      </div>

      <!-- Cybersecurity Goals -->
      <div
        v-if="active === 'goals'"
        id="tara-CG-01"
        class="row"
        :class="{ flash: flash === 'CG-01' }"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="id">CG-01</span>
          <span class="badge bg-[#95b9ba]/20 text-[#95b9ba]">Integrity</span>
        </div>
        <div class="font-medium">Safety-critical CAN frames must be authenticated</div>
        <div class="opacity-60 text-xs mt-1">
          Verification: message-authentication code on powertrain frames; bench + HIL test.
        </div>
        <div class="links">
          <span class="opacity-50 text-xs">Traces back to</span>
          <button class="link" @click="goTo('threats', 'TS-01')">← TS-01</button>
          <button class="link" @click="goTo('paths', 'AP-01')">← AP-01</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.id {
  font-family: "Fira Code", monospace;
  font-weight: 700;
  color: #f9996c;
}
.badge {
  font-size: 0.7rem;
  padding: 0.05rem 0.5rem;
  border-radius: 9999px;
}
.row {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.6rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  transition:
    background 0.4s,
    box-shadow 0.4s;
}
.row.flash {
  background: rgba(249, 153, 108, 0.12);
  box-shadow: 0 0 0 1px #f9996c inset;
}
.links {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
  flex-wrap: wrap;
}
.link {
  font-family: "Fira Code", monospace;
  font-size: 0.72rem;
  padding: 0.1rem 0.5rem;
  border-radius: 0.35rem;
  background: rgba(249, 153, 108, 0.12);
  color: #f9996c;
  border: 1px solid rgba(249, 153, 108, 0.3);
  transition: background 0.2s;
}
.link:hover {
  background: rgba(249, 153, 108, 0.25);
}
</style>
