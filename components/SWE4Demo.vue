<template>
  <div class="w-full">
    <Transition name="slide-fade" mode="out-in">
      <div
        v-if="step === 'intro'"
        key="intro"
        class="grid grid-cols-6 gap-4 mt-2 cursor-pointer"
        @click="step = 'generate'"
      >
        <div class="col-span-2 pt-8">
          <div class="text-white font-semibold text-base">Upload Code</div>
          <ul class="list-disc list-inside opacity-80 space-y-1 mt-2 text-sm">
            <li>Upload C/C++ source code via zip or GitHub import</li>
            <li>
              Uploaded files appear in a file tree and can be viewed in the built-in code viewer
            </li>
          </ul>
        </div>
        <div class="col-span-4 flex items-center justify-center mt-2">
          <img :src="'/images/swe4-code-upload-modal.png'" class="w-[85%]" />
        </div>
      </div>

      <div
        v-else-if="step === 'generate'"
        key="button"
        class="flex flex-col items-center justify-center min-h-[380px]"
      >
        <button
          class="inline-flex items-center justify-center gap-1.5 h-10 rounded-md px-4 text-sm font-medium border border-white/20 bg-[#f9996c] text-[#0c0c0c] shadow-sm cursor-pointer transition-all hover:brightness-110"
          @click="step = 'viewer'"
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
          Generate Unit Tests
        </button>
      </div>

      <div
        v-else
        key="viewer"
        class="flex gap-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] w-full"
        style="height: 340px"
      >
        <!-- File Tree -->
        <div
          class="shrink-0 flex flex-col min-h-0 overflow-hidden border-r border-white/10"
          style="width: 220px"
        >
          <div class="flex-1 min-h-0 overflow-y-auto py-1 swe4-scrollbar">
            <div
              v-for="item in visibleItems"
              :key="item.path"
              class="flex items-center gap-1 cursor-pointer select-none text-xs transition-colors"
              :style="{
                paddingLeft: item.depth * 12 + (item.node.type === 'file' ? 20 : 4) + 'px',
              }"
              :class="[
                selectedPath === item.node.path
                  ? 'bg-[#f9996c]/10 text-[#f9996c]'
                  : 'hover:bg-white/[0.03] text-white/70',
              ]"
              @click="onNodeClick(item.node)"
            >
              <span v-if="item.node.type === 'folder'" class="flex items-center gap-1 min-w-0 py-1">
                <svg
                  class="w-3.5 h-3.5 shrink-0 opacity-50 transition-transform duration-150"
                  :class="isOpen(item.node.path) ? 'rotate-90' : ''"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <svg
                  class="w-3.5 h-3.5 shrink-0 text-[#f9996c]/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                  />
                </svg>
                <span class="truncate">{{ item.node.name }}</span>
              </span>
              <span v-else class="flex items-center gap-1.5 min-w-0 py-0.5">
                <svg
                  class="w-3.5 h-3.5 shrink-0 opacity-40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span class="truncate">{{ item.node.name }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Code Viewer -->
        <div class="flex-1 min-w-0 overflow-hidden flex flex-col">
          <div v-if="currentFile" class="flex flex-col h-full">
            <div
              class="flex items-center gap-2 px-4 py-1.5 border-b border-white/10 bg-white/[0.02] text-xs text-white/60"
            >
              <svg
                class="w-3.5 h-3.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
                <path d="M14 2v6h6" />
              </svg>
              {{ currentFile.path.split("/").pop() }}
            </div>
            <div class="flex-1 min-w-0 overflow-auto p-0 swe4-scrollbar">
              <pre
                class="text-[11px] leading-relaxed font-mono p-4 m-0 bg-transparent"
              ><code v-html="highlightedCode" /></pre>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-full">
            <p class="text-xs text-white/40">Select a file from the tree to view its contents</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(defineProps<{ startStep?: "intro" | "generate" | "viewer"; hideTests?: boolean }>(), {
  startStep: "intro",
  hideTests: false,
});
const step = ref(props.startStep);

interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

const selectedPath = ref<string | null>(null);
const openFolders = ref<Set<string>>(new Set());

