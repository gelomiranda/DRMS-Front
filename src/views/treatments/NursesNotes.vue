<template>
    <CRow>
      <CCol sm="12">
            <CRow>
                <CCol sm="12">
                    <CInput
                    label="K t/v"
                    />
                </CCol>
            </CRow>
      </CCol>
      <CCol lg="12">
            <template v-for="(name, key) in ['Actions']">
                <CRow class="form-group" :key="name">
                  <CCol tag="label" sm="1" class="col-form-label">
                    {{name}}
                  </CCol>
                  <CCol sm="11" >
                    <CInputCheckbox
                      v-for="(option, optionIndex) in ['Weighted patient pre HD',
                                                        'Pre Vital Sign Monitored',
                                                        'Vascular access assessed for bruit and thrill / patency',
                                                        'Access site Disinfection done',
                                                        'Cannulate aseptically',
                                                        'Set UF to done','Monitored VS q1 hour',
                                                        'Monitored for Hemodualysis reaction and complication',
                                                        'Terminated asseptically',
                                                        'Post HD VS monitored',
                                                        'Erythropeletin Injection SC given',
                                                        'Weighted patiend post HD']"
                      :key="key + option"
                      :label="option"
                      :value="option"
                      :custom="key > 1"
                      :name="`Option 1${key}`"
                      :checked="optionIndex === key"
                    />
                  </CCol>
                </CRow>
              </template>
        </CCol>
        <CCol sm="6">
            <CTextarea
                label="Additional Notes"
                placeholder=""
                horizontal
                rows="12"
              />
        </CCol>
        <CCol sm="6">
            <CTextarea
                label="Doctors Note"
                placeholder=""
                horizontal
                rows="12"
              />
        </CCol>
    </CRow>   
</template>
<script>
export default {
    name:'NursesNotes'
}
</script>