<template >

  <a :href="userSafe.url || '#'" class="profile" :target="(userSafe.url) ? '_blank' : ''">
    <div class="img-container">
      <div class="profile-ball" :class="{noimage: userSafe.picture === 'no-image'}" :data-initials="userInit"
      :style="{
        backgroundImage: (userSafe.picture !== 'no-image') ? 'url('+userSafe.picture+')' : ''


      }"></div>
    </div>

    <div v-if="userSafe.name" class="name-container">
      {{userSafe.name}}
    </div>



  </a>

</template>

<style scoped lang="scss">
@import "../styles/colors.scss";
  .profile {
    display:flex;
    margin-top: 12px;
    align-items: center;
    text-decoration: none !important;
    &-ball {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: $onyx-6;
      background-size: cover;
      background-position:center center;
      position: relative;
      display:block;
      overflow: hidden;
      &:after {
        line-height: 1;
        font-size: 16px;
      }
      &.noimage {
        background: $sapphire-dark !important;
        display:flex;
        align-items: center;
        justify-content: center;
        &:after {
          display:block;
          content: attr(data-initials);
          color: white;
          font-weight:bold;
          text-transform: uppercase;

        }
      }
    }
  }
  .img-container {
    width: 48px;
    margin-right: 8px;
  }
  .name-container {
    flex: 1;
    font-weight: bold;
    color: $sapphire-medium;
  }

</style>


<script>
  import { Fragment } from 'vue-fragment';
  export default {
    data() {
      return{
      }
    },
    props: ['id',"user"],
    mounted: function() {
      this.$root.$emit('getProfile', this.id);

    },

    computed: {
      userInit: function() {

        if(!this.user) {
          return null;
        }
        if(!this.user.name) {
          return null;
        }

        var split = this.user.name.trim().split(" ");
        return split[0].charAt(0)+split[1].charAt(0);
      },
      userSafe: function() {
        var user = {
          name: null,
          email: null,
          picture: null,
          url: null
        }
        if(!this.user) {
          return user;
        }
        return this.user;
      }
    },
    components: {
      "fragment": Fragment
    }
  }

</script>
