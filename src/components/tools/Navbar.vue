<template>
    <div>
        <b-navbar class="nav-bar" toggleable="lg" type="dark">
            <b-navbar-brand style="cursor:pointer" @click="$router.push({ name: 'Home'})" >Hotelsss</b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .nav-bar{
        background-color: rgb(15, 125, 160);
        box-shadow: 1px 0 10px grey;
    }
    .routerlink{
        color: whitesmoke;
        margin-left: 3vw;
        cursor: pointer;
    }
</style>