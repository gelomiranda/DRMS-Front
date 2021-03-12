<template>
  <div>
    <CRow>
      <CCol lg="1">
        <CInput label="BP" v-model="form.pre_hd_bp"/>    
      </CCol>
      <CCol lg="1">
        <CInput label="HR" v-model="form.pre_hd_hr"/>    
      </CCol>
      <CCol lg="1">
        <CInput label="RR" v-model="form.pre_hd_rr"/>    
      </CCol>
      <CCol lg="1">
        <CInput label="TEMP" v-model="form.pre_hd_temp"/>    
      </CCol>
      <CCol lg="2">
        <CSelect
            label="Pulse"
            :options="['Regular','Irregular']"
            placeholder="Please select"
        />
      </CCol>
      <CCol lg="2">
        <CSelect
            label="Lungs"
            :options="['Clear','Crackles','Hemoptysis','DOB','Wheezing']"
            placeholder="Please select"
            v-model="form.pre_hd_lungs"  
        />
      </CCol> 
      <CCol lg="2">
        <CSelect
                    label="EDEMA"
                    :options="['None','Facial','Pedal','Periorbital','Ascites']"
                    placeholder="Please select"
                />
      </CCol>  
      <CCol lg="2">
        <CSelect
                    label="Patient status"
                    :options="['Ambulatory','Wheelchair','Stretcher borne','Ambulatory w/ Assistance']"
                    placeholder="Please select"
                />    
      </CCol>  
      
      <CCol lg="2">
        <CSelect
                    label="Gastro"
                    :options="['Good Appetite','No Appetite','Fair Appetite','Melena','Hematochezia','Hematemesis']"
                    placeholder="Please select"
                />
      </CCol>
      
      <CCol lg="2">
        <CSelect
                    label="Skin Color"
                    :options="['Normal','Pale','Cyanotic']"
                    placeholder="Please select"
                />
      </CCol>
      <CCol lg="2">
        <CSelect
                    label="Turgor"
                    :options="['Good','Poor']"
                    placeholder="Please select"
                />
      </CCol>
      <CCol lg="2">
        <CSelect
                    label="Others"
                    :options="['Ecchymosis','Bruises']"
                    placeholder="Please select"
                />
      </CCol>
      <CCol lg="2">
        <CSelect
                    label="Neck Veins"
                    :options="['Flat','Slightly Disintended','Disintended']"
                    placeholder="Please select"
                />
      </CCol>
      <CCol lg="2">
        <CSelect
                    label="Genito Urinary"
                    :options="['Hematuria','Dysuria','Menstruation']"
                    placeholder="Please select"
                />
      </CCol>
      <CCol lg="3">
            <template v-for="(name, key) in ['Problems/Complaint']">
                <CRow class="form-group" :key="name">
                  <CCol tag="label" sm="6" class="col-form-label">
                    {{name}}
                  </CCol>
                  <CCol sm="6" class="form-inline">
                    <CInputCheckbox
                      v-for="(option, optionIndex) in ['None','LBM','Chest Pain','Cough','Abdmonila Pain','Orthopnea','Fever']"
                      :key="key + option"
                      :label="option"
                      :value="option"
                      :custom="key > 1"
                      :name="`Option 1${key}`"
                      :checked="optionIndex === key"
                      v-model="form.pre_hd_complaints"
                    />
                  </CCol>
                </CRow>
              </template>
        </CCol>
        <CCol lg="2">
        <CSelect
            label="Vascular Access"
            :options="['PC','DLC','AVF','AVG (L/R)']"
            placeholder="Please select"
        />
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'PreHD',
  data () {
    return {

      tabs: [
        'Calculator',
        'Shopping cart',
        'Charts'
      ],
      activeTab: 1
    }
  },
  props:{
      form:{}
  }
}
</script>
