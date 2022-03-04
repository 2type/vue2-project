<template>
    <el-input-number :value="value" @change="changeValue" :precision="2" :step="step" :max="max" :min="min" ></el-input-number>
</template>
<script lang="js">
    export default {
        name: "InputFen",
        props: ['value' ,'step', 'min', 'max'],
        methods: {
            changeValue (v) {
                this.$emit("input", v)
            },
        }
    };
</script>