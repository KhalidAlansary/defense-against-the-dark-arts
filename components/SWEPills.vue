<template>
  <nav aria-label="Workspace view" class="flex w-fit">
    <div
      role="tablist"
      class="inline-flex rounded-2xl border border-white/12 bg-[#161616]/80 p-1 shadow-inner"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        role="tab"
        :aria-selected="tab.id === active"
        :class="[
          'inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap',
          tab.id === active
            ? 'border border-[#f9996c] bg-[#f9996c]/10 text-[#f9996c] shadow-sm'
            : 'text-[#999999] hover:bg-white/6 hover:text-white',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue"

const SWE1_TABS = [
  { id: "files", label: "Files" },
  { id: "software-requirements", label: "Software Requirements" },
  { id: "traceability", label: "Traceability Matrix" },
  { id: "communication-matrix", label: "Communication Matrix" },
  { id: "validation", label: "Validation" },
]

const SWE4_TABS = [
  { id: "unit-tests", label: "Unit Tests" },
  { id: "unit-tests-coverage", label: "Tests Coverage Report" },
]

const SWE6_TABS = [
  { id: "files", label: "Files" },
  { id: "test-specs", label: "Test Specs" },
  { id: "traceability", label: "Traceability Matrix" },
  { id: "communication-matrix", label: "Communication Matrix" },
  { id: "validation", label: "Validation" },
]

const props = defineProps<{
  swe: "swe1" | "swe4" | "swe6"
  active: string
}>()

const tabs = computed(() => {
  switch (props.swe) {
    case "swe1": return SWE1_TABS
    case "swe4": return SWE4_TABS
    case "swe6": return SWE6_TABS
  }
})
</script>
