<template>
    <div>
        <CRow>
            <CCol sm="12">
                <Alert></Alert>
            </CCol>
        </CRow>
        <CForm>
            <PatientInformation :patient="patientData" >
            <template #philhealth>
                <CRow>
                    <CCol sm="3" >
                        <label>Total No philhealth use this year </label><span class="font-weight-bold">: {{ getTotalPhilHealth }}</span>
                    </CCol>
                </CRow>
            </template>
            </PatientInformation>
            <CRow>
                <CCol sm="12">
                    <CCard>
                    <CCardHeader>
                        <strong> Search </strong><small>Patient </small>
                    </CCardHeader>
                    <CCardBody>
                            <CRow>
                                <CCol sm="3">
                                    <CInput
                                        label="Enter Patient First Name"
                                        v-model="query"
                                        v-on:keyup="getData()" 
                                        autocomplete="off"/>
                                    <div class="panel-footer" v-if="search_data.length">
                                        <ul class="list-group">
                                            <a href="#" class="list-group-item" v-for="data1 in search_data" v-on:click="getName(data1.full_name,data1)">{{ data1.full_name }}</a>
                                        </ul>
                                    </div>    
                                </CCol>
                                <CCol sm="3">
                                    <CSelect
                                        label="Patient Care"
                                        :options="['Inpatient','Outpatient']"
                                        placeholder="Please select"
                                        :value.sync="patient_care"
                                        required
                                    />
                                </CCol>
                                <CCol sm="1">
                                    <CInput required label="Machine No" v-model="machine" />
                                </CCol>
                                <CCol sm="3">
                                    <CSelect
                                        label="Method of Payment"
                                        :options="['Cash','Philhealth','GL']"
                                        placeholder="Please select"
                                    />
                                </CCol>
                                <CCol sm="2">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="dialysis_bath" v-model="usePhilHealth" @change="philhealthChange($event)"/>
                                        <label class="form-check-label" for="dialysis_bath">Use Philhealth Discount</label>
                                    </div>
                                </CCol>
                            </CRow>
                    </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <TreatmentItems
                :usePhilHealth="usePhilHealth"
            />
            <CRow>
                <CCol>
                <CCard>
                    <CCardHeader>
                        Payment Information
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                <CInput
                                    label="Cash Tendered"
                                    v-model="cash"/>  
                            </CCol>
                        </CRow>
                    </CCardBody>    
                </CCard>
                </CCol>
            </CRow>
            <CButton type="submit" size="sm" color="primary" :block="true" @click.prevent="save"> 
                <CIcon name="cil-check-circle"/> Submit
            </CButton>
        </CForm>
    </div>
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import PatientInformation from '../patients/Information'
import TreatmentItems from '../items/TreatmentItems'

export default {
  name: 'TreatmentCreate',
  components: { CTableWrapper, PatientInformation, TreatmentItems},
 data () {
     return {
         selected:[],
         warningModal: false,
         query:'',
         search_data:[],
         items:[],
         patientData:[],
         machine:'',
         patient_care:'',
         total: 0,
         discount : 0,
         grandTotal : 0,
         usePhilHealth : false,
         totalPhilHealthUseThisYear: 0,
         cash:0
        }
 },
 computed: {
     getTotalPhilHealth(){
         if(this.patientData.id != null){
            this.$http.get('billing/patient/philhealth')
            .then(response => {
                this.totalPhilHealthUseThisYear = response.data.count;
            })
   
         }
         else{
              this.totalPhilHealthUseThisYear = 0; 
         }
         return this.totalPhilHealthUseThisYear;
     }
 },
 methods:{
      getData () {
        this.search_data = [];
        this.$http.get('patients/name/' + this.query)
        .then((response)=>{
          this.patientData = [];
          this.search_data = response.data;
        }).catch((error)=>{
          console.log(error);
        })
      },
      getName (name,data) {
        this.query = name;
        this.patientData = data;
        this.search_data = [];
      },
      philhealthChange($event){
        if($event.target.checked){
            alert(1);
            this.$store.state.items.includedInthePackage.push({description:'Philhealth Discount',item_type:'Discount',price:2650,billing_quanity:1,item_type:'Discount'});
        }else{
            this.$store.state.items.includedInthePackage = this.$store.state.items.includedInthePackage.filter(itemIncludedInPackage => itemIncludedInPackage.description != 'Philhealth Discount');
        }
      },
      save(){

          if( this.patientData.id != null ){
            this.$http.post('treatments', {
                patientId: this.patientData.id,
                machine : this.machine,
                patient_care : this.patient_care
            })
            .then((response) => {
                var treatmentId = response.data.treatmentId;
                this.$http.post('billingheader', {
                patientId: this.patientData.id,
                treatmentId: treatmentId,
                use_philhealth : this.usePhilHealth
                }).then((response) => {
                    var billingHeaderId = response.data.billingHeaderId;
                    var bulkData = [];
                    this.$store.state.items.patientItems.forEach((item,index) => {
                        
                        bulkData.push({
                            "billingHeaderId" : billingHeaderId,
                            "description" : item.description,
                            "quantity" : item.quantity,
                            "price" : item.price,
                            "total" : (item.price * item.quantity)
                        })
                        //Insert Item History if item is moving
                        if(item.item_type == 'Moving'){
                            this.$http.post('itemhistories',{
                                itemId : item.id,
                                previous_quantity : 1,
                                activity:'Less ' 
                            }).catch((error) => {
                                this.$store.commit('errorState',error.response);
                            })
                        }


                    });
                    console.log(bulkData);

                    this.$http.post('billingdetails',bulkData).then((response) => {
                        this.$store.commit('successState','Record successfully created.')
                    }).catch((error) => {
                        this.$store.commit('errorState',error.response);
                    })
                }).catch((error) => {
                    this.$store.commit('errorState',error.response);
                })
            
            }).catch((error)=> {
            this.$store.commit('errorState',error.response);
            });
        }else
        {
            alert("No patient selected!");
        }
      }
    }
 
}
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center
}


</style>