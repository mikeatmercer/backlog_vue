<template>
<div class="list-item">
  <a href="#" v-on:click.prevent="pageSwitch('detail', item.ID)">


  <div class="item-title">
    {{item.Title}}
  </div>
  <div class="item-desc">
    <pill v-if="item.Status === mostRecent" :pilltext="'In Next Release'" /> {{excerpt}}
  </div>

  </a>

</div>

</template>


<script>
import Pill from "./Pill.vue";
export default {

  data() {
    return{

    }
  },
  components: {
    "pill": Pill
  },
  props: ['item',"pageSwitch","mostRecent"],
  methods: {
    truncate(str,len,append) {
      var newLength;
     append = append || "";  //Optional: append a string to str after truncating. Defaults to an empty string if no value is given

     if (append.length > 0)
      {
        append = " "+append;  //Add a space to the beginning of the appended text
      }
     if (str.indexOf(' ')+append.length > len)
     {
         return str;   //if the first word + the appended text is too long, the function returns the original String
     }

     str.length+append.length > len ? newLength = len-append.length : newLength = str.length; // if the length of original string and the appended string is greater than the max length, we need to truncate, otherwise, use the original string

          var tempString = str.substring(0, newLength);  //cut the string at the new length
          tempString = tempString.replace(/\s+\S*$/, ""); //find the last space that appears before the substringed text

     if (append.length > 0)
        {
             tempString = tempString + append;
        }
     return tempString;
    }
  },
  computed: {
    excerpt: function() {
      var doc = new DOMParser().parseFromString(this.item.Description, 'text/html');
      var text =  doc.body.textContent || "";
      if(text.length < 200) {
        return text+" ...";
      }
      var trim = text.substr(0, 200);
      return this.truncate(text, 200, " ... ");
    }
  }
}

</script>
<style scoped lang="scss">
@import "../styles/colors.scss";
  .list-item {

    border: 1px solid $onyx-10;
    border-width: 1px 0 0 0;
    &:last-child {
      border-width: 1px 0;
    }
    a {
      display:block;
      text-decoration: none !important;
      padding: 16px 12px;
      color: black;
      &:hover {
        background: $flat-hover;
      }
      .item-title {
        font-size: 18px;
        margin-bottom: .25em;
        color: $sapphire-dark;
      }
    }
    .next-pill {
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
    .item-desc {
      line-height: 1.5;
      font-size: 14px;
      color: $onyx-medium;
    }
  }

</style>
