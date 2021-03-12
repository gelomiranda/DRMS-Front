<template>
  <div>
    <CForm>
    <CRow>
      <CCol sm="12">
      <Alert></Alert>
      </CCol>
      <CCol sm="6">
        <CCard>
          <CCardHeader>
            <strong>Patient </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CInput
              label="First Name"
              v-model="form.first_name"
              aria-autocomplete="off"
            />
            <CInput
              label="Middle Name"
              v-model="form.middle_name"
            />
            <CInput
              label="Last Name"
              v-model="form.last_name"
            />
            <CInput
              label="Birth Date"
              v-model="form.date_of_birth"
              type="date"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6">
        <CCard>
          <CCardHeader>
            <strong>Patient </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CInput
              label="Philhealth No."
              v-model="form.philhealth"
            />
            <CInput
              label="Contact No."
              v-model="form.contact_number"
            />
            <CSelect
                label="Gender"
                horizontal
                :options="['Male','Female']"
                placeholder="Please select gender"
                :value.sync="form.gender"
              />
            <CSelect
                label="Civil Status"
                horizontal
                :options="[{ value: 'Single', label: 'Single' }, 
                           { value: 'Married', label: 'Married' },
                           { value: 'Widow', label: 'Widow'}]"
                placeholder="Please select"
                :value.sync="form.civil_status"
              />
              <CSelect
                label="Attending Nephrologist"
                horizontal
                :options="nephrologist"
                placeholder="Please select"
                :value.sync="form.nephrologistId"
              />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Patient </strong><small>Schedule</small>
          </CCardHeader>
          <CCardBody>
            <CCol lg="12">
            <template v-for="(name, key) in ['Select Schedule']">
                <CRow class="form-group" :key="name">
                  <CCol tag="label" sm="1" class="col-form-label form-inline">
                    {{name}}
                  </CCol>
                  <CCol sm="11" class="form-inline">
                    <input type="checkbox" id="Monday" value="Monday" v-model="form.monday">
                    <label for="Monday" class="px-1" id="Monday">Monday</label>
                    
                    <input type="checkbox" id="Tuesday" value="Tuesday" v-model="form.tuesday">
                    <label for="Tuesday" class="px-1" id="Tuesday">Tuesday</label>
                    
                    <input type="checkbox" id="Wednesday" value="Wednesday" v-model="form.wednesday">
                    <label for="Wednesday"  class="px-1">Wednesday</label>

                    <input type="checkbox" id="Thursday" value="Thursday" v-model="form.thursday">
                    <label for="Thursday"  class="px-1">Thursday</label>

                    <input type="checkbox" id="Friday" value="Friday" v-model="form.friday">
                    <label for="Friday"  class="px-1">Friday</label>

                    <input type="checkbox" id="Saturday" value="Saturday" v-model="form.saturday">
                    <label for="Saturday"  class="px-1">Saturday</label>

                    <input type="checkbox" id="Sunday" value="Sunday" v-model="form.sunday">
                    <label for="Sunday"  class="px-1">Sunday</label>
                  </CCol>
                </CRow>
              </template>
        </CCol>
          </CCardBody>
        </CCard>
        </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Patient </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CInput
              label="Address"
              v-model="form.address"
            />
            <CInput
              label="In case of emergency contact person"
              v-model="form.person_to_contact"
            />
            <CInput
              label="Concat Person Contact No."
              v-model="form.person_to_contact_number"
            />
          </CCardBody>
        </CCard>
          <CButton type="submit" size="sm" color="primary" :block="true" @click.prevent="save">
            <CIcon name="cil-check-circle"/> Submit
          </CButton>
        </CCol>
    </CRow>
    
    </CForm>
  </div>
</template>

<script>
import Alert from '../utils/Alert.vue';
import api from '../../api'
export default {
  components: { Alert },
  name: 'CreatePatientForm',
  data () {
    return {
      alertVisibility:false,
      alertType:'',
      alertMsg:'',
      form:{
          first_name: '',
          middle_name:'',
          last_name:'',
          address:'',
          contact_number:'',
          civil_status:'',
          philhealth:'',
          person_to_contact:'',
          person_to_contact_number:'',
          date_of_birth:'',
          gender:'',
          nephrologistId:'',
          monday : false,
          tuesday:false,
          wednesday:false,
          thursday:false,
          friday:false,
          saturday:false,
          sunday:false
      },
      nephrologist:[]
    }
  },
  mounted(){
    this.$store.state.alertVisibility = false;
    api.get('nephrologists')
    .then((response) => {
        response.data.forEach(element => {
          this.nephrologist.push({
                                value:element.id,
                                label:element.first_name});
        });
    }).catch(function (error) {
      this.$store.commit('errorState','Error while connecting to nephrologist api :' + error.response);
    });
  },
  methods: {
    save () {
        this.$http.post('patients', this.form)
        .then((response) => {
          this.$store.commit('successState','Record successfully created.')
        }).catch((error)=> {
          this.$store.commit('errorState',error.response);
        });
      }
  }
}
</script>
