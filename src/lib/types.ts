export interface OwnedCar {
  label: string
  marketValueToday: number
  marketValueAtEnd: number
  consumptionLper100km: number
  dieselPricePerL: number
  maintenancePerYear: number
  insuranceTaxStkPerYear: number
}

export type VehicleType = 'EV' | 'PHEV'

export interface LeaseBundle {
  insurance: boolean
  maintenance: boolean
  tires: boolean
  roadTax: boolean
  replacementCar: boolean
}

export interface UnbundledCosts {
  insurancePerYear: number
  maintenancePerYear: number
  tiresPerYear: number
  roadTaxPerYear: number
  replacementCarPerYear: number
}

export interface ChargingMix {
  homePct: number
  fvePct: number
  publicAcPct: number
  dcFastPct: number
  homePricePerKwh: number
  fvePricePerKwh: number
  publicAcPricePerKwh: number
  dcFastPricePerKwh: number
}

export interface PhevDetails {
  electricKmShare: number
  petrolLper100km: number
  petrolPricePerL: number
}

export interface Scenario {
  id: string
  label: string
  vehicleType: VehicleType
  monthlyLeaseFee: number
  bundle: LeaseBundle
  unbundled: UnbundledCosts
  consumptionKwhPer100km: number
  chargingMix: ChargingMix
  phev: PhevDetails
}

export interface Globals {
  annualKm: number
  horizonYears: number
}

export interface CostBreakdown {
  energy: number
  maintenance: number
  insurance: number
  tires: number
  roadTax: number
  replacementCar: number
  depreciation: number
  leaseFee: number
  total: number
}
