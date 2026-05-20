import { computed, ref } from 'vue';
const props = defineProps();
const emit = defineEmits();
const trackEl = ref(null);
const dragging = ref(null);
const segments = [
    { key: 'homePct', label: 'Doma ze sítě', color: '#4f8cff' },
    { key: 'fvePct', label: 'FVE', color: '#5dbb63' },
    { key: 'publicAcPct', label: 'Veřejné AC', color: '#d9a441' },
    { key: 'dcFastPct', label: 'DC rychlonabíjení', color: '#d97757' },
];
// Normalize incoming values to sum to 100, then expose split points (cumulative).
const splits = computed(() => {
    const raw = segments.map((s) => Math.max(0, props.modelValue[s.key]));
    const sum = raw.reduce((a, b) => a + b, 0) || 1;
    const pct = raw.map((v) => (v / sum) * 100);
    return [pct[0], pct[0] + pct[1], pct[0] + pct[1] + pct[2]];
});
function emitSplits(s) {
    const clamped = [
        Math.max(0, Math.min(100, s[0])),
        Math.max(0, Math.min(100, s[1])),
        Math.max(0, Math.min(100, s[2])),
    ];
    // Enforce monotonic order
    clamped[1] = Math.max(clamped[0], clamped[1]);
    clamped[2] = Math.max(clamped[1], clamped[2]);
    const home = clamped[0];
    const fve = clamped[1] - clamped[0];
    const publicAc = clamped[2] - clamped[1];
    const dcFast = 100 - clamped[2];
    emit('update:modelValue', {
        ...props.modelValue,
        homePct: round(home),
        fvePct: round(fve),
        publicAcPct: round(publicAc),
        dcFastPct: round(dcFast),
    });
}
function round(n) {
    return Math.round(n * 10) / 10;
}
function pctFromEvent(clientX) {
    const el = trackEl.value;
    if (!el)
        return 0;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
}
function onPointerDown(idx, ev) {
    dragging.value = idx;
    ev.target.setPointerCapture(ev.pointerId);
    ev.preventDefault();
}
function onPointerMove(ev) {
    if (dragging.value === null)
        return;
    const next = [...splits.value];
    next[dragging.value] = pctFromEvent(ev.clientX);
    // Push neighbors to keep monotonic
    if (dragging.value === 0) {
        next[1] = Math.max(next[1], next[0]);
        next[2] = Math.max(next[2], next[1]);
    }
    else if (dragging.value === 1) {
        next[0] = Math.min(next[0], next[1]);
        next[2] = Math.max(next[2], next[1]);
    }
    else {
        next[1] = Math.min(next[1], next[2]);
        next[0] = Math.min(next[0], next[1]);
    }
    emitSplits(next);
}
function onPointerUp() {
    dragging.value = null;
}
function pctValue(key) {
    return props.modelValue[key];
}
function onInputPct(key, value) {
    // Set this segment and rescale the others proportionally so the sum stays 100.
    const v = Math.max(0, Math.min(100, value));
    const others = segments.filter((s) => s.key !== key);
    const othersSum = others.reduce((acc, s) => acc + Math.max(0, props.modelValue[s.key]), 0);
    const remaining = 100 - v;
    const next = { ...props.modelValue, [key]: v };
    if (othersSum === 0) {
        const share = remaining / others.length;
        for (const s of others)
            next[s.key] = round(share);
    }
    else {
        for (const s of others) {
            const current = Math.max(0, props.modelValue[s.key]);
            next[s.key] = round((current / othersSum) * remaining);
        }
    }
    ;
    next[key] = round(v);
    emit('update:modelValue', next);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['handle']} */ ;
/** @type {__VLS_StyleScopedClasses['handle']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-row']} */ ;
/** @type {__VLS_StyleScopedClasses['seg-input']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "charging-slider" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onPointermove: (__VLS_ctx.onPointerMove) },
    ...{ onPointerup: (__VLS_ctx.onPointerUp) },
    ...{ onPointercancel: (__VLS_ctx.onPointerUp) },
    ...{ class: "track" },
    ref: "trackEl",
});
/** @type {typeof __VLS_ctx.trackEl} */ ;
for (const [seg, i] of __VLS_getVForSourceType((__VLS_ctx.segments))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (seg.key),
        ...{ class: "segment" },
        ...{ style: ({
                left: (i === 0 ? 0 : __VLS_ctx.splits[i - 1]) + '%',
                width: ((i === 3 ? 100 : __VLS_ctx.splits[i]) - (i === 0 ? 0 : __VLS_ctx.splits[i - 1])) + '%',
                background: seg.color,
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "segment-label" },
    });
    (__VLS_ctx.round(__VLS_ctx.pctValue(seg.key)));
}
for (const [pos, i] of __VLS_getVForSourceType((__VLS_ctx.splits))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button)({
        ...{ onPointerdown: (...[$event]) => {
                __VLS_ctx.onPointerDown(i, $event);
            } },
        key: (i),
        ...{ class: "handle" },
        type: "button",
        ...{ style: ({ left: pos + '%' }) },
        'aria-label': (`Rozdělovač ${i + 1}`),
        'aria-valuenow': (__VLS_ctx.round(pos)),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "legend-row" },
});
for (const [seg] of __VLS_getVForSourceType((__VLS_ctx.segments))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        key: (seg.key),
        ...{ class: "seg-input" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "seg-input-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
        ...{ class: "swatch" },
        ...{ style: ({ background: seg.color }) },
    });
    (seg.label);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                __VLS_ctx.onInputPct(seg.key, +$event.target.value);
            } },
        type: "number",
        min: "0",
        max: "100",
        step: "1",
        value: (__VLS_ctx.round(__VLS_ctx.pctValue(seg.key))),
    });
}
/** @type {__VLS_StyleScopedClasses['charging-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['track']} */ ;
/** @type {__VLS_StyleScopedClasses['segment']} */ ;
/** @type {__VLS_StyleScopedClasses['segment-label']} */ ;
/** @type {__VLS_StyleScopedClasses['handle']} */ ;
/** @type {__VLS_StyleScopedClasses['legend-row']} */ ;
/** @type {__VLS_StyleScopedClasses['seg-input']} */ ;
/** @type {__VLS_StyleScopedClasses['seg-input-label']} */ ;
/** @type {__VLS_StyleScopedClasses['swatch']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            trackEl: trackEl,
            segments: segments,
            splits: splits,
            round: round,
            onPointerDown: onPointerDown,
            onPointerMove: onPointerMove,
            onPointerUp: onPointerUp,
            pctValue: pctValue,
            onInputPct: onInputPct,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
