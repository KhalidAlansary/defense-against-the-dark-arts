<template>
  <div class="mt-0">
    <!-- Generate button -->
    <Transition name="slide-fade" mode="out-in">
      <div
        v-if="!generated"
        key="button"
        class="flex flex-col items-center justify-center pt-16 min-h-[200px]"
      >
        <button
          class="inline-flex items-center justify-center gap-1.5 h-8 rounded-md px-3 text-sm font-medium border border-white/20 bg-[#f9996c] text-[#0c0c0c] shadow-sm cursor-pointer transition-all hover:brightness-110"
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
          Generate Software Requirements
        </button>
      </div>

      <!-- Table demo -->
      <div v-else key="table" class="w-full mt-12">
        <div class="flex items-center justify-end gap-2 px-4 py-2">
          <div class="relative inline-flex">
            <button
              class="inline-flex items-center gap-1.5 p-1.5 rounded-md hover:bg-white/[0.06] opacity-50 hover:opacity-100 transition-colors cursor-pointer text-xs"
              @click.stop="settingsOpen = !settingsOpen"
              aria-label="Filter attributes"
            >
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="14" y2="12" />
                <line x1="4" y1="18" x2="10" y2="18" />
                <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              Settings
            </button>
            <div
              v-if="settingsOpen"
              class="absolute z-50 right-0 top-full mt-2 w-auto min-w-[160px] rounded-md border border-white/10 bg-[#1a1a1a] p-2 shadow-lg"
              @click.stop
            >
              <div class="flex flex-col gap-0.5">
                <span class="text-[10px] font-medium opacity-50 uppercase tracking-wider px-2 py-1">Filter Attributes</span>
                <label
                  v-for="attr in configurableAttributes"
                  :key="attr.id"
                  class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-white/[0.06] transition-colors text-xs"
                >
                  <input
                    type="checkbox"
                    :checked="toggleState[attr.id]"
                    class="rounded border-white/20 accent-[#f9996c]"
                    @change="toggleAttribute(attr.id)"
                  />
                  {{ attr.label }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <!-- System Requirement Row (collapsible, starts open) -->
          <div class="border-b border-white/10 last:border-b-0">
            <!-- Trigger -->
            <div
              class="flex items-center justify-between gap-4 px-4 py-2 cursor-pointer transition-all duration-700"
              :class="
                highlightedSysReq
                  ? 'bg-[#f9996c]/10 ring-2 ring-[#f9996c]/40'
                  : 'hover:bg-white/[0.03]'
              "
              @click="sysReqOpen = !sysReqOpen"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="flex h-4 w-4 shrink-0 items-center justify-center opacity-60">
                  <svg
                    v-if="sysReqOpen"
                    class="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    v-else
                    class="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
                <span
                  class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] font-medium shrink-0"
                  >SYS-REQ-001</span
                >
                <span class="text-sm leading-snug truncate"
                  >Limit battery charge current when cell temperature exceeds 45°C.</span
                >
              </div>
              <div class="flex shrink-0 items-center gap-2 text-sm">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#f9996c]/20 bg-[#f9996c]/10 text-[#f9996c]"
                  >ASIL D</span
                >
                <span
                  class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border border-white/10 bg-white/[0.06]"
                  :class="
                    acceptedCount === 1
                      ? 'text-[#95b9ba] border-[#95b9ba]/20 bg-[#95b9ba]/10'
                      : 'opacity-60'
                  "
                  >{{ acceptedCount }}/1 accepted SW reqs</span
                >
              </div>
            </div>

            <!-- SW Requirement Card -->
            <div v-if="sysReqOpen" class="border-t border-white/10 bg-white/[0.02]">
              <div class="p-3 pb-6">
                <div class="relative pl-12 pt-1">
                  <div
                    class="absolute left-6 top-0 w-4 h-7 border-l border-b border-white/10 rounded-bl-xl"
                  />
                  <div
                    class="group/card relative w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-sm transition-all hover:border-[#f9996c]/30 hover:shadow-md cursor-pointer"
                    @click="
                      modalMode = 'view';
                      showModal = true;
                    "
                  >
                    <div
                      class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f9996c]/80 to-[#f9996c]/40 rounded-l-xl opacity-90"
                    />

                    <div class="flex items-start justify-between gap-3">
                      <div class="flex flex-col gap-1.5 min-w-0">
                        <div class="flex items-center gap-2">
                          <span
                            class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] font-medium"
                            >SW-REQ-001</span
                          >

                          <div
                            class="relative inline-flex"
                            @click.stop="refinesOpen = !refinesOpen"
                          >
                            <button
                              class="inline-flex items-center justify-center p-1 rounded-md hover:bg-white/[0.06] opacity-60 hover:opacity-100 transition-colors cursor-pointer"
                            >
                              <svg
                                class="w-3 h-3"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                                />
                                <path
                                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                                />
                              </svg>
                            </button>
                            <div
                              v-if="refinesOpen"
                              class="absolute z-50 left-0 top-full mt-2 w-auto min-w-[140px] rounded-md border border-white/10 bg-[#1a1a1a] p-3 shadow-lg"
                              @click.stop
                            >
                              <div class="flex flex-col gap-2">
                                <span
                                  class="text-[11px] font-medium opacity-50 uppercase tracking-wider"
                                  >Refines</span
                                >
                                <div class="flex flex-wrap gap-1.5">
                                  <span
                                    class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-medium cursor-pointer hover:bg-[#f9996c]/20 hover:border-[#f9996c]/40 transition-colors"
                                    title="Navigate to SYS-REQ-001"
                                    @click.stop="highlightSysReq()"
                                    >SYS-REQ-001</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p class="text-sm leading-snug max-w-full line-clamp-2">
                          When any cell temperature exceeds 45°C, the software shall reduce the
                          battery charge current limit to a value less than or equal to the
                          previously active limit within 10 ms.
                        </p>
                        <div class="flex flex-wrap gap-1.5 mt-1.5">
                          <span
                            v-for="attr in visibleAttrs"
                            :key="attr.id"
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-white/[0.04] text-white/70 border-white/10"
                          >
                            <span class="opacity-50 mr-1">{{ attr.label }}:</span>
                            {{ attr.value }}
                          </span>
                            </div>
                          </div>

                          <div class="flex shrink-0 items-center justify-end gap-1">

                        <div class="relative inline-flex">
                          <button
                            class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium cursor-pointer transition-colors"
                            :class="statusClass"
                            @click.stop="statusOpen = !statusOpen"
                          >
                            <span
                              class="block h-1.5 w-1.5 shrink-0 rounded-full"
                              :class="statusDotClass"
                            />
                            {{ statusLabel }}
                            <svg
                              class="h-3 w-3 opacity-70"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                          <div
                            v-if="statusOpen"
                            class="absolute z-50 top-full right-0 mt-1 w-auto min-w-[100px] rounded-md border border-white/10 bg-[#1a1a1a] py-1 shadow-lg"
                            @click.stop
                          >
                            <button
                              v-for="opt in statusOptions"
                              :key="opt.value"
                              class="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-medium cursor-pointer hover:bg-white/[0.06] transition-colors"
                              @click="setStatus(opt.value)"
                            >
                              <span
                                class="block h-1.5 w-1.5 shrink-0 rounded-full"
                                :class="opt.dotClass"
                              />
                              {{ opt.label }}
                            </button>
                          </div>
                        </div>

                        <div class="relative inline-flex">
                          <button
                            class="inline-flex items-center justify-center rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer bg-transparent hover:bg-white/[0.06] w-6 h-6"
                            @click.stop="actionsOpen = !actionsOpen"
                            aria-label="More actions"
                          >
                            <svg
                              class="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                          <div
                            v-if="actionsOpen"
                            class="absolute z-50 top-full right-0 mt-1 w-32 rounded-md border border-white/10 bg-[#1a1a1a] py-1 shadow-lg"
                            @click.stop
                          >
                            <button
                              class="flex w-full items-center gap-2 px-3 py-1.5 text-xs cursor-pointer hover:bg-white/[0.06] transition-colors"
                              @click.stop="handleEdit"
                            >
                              <svg
                                class="w-3.5 h-3.5 opacity-60"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              </svg>
                              Edit
                            </button>
                            <div class="border-t border-white/10 my-1" />
                            <button
                              class="flex w-full items-center gap-2 px-3 py-1.5 text-xs cursor-pointer hover:bg-white/[0.06] transition-colors"
                              @click.stop="handleReview"
                            >
                              <svg
                                class="w-3.5 h-3.5 opacity-60"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
                                />
                              </svg>
                              Review
                            </button>
                          </div>
                        </div>

                        <span
                          class="absolute bottom-3 right-3 text-[12px] text-[#f9996c] opacity-0 group-hover/card:opacity-100 transition-opacity"
                        >
                          View details
                        </span>
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
        v-if="showModal"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
        @click.self="showModal = false"
        @keydown.esc="showModal = false"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div
          class="relative w-full max-w-lg rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div class="flex items-center justify-between gap-3 mb-2">
              <span
                class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-medium shrink-0"
                >SW-REQ-001</span
              >
              <div class="flex items-center gap-2">
                <div class="relative inline-flex" @click.stop>
                  <button
                    class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium cursor-pointer transition-colors"
                    :class="statusClass"
                    @click.stop="modalStatusOpen = !modalStatusOpen"
                  >
                    <span class="block h-1.5 w-1.5 shrink-0 rounded-full" :class="statusDotClass" />
                    {{ statusLabel }}
                    <svg
                      class="h-3 w-3 opacity-70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    v-if="modalStatusOpen"
                    class="absolute z-50 top-full right-0 mt-1 w-auto min-w-[100px] rounded-md border border-white/10 bg-[#1a1a1a] py-1 shadow-lg"
                    @click.stop
                  >
                    <button
                      v-for="opt in statusOptions"
                      :key="opt.value"
                      class="flex w-full items-center gap-2 px-3 py-1.5 text-[11px] font-medium cursor-pointer hover:bg-white/[0.06] transition-colors"
                      @click="setModalStatus(opt.value)"
                    >
                      <span class="block h-1.5 w-1.5 shrink-0 rounded-full" :class="opt.dotClass" />
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
                <div class="relative inline-flex" @click.stop>
                  <button
                    class="inline-flex items-center justify-center rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer bg-transparent hover:bg-white/[0.06] w-7 h-7"
                    @click.stop="modalActionsOpen = !modalActionsOpen"
                    aria-label="More actions"
                  >
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                  <div
                    v-if="modalActionsOpen"
                    class="absolute z-50 top-full right-0 mt-1 w-32 rounded-md border border-white/10 bg-[#1a1a1a] py-1 shadow-lg"
                    @click.stop
                  >
                    <button
                      class="flex w-full items-center gap-2 px-3 py-1.5 text-xs cursor-pointer hover:bg-white/[0.06] transition-colors"
                      @click.stop="handleModalEdit"
                    >
                      <svg
                        class="w-3.5 h-3.5 opacity-60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                      Edit
                    </button>
                    <div class="border-t border-white/10 my-1" />
                    <button
                      class="flex w-full items-center gap-2 px-3 py-1.5 text-xs cursor-pointer hover:bg-white/[0.06] transition-colors"
                      @click.stop="handleModalReview"
                    >
                      <svg
                        class="w-3.5 h-3.5 opacity-60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
                        />
                      </svg>
                      Review
                    </button>
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
            </div>
            <p class="text-sm leading-relaxed text-[15px] mt-1">
              When any cell temperature exceeds 45°C, the software shall reduce the battery charge
              current limit to a value less than or equal to the previously active limit within 10
              ms.
            </p>
          </div>

          <!-- Body -->
          <div v-if="modalMode === 'view'" class="overflow-y-auto p-6 space-y-3">
            <!-- Two-column grid -->
            <div class="grid grid-cols-2 gap-3">
              <!-- Identity -->
              <div class="rounded-lg bg-white/[0.03] px-4 pt-3 pb-4">
                <p class="text-[10px] font-normal uppercase tracking-widest opacity-40 mb-3">
                  Identity
                </p>
                <div
                  class="flex min-w-0 items-baseline gap-3 py-2 border-b border-white/[0.06] last:border-0 last:pb-0 text-sm"
                >
                  <span class="opacity-50 w-20 shrink-0 text-xs">Category</span>
                  <span class="min-w-0 flex-1 text-left opacity-80 capitalize">Software</span>
                </div>
                <div
                  class="flex min-w-0 items-baseline gap-3 py-2 border-b border-white/[0.06] last:border-0 last:pb-0 text-sm"
                >
                  <span class="opacity-50 w-20 shrink-0 text-xs">Safety level</span>
                  <span class="min-w-0 flex-1 text-left opacity-80">ASIL D</span>
                </div>
                <div
                  class="flex min-w-0 items-baseline gap-3 py-2 border-b border-white/[0.06] last:border-0 last:pb-0 text-sm"
                >
                  <span class="opacity-50 w-20 shrink-0 text-xs">Domain</span>
                  <span class="min-w-0 flex-1 text-left opacity-80">Powertrain, Safety</span>
                </div>
              </div>
              <!-- Verification -->
              <div class="rounded-lg bg-white/[0.03] px-4 pt-3 pb-4">
                <p class="text-[10px] font-normal uppercase tracking-widest opacity-40 mb-3">
                  Verification
                </p>
                <div
                  class="flex min-w-0 items-baseline gap-3 py-2 border-b border-white/[0.06] last:border-0 last:pb-0 text-sm"
                >
                  <span class="opacity-50 w-20 shrink-0 text-xs">Methods</span>
                  <span class="min-w-0 flex-1 text-left opacity-80 capitalize">Test</span>
                </div>
                <div
                  class="flex min-w-0 items-baseline gap-3 py-2 border-b border-white/[0.06] last:border-0 last:pb-0 text-sm"
                >
                  <span class="opacity-50 w-20 shrink-0 text-xs">Verified by</span>
                  <span class="min-w-0 flex-1 text-left opacity-80">—</span>
                </div>
              </div>
            </div>

            <!-- Traceability -->
            <div class="rounded-lg bg-white/[0.03] px-4 pt-3 pb-4">
              <p class="text-[10px] font-normal uppercase tracking-widest opacity-40 mb-3">
                Traceability
              </p>
              <div
                class="flex min-w-0 items-start gap-3 py-2 border-b border-white/[0.06] last:border-0 last:pb-0 text-sm"
              >
                <span class="opacity-50 w-20 shrink-0 pt-0.5 text-xs">Refines</span>
                <div class="flex min-w-0 flex-1 flex-wrap gap-1.5">
                  <span
                    class="inline-flex items-center rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-medium"
                    >SYS-REQ-001</span
                  >
                </div>
              </div>
            </div>

            <!-- Review comments -->
            <div class="rounded-lg bg-white/[0.03] px-4 pt-3 pb-4">
              <p class="text-[10px] font-normal uppercase tracking-widest opacity-40 mb-3">
                Review comments
              </p>
              <p class="text-sm opacity-40">No review comments yet.</p>
            </div>
          </div>

          <!-- Edit mode -->
          <div v-if="modalMode === 'edit'" class="overflow-y-auto p-6 space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs opacity-50">Description</label>
              <textarea
                class="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm resize-none min-h-20 outline-none focus:border-[#f9996c]/40 transition-colors"
                :value="'When any cell temperature exceeds 45°C, the software shall reduce the battery charge current limit to a value less than or equal to the previously active limit within 10 ms.'"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs opacity-50">Category</label>
                <input
                  class="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[#f9996c]/40 transition-colors"
                  value="Software"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs opacity-50">Safety level</label>
                <input
                  class="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[#f9996c]/40 transition-colors"
                  value="ASIL D"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs opacity-50">Domain</label>
                <input
                  class="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[#f9996c]/40 transition-colors"
                  value="Powertrain, Safety"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs opacity-50">Verification methods</label>
                <input
                  class="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-[#f9996c]/40 transition-colors"
                  placeholder="Comma-separated"
                  value="Test"
                />
              </div>
            </div>
            <div class="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
              <button
                class="text-xs opacity-60 hover:opacity-100 cursor-pointer px-3 py-1.5 rounded-md border border-white/10 bg-transparent hover:bg-white/[0.04] transition-colors"
                @click="modalMode = 'view'"
              >
                Cancel
              </button>
              <button
                class="text-xs border border-[#f9996c]/40 bg-[#f9996c] text-[#0c0c0c] px-3 py-1.5 rounded-md cursor-pointer hover:brightness-110 transition-all"
                @click="modalMode = 'view'"
              >
                Save changes
              </button>
            </div>
          </div>

          <!-- Review mode -->
          <div v-if="modalMode === 'review'" class="overflow-y-auto p-6 space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs opacity-50">Comment</label>
              <textarea
                class="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm resize-none min-h-30 outline-none focus:border-[#f9996c]/40 transition-colors"
                placeholder="Write a new review comment..."
              />
            </div>
            <div class="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
              <button
                class="text-xs opacity-60 hover:opacity-100 cursor-pointer px-3 py-1.5 rounded-md border border-white/10 bg-transparent hover:bg-white/[0.04] transition-colors"
                @click="modalMode = 'view'"
              >
                Cancel
              </button>
              <button
                class="text-xs border border-[#f9996c]/40 bg-[#f9996c] text-[#0c0c0c] px-3 py-1.5 rounded-md cursor-pointer hover:brightness-110 transition-all"
                @click="modalMode = 'view'"
              >
                Submit review
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

let glowTimer: ReturnType<typeof setTimeout> | null = null;

const generated = ref(false);
const highlightedSysReq = ref(false);
const sysReqOpen = ref(true);
const refinesOpen = ref(false);
const settingsOpen = ref(false);
const statusOpen = ref(false);
const actionsOpen = ref(false);
const showModal = ref(false);
const modalMode = ref<"view" | "edit" | "review">("view");
const modalStatusOpen = ref(false);
const modalActionsOpen = ref(false);

interface ConfigAttr { id: string; label: string; value: string }
const configurableAttributes: ConfigAttr[] = [
  { id: "category", label: "Category", value: "Software" },
  { id: "safety_level", label: "Safety level", value: "ASIL D" },
  { id: "domain", label: "Domain", value: "Powertrain, Safety" },
  { id: "verification_method", label: "Verification methods", value: "Test" },
]

const toggleState = ref<Record<string, boolean>>({
  category: true,
  safety_level: true,
  domain: false,
  verification_method: false,
})

const visibleAttrs = computed(() =>
  configurableAttributes.filter((a) => toggleState.value[a.id])
)

function toggleAttribute(id: string) {
  toggleState.value[id] = !toggleState.value[id]
}

const currentStatus = ref<"draft" | "in review" | "accepted" | "rejected">("draft");

const statusOptions = [
  { value: "draft", label: "Draft", dotClass: "bg-white/40" },
  { value: "in review", label: "In Review", dotClass: "bg-[#fbae8c]" },
  { value: "accepted", label: "Accepted", dotClass: "bg-[#95b9ba]" },
  { value: "rejected", label: "Rejected", dotClass: "bg-red-500" },
] as const;

const statusLabel = computed(
  () => statusOptions.find((o) => o.value === currentStatus.value)?.label ?? "Draft",
);

const statusDotClass = computed(
  () => statusOptions.find((o) => o.value === currentStatus.value)?.dotClass ?? "bg-white/40",
);

const acceptedCount = computed(() => (currentStatus.value === "accepted" ? 1 : 0));

const statusClass = computed(() => {
  const m: Record<string, string> = {
    draft: "bg-white/[0.06] opacity-60",
    "in review": "bg-[#fbae8c]/10 text-[#fbae8c]",
    accepted: "bg-[#95b9ba]/10 text-[#95b9ba]",
    rejected: "bg-red-500/10 text-red-500",
  };
  return m[currentStatus.value] ?? m.draft;
});

function highlightSysReq() {
  highlightedSysReq.value = true;
  refinesOpen.value = false;
  if (glowTimer) clearTimeout(glowTimer);
  glowTimer = setTimeout(() => {
    highlightedSysReq.value = false;
  }, 2000);
}

function setStatus(val: "draft" | "in review" | "accepted" | "rejected") {
  currentStatus.value = val;
  statusOpen.value = false;
}

function handleEdit() {
  actionsOpen.value = false;
  modalMode.value = "edit";
  showModal.value = true;
}

function handleReview() {
  actionsOpen.value = false;
  modalMode.value = "review";
  showModal.value = true;
}

function handleModalEdit() {
  modalActionsOpen.value = false;
  modalMode.value = "edit";
}

function handleModalReview() {
  modalActionsOpen.value = false;
  modalMode.value = "review";
}

function setModalStatus(val: "draft" | "in review" | "accepted" | "rejected") {
  currentStatus.value = val;
  modalStatusOpen.value = false;
}
</script>
