<template>
    <CForm>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Patient </strong><small>Information</small>
          </CCardHeader>
          <CCardBody>
            <CRow>
            <CCol sm="3">
                <CInput
                label="Time"
                />
            </CCol>
            <CCol sm="3">
                <CInput
                label="BP"
                />
            </CCol>
            <CCol sm="3">
                <CInput
                label="QB"
                />
            </CCol>
            <CCol sm="3">
            <CInput
              label="Birth Date"
              type="date"
            />
            </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Monitoring </strong><small>List</small>
          </CCardHeader>
          <CCardBody>
            <CRow>
                <CCol sm="12">
                            <CDataTable
                                :items="[{Time:'10:45',BP:'120/80',QB:'22',AP:'22',VP:'2',TMP:'2',UF:'2',VOL:'2'},
                                {Time:'10:45',BP:'120/80',QB:'22',AP:'22',VP:'2',TMP:'2',UF:'2',VOL:'2'}]"
                                :fields="['Time','BP','QB','AP','VP','TMP','VOL']"
                                striped
                                caption="Striped Table"
                                >
                            </CDataTable>
                        </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </CForm>
    
</template>
<script>
export default {
    name:'MonitoringSheet'
}
</script>