<template>
  <div>
    <CForm>
    <CRow>
      <CCol sm="12">
        <Alert></Alert>
      </CCol>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Vendor </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CInput label="Company Name" v-model="form.name" />
            <CInput label="Address" v-model="form.address" />
            <CInput label="Zip Code" v-model="form.zip" />
            <CInput label="Contact No." v-model="form.contact_no" />
            <CInput label="Email Address" v-model="form.email_address" />
            <CInput label="Remarks" v-model="form.remarks" />
            <CButton type="submit" size="sm" color="primary" :block="true" @click.prevent="save">
                <CIcon name="cil-check-save"/> Submit
            </CButton>
          </CCardBody>
        </CCard>
        </CCol>
        </CRow>
      </CForm>
  </div>
</template>

<script>
import Alert from '../utils/Alert.vue';
export default {
  components: { Alert },
  name: 'Forms',
  data () {
    return {
      form:{
          name: '',
          address:'',
          contact_no:'',
          zip:'',
          email_address:'',
          remarks:'',
      }
    }
  },
  mounted(){
  this.$store.state.alertVisibility = false;
  },
  methods: {
    save () {
      this.$http.put('vendors/' + this.$route.params.id, this.form)
        .then((response) => {
          this.$store.commit('successState','Record successfully updated.')
        }).catch((error)=> {
          this.$store.commit('errorState',error.response);
        });    
    }
  },created(){
    this.$http.get('vendors/' + this.$route.params.id)
        .then((response) => {
            this.form = response.data;
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
