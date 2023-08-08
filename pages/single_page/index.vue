<template>
    <div>
        <ul>
            <li>
                <router-link to="/">home</router-link>
            </li>
            <li>
                <router-link to="/user">user</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              message:"",
            }
        }
}
</script>