import { computed } from 'vue';
const props = defineProps();
const emit = defineEmits();
const hasUnbundled = computed(() => {
    const b = props.modelValue.bundle;
    return !b.insurance || !b.maintenance || !b.tires || !b.roadTax || !b.replacementCar;
});
const chargingSumPct = computed(() => {
    const m = props.modelValue.chargingMix;
    return m.homePct + m.fvePct + m.publicAcPct + m.dcFastPct;
});
function update(key, value) {
    emit('update:modelValue', { ...props.modelValue, [key]: value });
}
function updateBundle(key, value) {
    emit('update:modelValue', {
        ...props.modelValue,
        bundle: { ...props.modelValue.bundle, [key]: value },
    });
}
function updateUnbundled(key, value) {
    emit('update:modelValue', {
        ...props.modelValue,
        unbundled: { ...props.modelValue.unbundled, [key]: value },
    });
}
function updateCharging(key, value) {
    emit('update:modelValue', {
        ...props.modelValue,
        chargingMix: { ...props.modelValue.chargingMix, [key]: value },
    });
}
function updatePhev(key, value) {
    emit('update:modelValue', {
        ...props.modelValue,
        phev: { ...props.modelValue.phev, [key]: value },
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.modelValue.label);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row cols-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.update('label', $event.target.value);
        } },
    type: "text",
    value: (__VLS_ctx.modelValue.label),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.update('vehicleType', $event.target.value);
        } },
    value: (__VLS_ctx.modelValue.vehicleType),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "EV",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "PHEV",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.update('monthlyLeaseFee', +$event.target.value);
        } },
    type: "number",
    value: (__VLS_ctx.modelValue.monthlyLeaseFee),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "inline" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.update('leaseFeeIncludesDph', $event.target.checked);
        } },
    type: "checkbox",
    checked: (__VLS_ctx.modelValue.leaseFeeIncludesDph),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row cols-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "inline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateBundle('insurance', $event.target.checked);
        } },
    type: "checkbox",
    checked: (__VLS_ctx.modelValue.bundle.insurance),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "inline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateBundle('maintenance', $event.target.checked);
        } },
    type: "checkbox",
    checked: (__VLS_ctx.modelValue.bundle.maintenance),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "inline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateBundle('tires', $event.target.checked);
        } },
    type: "checkbox",
    checked: (__VLS_ctx.modelValue.bundle.tires),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "inline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateBundle('roadTax', $event.target.checked);
        } },
    type: "checkbox",
    checked: (__VLS_ctx.modelValue.bundle.roadTax),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "inline" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.updateBundle('replacementCar', $event.target.checked);
        } },
    type: "checkbox",
    checked: (__VLS_ctx.modelValue.bundle.replacementCar),
});
if (__VLS_ctx.hasUnbundled) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row cols-3" },
    });
    if (!__VLS_ctx.modelValue.bundle.insurance) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.hasUnbundled))
                        return;
                    if (!(!__VLS_ctx.modelValue.bundle.insurance))
                        return;
                    __VLS_ctx.updateUnbundled('insurancePerYear', +$event.target.value);
                } },
            type: "number",
            value: (__VLS_ctx.modelValue.unbundled.insurancePerYear),
        });
    }
    if (!__VLS_ctx.modelValue.bundle.maintenance) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.hasUnbundled))
                        return;
                    if (!(!__VLS_ctx.modelValue.bundle.maintenance))
                        return;
                    __VLS_ctx.updateUnbundled('maintenancePerYear', +$event.target.value);
                } },
            type: "number",
            value: (__VLS_ctx.modelValue.unbundled.maintenancePerYear),
        });
    }
    if (!__VLS_ctx.modelValue.bundle.tires) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.hasUnbundled))
                        return;
                    if (!(!__VLS_ctx.modelValue.bundle.tires))
                        return;
                    __VLS_ctx.updateUnbundled('tiresPerYear', +$event.target.value);
                } },
            type: "number",
            value: (__VLS_ctx.modelValue.unbundled.tiresPerYear),
        });
    }
    if (!__VLS_ctx.modelValue.bundle.roadTax) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.hasUnbundled))
                        return;
                    if (!(!__VLS_ctx.modelValue.bundle.roadTax))
                        return;
                    __VLS_ctx.updateUnbundled('roadTaxPerYear', +$event.target.value);
                } },
            type: "number",
            value: (__VLS_ctx.modelValue.unbundled.roadTaxPerYear),
        });
    }
    if (!__VLS_ctx.modelValue.bundle.replacementCar) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (...[$event]) => {
                    if (!(__VLS_ctx.hasUnbundled))
                        return;
                    if (!(!__VLS_ctx.modelValue.bundle.replacementCar))
                        return;
                    __VLS_ctx.updateUnbundled('replacementCarPerYear', +$event.target.value);
                } },
            type: "number",
            value: (__VLS_ctx.modelValue.unbundled.replacementCarPerYear),
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row cols-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.update('consumptionKwhPer100km', +$event.target.value);
        } },
    type: "number",
    step: "0.1",
    value: (__VLS_ctx.modelValue.consumptionKwhPer100km),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "subnote" },
    ...{ style: {} },
});
(__VLS_ctx.chargingSumPct);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row cols-4" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('homePct', +$event.target.value);
        } },
    type: "number",
    value: (__VLS_ctx.modelValue.chargingMix.homePct),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('fvePct', +$event.target.value);
        } },
    type: "number",
    value: (__VLS_ctx.modelValue.chargingMix.fvePct),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('publicAcPct', +$event.target.value);
        } },
    type: "number",
    value: (__VLS_ctx.modelValue.chargingMix.publicAcPct),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('dcFastPct', +$event.target.value);
        } },
    type: "number",
    value: (__VLS_ctx.modelValue.chargingMix.dcFastPct),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row cols-4" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('homePricePerKwh', +$event.target.value);
        } },
    type: "number",
    step: "0.1",
    value: (__VLS_ctx.modelValue.chargingMix.homePricePerKwh),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('fvePricePerKwh', +$event.target.value);
        } },
    type: "number",
    step: "0.1",
    value: (__VLS_ctx.modelValue.chargingMix.fvePricePerKwh),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('publicAcPricePerKwh', +$event.target.value);
        } },
    type: "number",
    step: "0.1",
    value: (__VLS_ctx.modelValue.chargingMix.publicAcPricePerKwh),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.updateCharging('dcFastPricePerKwh', +$event.target.value);
        } },
    type: "number",
    step: "0.1",
    value: (__VLS_ctx.modelValue.chargingMix.dcFastPricePerKwh),
});
if (__VLS_ctx.modelValue.vehicleType === 'PHEV') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row cols-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.modelValue.vehicleType === 'PHEV'))
                    return;
                __VLS_ctx.updatePhev('electricKmShare', +$event.target.value);
            } },
        type: "number",
        value: (__VLS_ctx.modelValue.phev.electricKmShare),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.modelValue.vehicleType === 'PHEV'))
                    return;
                __VLS_ctx.updatePhev('petrolLper100km', +$event.target.value);
            } },
        type: "number",
        step: "0.1",
        value: (__VLS_ctx.modelValue.phev.petrolLper100km),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.modelValue.vehicleType === 'PHEV'))
                    return;
                __VLS_ctx.updatePhev('petrolPricePerL', +$event.target.value);
            } },
        type: "number",
        step: "0.1",
        value: (__VLS_ctx.modelValue.phev.petrolPricePerL),
    });
}
/** @type {__VLS_StyleScopedClasses['panel']} */ ;
/** @type {__VLS_StyleScopedClasses['header-row']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['subnote']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['cols-3']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            hasUnbundled: hasUnbundled,
            chargingSumPct: chargingSumPct,
            update: update,
            updateBundle: updateBundle,
            updateUnbundled: updateUnbundled,
            updateCharging: updateCharging,
            updatePhev: updatePhev,
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
