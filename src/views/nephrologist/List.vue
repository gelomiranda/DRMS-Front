<template>
  <listing
   :fields="fields"
   :items="items"
   :url="url"
  updateRoute="NephrologistUpdate"
  ></listing>
</template>
<script>
import Listing from '../utils/Listing'

export default {
  name: 'NephrologistList',
  data (){
    return {
      fields :['id',
                    {key:'first_name',label:'First name'},
                    {key:'middle_name',label:'Middle name'},
                    {key:'last_name',label:'Last name'}
                    ,'Action'],
      items:[],
      
      url:'nephrologists' 
    }
  },
  components: { Listing },
  mounted () {
       this.$http.get(this.url)
        .then((response) => {
          this.items = response.data;
        }).catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
}
</script>

