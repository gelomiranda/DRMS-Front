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
import Alert from '../utils/Alert.vue';
import api from '../../api/index'
export default {
  components: { Alert },
  name: 'Forms',
  data () {
    return {
      form:{}
    }
  },
  mounted(){
  this.$store.state.alertVisibility = false;
  },
  created(){
    api.get('nephrologists/' + this.$route.params.id)
    .then((response) => {
        this.form = response.data;
    }).catch((error) => {
      this.$store.commit('errorState', error.response);
    });
 },
  methods: {
    save () {
      this.$http.put('nephrologists/' + this.$route.params.id)
        .then((response) => {
          this.$store.commit('successState','Record successfully updated.')
        }).catch((error)=> {
          this.$store.commit('errorState',error.response);
        });    
    }
  }
}
</script>
