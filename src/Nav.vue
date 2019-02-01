<template>
  <div class="nav-tabs">
    <button v-for="tab in tabs" :key="tab.state" :class="{active: (activeTab == tab.state), disabled: (!activeTab || !mostRecent) }" v-on:click.prevent="tabswitch(tab.state)">
      {{tab.title}}
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
  props: ['activeTab','tabswitch','items', "mostRecent"]
}
</script>

<style scoped lang="scss">
  .nav-tabs {
    button {
      &.disabled {
        pointer-events: none;
        display:none;
      }
    }
    .active {
      color: red;
    }
  }

</style>
