<template>
  <listing
   :fields="fields"
   :items="items"
   :url="url"
  updateRoute="VendorUpdate"
  ></listing>
</template>
<script>
import Listing from '../utils/Listing'
export default {
  name: 'Tables',
  data(){
    return {
      fields :['id',
        {key:'name',label:'Company Name'},
        {key:'address',label:'Address'},
        {key:'zip',label:'Zip Code'},
        'Action']
      ,
      items:[],
      url:'vendors'    
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

