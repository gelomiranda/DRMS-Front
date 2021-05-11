<template>
    <div>
        <CRow>
            <CCol sm="12">
                <Alert/>
            </CCol>
        </CRow>
        <CCard>
            <CCardHeader>
                <strong> Item </strong><small> history</small>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="12">
                        <h4>Test Description</h4>
                        <hr/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <ul class="timeline">
                            <li v-for="item in items" :key="item.id">
                                <a target="_blank" href="https://www.totoprayogo.com/#">{{ item.activity }}</a>
                                <a href="#" class="float-right">{{ item.created_date_formatted }}</a>
                                <p>Created by: Administrator</p>
                            </li>
                        </ul>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex' 
export default {
   data(){
       return {
           items:[]
       }
   },
   created() {
        this.$http.get('item/history/' + this.$route.params.id)
        .then((response) => {
          this.items = response.data;
        }).catch((error)=> {
            console.log(error)
        })
   }

}
</script>

<style scoped>
ul.timeline {
    list-style-type: none;
    position: relative;
}
ul.timeline:before {
    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
    z-index: 400;
}
ul.timeline > li {
    margin: 20px 0;
    padding-left: 20px;
}
ul.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
</style>