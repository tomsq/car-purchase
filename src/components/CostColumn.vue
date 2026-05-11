<script setup lang="ts">
import { computed } from 'vue'
import type { CostBreakdown } from '../lib/types'
import { formatCzk } from '../lib/format'

const props = defineProps<{
  title: string
  subtitle?: string
  breakdown: CostBreakdown
  variant: 'diesel' | 'lease'
}>()

const buckets = computed(() => {
  const all = [
    { key: 'energy', label: 'Energie (palivo / elektřina)', value: props.breakdown.energy, color: '#d97757' },
    { key: 'leaseFee', label: 'Splátky leasingu', value: props.breakdown.leaseFee, color: '#4f8cff' },
    { key: 'maintenance', label: 'Servis & opravy', value: props.breakdown.maintenance, color: '#8a6cd9' },
    { key: 'insurance', label: 'Pojištění + daň + STK', value: props.breakdown.insurance, color: '#3aa6a0' },
    { key: 'tires', label: 'Pneumatiky', value: props.breakdown.tires, color: '#c2a23a' },
    { key: 'roadTax', label: 'Silniční daň', value: props.breakdown.roadTax, color: '#5d8f3a' },
    { key: 'replacementCar', label: 'Náhradní vůz', value: props.breakdown.replacementCar, color: '#a05dbb' },
    { key: 'depreciation', label: 'Ztráta hodnoty (depreciation)', value: props.breakdown.depreciation, color: '#bb5d5d' },
  ]
  return all.filter((b) => b.value > 0)
})

function pct(v: number): number {
  if (props.breakdown.total <= 0) return 0
  return (v / props.breakdown.total) * 100
}
</script>

<template>
  <div class="panel">
    <h3>{{ title }}</h3>
    <div v-if="subtitle" class="subnote">{{ subtitle }}</div>
    <div class="total" :class="variant">{{ formatCzk(breakdown.total) }}</div>

    <div class="bar">
      <div
        v-for="b in buckets"
        :key="b.key"
        :style="{ width: pct(b.value) + '%', background: b.color }"
        :title="`${b.label}: ${formatCzk(b.value)}`"
      >
        <span v-if="pct(b.value) > 8">{{ Math.round(pct(b.value)) }}%</span>
      </div>
    </div>

    <table class="breakdown-table">
      <tbody>
        <tr v-for="b in buckets" :key="b.key">
          <td>
            <span class="legend-swatch" :style="{ background: b.color, display: 'inline-block', marginRight: '6px' }"></span>
            {{ b.label }}
          </td>
          <td class="amount">{{ formatCzk(b.value) }}</td>
        </tr>
        <tr>
          <td><strong>Celkem</strong></td>
          <td class="amount"><strong>{{ formatCzk(breakdown.total) }}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
