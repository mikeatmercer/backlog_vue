<template>
  <div class="item-list">

    <list-item v-for="item in filteredItems" :key="item.id" :pageSwitch="pageSwitch" :mostRecent="mostRecent" :item="item" />

  </div>


</template>


<script>
import ListItem from "./ListItem.vue";
export default {
  data() {
    return{}
  },
  props: ['items',"mostRecent","itemOrder", "activeTab", "pageSwitch"],
  components: {
    "list-item": ListItem
  },

  computed: {


    filteredItems: function() {
      var completed = [],
          live = [],
          mostRecent = [];
      this.itemOrder.forEach(function(e,i){
        var i = this.items['i_'+e];
        if(i.Status === "Completed") {
          completed.push(i);
          return ;
        }
        if(i.Status === this.mostRecent) {
          mostRecent.push(i);
          return ;
        }
        live.push(i);

      }.bind(this));
      if(this.activeTab == "completed") {
        return completed;
      }
      if(this.activeTab === "current") {
        return mostRecent.concat(live);
      }


    }

  }


}


</script>
