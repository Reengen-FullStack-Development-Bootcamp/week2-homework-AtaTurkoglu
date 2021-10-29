<template>
    <b-list-group class="listgroup">
        <b-list-group-item
         v-for="(item, index) in items" :key="index" 
         class=" d-flex flex-row align-items-center"
        >
            <i class="fa fa-circle" aria-hidden="true"></i>
            <p class="listtext ml-4">{{item}}</p>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
    props:["items"]
}
</script>

<style>
    .listgroup{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin:0;
        padding:0;
        color: rgb(15, 125, 160);
    }
    .listtext{
        text-align: left;
        align-self: center;
        font-size: 13px;
        margin: 0;
        padding: 0;
        padding-block: 5px;
        color: rgb(15, 125, 160);
    }
</style>