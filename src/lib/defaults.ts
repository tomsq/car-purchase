import type { Globals, OwnedCar, Scenario } from './types'

export function defaultOwned(): OwnedCar {
  return {
    label: 'Moje auto',
    marketValueToday: 250000,
    marketValueAtEnd: 150000,
    consumptionLper100km: 6.0,
    dieselPricePerL: 36,
    maintenancePerYear: 15000,
    insuranceTaxStkPerYear: 12000,
  }
}

export function defaultGlobals(): Globals {
  return {
    annualKm: 20000,
    horizonYears: 4,
  }
}

export function newScenario(label = 'Nový scénář'): Scenario {
  return {
    id: crypto.randomUUID(),
    label,
    vehicleType: 'EV',
    monthlyLeaseFee: 15000,
    leaseFeeIncludesDph: true,
    bundle: {
      insurance: true,
      maintenance: true,
      tires: true,
      roadTax: true,
      replacementCar: false,
    },
    unbundled: {
      insurancePerYear: 18000,
      maintenancePerYear: 10000,
      tiresPerYear: 6000,
      roadTaxPerYear: 0,
      replacementCarPerYear: 0,
    },
    consumptionKwhPer100km: 18,
    chargingMix: {
      homePct: 70,
      fvePct: 0,
      publicAcPct: 20,
      dcFastPct: 10,
      homePricePerKwh: 5,
      fvePricePerKwh: 2,
      publicAcPricePerKwh: 9,
      dcFastPricePerKwh: 14,
    },
    phev: {
      electricKmShare: 60,
      petrolLper100km: 6.5,
      petrolPricePerL: 38,
    },
  }
}
