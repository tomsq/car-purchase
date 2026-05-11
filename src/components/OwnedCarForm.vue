<script setup lang="ts">
import type { OwnedCar } from '../lib/types'

defineProps<{ modelValue: OwnedCar }>()
defineEmits<{ (e: 'update:modelValue', v: OwnedCar): void }>()
</script>

<template>
  <div class="panel">
    <h2>Moje stávající auto (diesel)</h2>
    <div class="row cols-2">
      <label>
        Název
        <input
          type="text"
          :value="modelValue.label"
          @input="$emit('update:modelValue', { ...modelValue, label: ($event.target as HTMLInputElement).value })"
        />
      </label>
      <label>
        Spotřeba (L/100 km)
        <input
          type="number"
          step="0.1"
          :value="modelValue.consumptionLper100km"
          @input="$emit('update:modelValue', { ...modelValue, consumptionLper100km: +($event.target as HTMLInputElement).value })"
        />
      </label>
    </div>
    <div class="row cols-2" style="margin-top: 12px">
      <label>
        Cena nafty (Kč/L)
        <input
          type="number"
          step="0.1"
          :value="modelValue.dieselPricePerL"
          @input="$emit('update:modelValue', { ...modelValue, dieselPricePerL: +($event.target as HTMLInputElement).value })"
        />
      </label>
      <label>
        Servis & opravy ročně (Kč)
        <input
          type="number"
          :value="modelValue.maintenancePerYear"
          @input="$emit('update:modelValue', { ...modelValue, maintenancePerYear: +($event.target as HTMLInputElement).value })"
        />
      </label>
    </div>
    <div class="row cols-3" style="margin-top: 12px">
      <label>
        Pojištění + daň + STK ročně (Kč)
        <input
          type="number"
          :value="modelValue.insuranceTaxStkPerYear"
          @input="$emit('update:modelValue', { ...modelValue, insuranceTaxStkPerYear: +($event.target as HTMLInputElement).value })"
        />
      </label>
      <label>
        Tržní hodnota dnes (Kč)
        <input
          type="number"
          :value="modelValue.marketValueToday"
          @input="$emit('update:modelValue', { ...modelValue, marketValueToday: +($event.target as HTMLInputElement).value })"
        />
      </label>
      <label>
        Tržní hodnota na konci horizontu (Kč)
        <input
          type="number"
          :value="modelValue.marketValueAtEnd"
          @input="$emit('update:modelValue', { ...modelValue, marketValueAtEnd: +($event.target as HTMLInputElement).value })"
        />
      </label>
    </div>
  </div>
</template>
