<template>
  <div class="modal-overlay" v-on:click.prevent="pageSwitch('overview')">
    <div class="modal-container" v-if="!item" v-on:click.stop="console.log('dgg')">
      <div class="modal-content">
        Couldn't find the item you were looking for.
      </div>
    </div>
    <div class="modal-container" v-if="item" v-on:click.stop="">
      <button class="close-button" v-on:click.prevent="pageSwitch('overview')">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </button>


      </button>
      <div class="modal-header">

        <pill v-if="item.Status === mostRecent" :pilltext='"Marked for next release"'/>
        <h2 class="modal-title">{{item.Title}}</h2>
      </div>
      <div class="modal-content">
          <div  class="modal-leftcol">
            <div class="description" v-html="descSanitize" />
            <div class="tfs-label" v-if="item.TFS_ID">
              TFS ID: {{item.TFS_ID}}
            </div>
          </div>

          <div class="modal-rightcol">
            <div class="section">
              <label>Status</label>
              <div v-if="item.Status !== 'Completed'">{{item.Status}}</div>
              <div v-if="item.Status === 'Completed'">Completed on {{completionDate}}</div>
            </div>
            <div class="section" v-if=" requestorList.length">
              <label>Requested By</label>
              <ul class="profiles">
                <li v-for="profile in requestorList">

                  <profile :user="profiles['p_'+profile]" :id="profile" />
                </li>
              </ul>

            </div>
          </div>
      </div>

    </div>


  </div>
</template>

<script>
import Profile from './profile.vue';
import Pill from "./Pill.vue";
var cleanHTML = require('sanitize-html');
import htmlStrip from "./util/html_strip";
  export default {
    data() {
      return {

      }
    },
    props: ['item',"pageSwitch","profiles", "mostRecent"],
    components: {
      "profile": Profile,
      "pill" : Pill
    },
    computed: {
      requestorList: function() {
        if (!this.item.Business_x0020_RequestorId ) {
          return [];
        }
        return this.item.Business_x0020_RequestorId.results;
      },
      descSanitize: function() {
        if(!this.item.Description) {
          return "";
        }
        return htmlStrip(this.item.Description);
        /*return cleanHTML(this.item.Description, {

        });*/
      },
      completionDate: function() {
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var d = new Date(this.item.Completion_x0020_Date);
        return d.getDate()+" "+months[d.getMonth()]+" "+ d.getFullYear();
      }
    }

  }


</script>

<style scoped lang="scss">
@import "../styles/colors.scss";

  .modal-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(black, .85);
    font-family: "Segoe UI",Arial,sans-serif !important;
    line-height: 1.4 !important;
    /deep/ * {
      font-family: "Segoe UI",Arial,sans-serif !important;
    }
  }
  .modal-container {
    z-index: 9999;
    background: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: calc(100vw - 120px);
    max-width: 996px;
    height: calc(100vh - 240px);
    border-radius: 2px;
    box-shadow: 0 -8px 10px 0 rgba(0,0,0,0.03), 0 6px 24px 0 rgba(0,0,0,0.12), 0 16px 24px 0 rgba(0,0,0,0.1);
    display:flex;
    flex-direction: column;
  }
  .modal {
    &-header {
      padding: 24px 36px;
      background: #f8f8f8;
      border-radius: 2px 2px 0 0;
      border-bottom: 1px solid #f0f0f0;
    }
    &-content {
      flex: 1;
      padding: 32px 36px;
      color: black;
      font-size: 16px;
      line-height: 1.4 !important;
      display:flex;
      overflow-x: hidden;
      overflow-y: auto;

    }
    &-leftcol {
      font-size: 16px;
      /deep/ * {
        line-height: 1.4 !important;
        font-size: 16px;
      }
      /deep/ blockquote {
        color: $onyx-medium;
        margin: 0 0 1em 0;
        padding-left: 24px;
        border-left: 2px solid #808080;
      }
      /deep/ {
        p {
          margin-bottom: 1em;
        }
        ul, ol {
          margin-bottom: 1em;
          li {
            margin-bottom: .5em;
          }
        }
        img {
          display:block;
          max-width: 100%;
        }
      }
      flex: 1;
    }
    &-rightcol {
      width: 250px;
      padding-left: 16px;
      margin-left : 16px;
      border-left: 1px solid #f0f0f0;
      .section {
        margin-bottom: 24px;
        font-size: 14px;
        color: $onyx-medium;
        label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 12px;
          opacity: .75;
        }
      }
    }
    &-title {
      font-size: 24px;
      font-weight: 600;
    }
  }
  .tfs-label {
    font-size: 12px;
    color: $onyx-medium;
    margin-top: 24px;
  }
  ul.profiles {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .close-button {
    position:absolute;
    right: 0;
    width: 32px;
    height: 32px;
    background: rgba(white, .15);
    border: 0;
    border-radius: 50%;
    top: -(32px + 12px);
    cursor: pointer;
    svg {
      position: absolute;
      fill: white;
      width: 24px;
      height: 24px;
      left: calc(50% - 12px);
      top: calc(50% - 12px);
    }
  }
</style>
