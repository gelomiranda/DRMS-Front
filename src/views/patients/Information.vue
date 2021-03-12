<template>
    <CRow>
            <CCol sm="12">
                <CCard>
                <CCardHeader>
                    <strong>Patient </strong><small>Information</small>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm="3">
                            <label>Name</label><span class="font-weight-bold">: {{ patient.full_name }}</span>
                        </CCol>
                        <CCol sm="3">
                            <label>Philhealth No</label><span class="font-weight-bold">: {{ patient.philhealth }}</span>
                        </CCol>
                        <CCol sm="3">
                            <label>Birth Date</label><span class="font-weight-bold">: {{ patient.date_of_birth}} </span>
                        </CCol>
                        <CCol sm="3">
                            <label>Age</label><span class="font-weight-bold">: {{ patient.age }}</span>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="3">
                            <label>Gender</label><span class="font-weight-bold">: {{ patient.gender }}</span>
                        </CCol>
                        <CCol sm="3">
                            <label>Civil Status</label><span class="font-weight-bold">: {{ patient.civil_status }}</span>
                        </CCol>
                        <CCol sm="3">
                            <label>Contact No</label><span class="font-weight-bold">: {{ patient.contact_no }} </span>
                        </CCol>
                        <CCol sm="3">
                            <label>Blood Type</label><span class="font-weight-bold">: {{ patient.blood_type }} </span>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="12">
                            <label>Address</label><span class="font-weight-bold">: {{ patient.address }}</span>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="3">
                            <label>In case of emergency contact</label><span class="font-weight-bold">: {{ patient.person_to_contact }}</span>
                        </CCol>
                        <CCol sm="3">
                            <label>Contact No</label><span class="font-weight-bold">: {{ patient.person_to_contact_number }}</span>
                        </CCol>
                        <!--<CCol sm="3">
                            <label>Relationship</label><span class="font-weight-bold">:  {{ patient.person_to_contact_number }} </span>
                        </CCol>-->
                    </CRow>
                    <slot name="philhealth">{{ philHealth }}</slot>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
export default {
    name:'PatientInformation',
    props:['patient'],
    computed : {
        philHealth: function () {
            return 1;
        }
    }
}
</script>