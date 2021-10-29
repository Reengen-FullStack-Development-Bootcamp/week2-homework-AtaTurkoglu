<template>
    <div>
        <b-navbar class="nav-bar" toggleable="lg" type="dark">
            <b-navbar-brand href="#">Hotelsss</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link class="routerlink" to="/">Home</router-link>
                <router-link class="routerlink" to="/reservation">Reservation</router-link>
            </b-navbar-nav>
            </b-collapse>
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
    }
</style>