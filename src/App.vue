<template>
    <div id="backlog_app">
      <h1>Mercer Link Product Backlog</h1>
        <nav-list :activeTab="activeTab" :tabswitch="activeTabSwitch"/>
    </div>

</template>

<script>
    import NavList from './Nav.vue';
    export default {
      data() {
        return {
          activeTab: 'current'
        }
      },
      components: {
        "nav-list": NavList
      },
      methods: {
        activeTabSwitch(state) {
          this.activeTab = state;
        }
      }
    }
</script>


<style lang="scss">

  #backlog_app {
    font-family: "Segoe UI",Arial,sans-serif;
    width: 710px;
    h1,h2,h3,h4,h5,h6,p, ul,li, ol, a {
      font-family: "Segoe UI",Arial,sans-serif !important;
    }
  }

</style>
