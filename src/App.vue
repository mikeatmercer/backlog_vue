<template>
    <div id="backlog_app">
      <h1>Mercer Link Product Backlog</h1>

        <div v-if="page.view == 'overview'">
          <nav-list :activeTab="activeTab" :items="items" :mostRecent="mostRecent" :tabswitch="activeTabSwitch" v-if="!errored"/>
          <div v-if="errored">There was an error</div>
          <item-list :activeTab="activeTab" :mostRecent="mostRecent" :items="items" :pageSwitch="pageSwitch" v-if="mostRecent && items"/>
        </div>
        <div v-if="page.view == 'detail'">
          this is detail <br/>
          <div v-on:click="pageSwitch('overview')">Back</div>
        </div>
    </div>

</template>

<script>
    import NavList from './Nav.vue';
    import itemList from './itemList.vue';
    import $ from 'jquery';


    export default {
      data() {
        return {
          activeTab: 'current',
          errored: false,
          mostRecent: null,
          items: null,
          page: {
            view: "overview",
            id: null
          }
        }
      },
      components: {
        "nav-list": NavList,
        "item-list": itemList
      },
      methods: {
        activeTabSwitch(state) {
          this.activeTab = state;
        },
        pageSwitch(view, id) {
          this.page.view = view;
          if(!id) {
            this.page.id = null;
          } else {
            this.page.id = id;
          }
        }
      },
      mounted: function() {


         $.ajax({
          type: 'GET',
          url: "http://communities.mercer.com/KnowledgeManagement/_api/web/lists/GetByTitle('Current Product Backlog')/fields?$filter=EntityPropertyName eq 'Status'",
          headers: {
            "accept": "application/json;odata=verbose",
          },
          success: function(data) {
            this.mostRecent = data.d.results[0].Choices.results[0];

          }.bind(this),
          error:  function (error) {
            this.errored = true;
          }


        });

        $.ajax({
         type: 'GET',
         url: "http://communities.mercer.com/KnowledgeManagement/_api/Web/Lists/GetByTitle('Current Product Backlog')/items?$orderby=Completion%5Fx0020%5FDate desc",
         headers: {
           "accept": "application/json;odata=verbose",
         },
         success: function(data) {
           this.items = data.d.results;

         }.bind(this),
         error:  function (error) {
           this.errored = true;
         }

       })

      }
    }
</script>


<style lang="scss">

  #backlog_app {
    font-family: "Segoe UI",Arial,sans-serif;
    width: 710px;
    h1,h2,h3,h4,h5,h6,p, ul,li, ol, a, button {
      font-family: "Segoe UI",Arial,sans-serif !important;
    }
  }

</style>
