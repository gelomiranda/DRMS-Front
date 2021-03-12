<template>
  <div>
    <CRow>
        <CCol sm="12">
          <CAlert :show="alertVisibility" :color="alertType">{{alertMsg}}</CAlert>
        </CCol>
        <CCol sm="12">
            <CCard>
                <CCardHeader>
                    <strong> Patient for Treatment </strong><small> list</small>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm="12">
                            <CDataTable
                                :items="items"
                                :fields="tableHeader"
                                striped
                                caption="Striped Table"
                                >
                                 <template #patientName="{item}">
                                    <td>
                                        <CLink :to="{ name: 'TreatmentUpdate', params: { id: item.id }}">{{ item.patient.full_name }}</CLink>
                                    </td>
                                </template>
                                
                            </CDataTable>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>    
    </CRow>
  </div>
</template>

<script>
import { resolvePlugin } from '@babel/core';
import CTableWrapper from '../base/Table.vue'

export default {
  name: 'Tables',
  components: { CTableWrapper },
  data (){
    return {
      alertVisibility:false,
      alertType:'',
      alertMsg:'',
      tableHeader :['id',
                    {key:'patientName',label:'Patient Name'},
                    {key:'machine',label:'Machine Number'},
                    {key:'patient_care',label:'Patient Care'}],
      items:[]
    }
  },
  mounted () {
       this.$http.get('treatments')
        .then((response) => {
          console.log(response.data)
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
    },
    computed: {
        computedItems () {
        return items.map(item => {
            return { 
            ...item, 
            registeredTimestamp: item.patient.fri, 
            registeredDate: item.registered.date 
            }
        })
        },
        dateFilteredItems() {
        return this.computedItems.filter(item => {
            const date = item.registeredTimestamp
            return date >= this.startDate && date <= this.endDate
        })
        }
    }
    
}
</script>

