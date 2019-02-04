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
@import "../styles/colors.scss";


  .nav-tabs {
    margin: 8px 0;
    button {
      cursor: pointer;
      margin: 0 8px 0 0;
      &.disabled {
        pointer-events: none;
        display:none;
      }
      border: 0;
      color: $sapphire-medium;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 14px;
      line-height: 30px;
      padding: 0 12px;
      border-radius: 2px;
      &:hover, &.active {
        background: $flat-hover;
      }
    }
  }

</style>
