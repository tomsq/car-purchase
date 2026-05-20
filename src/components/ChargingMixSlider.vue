<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ChargingMix } from '../lib/types'

const props = defineProps<{ modelValue: ChargingMix }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: ChargingMix): void }>()

const trackEl = ref<HTMLDivElement | null>(null)
const dragging = ref<number | null>(null)

const segments = [
  { key: 'homePct', label: 'Doma ze sítě', color: '#4f8cff' },
  { key: 'fvePct', label: 'FVE', color: '#5dbb63' },
  { key: 'publicAcPct', label: 'Veřejné AC', color: '#d9a441' },
  { key: 'dcFastPct', label: 'DC rychlonabíjení', color: '#d97757' },
] as const

// Normalize incoming values to sum to 100, then expose split points (cumulative).
const splits = computed(() => {
  const raw = segments.map((s) => Math.max(0, props.modelValue[s.key]))
  const sum = raw.reduce((a, b) => a + b, 0) || 1
  const pct = raw.map((v) => (v / sum) * 100)
  return [pct[0], pct[0] + pct[1], pct[0] + pct[1] + pct[2]]
})

function emitSplits(s: number[]) {
  const clamped = [
    Math.max(0, Math.min(100, s[0])),
    Math.max(0, Math.min(100, s[1])),
    Math.max(0, Math.min(100, s[2])),
  ]
  // Enforce monotonic order
  clamped[1] = Math.max(clamped[0], clamped[1])
  clamped[2] = Math.max(clamped[1], clamped[2])

  const home = clamped[0]
  const fve = clamped[1] - clamped[0]
  const publicAc = clamped[2] - clamped[1]
  const dcFast = 100 - clamped[2]

  emit('update:modelValue', {
    ...props.modelValue,
    homePct: round(home),
    fvePct: round(fve),
    publicAcPct: round(publicAc),
    dcFastPct: round(dcFast),
  })
}

function round(n: number) {
  return Math.round(n * 10) / 10
}

function pctFromEvent(clientX: number): number {
  const el = trackEl.value
  if (!el) return 0
  const rect = el.getBoundingClientRect()
  const x = clientX - rect.left
  return Math.max(0, Math.min(100, (x / rect.width) * 100))
}

function onPointerDown(idx: number, ev: PointerEvent) {
  dragging.value = idx
  ;(ev.target as HTMLElement).setPointerCapture(ev.pointerId)
  ev.preventDefault()
}

function onPointerMove(ev: PointerEvent) {
  if (dragging.value === null) return
  const next = [...splits.value]
  next[dragging.value] = pctFromEvent(ev.clientX)
  // Push neighbors to keep monotonic
  if (dragging.value === 0) {
    next[1] = Math.max(next[1], next[0])
    next[2] = Math.max(next[2], next[1])
  } else if (dragging.value === 1) {
    next[0] = Math.min(next[0], next[1])
    next[2] = Math.max(next[2], next[1])
  } else {
    next[1] = Math.min(next[1], next[2])
    next[0] = Math.min(next[0], next[1])
  }
  emitSplits(next)
}

function onPointerUp() {
  dragging.value = null
}

function pctValue(key: typeof segments[number]['key']): number {
  return props.modelValue[key]
}

function onInputPct(key: typeof segments[number]['key'], value: number) {
  // Set this segment and rescale the others proportionally so the sum stays 100.
  const v = Math.max(0, Math.min(100, value))
  const others = segments.filter((s) => s.key !== key)
  const othersSum = others.reduce((acc, s) => acc + Math.max(0, props.modelValue[s.key]), 0)
  const remaining = 100 - v

  const next: ChargingMix = { ...props.modelValue, [key]: v } as ChargingMix
  if (othersSum === 0) {
    const share = remaining / others.length
    for (const s of others) (next as any)[s.key] = round(share)
  } else {
    for (const s of others) {
      const current = Math.max(0, props.modelValue[s.key])
      ;(next as any)[s.key] = round((current / othersSum) * remaining)
    }
  }
  ;(next as any)[key] = round(v)
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="charging-slider">
    <div
      class="track"
      ref="trackEl"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        v-for="(seg, i) in segments"
        :key="seg.key"
        class="segment"
        :style="{
          left: (i === 0 ? 0 : splits[i - 1]) + '%',
          width: ((i === 3 ? 100 : splits[i]) - (i === 0 ? 0 : splits[i - 1])) + '%',
          background: seg.color,
        }"
      >
        <span class="segment-label">{{ round(pctValue(seg.key)) }}%</span>
      </div>

      <button
        v-for="(pos, i) in splits"
        :key="i"
        class="handle"
        type="button"
        :style="{ left: pos + '%' }"
        :aria-label="`Rozdělovač ${i + 1}`"
        :aria-valuenow="round(pos)"
        @pointerdown="onPointerDown(i, $event)"
      />
    </div>

    <div class="legend-row">
      <label v-for="seg in segments" :key="seg.key" class="seg-input">
        <span class="seg-input-label">
          <span class="swatch" :style="{ background: seg.color }" />
          {{ seg.label }}
        </span>
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          :value="round(pctValue(seg.key))"
          @input="onInputPct(seg.key, +($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.charging-slider {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.track {
  position: relative;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  background: var(--panel-2);
  border: 1px solid var(--border);
  overflow: hidden;
  user-select: none;
  touch-action: none;
}

.segment {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: background 0.15s;
}

.segment-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.handle {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 40px;
  margin-left: -7px;
  transform: translateY(-50%);
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  cursor: ew-resize;
  padding: 0;
  z-index: 2;
}

.handle:hover,
.handle:focus-visible {
  background: #f3f6ff;
  outline: 2px solid var(--accent);
}

.legend-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

@media (max-width: 700px) {
  .legend-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.seg-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--muted);
}

.seg-input-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
}

.seg-input input {
  background: var(--panel-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 13px;
  width: 100%;
}
</style>
