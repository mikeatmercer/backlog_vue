<template>
<fragment>
  <slot :title="title"></slot>
</fragment>
</template>


<script>
import { Fragment } from 'vue-fragment'
  export default {
    data() {
      title: "this is title"
    },

    components: {
      'fragment': Fragment
    }

  }


</script>
