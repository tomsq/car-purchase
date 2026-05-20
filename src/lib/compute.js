export function computeOwned(owned, globals) {
    const totalKm = globals.annualKm * globals.horizonYears;
    const liters = (totalKm / 100) * owned.consumptionLper100km;
    const energy = liters * owned.dieselPricePerL;
    const maintenance = owned.maintenancePerYear * globals.horizonYears;
    const insurance = owned.insuranceTaxStkPerYear * globals.horizonYears;
    const depreciation = Math.max(0, owned.marketValueToday - owned.marketValueAtEnd);
    const total = energy + maintenance + insurance + depreciation;
    return {
        energy,
        maintenance,
        insurance,
        tires: 0,
        roadTax: 0,
        replacementCar: 0,
        depreciation,
        leaseFee: 0,
        total,
    };
}
function evEnergyCostPerKm(s) {
    const mix = s.chargingMix;
    const totalPct = mix.homePct + mix.fvePct + mix.publicAcPct + mix.dcFastPct;
    const avgPricePerKwh = (mix.homePct * mix.homePricePerKwh +
        mix.fvePct * mix.fvePricePerKwh +
        mix.publicAcPct * mix.publicAcPricePerKwh +
        mix.dcFastPct * mix.dcFastPricePerKwh) /
        Math.max(1, totalPct);
    const kwhPerKm = s.consumptionKwhPer100km / 100;
    return kwhPerKm * avgPricePerKwh;
}
function phevEnergyCost(s, totalKm) {
    const electricShare = Math.min(1, Math.max(0, s.phev.electricKmShare / 100));
    const electricKm = totalKm * electricShare;
    const petrolKm = totalKm - electricKm;
    const electricCost = electricKm * evEnergyCostPerKm(s);
    const petrolLiters = (petrolKm / 100) * s.phev.petrolLper100km;
    const petrolCost = petrolLiters * s.phev.petrolPricePerL;
    return electricCost + petrolCost;
}
export function computeScenario(s, globals) {
    const totalKm = globals.annualKm * globals.horizonYears;
    const years = globals.horizonYears;
    const energy = s.vehicleType === 'EV'
        ? evEnergyCostPerKm(s) * totalKm
        : phevEnergyCost(s, totalKm);
    const leaseFee = s.monthlyLeaseFee * 12 * years;
    const maintenance = s.bundle.maintenance ? 0 : s.unbundled.maintenancePerYear * years;
    const insurance = s.bundle.insurance ? 0 : s.unbundled.insurancePerYear * years;
    const tires = s.bundle.tires ? 0 : s.unbundled.tiresPerYear * years;
    const roadTax = s.bundle.roadTax ? 0 : s.unbundled.roadTaxPerYear * years;
    const replacementCar = s.bundle.replacementCar
        ? 0
        : s.unbundled.replacementCarPerYear * years;
    const total = energy + leaseFee + maintenance + insurance + tires + roadTax + replacementCar;
    return {
        energy,
        maintenance,
        insurance,
        tires,
        roadTax,
        replacementCar,
        depreciation: 0,
        leaseFee,
        total,
    };
}
