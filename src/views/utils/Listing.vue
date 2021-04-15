<template>
  <div>
    <CRow>
       <CCol sm="12">
          <Alert></Alert>
        </CCol>
    </CRow>
    <CCard>
    <CCardHeader>
        <strong> Patient </strong><small> list</small>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol lg="12">
          <CDataTable
            :items="items"
            :fields="fields"
            striped
            :column-filter='{external:false,lazy: true }'
            sorter
            clickableRows>
              <template #History="{item}">
                <td style="width:  7%">
                    <CLink :to="{ name: 'ItemHistory', params: { id: item.id }}">
                      <CIcon name="cilHistory" class="mx-2"/>
                    </CLink>
                </td>
              </template>
              <template #Action="{item}" :filter="false">
                  <td style="width:  7%">
                      <CLink :to="{ name: updateRoute, params: { id: item.id }}">
                        <CIcon name="cilPencil" class="mx-2"/>
                      </CLink>
                      <DeleteRecord 
                        :id="item.id" 
                        :recordName="item.fullName"
                        :url="url"
                        @update-list="updateItems"></DeleteRecord>
                  </td>
              </template>
            </CDataTable>
          </CCol>
      </CRow>
    </CCardBody>
    </CCard>
    <div id="pdf"></div>
  </div>
  
</template>

<script>
import CTableWrapper from '../base/Table.vue'
import DeleteRecord from '../utils/DeleteRecord.vue'
import Alert from '../utils/Alert'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';


export default {
  name: 'Tables',
  components: { CTableWrapper,DeleteRecord,Alert},
  data (){
    return {
      alertVisibility:false,
      alertType:'',
      alertMsg:'',
      collapseDuration: 0
    }
  },
  props:{
      fields:Array,
      updateRoute:'',
      items:Array,
      url:''
  },
  methods: {
      updateItems(id,alertMsg,alertType,alertVisibility) {
        this.alertMsg = alertMsg;
        this.alertType = alertType;
        this.alertVisibility = alertVisibility;
        this.items= this.items.filter(item=>item.id != id);
        
      },
      generatePdf(){
        //   html2canvas(document.querySelector('#html2Pdf'), {quality: 4,
        //         scale: 5,}).then(canvas => {
        //   document.getElementById('pdf').appendChild(canvas)
       

        //   let img = canvas.toDataURL('image/jpeg')
        //   let pdf = new jsPDF('portrait', 'mm', 'a4')

             
        // var width = pdf.internal.pageSize.getWidth();
        // var height = pdf.internal.pageSize.getHeight();

        //   pdf.addImage(img, 'JPEG', 5, 5, width, height)
        //   pdf.save('relatorio-remoto.pdf')
        //   document.getElementById('pdf').innerHTML = ''
        // })

        // html2canvas(document.querySelector('#html2Pdf'))
        // .then((canvas) => {
        //   const imgData = canvas.toDataURL('image/png');
        //   const pdf = new jsPDF({
        //     orientation: 'landscape',
        //   });
        //   const imgProps= pdf.getImageProperties(imgData);
        //   const pdfWidth = pdf.internal.pageSize.getWidth();
        //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        //   pdf.save('download.pdf');
        // });
        let doc = new jsPDF('portrait', 'mm', 'a4')
        
        doc.addPage()
        doc.addPage()
        
        doc.text('I am on page 3', 20, 10)
        doc.text('I am on page 3', 20, 20)
        doc.lines([[2,2],[-2,2],[1,1,2,2,3,3],[2,1]], 212,110, 10) 
        doc.setPage(1)

        doc.text('I am on page 1', 10, 10)
        doc.save('download.pdf');
      }
    }
}
</script>

