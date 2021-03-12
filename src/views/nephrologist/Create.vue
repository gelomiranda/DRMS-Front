<template>
  <div>
    <CForm>
    <CRow>
      <CCol sm="12">
        <CAlert :show="alertVisibility" :color="alertType">{{alertMsg}}</CAlert>
      </CCol>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Nephrologist </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CInput label="First Name" v-model="form.first_name" />
            <CInput label="Middle Name" v-model="form.middle_name" />
            <CInput label="Last Name" v-model="form.last_name" />
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
export default {
  name: 'Forms',
  data () {
    return {
      alertVisibility:false,
      alertType:'',
      alertMsg:'',
      form:{
          first_name: '',
          middle_name:'',
          last_name:''
      }
    }
  },
  methods: {
    save () {
        this.$http.post('api/nephrologists', this.form)
        .then((response) => {
          this.alertMsg = 'Record save!';
          this.alertType= 'success';
          this.alertVisibility=true;
          console.log(response);
        }).catch((error)=> {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.alertVariant='danger';
            this.alertMsg=error.response.data;
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            this.alertVariant='danger';
            this.alertMsg=error.request;
            //console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            //console.log('Error', error.message);
            this.alertVariant='danger';
            this.alertMsg=error.message;
          }
          this.alertVariant='danger';
          this.alertMsg=error.config;
          //console.log(error.config);
        });
      }
  }
}
</script>
