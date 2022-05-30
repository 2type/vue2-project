<template>
    <div>
        <div class="title">home</div>
        <el-button @click="clickButton">{{$store.state.exampleCount}}</el-button>
        <el-button @click="sendRequest" >send ajax</el-button>
        <hr/>
        <Demo></Demo>
    </div>
</template>
<script>
    import * as api from "../../api"
    import Demo from "@/uniapp/m/demo/index.vue"
    export default {
        components:{
            Demo
        },
        methods: {
            clickButton(){
                const vm = this
                vm.$store.commit("exampleIncrement")
            },
            sendRequest: async function () {
                const vm = this
                let [resp, err] = await api.eaxmpleNews()
                if (err) {
                    vm.$message(err.m.eaxmpleNeessage)
                    return
                }
                console.log(resp)
            },
        },
        data() {
            return {

            }
        }
    }
</script>
<style>

</style>