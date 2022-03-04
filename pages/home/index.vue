<template>
    <div>
        home
        <el-button @click="clickButton">{{$store.state.exampleCount}}</el-button>
    </div>
</template>
<script>
    export default {
        methods: {
            clickButton(){
                const vm = this
                vm.$store.commit("exampleIncrement")
            },
        },
        data() {
            return {

            }
        }
    }
</script>