const fileTree: FileNode[] = [
  {
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        name: "bms_current_limit.c",
        path: "src/bms_current_limit.c",
        type: "file",
        content: `/**
 * @file bms_current_limit.c
 * @brief Battery current limiting based on cell temperature.
 *
 * When any cell temperature exceeds 45°C the charge current
 * limit shall be reduced within 10 ms (SW-REQ-001).
 */

#include "bms_current_limit.h"
#include <stdint.h>

#define TEMP_THRESHOLD_C      45
#define CURRENT_LIMIT_REDUCE  100  /* Amperes */

static int16_t current_limit = 200;   /* nominal max */

int bms_update_current_limit(int16_t cell_temp_c) {
    if (cell_temp_c > TEMP_THRESHOLD_C) {
        if (current_limit > CURRENT_LIMIT_REDUCE) {
            current_limit = CURRENT_LIMIT_REDUCE;
        }
        return 1;  /* limiting active */
    }
    return 0;  /* normal operation */
}

int16_t bms_get_current_limit(void) {
    return current_limit;
}`,
      },
      {
        name: "bms_current_limit.h",
        path: "src/bms_current_limit.h",
        type: "file",
        content: `/**
 * @file bms_current_limit.h
 * @brief Public API for BMS current limiting.
 */

#ifndef BMS_CURRENT_LIMIT_H
#define BMS_CURRENT_LIMIT_H

#include <stdint.h>

/**
 * Evaluate cell temperature and limit charge current if needed.
 * @param cell_temp_c  Cell temperature in Celsius.
 * @retval 1  Current limiting is active.
 * @retval 0  Normal operation.
 */
int bms_update_current_limit(int16_t cell_temp_c);

/** @return The current charge current limit in Amperes. */
int16_t bms_get_current_limit(void);

#endif /* BMS_CURRENT_LIMIT_H */`,
      },
      {
        name: "adc_driver.c",
        path: "src/adc_driver.c",
        type: "file",
        content: `/**
 * @file adc_driver.c
 * @brief ADC driver for cell voltage measurement.
 */

#include "adc_driver.h"
#include <stdint.h>

#define ADC_CHANNELS  12
#define VREF_MV       3300

static uint16_t adc_raw[ADC_CHANNELS];

void adc_init(void) {
    for (int i = 0; i < ADC_CHANNELS; i++) {
        adc_raw[i] = 0;
    }
}

uint16_t adc_read_channel(uint8_t ch) {
    if (ch >= ADC_CHANNELS) return 0;
    return adc_raw[ch];
}

uint16_t adc_convert_to_mv(uint16_t raw) {
    return (uint32_t)raw * VREF_MV / 4095;
}`,
      },
      {
        name: "adc_driver.h",
        path: "src/adc_driver.h",
        type: "file",
        content: `/**
 * @file adc_driver.h
 * @brief ADC driver interface for cell voltage measurement.
 */

#ifndef ADC_DRIVER_H
#define ADC_DRIVER_H

#include <stdint.h>

void adc_init(void);
uint16_t adc_read_channel(uint8_t ch);
uint16_t adc_convert_to_mv(uint16_t raw);

#endif /* ADC_DRIVER_H */`,
      },
      {
        name: "scheduler.c",
        path: "src/scheduler.c",
        type: "file",
        content: `/**
 * @file scheduler.c
 * @brief Cooperative task scheduler for BMS control loops.
 */

#include "scheduler.h"
#include <stdint.h>

#define MAX_TASKS  8

typedef struct {
    void (*fn)(void);
    uint32_t period_ms;
    uint32_t last_run;
} task_t;

static task_t tasks[MAX_TASKS];
static uint8_t task_count = 0;

int sched_add_task(void (*fn)(void), uint32_t period_ms) {
    if (task_count >= MAX_TASKS) return -1;
    tasks[task_count].fn = fn;
    tasks[task_count].period_ms = period_ms;
    tasks[task_count].last_run = 0;
    return task_count++;
}

void sched_run(uint32_t now_ms) {
    for (uint8_t i = 0; i < task_count; i++) {
        if (now_ms - tasks[i].last_run >= tasks[i].period_ms) {
            tasks[i].fn();
            tasks[i].last_run = now_ms;
        }
    }
}`,
      },
      {
        name: "scheduler.h",
        path: "src/scheduler.h",
        type: "file",
        content: `/**
 * @file scheduler.h
 * @brief Cooperative task scheduler interface.
 */

#ifndef SCHEDULER_H
#define SCHEDULER_H

#include <stdint.h>

int sched_add_task(void (*fn)(void), uint32_t period_ms);
void sched_run(uint32_t now_ms);

#endif /* SCHEDULER_H */`,
      },
    ],
  },
  {
    name: "tests",
    path: "tests",
    type: "folder",
    children: [
      {
        name: "test_bms_current_limit.c",
        path: "tests/test_bms_current_limit.c",
        type: "file",
        content: `/**
 * @file test_bms_current_limit.c
 * @brief Unit tests for temperature-based current limiting.
 */

#include "bms_current_limit.h"
#include <assert.h>

static void test_normal_temp_returns_zero(void) {
    assert(bms_update_current_limit(25) == 0);
}

static void test_overtemp_returns_one(void) {
    assert(bms_update_current_limit(46) == 1);
}

static void test_limit_reduced_on_overtemp(void) {
    bms_update_current_limit(46);
    assert(bms_get_current_limit() <= 100);
}

static void test_limit_stays_low_during_overtemp(void) {
    bms_update_current_limit(46);
    int16_t v1 = bms_get_current_limit();
    bms_update_current_limit(50);
    int16_t v2 = bms_get_current_limit();
    assert(v2 <= v1);
}

int main(void) {
    test_normal_temp_returns_zero();
    test_overtemp_returns_one();
    test_limit_reduced_on_overtemp();
    test_limit_stays_low_during_overtemp();
    return 0;
}`,
      },
      {
        name: "test_adc_driver.c",
        path: "tests/test_adc_driver.c",
        type: "file",
        content: `/**
 * @file test_adc_driver.c
 * @brief Unit tests for ADC driver.
 */

#include "adc_driver.h"
#include <assert.h>

static void test_adc_init_sets_all_channels_zero(void) {
    adc_init();
    for (int i = 0; i < 12; i++) {
        assert(adc_read_channel(i) == 0);
    }
}

static void test_adc_invalid_channel_returns_zero(void) {
    assert(adc_read_channel(99) == 0);
}

static void test_adc_convert_to_mv_bounds(void) {
    uint16_t mv = adc_convert_to_mv(4095);
    assert(mv == 3300);
}

int main(void) {
    test_adc_init_sets_all_channels_zero();
    test_adc_invalid_channel_returns_zero();
    test_adc_convert_to_mv_bounds();
    return 0;
}`,
      },
      {
        name: "test_scheduler.c",
        path: "tests/test_scheduler.c",
        type: "file",
        content: `/**
 * @file test_scheduler.c
 * @brief Unit tests for cooperative task scheduler.
 */

#include "scheduler.h"
#include <assert.h>

static volatile int flag = 0;

static void test_task(void) {
    flag = 1;
}

static void test_sched_add_and_run(void) {
    flag = 0;
    int id = sched_add_task(test_task, 100);
    assert(id >= 0);
    sched_run(100);
    assert(flag == 1);
}

static void test_sched_max_tasks(void) {
    for (int i = 0; i < 8; i++) {
        assert(sched_add_task(test_task, 50) >= 0);
    }
    assert(sched_add_task(test_task, 50) < 0);
}

int main(void) {
    test_sched_add_and_run();
    test_sched_max_tasks();
    return 0;
}`,
      },
    ],
  },
  {
    name: "Makefile",
    path: "Makefile",
    type: "file",
    content: `CC = gcc
CFLAGS = -Wall -Wextra -std=c11
SRC_DIR = src
TEST_DIR = tests
BUILD_DIR = build

SRCS = $(wildcard $(SRC_DIR)/*.c)
OBJS = $(SRCS:$(SRC_DIR)/%.c=$(BUILD_DIR)/%.o)

.PHONY: all test clean

all: $(BUILD_DIR)/firmware.elf

$(BUILD_DIR)/firmware.elf: $(OBJS)
\t$(CC) $(CFLAGS) -o $@ $^

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c
\t$(CC) $(CFLAGS) -I$(SRC_DIR) -c -o $@ $<

test: $(BUILD_DIR)/test_runner
\t$(BUILD_DIR)/test_runner

$(BUILD_DIR)/test_runner: $(TEST_DIR)/test_bms_current_limit.c $(TEST_DIR)/test_adc_driver.c $(TEST_DIR)/test_scheduler.c $(SRCS)
\t$(CC) $(CFLAGS) -I$(SRC_DIR) -o $@ $^

clean:
\trm -rf $(BUILD_DIR)`,
  },
];

