<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import OwnedCarForm from './components/OwnedCarForm.vue'
import ScenarioForm from './components/ScenarioForm.vue'
import CostColumn from './components/CostColumn.vue'
import { computeOwned, computeScenario } from './lib/compute'
import {
  defaultGlobals,
  defaultOwned,
  newScenario,
} from './lib/defaults'
import { formatCzk } from './lib/format'
import {
  loadGlobals,
  loadOwned,
  loadScenarios,
  saveGlobals,
  saveOwned,
  saveScenarios,
} from './lib/storage'
import type { Scenario } from './lib/types'

const owned = ref(loadOwned() ?? defaultOwned())
const globals = ref(loadGlobals() ?? defaultGlobals())

const loadedScenarios = loadScenarios()
const scenarios = ref<Scenario[]>(
  loadedScenarios.length > 0 ? loadedScenarios : [newScenario('Enyaq 85')],
)
const activeId = ref<string>(scenarios.value[0].id)

const activeScenario = computed({
  get: () => scenarios.value.find((s) => s.id === activeId.value) ?? scenarios.value[0],
  set: (v: Scenario) => {
    const i = scenarios.value.findIndex((s) => s.id === v.id)
    if (i >= 0) scenarios.value[i] = v
  },
})

watch(owned, (v) => saveOwned(v), { deep: true })
watch(globals, (v) => saveGlobals(v), { deep: true })
watch(scenarios, (v) => saveScenarios(v), { deep: true })

const ownedBreakdown = computed(() => computeOwned(owned.value, globals.value))
const scenarioBreakdown = computed(() =>
  computeScenario(activeScenario.value, globals.value),
)

const delta = computed(() => scenarioBreakdown.value.total - ownedBreakdown.value.total)
const winnerLabel = computed(() => {
  if (Math.abs(delta.value) < 1) return 'Nerozhodně'
  return delta.value < 0
    ? `Leasing (${activeScenario.value.label}) vyjde levněji o ${formatCzk(-delta.value)}`
    : `Stávající auto vyjde levněji o ${formatCzk(delta.value)}`
})

function addScenario() {
  const s = newScenario(`Scénář ${scenarios.value.length + 1}`)
  scenarios.value.push(s)
  activeId.value = s.id
}

function removeScenario(id: string) {
  if (scenarios.value.length <= 1) return
  const idx = scenarios.value.findIndex((s) => s.id === id)
  scenarios.value.splice(idx, 1)
  if (activeId.value === id) {
    activeId.value = scenarios.value[Math.max(0, idx - 1)].id
  }
}

function duplicateScenario(id: string) {
  const src = scenarios.value.find((s) => s.id === id)
  if (!src) return
  const copy: Scenario = JSON.parse(JSON.stringify(src))
  copy.id = crypto.randomUUID()
  copy.label = `${src.label} (kopie)`
  scenarios.value.push(copy)
  activeId.value = copy.id
}

const ownedSubtitle = computed(
  () => `${owned.value.label} · ${globals.value.horizonYears} let · ${globals.value.annualKm.toLocaleString('cs-CZ')} km/rok`,
)
const leaseSubtitle = computed(() => {
  const s = activeScenario.value
  return `${s.label} · ${s.vehicleType} · ${globals.value.horizonYears} let`
})
</script>

<template>
  <h1>Srovnání nákladů: moje auto vs. operativní leasing</h1>
  <p class="muted" style="margin-top: 4px; margin-bottom: 20px">
    Celkové náklady za zvolený horizont. Data se ukládají lokálně v prohlížeči.
  </p>

  <div class="panel">
    <h2>Globální parametry</h2>
    <div class="row cols-2">
      <label>
        Roční nájezd (km)
        <input
          type="number"
          :value="globals.annualKm"
          @input="globals.annualKm = +($event.target as HTMLInputElement).value"
        />
      </label>
      <label>
        Horizont (roky)
        <input
          type="number"
          :value="globals.horizonYears"
          @input="globals.horizonYears = +($event.target as HTMLInputElement).value"
        />
      </label>
    </div>
  </div>

  <OwnedCarForm v-model="owned" />

  <div class="panel">
    <div class="header-row">
      <h2>Scénáře leasingu</h2>
      <button class="primary" @click="addScenario">+ Nový scénář</button>
    </div>
    <div class="scenario-tabs">
      <div
        v-for="s in scenarios"
        :key="s.id"
        class="scenario-tab"
        :class="{ active: s.id === activeId }"
        @click="activeId = s.id"
      >
        {{ s.label }}
        <span
          class="close"
          @click.stop="duplicateScenario(s.id)"
          title="Duplikovat"
          style="margin-left: 4px"
        >⎘</span>
        <span
          v-if="scenarios.length > 1"
          class="close"
          @click.stop="removeScenario(s.id)"
          title="Smazat"
        >×</span>
      </div>
    </div>
  </div>

  <ScenarioForm v-model="activeScenario" />

  <div class="panel">
    <h2>Výsledek</h2>
    <div class="winner">{{ winnerLabel }}</div>
    <div class="comparison" style="margin-top: 12px">
      <CostColumn
        title="Moje auto (vlastní)"
        :subtitle="ownedSubtitle"
        :breakdown="ownedBreakdown"
        variant="diesel"
      />
      <CostColumn
        title="Operativní leasing"
        :subtitle="leaseSubtitle"
        :breakdown="scenarioBreakdown"
        variant="lease"
      />
    </div>
  </div>
</template>
