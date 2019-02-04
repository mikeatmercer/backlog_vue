<template >

  <div>
    <div v-if="!user">
      Getting User

    </div>

    <div v-if="user">
      {{user.name}}
      <br/>
      <img :src="user.picture" />
      {{user.picture}}
    </div>


  </div>

</template>


<script>
  import { Fragment } from 'vue-fragment';
  export default {
    data() {
      return{}
    },
    props: ['id',"user"],
    mounted: function() {
      this.$root.$emit('getProfile', this.id);

    },
    components: {
      "fragment": Fragment
    }
  }

</script>
