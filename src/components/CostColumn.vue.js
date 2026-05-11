import { computed } from 'vue';
import { formatCzk } from '../lib/format';
const props = defineProps();
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
    ];
    return all.filter((b) => b.value > 0);
});
function pct(v) {
    if (props.breakdown.total <= 0)
        return 0;
    return (v / props.breakdown.total) * 100;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.title);
if (__VLS_ctx.subtitle) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "subnote" },
    });
    (__VLS_ctx.subtitle);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "total" },
    ...{ class: (__VLS_ctx.variant) },
});
(__VLS_ctx.formatCzk(__VLS_ctx.breakdown.total));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "bar" },
});
for (const [b] of __VLS_getVForSourceType((__VLS_ctx.buckets))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (b.key),
        ...{ style: ({ width: __VLS_ctx.pct(b.value) + '%', background: b.color }) },
        title: (`${b.label}: ${__VLS_ctx.formatCzk(b.value)}`),
    });
    if (__VLS_ctx.pct(b.value) > 8) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (Math.round(__VLS_ctx.pct(b.value)));
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "breakdown-table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [b] of __VLS_getVForSourceType((__VLS_ctx.buckets))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (b.key),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "legend-swatch" },
        ...{ style: ({ background: b.color, display: 'inline-block', marginRight: '6px' }) },
    });
    (b.label);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
        ...{ class: "amount" },
    });
    (__VLS_ctx.formatCzk(b.value));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
    ...{ class: "amount" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.formatCzk(__VLS_ctx.breakdown.total));
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['subnote']} */ ;
/** @type {__VLS_StyleScopedClasses['total']} */ ;
/** @type {__VLS_StyleScopedClasses['bar']} */ ;
/** @type {__VLS_StyleScopedClasses['breakdown-table']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-swatch']} */ ;
/** @type {__VLS_StyleScopedClasses['amount']} */ ;
/** @type {__VLS_StyleScopedClasses['amount']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formatCzk: formatCzk,
            buckets: buckets,
            pct: pct,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
