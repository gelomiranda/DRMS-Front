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
      this.$http.post('vendors', this.form)
        .then((response) => {
          this.$store.commit('successState','Record successfully created.')
        }).catch((error)=> {
          this.$store.commit('errorState',error.response);
        });    
    }
  }
}
</script>
