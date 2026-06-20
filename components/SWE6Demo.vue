<template>
  <div class="mt-8">
    <Transition name="slide-fade" mode="out-in">
      <div
        v-if="!generated"
        key="button"
        class="flex flex-col items-center justify-center pt-14 min-h-[220px]"
      >
        <button
          class="inline-flex items-center justify-center gap-1.5 h-10 rounded-md px-4 text-sm font-medium border border-white/20 bg-[#f9996c] text-[#0c0c0c] shadow-sm cursor-pointer transition-all hover:brightness-110"
          @click="generated = true"
        >
          <svg
            class="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          Generate Test Specifications
        </button>
      </div>

      <div v-else key="table" class="w-full mt-8">
        <!-- Requirement Row (collapsible) -->
        <div>
          <div class="group/row">
            <!-- Collapsible trigger -->
            <div
              class="flex items-start gap-3 px-4 py-0.5 cursor-pointer hover:bg-white/[0.02] transition-colors select-none"
              @click="reqOpen = !reqOpen"
            >
              <svg
                class="h-5 w-5 shrink-0 mt-0.5 opacity-50 transition-transform duration-200"
                :class="reqOpen ? '' : '-rotate-90'"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-semibold text-sm">SW-REQ-001</span>
                  <span
                    class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium opacity-70"
                    >SW-REQ-001</span
                  >
                  <span class="text-xs opacity-50">3 test specs</span>
                </div>
                <p class="text-xs opacity-70 mt-1" :class="reqOpen ? '' : 'line-clamp-1'">
                  When any cell temperature exceeds 45°C, the software shall reduce the battery
                  charge current limit to a value less than or equal to the previously active limit
                  within 10 ms.
                </p>
              </div>
            </div>

            <!-- Collapsible content: Test Spec Cards in grid -->
            <div v-if="reqOpen" class="border-t border-white/10">
              <div class="p-6 pt-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    v-for="(spec, idx) in testSpecs"
                    :key="spec.id"
                    class="group/card relative w-full rounded-xl border border-white/10 bg-white/[0.04] shadow-sm hover:shadow-md hover:border-[#f9996c]/40 transition-all duration-200 ease-out text-left overflow-hidden cursor-pointer"
                    @click="openSpec(idx)"
                  >
                    <div
                      class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f9996c]/80 to-[#f9996c]/40 rounded-l-xl opacity-90"
                    />
                    <div class="p-3 pl-4 flex flex-col min-h-[110px]">
                      <div class="mb-2 pr-16">
                        <span
                          class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-medium"
                          >{{ spec.id }}</span
                        >
                      </div>
                      <p class="text-xs opacity-80 line-clamp-3 flex-1 leading-relaxed">
                        {{ spec.description }}
                      </p>
                      <div
                        class="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-white/10"
                      >
                        <span class="text-[10px] opacity-50 flex items-center gap-1">
                          <svg
                            class="w-3 h-3 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6"
                            />
                            <path d="M9 14 7 12" />
                            <path d="M13 14 15 12" />
                            <path d="M9 18 11 16" />
                            <path d="M13 18 15 16" />
                            <path d="M10 11h4" />
                          </svg>
                          {{ spec.steps }} step{{ spec.steps !== 1 ? "s" : "" }}
                        </span>
                        <span class="text-[10px] opacity-50 truncate max-w-[140px]">{{
                          spec.technique
                        }}</span>
                        <span
                          class="text-[10px] text-[#f9996c] ml-auto opacity-0 group-hover/card:opacity-100 transition-opacity"
                          >View details</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div
        v-if="showModal && selectedSpec"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
        @click.self="showModal = false"
      >
        <div class="absolute inset-0 bg-black/60" />
        <div
          class="relative w-full max-w-2xl rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        >
          <!-- Modal header: icon + ID + version badge + description -->
          <div class="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-sm font-medium"
                      >{{ selectedSpec.id }}</span
                    >
                    <span
                      class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium opacity-60"
                      >v1</span
                    >
                  </div>
                </div>
              </div>
              <button
                class="opacity-60 hover:opacity-100 cursor-pointer bg-transparent hover:bg-white/[0.06] rounded-md p-1.5 w-7 h-7 flex items-center justify-center"
                @click="showModal = false"
              >
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <p class="w-full text-sm opacity-70 mt-1">{{ selectedSpec.description }}</p>
          </div>

          <!-- Modal body -->
          <div class="overflow-y-auto p-6 space-y-4 test-spec-modal-scrollbar">
            <!-- Requirement (collapsible, full width) -->
            <div class="col-span-full rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div
                class="flex items-center justify-between w-full text-left cursor-pointer select-none"
                @click="reqDetailsOpen = !reqDetailsOpen"
              >
                <span class="text-sm font-medium">SW-REQ-001 (SW-REQ-001)</span>
                <svg
                  class="h-4 w-4 opacity-50 transition-transform duration-200"
                  :class="reqDetailsOpen ? '' : '-rotate-90'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <p v-if="reqDetailsOpen" class="text-sm opacity-70 mt-2 whitespace-pre-wrap">
                Limit battery charge current when cell temperature exceeds 45°C. When any cell
                temperature exceeds 45°C, the software shall reduce the battery charge current limit
                to a value less than or equal to the previously active limit within 10 ms.
              </p>
            </div>

            <!-- Bento grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Test Objective -->
              <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Test Objective
                </h4>
                <p class="text-sm opacity-80">{{ selectedSpec.testObjective }}</p>
              </div>

              <!-- Feature & Refs -->
              <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Feature & Refs
                </h4>
                <div class="space-y-2">
                  <span
                    class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-xs max-w-full truncate"
                    >{{ selectedSpec.feature }}</span
                  >
                  <div v-if="selectedSpec.refs.length > 0" class="flex flex-wrap gap-1">
                    <span
                      v-for="ref in selectedSpec.refs"
                      :key="ref"
                      class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] max-w-full truncate"
                      >{{ ref }}</span
                    >
                  </div>
                  <div class="pt-1 border-t border-white/10">
                    <p class="text-[10px] font-medium opacity-40 uppercase tracking-wider mb-1">
                      Verifies
                    </p>
                    <div class="flex flex-wrap gap-1">
                      <span
                        class="inline-flex items-center rounded-md border border-[#f9996c]/20 bg-[#f9996c]/10 text-[#f9996c] px-2 py-0.5 font-mono text-[10px]"
                        >SW-REQ-001</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Preconditions -->
              <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Preconditions
                </h4>
                <ul class="text-sm space-y-1 list-disc list-inside opacity-80">
                  <li v-for="item in selectedSpec.preconditions" :key="item">{{ item }}</li>
                </ul>
              </div>

              <!-- Input Parameters -->
              <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Input Parameters
                </h4>
                <div v-for="(val, key) in selectedSpec.inputParameters" :key="key" class="text-sm">
                  <span class="font-medium opacity-90">{{ key }}:</span>
                  <span class="opacity-70 ml-1">{{ val }}</span>
                </div>
              </div>

              <!-- Expected Output (full width) -->
              <div class="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Expected Output
                </h4>
                <p class="text-sm opacity-80 whitespace-pre-wrap">
                  {{ selectedSpec.expectedOutput }}
                </p>
              </div>

              <!-- Pass Criteria -->
              <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Pass Criteria
                </h4>
                <ul class="text-sm space-y-1 list-disc list-inside opacity-80">
                  <li v-for="item in selectedSpec.passCriteria" :key="item">{{ item }}</li>
                </ul>
              </div>

              <!-- Postconditions -->
              <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <h4 class="text-xs font-semibold uppercase tracking-wider opacity-50 mb-2">
                  Postconditions
                </h4>
                <ul class="text-sm space-y-1 list-disc list-inside opacity-80">
                  <li v-for="item in selectedSpec.postconditions" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>

            <!-- Execution procedure -->
            <div v-if="selectedSpec.executionProcedure.length > 0">
              <h4 class="text-sm font-semibold mb-3">Execution Procedure</h4>
              <div class="relative pl-8 space-y-4">
                <div
                  class="absolute left-3 top-6 bottom-3 w-0.5 -translate-x-1/2 bg-[#f9996c]/30 rounded-full"
                />
                <div
                  v-for="step in selectedSpec.executionProcedure"
                  :key="step.stepNumber"
                  class="relative flex gap-4 items-start"
                >
                  <div
                    class="absolute -left-8 top-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f9996c] text-[#0c0c0c] text-xs font-bold z-10"
                  >
                    {{ step.stepNumber }}
                  </div>
                  <div
                    class="flex-1 min-w-0 ml-6 rounded-lg border border-white/10 bg-white/[0.04] p-3"
                  >
                    <p class="text-sm font-medium">{{ step.action }}</p>
                    <p class="text-xs opacity-50 mt-1">Expected: {{ step.expectedResult }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const generated = ref(false);
const showModal = ref(false);
const reqOpen = ref(true);
const reqDetailsOpen = ref(false);
const selectedIdx = ref(0);

interface ExecutionStep {
  stepNumber: number;
  action: string;
  expectedResult: string;
}

interface TestSpec {
  id: string;
  description: string;
  steps: number;
  technique: string;
  testObjective: string;
  feature: string;
  refs: string[];
  preconditions: string[];
  inputParameters: Record<string, string>;
  expectedOutput: string;
  passCriteria: string[];
  postconditions: string[];
  executionProcedure: ExecutionStep[];
}

const testSpecs: TestSpec[] = [
  {
    id: "TS-QT-SWE6-001",
    description:
      "Verify that when any cell temperature exceeds 45°C, the BMS shall reduce the charge current limit to a safe value within 10 ms.",
    steps: 5,
    technique: "Equivalence partitioning +2",
    testObjective:
      "Verify temperature-based current limiting complies with SW-REQ-001 under nominal and boundary conditions.",
    feature: "BMS_OVERTEMP_PROTECTION",
    refs: ["FIBEX-CHASSIS-042"],
    preconditions: [
      "BMS is powered on and in charge mode",
      "Cell temperature sensor calibration is valid",
      "Initial charge current limit ≥ 100 A",
    ],
    inputParameters: {
      CellTemperature: "46°C (above threshold)",
      InitialCurrentLimit: "120 A",
    },
    expectedOutput: "Charge current limit is reduced to ≤ 100 A within 10 ms of detection.",
    passCriteria: [
      "Current limit reduces within 10 ms",
      "Reduced limit ≤ previous limit",
      "No communication bus errors logged",
    ],
    postconditions: ["BMS remains in charge mode with reduced current", "Overtemp event is logged"],
    executionProcedure: [
      {
        stepNumber: 1,
        action: "Set cell temperature to 46°C via sensor simulator",
        expectedResult: "Temperature reading confirmed at 46°C",
      },
      {
        stepNumber: 2,
        action: "Read charge current limit register",
        expectedResult: "Current limit ≤ 100 A within 10 ms",
      },
      {
        stepNumber: 3,
        action: "Read fault/event log",
        expectedResult: "Overtemp event recorded with timestamp",
      },
      {
        stepNumber: 4,
        action: "Verify BMS still in charge mode",
        expectedResult: "Charge mode unchanged",
      },
      {
        stepNumber: 5,
        action: "Reduce cell temperature to 25°C and re-check current limit",
        expectedResult: "Current limit restored to ≥ 100 A",
      },
    ],
  },
  {
    id: "TS-QT-SWE6-002",
    description:
      "Verify that rapid temperature oscillations near the 45°C threshold do not cause repeated current limit toggling (chattering).",
    steps: 4,
    technique: "Boundary value analysis +1",
    testObjective:
      "Ensure hysteresis prevents oscillation-induced current limit chattering near the 45°C threshold.",
    feature: "BMS_OVERTEMP_PROTECTION",
    refs: ["FIBEX-CHASSIS-042"],
    preconditions: [
      "BMS is powered on and in charge mode",
      "Cell temperature sensor calibration is valid",
      "Temperature can be swept through 45°C boundary",
    ],
    inputParameters: {
      TemperatureSweep: "44.5°C ↔ 45.5°C at 1 Hz",
      InitialCurrentLimit: "100 A",
    },
    expectedOutput: "Current limit toggles at most once per 500 ms; no rapid oscillation.",
    passCriteria: [
      "No more than 2 limit changes in 1 second",
      "Current limit remains stable within each half-cycle",
    ],
    postconditions: ["BMS remains operational with no thermal runaway flags"],
    executionProcedure: [
      {
        stepNumber: 1,
        action: "Sweep cell temperature between 44.5°C and 45.5°C at 1 Hz",
        expectedResult: "Temperature cycles as programmed",
      },
      {
        stepNumber: 2,
        action: "Monitor charge current limit register over 5 seconds",
        expectedResult: "Limit changes ≤ 2 times per second",
      },
      {
        stepNumber: 3,
        action: "Read event log for hysteresis events",
        expectedResult: "No rapid toggling errors logged",
      },
      {
        stepNumber: 4,
        action: "Verify BMS does not enter protective shutdown",
        expectedResult: "Normal charge mode maintained",
      },
    ],
  },
  {
    id: "TS-QT-SWE6-003",
    description:
      "Verify that the BMS overtemp protection remains functional after a controller reset (power cycle) during an active overtemp event.",
    steps: 4,
    technique: "State transition testing +3",
    testObjective:
      "Confirm that overtemp protection state persists across controller reset and resumes correct current limiting post-reboot.",
    feature: "BMS_OVERTEMP_PROTECTION",
    refs: ["FIBEX-CHASSIS-042"],
    preconditions: [
      "BMS has been powered on for at least 30 s in charge mode",
      "Cell temperature is above 45°C threshold",
      "Charge current limit has been reduced (active overtemp)",
    ],
    inputParameters: {
      CellTemperature: "47°C (persistent overtemp)",
      ResetType: "Power cycle (500 ms off)",
    },
    expectedOutput:
      "After reset, the BMS re-enters overtemp protection and limits charge current to ≤ 100 A within 10 ms of charge resume.",
    passCriteria: [
      "Overtemp state restored within 100 ms of charge resume",
      "Current limit ≤ previously active limit",
      "Event log shows overtemp continuity across reset",
    ],
    postconditions: ["BMS operates in charge mode with overtemp limiting active"],
    executionProcedure: [
      {
        stepNumber: 1,
        action: "Raise cell temperature to 47°C and confirm current limit reduction",
        expectedResult: "Current limit ≤ 100 A",
      },
      {
        stepNumber: 2,
        action: "Cycle BMS power off for 500 ms, then restore power",
        expectedResult: "BMS boots successfully, charge mode entered",
      },
      {
        stepNumber: 3,
        action: "Read charge current limit register within 10 ms of charge resume",
        expectedResult: "Current limit ≤ 100 A",
      },
      {
        stepNumber: 4,
        action: "Read event log for overtemp continuity markers",
        expectedResult: "Temperatures and limit reductions logged across reset boundary",
      },
    ],
  },
];

const selectedSpec = ref<TestSpec>(testSpecs[0]);

function openSpec(idx: number) {
  selectedIdx.value = idx;
  selectedSpec.value = testSpecs[idx];
  showModal.value = true;
}
</script>
