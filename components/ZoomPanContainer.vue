<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  minScale: { type: Number, default: 0.5 },
  maxScale: { type: Number, default: 2.5 },
  initialScale: { type: Number, default: 1 },
  title: { type: String, default: "Interactive View" },
  hint: { type: String, default: "Drag to move · wheel to zoom" },
});

const scale = ref(props.initialScale);
const offsetX = ref(0);
const offsetY = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const startOffsetX = ref(0);
const startOffsetY = ref(0);

const transform = computed(
  () => `translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`,
);

function clampScale(value) {
  return Math.min(props.maxScale, Math.max(props.minScale, value));
}

function onWheel(event) {
  const previousScale = scale.value;
  const nextScale = clampScale(previousScale - event.deltaY * 0.0015);
  if (nextScale === previousScale) return;

  const rect = event.currentTarget.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  const pointerY = event.clientY - rect.top;
  const ratio = nextScale / previousScale;

  offsetX.value = pointerX - (pointerX - offsetX.value) * ratio;
  offsetY.value = pointerY - (pointerY - offsetY.value) * ratio;
  scale.value = nextScale;
}

function onPointerDown(event) {
  if (event.button !== 0) return;
  isDragging.value = true;
  dragStartX.value = event.clientX;
  dragStartY.value = event.clientY;
  startOffsetX.value = offsetX.value;
  startOffsetY.value = offsetY.value;
  event.currentTarget.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!isDragging.value) return;
  offsetX.value = startOffsetX.value + (event.clientX - dragStartX.value);
  offsetY.value = startOffsetY.value + (event.clientY - dragStartY.value);
}

function stopDragging(event) {
  if (!isDragging.value) return;
  isDragging.value = false;
  if (event) {
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore capture-release errors when the pointer is already gone.
    }
  }
}

function resetView() {
  scale.value = props.initialScale;
  offsetX.value = 0;
  offsetY.value = 0;
}

function handleKeydown(event) {
  if (event.key === "Escape") resetView();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="zoom-pan-shell w-full rounded-xl border border-white/10 bg-[#0c0c0c] overflow-hidden">
    <div
      class="flex items-center justify-between gap-3 px-4 py-2 border-b border-white/10 bg-white/5"
    >
      <div>
        <div class="font-semibold tracking-tight">{{ title }}</div>
        <div class="text-xs opacity-50">{{ hint }}</div>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <button class="control" type="button" @click="scale = clampScale(scale - 0.15)">−</button>
        <button class="control" type="button" @click="scale = clampScale(scale + 0.15)">+</button>
        <button class="control" type="button" @click="resetView">Reset</button>
      </div>
    </div>

    <div
      class="viewport relative h-full min-h-[260px] overflow-hidden"
      @wheel.prevent="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="stopDragging"
      @pointerleave="stopDragging"
      @pointercancel="stopDragging"
    >
      <div
        class="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] bg-[size:18px_18px]"
      />
      <div class="stage" :style="{ transform }">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  touch-action: none;
  cursor: grab;
}

.viewport:active {
  cursor: grabbing;
}

.stage {
  transform-origin: 0 0;
  width: max-content;
  min-width: 100%;
  min-height: 100%;
  padding: 1rem;
}

.control {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 0.45rem;
  padding: 0.2rem 0.55rem;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.control:hover {
  border-color: rgba(249, 153, 108, 0.55);
  background: rgba(249, 153, 108, 0.14);
}
</style>
