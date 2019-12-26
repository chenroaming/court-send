<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
            theme: this.$store.state.app.themeColor
        };
    },
    mounted () {},
    beforeDestroy () {},
    methods: {}
};
</script>

<style>
html,
body {
  min-width: 1440px;
  height: 100%;
  /* background: #f0f0f0; */
background-color: #f4f8ff;
  overflow: auto !important;
}

.app-main {
  width: 100%;
  height: 100%;
}
.ivu-card{
  /* background-color: #F3FEF8; */
}
.ivu-table,.ivu-btn-small {
    font-size: 12px !important;
}
.ivu-btn,.ivu-input,.ivu-select,.ivu-select-input,.ivu-select-item,.ivu-checkbox-wrapper{
    font-size: 12px !important;
}
.ivu-form .ivu-form-item-label{
    font-size: 12px !important;
}
</style>
