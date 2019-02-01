<template>
  <div class="nav-tabs">
    <button v-for="tab in tabs" :key="tab.state" :class="{active: (activeTab == tab.state) }" v-on:click.prevent="tabswitch(tab.state)">
      {{tab.title}} --- {{activeTab}}
    </button>


  </div>

</template>
<script>
export default {
  data () {
    return {
      nav: 'nav',
      tabs: [
        {
          state: 'current',
          title: 'Current Backlog Items'
        },
        {
          state: 'completed',
          title: 'Completed Backlog Items'
        }
      ]

    }
  },
  props: ['activeTab','tabswitch']
}
</script>

<style scoped lang="scss">
  .nav-tabs {
    .active {
      color: red;
    }
  }

</style>
