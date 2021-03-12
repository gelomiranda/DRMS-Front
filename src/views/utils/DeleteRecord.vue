<template>
    <a v-on:click="del()" 
        class="text-danger">
        <CIcon name="cilDelete" />
    </a>
</template>
<script>
export default {
    name:'DeleteRecord',
    props:{
        id : '',
        recordName : '',
        url:'',
        items : {
            type: Array
        }
    },
    methods:{
      del() 
      {
        if(confirm("Are you sure you want to delete?"))
        {  
          this.$http.delete(this.url + "/" + this.id)
          .then((response) => {
            this.$emit("update-list",this.id);
            this.$store.commit('successState', 'Record successfully deleted!');
          }).catch((error) => {
            this.$store.commit('errorState', error.response);
          });
        }
      }
    }
}
</script>