interface FlatItem {
  node: FileNode;
  depth: number;
  path: string;
}

function flattenTree(nodes: FileNode[], depth: number, openSet: Set<string>): FlatItem[] {
  const result: FlatItem[] = [];
  for (const node of nodes) {
    result.push({ node, depth, path: node.path });
    if (node.type === "folder" && openSet.has(node.path)) {
      result.push(...flattenTree(node.children ?? [], depth + 1, openSet));
    }
  }
  return result;
}

function filterOutTests(nodes: FileNode[]): FileNode[] {
  return nodes
    .filter((n) => !(props.hideTests && n.path === "tests"))
    .map((n) => {
      if (n.children) return { ...n, children: filterOutTests(n.children) };
      return n;
    });
}

const treeData = computed(() => (props.hideTests ? filterOutTests(fileTree) : fileTree));

const visibleItems = computed(() => flattenTree(treeData.value, 0, openFolders.value));

function isOpen(path: string): boolean {
  return openFolders.value.has(path);
}

function toggleFolder(path: string) {
  const next = new Set(openFolders.value);
  if (next.has(path)) {
    next.delete(path);
  } else {
    next.add(path);
  }
  openFolders.value = next;
}

function findFile(path: string): FileNode | undefined {
  function walk(nodes: FileNode[]): FileNode | undefined {
    for (const node of nodes) {
      if (node.path === path) return node;
      if (node.children) {
        const found = walk(node.children);
        if (found) return found;
      }
    }
    return undefined;
  }
  return walk(fileTree);
}

