<template>
    <el-input-number
    :value="parseFloat(parseFloat(value/100).toFixed(2))"
    @change="(value) => changeValue(parseInt(parseFloat(value*100).toFixed(0)))"
    :step="step"
    :max="max"
    :min="min"
    :step-strictly="stepStrictly"
    :size="size"
    :disabled="disabled"
    :controls="controls"
    :controls-position="controlsPosition"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :precision="2"
></el-input-number>
</template>
<script lang="js">
    export default {
        name: "InputFen",
        props:['value', 'min', 'max', 'step', 'step-strictly', 'precision', 'size', 'disabled', 'controls', 'controls-position', 'name', 'label', 'placeholder'],
        methods: {
            changeValue (v) {
                this.$emit("input", v)
            },
        }
    };
</script>
