const OWNED_KEY = 'carsim.owned.v1';
const SCENARIOS_KEY = 'carsim.scenarios.v1';
const GLOBALS_KEY = 'carsim.globals.v1';
export function loadOwned() {
    const raw = localStorage.getItem(OWNED_KEY);
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function saveOwned(owned) {
    localStorage.setItem(OWNED_KEY, JSON.stringify(owned));
}
export function loadScenarios() {
    const raw = localStorage.getItem(SCENARIOS_KEY);
    if (!raw)
        return [];
    try {
        const parsed = JSON.parse(raw);
        return parsed.map(migrateScenario);
    }
    catch {
        return [];
    }
}
function migrateScenario(s) {
    return {
        ...s,
        chargingMix: {
            ...s.chargingMix,
            fvePct: s.chargingMix.fvePct ?? 0,
            fvePricePerKwh: s.chargingMix.fvePricePerKwh ?? 2,
        },
    };
}
export function saveScenarios(scenarios) {
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
}
export function loadGlobals() {
    const raw = localStorage.getItem(GLOBALS_KEY);
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function saveGlobals(globals) {
    localStorage.setItem(GLOBALS_KEY, JSON.stringify(globals));
}
