<template>
    <div>
        <br>
        <CForm>
        <CRow>
            <CCol lg="1">
                <CInput label="Duration" v-model="form.duration"/>
            </CCol>
            <CCol lg="3">
                <CInput label="Peroxide Residual Test" v-model="form.peroxide_residual_strip_test" />
            </CCol>
            <CCol lg="2">
                <CInput label="Dry Weight(kg)" v-model="form.dry_weight" />
            </CCol>
            <CCol lg="2">
                <CInput label="Pre HD Weight(kg)" v-model="form.pre_hd_weight"/>
            </CCol>
            <CCol lg="2">
                <CInput label="Previous Post HD Weight(kg)" />
            </CCol>
        </CRow>
        <CRow>
            
            <CCol lg="3">
                <CSelect
                        label="Hepatitis Status"
                        :options="['Clean','Hepatitis B','Hepatitis C']"
                        placeholder="Please select"
                        :value.sync="form.hepatitis_status"
                    />
            </CCol>
            <CCol lg="3">
                <CInput label="UF Goal" v-model="form.uf_goal"/>
            </CCol>
            <CCol lg="3">
                <CSelect
                        label="Dialyzer"
                        :options="['Conventional','High Efficiency','High Flux']"
                        placeholder="Please select"
                        :value.sync="form.dialyzer"
                    />
            </CCol>
            <CCol lg="3">
                <CSelect
                        label="Anticoagulant"
                        :options="options"
                        placeholder="Please select"
                        :value.sync="form.anticoagulant"
                    />
            </CCol>
            </CRow>
            <CRow>
                <CCol lg="3">
                    <input type="checkbox" id="dialysis_bath" v-model="form.dialysis_bath">
                    <label for="dialysis_bath">Dialysis Bath</label>
                    <br>
                    <input type="checkbox" id="dialysis_acid" v-model="form.dialysis_acid">
                    <label for="dialysis_acid">Dialysis Acid</label>
                </CCol>
                <CCol lg="2">
                    <CSelect
                        label="KCL/Meqs"
                        :options="['0','10','20','30','40']"
                        placeholder="Please select"
                        :value.sync="form.meqs"
                    />
                </CCol>
                <CCol lg="2">
                    <CInput label="QB" v-model="form.QB"/>
                </CCol>
                <CCol lg="2">
                    <CInput label="QD" v-model="form.QD"/>
                </CCol>
        </CRow>
        </CForm>
    </div>
</template>

<script>
export default {
  name: 'TreatmentHeader',
  data () {
    return {
        checkboxNames: ['Dialysis Bath','Dialysis Acid'],
        options: ['Routine Heparin(2-1-1)', 'Low Dose Heparin (1.5-.5)', 'PNSS Flushing'],
        nephrologist:[]
    }
  },
  props:{
      form:{}
  },
  methods:{
      test(){
          alert(this.nephrologist);
      }
  }
}
</script>