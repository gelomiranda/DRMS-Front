<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>
            <div>
              <center><h1>Treatment Record</h1></center>
            </div>
            <div>Patient Name : <b>{{ form.patient.fullName }}</b></div>
            <div>Blood Type : {{ form.patient.blood_type }}</div>
            <div>Attending Physician : {{ form.patient.blood_type }}</div>
            <hr>
            <div class="text-danger">In case of emergency please contact : {{ form.patient.person_to_contact }}</div>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CTabs>
                <CTab title="Treatment Record" active>
                  <treatment-header :form="form"></treatment-header>
                </CTab>
                <CTab title="PRE - HD">
                  <pre-hd :form="form"></pre-hd>
                </CTab>
                <CTab title="POST - HD">
                  <pre-hd :form="form"></pre-hd>
                </CTab>
                <CTab title="Monitoring Sheet">
                  <monitoring-sheet></monitoring-sheet>
                </CTab>
                <CTab title="Nurses Notes">
                  <nurses-notes></nurses-notes>
                </CTab>
              </CTabs>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" @click.prevent="save">
                <CIcon name="cil-check-circle"/> Updates
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import PreHd from '../treatments/PreHd'
import TreatmentHeader from '../treatments/Header'
import PatientInformation from '../patients/Information'
import MonitoringSheet from '../treatments/MonitoringSheets'
import NursesNotes from '../treatments/NursesNotes'

export default {
  components: { PreHd,
                TreatmentHeader,
                PatientInformation,
                MonitoringSheet,
                NursesNotes},
  name: 'Tabs',
  data () {
    return {
      tabs: [
        'Calculator',
        'Shopping cart',
        'Charts'
      ],
      activeTab: 1,
      form:{
        patient:{
          fullName:''
        }
      }
    }
  },created(){
    this.$http.get('treatments/' + this.$route.params.id)
        .then((response) => {
            //var data = response.data;
            //var form = this.form;
            //this.form.first_name = data.first_name;
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

  },
  methods:{
      save(){
          this.$http.put('treatments/' + this.$route.params.id, this.form)
            .then((response) => {
            this.alertMsg = 'Record updated!';
            this.alertType= 'success';
            this.alertVisibility=true;
            
            }).catch((error)=> {
            if (error.response) {

                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.alertVariant='danger';
                this.alertMsg=error.response.data;
                //console.log(error.response.data);
                //console.log(error.response.status);
                //console.log(error.response.headers);
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
            //console.log(error.config);
            });
      }
  }
}
</script>
