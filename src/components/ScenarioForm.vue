<script setup lang="ts">
import { computed } from 'vue'
import type { ChargingMix, Scenario } from '../lib/types'
import ChargingMixSlider from './ChargingMixSlider.vue'

const props = defineProps<{ modelValue: Scenario }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: Scenario): void }>()

const hasUnbundled = computed(() => {
  const b = props.modelValue.bundle
  return !b.insurance || !b.maintenance || !b.tires || !b.roadTax || !b.replacementCar
})

function update<K extends keyof Scenario>(key: K, value: Scenario[K]) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function updateBundle(key: keyof Scenario['bundle'], value: boolean) {
  emit('update:modelValue', {
    ...props.modelValue,
    bundle: { ...props.modelValue.bundle, [key]: value },
  })
}

function updateUnbundled(key: keyof Scenario['unbundled'], value: number) {
  emit('update:modelValue', {
    ...props.modelValue,
    unbundled: { ...props.modelValue.unbundled, [key]: value },
  })
}

function updateCharging(key: keyof Scenario['chargingMix'], value: number) {
  emit('update:modelValue', {
    ...props.modelValue,
    chargingMix: { ...props.modelValue.chargingMix, [key]: value },
  })
}

function updateChargingMix(mix: ChargingMix) {
  emit('update:modelValue', { ...props.modelValue, chargingMix: mix })
}

function updatePhev(key: keyof Scenario['phev'], value: number) {
  emit('update:modelValue', {
    ...props.modelValue,
    phev: { ...props.modelValue.phev, [key]: value },
  })
}
</script>

