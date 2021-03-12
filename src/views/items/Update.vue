<template>
  <div>
    <CForm>
    <CRow>
      <CCol sm="12">
        <CAlert :show="this.$store.state.alertVisibility" :color="this.$store.state.alertType">{{this.$store.state.alertMsg}}</CAlert>
      </CCol>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Item </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CInput label="Description" v-model="form.description" />
            <CInput label="Price" v-model="form.price" />
            <CInput label="Quantity" v-model="form.quantity" />
            <CSelect
                label="Unit"
                horizontal
                :options="['Piece','Box']"
                placeholder="Please select"
                :value.sync="form.unit"
              />
            <CSelect
                label="Item Type"
                horizontal
                :options="['Moving','Not Moving']"
                placeholder="Please select"
                :value.sync="form.item_type"
              />
            <CSelect
                label="Include in treatment packages"
                horizontal
                :options="['Yes','No']"
                placeholder="Please select"
                :value.sync="form.include_in_package"
              />  
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
          description: '',
          unit:'',
          quantity:'',
          price:'',
          item_type:''
      }
    }
  },
  methods: {
    save () {
        this.$http.put('items/' + this.$route.params.id, this.form)
        .then((response) => {
          this.$store.commit('successState','Record successfully updated.')
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
