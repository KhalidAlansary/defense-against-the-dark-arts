<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const sections = [
  {
    id: "intro",
    label: "1 · Introduction",
    body: "This Security Concept documents the cybersecurity goals and the measures that satisfy them for the powertrain gateway ECU, per ISO/SAE 21434.",
  },
  {
    id: "scope",
    label: "2 · Scope",
    body: "Covers the gateway's external interfaces, internal CAN buses, and the telematics bridge. Production firmware only; development tooling is out of scope.",
  },
  {
    id: "system",
    label: "3 · System Description",
    body: "The gateway routes messages between the telematics unit and the powertrain CAN bus, enforcing message filtering and rate limiting at the boundary.",
  },
  {
    id: "goals",
    label: "4 · Cybersecurity Goals",
    body: "CG-01 Authenticity & integrity of safety-critical CAN frames. CG-02 Confidentiality of provisioned keys. CG-03 Availability of the safety message path.",
  },
  {
    id: "measures",
    label: "5 · Security Measures",
    body: "SM-01 Message authentication codes on powertrain frames. SM-02 Secure key storage in the HSM. SM-03 Ingress rate limiting and anomaly detection.",
  },
  {
    id: "trace",
    label: "6 · Traceability",
    body: "Goal-coverage and measure-coverage matrices link every cybersecurity goal to the measures that fulfil it, and back — no goal left uncovered.",
  },
];

const active = ref(sections[0].id);
const container = ref<HTMLElement | null>(null);

function onScroll() {
  const c = container.value;
  if (!c) return;
  // at the bottom, the last section is active even if its top never reaches the threshold
  if (c.scrollTop + c.clientHeight >= c.scrollHeight - 4) {
    active.value = sections[sections.length - 1].id;
    return;
  }
  let current = sections[0].id;
  for (const s of sections) {
    const el = document.getElementById(`seco-${s.id}`);
    if (el && el.offsetTop - c.scrollTop <= 48) current = s.id;
  }
  active.value = current;
}

function scrollTo(id: string) {
  const el = document.getElementById(`seco-${id}`);
  const c = container.value;
  if (el && c) c.scrollTo({ top: el.offsetTop - 6, behavior: "smooth" });
}

onMounted(() => container.value?.addEventListener("scroll", onScroll));
onBeforeUnmount(() => container.value?.removeEventListener("scroll", onScroll));
</script>

<template>
  <div class="w-full rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden text-sm">
    <div class="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
      <span class="font-semibold tracking-tight">Security Concept Report</span>
      <span class="text-xs opacity-50">Export as DOCX</span>
    </div>

    <div class="grid grid-cols-[150px_1fr]">
      <!-- TOC -->
      <nav class="border-r border-white/10 p-3 flex flex-col gap-0.5">
        <div class="text-[10px] font-medium uppercase tracking-widest opacity-40 mb-3">
          Contents
        </div>
        <template v-for="(s, i) in sections" :key="s.id">
          <button
            class="flex items-center gap-2.5 text-left text-xs py-1 transition-colors"
            :class="active === s.id ? 'text-white font-medium' : 'opacity-55 hover:opacity-90'"
            @click="scrollTo(s.id)"
          >
            <span
              class="rounded-full shrink-0 transition-all"
              :class="active === s.id ? 'w-1.5 h-1.5 bg-[#f9996c]' : 'w-1 h-1 bg-white/40'"
            />
            {{ s.label.replace(/^\d+ · /, "") }}
          </button>
          <div v-if="i === 2" class="my-1.5 h-px bg-white/10" />
        </template>
      </nav>

      <!-- scrollable document -->
      <div ref="container" class="relative h-[185px] overflow-y-auto p-4 scroll-area">
        <section v-for="s in sections" :id="`seco-${s.id}`" :key="s.id" class="mb-5 last:mb-0">
          <h3 class="text-[#f9996c] font-semibold mb-1">{{ s.label }}</h3>
          <p class="opacity-75 leading-relaxed">{{ s.body }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-area::-webkit-scrollbar {
  width: 6px;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: rgba(249, 153, 108, 0.4);
  border-radius: 9999px;
}
</style>