<template>
  <div class="panel">
    <div class="header-row">
      <h2>Operativní leasing – {{ modelValue.label }}</h2>
    </div>

    <div class="row cols-3">
      <label>
        Název scénáře
        <input
          type="text"
          :value="modelValue.label"
          @input="update('label', ($event.target as HTMLInputElement).value)"
        />
      </label>
      <label>
        Typ vozu
        <select
          :value="modelValue.vehicleType"
          @change="update('vehicleType', ($event.target as HTMLSelectElement).value as Scenario['vehicleType'])"
        >
          <option value="EV">Elektromobil (BEV)</option>
          <option value="PHEV">Plug-in hybrid (PHEV)</option>
        </select>
      </label>
      <label>
        Měsíční splátka (Kč)
        <input
          type="number"
          :value="modelValue.monthlyLeaseFee"
          @input="update('monthlyLeaseFee', +($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <div class="subnote" style="margin-top: 8px">
      Měsíční splátka se počítá tak, jak je zadaná (bez úpravy o DPH).
      Leasing je obvykle uváděný bez DPH, zatímco vlastní vůz a provozní
      náklady jsou s DPH – srovnání není 1:1.
    </div>

    <h3 style="margin-top: 18px">Co je v leasingu zahrnuto?</h3>
    <div class="row cols-3">
      <label class="inline">
        <input
          type="checkbox"
          :checked="modelValue.bundle.insurance"
          @change="updateBundle('insurance', ($event.target as HTMLInputElement).checked)"
        />
        Pojištění
      </label>
      <label class="inline">
        <input
          type="checkbox"
          :checked="modelValue.bundle.maintenance"
          @change="updateBundle('maintenance', ($event.target as HTMLInputElement).checked)"
        />
        Servis
      </label>
      <label class="inline">
        <input
          type="checkbox"
          :checked="modelValue.bundle.tires"
          @change="updateBundle('tires', ($event.target as HTMLInputElement).checked)"
        />
        Pneumatiky
      </label>
      <label class="inline">
        <input
          type="checkbox"
          :checked="modelValue.bundle.roadTax"
          @change="updateBundle('roadTax', ($event.target as HTMLInputElement).checked)"
        />
        Silniční daň
      </label>
      <label class="inline">
        <input
          type="checkbox"
          :checked="modelValue.bundle.replacementCar"
          @change="updateBundle('replacementCar', ($event.target as HTMLInputElement).checked)"
        />
        Náhradní vůz
      </label>
    </div>

    <template v-if="hasUnbundled">
      <h3 style="margin-top: 18px">Roční náklady mimo leasing</h3>
      <div class="row cols-3">
        <label v-if="!modelValue.bundle.insurance">
          Pojištění (Kč/rok)
          <input
            type="number"
            :value="modelValue.unbundled.insurancePerYear"
            @input="updateUnbundled('insurancePerYear', +($event.target as HTMLInputElement).value)"
          />
        </label>
        <label v-if="!modelValue.bundle.maintenance">
          Servis (Kč/rok)
          <input
            type="number"
            :value="modelValue.unbundled.maintenancePerYear"
            @input="updateUnbundled('maintenancePerYear', +($event.target as HTMLInputElement).value)"
          />
        </label>
        <label v-if="!modelValue.bundle.tires">
          Pneumatiky (Kč/rok)
          <input
            type="number"
            :value="modelValue.unbundled.tiresPerYear"
            @input="updateUnbundled('tiresPerYear', +($event.target as HTMLInputElement).value)"
          />
        </label>
        <label v-if="!modelValue.bundle.roadTax">
          Silniční daň (Kč/rok)
          <input
            type="number"
            :value="modelValue.unbundled.roadTaxPerYear"
            @input="updateUnbundled('roadTaxPerYear', +($event.target as HTMLInputElement).value)"
          />
        </label>
        <label v-if="!modelValue.bundle.replacementCar">
          Náhradní vůz (Kč/rok)
          <input
            type="number"
            :value="modelValue.unbundled.replacementCarPerYear"
            @input="updateUnbundled('replacementCarPerYear', +($event.target as HTMLInputElement).value)"
          />
        </label>
      </div>
    </template>

    <h3 style="margin-top: 18px">Spotřeba elektřiny</h3>
    <div class="row cols-2">
      <label>
        kWh / 100 km
        <input
          type="number"
          step="0.1"
          :value="modelValue.consumptionKwhPer100km"
          @input="update('consumptionKwhPer100km', +($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <h3 style="margin-top: 18px">Podíl nabíjení (součet vždy 100 %)</h3>
    <ChargingMixSlider
      :model-value="modelValue.chargingMix"
      @update:model-value="updateChargingMix"
    />

    <h3 style="margin-top: 18px">Cena energie</h3>
    <div class="row cols-4">
      <label>
        Doma ze sítě (Kč/kWh)
        <input
          type="number"
          step="0.1"
          :value="modelValue.chargingMix.homePricePerKwh"
          @input="updateCharging('homePricePerKwh', +($event.target as HTMLInputElement).value)"
        />
      </label>
      <label>
        FVE (Kč/kWh)
        <input
          type="number"
          step="0.1"
          :value="modelValue.chargingMix.fvePricePerKwh"
          @input="updateCharging('fvePricePerKwh', +($event.target as HTMLInputElement).value)"
        />
      </label>
      <label>
        Veřejné AC (Kč/kWh)
        <input
          type="number"
          step="0.1"
          :value="modelValue.chargingMix.publicAcPricePerKwh"
          @input="updateCharging('publicAcPricePerKwh', +($event.target as HTMLInputElement).value)"
        />
      </label>
      <label>
        DC (Kč/kWh)
        <input
          type="number"
          step="0.1"
          :value="modelValue.chargingMix.dcFastPricePerKwh"
          @input="updateCharging('dcFastPricePerKwh', +($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <template v-if="modelValue.vehicleType === 'PHEV'">
      <h3 style="margin-top: 18px">PHEV – jízda na benzín</h3>
      <div class="row cols-3">
        <label>
          % km na elektřinu
          <input
            type="number"
            :value="modelValue.phev.electricKmShare"
            @input="updatePhev('electricKmShare', +($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          Spotřeba benzínu (L/100 km)
          <input
            type="number"
            step="0.1"
            :value="modelValue.phev.petrolLper100km"
            @input="updatePhev('petrolLper100km', +($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          Cena benzínu (Kč/L)
          <input
            type="number"
            step="0.1"
            :value="modelValue.phev.petrolPricePerL"
            @input="updatePhev('petrolPricePerL', +($event.target as HTMLInputElement).value)"
          />
        </label>
      </div>
    </template>
  </div>
</template>