const currentFile = computed(() => {
  if (!selectedPath.value) return null;
  return findFile(selectedPath.value) ?? null;
});

const highlightedCode = computed(() => {
  if (!currentFile.value?.content) return "";
  const code = currentFile.value.content;

  const keywords =
    /\b(auto|break|case|const|continue|default|do|else|enum|extern|for|goto|if|inline|int|int16_t|include|main|register|return|signed|sizeof|static|struct|switch|typedef|uint16_t|union|unsigned|void|volatile|while|#define|#ifndef|#endif|#include)\b/g;
  const macros = /(#\s*(include|define|ifndef|endif)\b)/g;
  const strings = /("[^"]*")/g;
  const comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+)\b/g;
  const preprocessor = /(#\s*include\s*<[^>]+>)/g;

  let html = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const tokens: string[] = [];
  const hold = (s: string) => `@@TOK_${tokens.push(s) - 1}@@`;

  html = html.replace(comments, (m) => hold(`<span class="text-white/30 italic">${m}</span>`));
  html = html.replace(strings, (m) => hold(`<span class="text-[#95b9ba]">${m}</span>`));
  html = html.replace(preprocessor, (m) => hold(`<span class="text-[#fbae8c]">${m}</span>`));
  html = html.replace(keywords, (m) => hold(`<span class="text-[#f9996c]">${m}</span>`));
  html = html.replace(numbers, (m) => hold(`<span class="text-[#ac97bf]">${m}</span>`));
  html = html.replace(/@@TOK_(\d+)@@/g, (_, i) => tokens[Number(i)] ?? "");

  return html;
});

function onNodeClick(node: FileNode) {
  if (node.type === "folder") {
    toggleFolder(node.path);
  } else {
    selectedPath.value = node.path;
  }
}

openFolders.value = new Set(props.hideTests ? ["src"] : ["src", "tests"]);
</script>

<style>
.swe4-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.swe4-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
}
.swe4-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.22);
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.06);
}
.swe4-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.32);
}
.swe4-scrollbar::-webkit-scrollbar-corner {
  background: rgba(255, 255, 255, 0.06);
}
.swe4-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.22) rgba(255, 255, 255, 0.06);
}
</style>
