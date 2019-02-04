<template>
  <div>
    <a href="#" v-on:click.prevent="pageSwitch('overview')">Back</a>
    <div v-if="Object.keys(item).length === 0" class="loading-state">
      Loading
    </div>

    <div v-if="Object.keys(item).length !== 0" class="detail-page">
      <div class="top-section">
        <div class="left-top">
          <h1>{{item.Title}}</h1>
          <div class="status">
            <label>Status</label>
            <div v-if="item.Status !== 'Completed'">{{item.Status}}</div>
            <div v-if="item.Status === 'Completed'">
              Completed on {{item.Completion_x0020_Date}}
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>


</template>



<script>
import Profile from './profile.vue';
import { Fragment } from 'vue-fragment';

export default {
  data () {
    return {

    }
  },
  components: {
    "profile": Profile,
    'fragment' : Fragment
  },
  props: ['pageSwitch','id',"items","profiles"],
  computed: {
    item: function() {
      if(!this.items["i_"+this.id]) {
        return {};
      }
      return this.items["i_"+this.id];
    }
  }

}
</script>
