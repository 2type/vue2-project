<template>
    <div>
        <InputFen :step="0.1" v-model="v"/>
    </div>
</template>
<script>
    import InputFen from "../../m/input-fen/index.vue"
    export default {
        components: {InputFen},
        data() {
            return {
                v: 0.1,
            }
        }
}
</script>