<template>

<div v-if="pilltext" class="pill" :style="{backgroundColor: color}">
  <span class="text">{{pilltext}}</span>

</div>

</template>

<style lang="scss" scoped>
.pill {
  display:inline-block;
  line-height: 16px;
  border-radius: 20px;
  padding: 0 6px;
  margin-bottom: 4px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 600;
  background:#8BDAE3;
}

</style>


<script>
  export default {

    props:['pilltext',"color"]
  }

</script>
