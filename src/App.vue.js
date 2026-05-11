import { computed, ref, watch } from 'vue';
import OwnedCarForm from './components/OwnedCarForm.vue';
import ScenarioForm from './components/ScenarioForm.vue';
import CostColumn from './components/CostColumn.vue';
import { computeOwned, computeScenario } from './lib/compute';
import { defaultGlobals, defaultOwned, newScenario, } from './lib/defaults';
import { formatCzk } from './lib/format';
import { loadGlobals, loadOwned, loadScenarios, saveGlobals, saveOwned, saveScenarios, } from './lib/storage';
const owned = ref(loadOwned() ?? defaultOwned());
const globals = ref(loadGlobals() ?? defaultGlobals());
const loadedScenarios = loadScenarios();
const scenarios = ref(loadedScenarios.length > 0 ? loadedScenarios : [newScenario('Enyaq 85')]);
const activeId = ref(scenarios.value[0].id);
const activeScenario = computed({
    get: () => scenarios.value.find((s) => s.id === activeId.value) ?? scenarios.value[0],
    set: (v) => {
        const i = scenarios.value.findIndex((s) => s.id === v.id);
        if (i >= 0)
            scenarios.value[i] = v;
    },
});
watch(owned, (v) => saveOwned(v), { deep: true });
watch(globals, (v) => saveGlobals(v), { deep: true });
watch(scenarios, (v) => saveScenarios(v), { deep: true });
const ownedBreakdown = computed(() => computeOwned(owned.value, globals.value));
const scenarioBreakdown = computed(() => computeScenario(activeScenario.value, globals.value));
const delta = computed(() => scenarioBreakdown.value.total - ownedBreakdown.value.total);
const winnerLabel = computed(() => {
    if (Math.abs(delta.value) < 1)
        return 'Nerozhodně';
    return delta.value < 0
        ? `Leasing (${activeScenario.value.label}) vyjde levněji o ${formatCzk(-delta.value)}`
        : `Stávající auto vyjde levněji o ${formatCzk(delta.value)}`;
});
function addScenario() {
    const s = newScenario(`Scénář ${scenarios.value.length + 1}`);
    scenarios.value.push(s);
    activeId.value = s.id;
}
function removeScenario(id) {
    if (scenarios.value.length <= 1)
        return;
    const idx = scenarios.value.findIndex((s) => s.id === id);
    scenarios.value.splice(idx, 1);
    if (activeId.value === id) {
        activeId.value = scenarios.value[Math.max(0, idx - 1)].id;
    }
}
function duplicateScenario(id) {
    const src = scenarios.value.find((s) => s.id === id);
    if (!src)
        return;
    const copy = JSON.parse(JSON.stringify(src));
    copy.id = crypto.randomUUID();
    copy.label = `${src.label} (kopie)`;
    scenarios.value.push(copy);
    activeId.value = copy.id;
}
const ownedSubtitle = computed(() => `${owned.value.label} · ${globals.value.horizonYears} let · ${globals.value.annualKm.toLocaleString('cs-CZ')} km/rok`);
const leaseSubtitle = computed(() => {
    const s = activeScenario.value;
    return `${s.label} · ${s.vehicleType} · ${globals.value.horizonYears} let`;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "muted" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row cols-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.globals.annualKm = +$event.target.value;
        } },
    type: "number",
    value: (__VLS_ctx.globals.annualKm),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.globals.horizonYears = +$event.target.value;
        } },
    type: "number",
    value: (__VLS_ctx.globals.horizonYears),
});
/** @type {[typeof OwnedCarForm, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(OwnedCarForm, new OwnedCarForm({
    modelValue: (__VLS_ctx.owned),
}));
const __VLS_1 = __VLS_0({
    modelValue: (__VLS_ctx.owned),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.addScenario) },
    ...{ class: "primary" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scenario-tabs" },
});
for (const [s] of __VLS_getVForSourceType((__VLS_ctx.scenarios))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.activeId = s.id;
            } },
        key: (s.id),
        ...{ class: "scenario-tab" },
        ...{ class: ({ active: s.id === __VLS_ctx.activeId }) },
    });
    (s.label);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.duplicateScenario(s.id);
            } },
        ...{ class: "close" },
        title: "Duplikovat",
        ...{ style: {} },
    });
    if (__VLS_ctx.scenarios.length > 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.scenarios.length > 1))
                        return;
                    __VLS_ctx.removeScenario(s.id);
                } },
            ...{ class: "close" },
            title: "Smazat",
        });
    }
}
/** @type {[typeof ScenarioForm, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(ScenarioForm, new ScenarioForm({
    modelValue: (__VLS_ctx.activeScenario),
}));
const __VLS_4 = __VLS_3({
    modelValue: (__VLS_ctx.activeScenario),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "winner" },
});
(__VLS_ctx.winnerLabel);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "comparison" },
    ...{ style: {} },
});
/** @type {[typeof CostColumn, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(CostColumn, new CostColumn({
    title: "Moje auto (vlastní)",
    subtitle: (__VLS_ctx.ownedSubtitle),
    breakdown: (__VLS_ctx.ownedBreakdown),
    variant: "diesel",
}));
const __VLS_7 = __VLS_6({
    title: "Moje auto (vlastní)",
    subtitle: (__VLS_ctx.ownedSubtitle),
    breakdown: (__VLS_ctx.ownedBreakdown),
    variant: "diesel",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof CostColumn, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(CostColumn, new CostColumn({
    title: "Operativní leasing",
    subtitle: (__VLS_ctx.leaseSubtitle),
    breakdown: (__VLS_ctx.scenarioBreakdown),
    variant: "lease",
}));
const __VLS_10 = __VLS_9({
    title: "Operativní leasing",
    subtitle: (__VLS_ctx.leaseSubtitle),
    breakdown: (__VLS_ctx.scenarioBreakdown),
    variant: "lease",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['muted']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['primary']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['scenario-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['close']} */ ;
/** @type {__VLS_StyleScopedClasses['close']} */ ;
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['winner']} */ ;
/** @type {__VLS_StyleScopedClasses['comparison']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            OwnedCarForm: OwnedCarForm,
            ScenarioForm: ScenarioForm,
            CostColumn: CostColumn,
            owned: owned,
            globals: globals,
            scenarios: scenarios,
            activeId: activeId,
            activeScenario: activeScenario,
            ownedBreakdown: ownedBreakdown,
            scenarioBreakdown: scenarioBreakdown,
            winnerLabel: winnerLabel,
            addScenario: addScenario,
            removeScenario: removeScenario,
            duplicateScenario: duplicateScenario,
            ownedSubtitle: ownedSubtitle,
            leaseSubtitle: leaseSubtitle,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
