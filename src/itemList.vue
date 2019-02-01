<template>
  <div>
    <div v-for="item in filteredItems" :key="item.ID" v-on:click="pageSwitch('detail', item.ID)">
      {{item.Title}} -- {{item.Status}}

    </div>

  </div>


</template>


<script>
export default {
  data() {
    return{}
  },
  props: ['items',"mostRecent", "activeTab", "pageSwitch"],

  computed: {
    filteredItems: function() {
      var completed = this.items.filter(function(e,i){
        return e.Status == "Completed";
      });
      var mostRecent = this.items.filter(function(e,i){
        return e.Status === this.mostRecent;
      }.bind(this));
      var live = this.items.filter(function(e,i){
        return e.Status !== ("Completed") && e.Status !== this.mostRecent;
      }.bind(this));
      if(this.activeTab === "completed") {
        return completed;
      }
      if(this.activeTab === "current") {
        return mostRecent.concat(live);
      }
    }
  }


}


</script>
