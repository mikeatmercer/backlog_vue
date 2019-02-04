<template>
    <div id="backlog_app">
      <div class="backlog-header">
        <h1>Mercer Link Product Backlog</h1>
      </div>


        <div v-if="page_template == 'overview'">
          <nav-list :activeTab="activeTab" :items="items" :mostRecent="mostRecent" :tabswitch="activeTabSwitch" v-if="!errored"/>
          <div v-if="errored">There was an error</div>
          <item-list :activeTab="activeTab" :itemOrder="itemOrder" :mostRecent="mostRecent" :items="items" :pageSwitch="pageSwitch" v-if="mostRecent && items"/>
        </div>
        <page-detail v-if="page_template == 'detail'" :items="items" :profiles="people" :pageSwitch="pageSwitch" :id="page_id"/>
    </div>

</template>

<script>
    import NavList from './Nav.vue';
    import itemList from './itemList.vue';
    import PageDetail from "./PageDetail.vue";
    import $ from 'jquery';


    export default {
      components: {
        "nav-list": NavList,
        "item-list": itemList,
        "page-detail" : PageDetail
      },
      data() {
        return {
          activeTab: 'current',
          errored: false,
          mostRecent: null,
          items: {},
          itemOrder: [],
          people: {},
          scrollTop: 0,
          page_template: "detail",
          page_id: 79
        }
      },
      watch: {
        page_template: function() {
          console.log(document.getElementById("s4-workspace").scrollTop);
        },
      },

      methods: {
        activeTabSwitch(state) {
          this.activeTab = state;
        },
        pageSwitch(view, id) {
          this.page_template = view;
          this.page_id = id || null;
        },

        getProfileProperties(user) {


          $.ajax({
            url: "http://communities.mercer.com/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=%27"+ encodeURIComponent(user.login) +"%27&$select=PictureUrl,PersonalUrl",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function(data) {
              user.picture = data.d.PictureUrl.replace(":80","")
              user.url = data.d.PersonalUrl

              this.$set(this.people, "p_"+user.id, user);

            }.bind(this)
          })
        },
        getProfile(id) {
          //console.log(id);
          if(this.people["p_"+id]) {

            this.$root.$emit("sendProfile", this.people["p_"+id]);
            return ;
          }
          var user = {};
          user.id = id;

          $.ajax({
            url: "http://communities.mercer.com/KnowledgeManagement/_api/Web/GetUserById(" + id + ")",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function(data) {
              var dataResults = data.d;

              var nameA = dataResults.Title.split(',');
              user.name = nameA[1]+" "+nameA[0];
              user.email = dataResults.Email;
              user.login = dataResults.LoginName.split("|")[1];
              this.getProfileProperties(user);
            }.bind(this)
          })
        }
      },
      mounted: function() {
        this.$root.$on('getProfile', function(id) {
          this.getProfile(id)
        }.bind(this));

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
           var items = data.d.results;
           console.log(items);
           var iObj = {};
           var order = [];
           for (var i = 0; i < items.length ; i++) {
             iObj["i_"+items[i].ID] = items[i];
             order.push(items[i].ID);
            }
            this.items = iObj;
            this.itemOrder = order;

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
