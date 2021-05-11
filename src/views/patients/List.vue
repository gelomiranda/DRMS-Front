<template>
  <listing
   :fields="fields"
   :items="items"
   :url="url"
  updateRoute="PatientUpdate"
  ></listing>
</template>
<script>
import Listing from '../utils/Listing'
export default {
  name: 'Tables',
  data(){
    return {
      fields :['id',
        {key:'full_name',label:'Patient Name'},
        {key:'philhealth',label:'Philhealth No'},
        {key:'monday',label:'Monday'},
        'Action']
      ,
      items:[],
      url:'patients'    
    }
  },
  components: { Listing },
  created (){
    this.$http.get(this.url)
    .then((response) => {
      this.items = response.data
    }).catch(function (error) {
      this.$store.commit('errorState',error.response);
    });
  },
  methods: {
    updateItems(id) {
      this.items= this.items.filter(item=>item.id != id);
    }
  }
}
</script>

