<template>
  <listing
    :fields="fields"
    :items="items"
    :url="url"
    updateRoute="PatientUpdate"
  />
</template>

<script>
import api from '../../api'
import Listing from '../utils/Listing'

export default {
  name: 'Tables',
  components: { Listing },
  data (){
    return {
      fields :
        [
          'id',
          {key:'description',label:'Description'},
          {key:'unit',label:'Unit'},
          {key:'quantity',label:'Quantity'},
          {key:'price',label:'Price'},
          {key:'item_type',label:'Item Type'},
          {key:'include_in_package',label:'Included in the package'},
          {key:'covered_by_philhealth',label:'Covered by Philhealth'},
          'Action'
        ],
      items:[],
      url:'items'
    }
  },
  created () {
    api.get(this.url)
    .then((response) => {
      this.items = response.data;
    }).catch(function (error) {
      this.$store.commit('errorState', error.response);
    });
  },
  methods: {
    updateItems(id) {
      this.items= this.items.filter(item=>item.id != id);
    }
  }
}
</script>

