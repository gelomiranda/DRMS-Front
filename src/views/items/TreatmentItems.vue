<template>
    <div>            
        <CRow>
            <CCol sm="12">
                <CCard>
                    <CCardHeader>
                        <strong>Treatment Item </strong><small>Information</small>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                <CDataTable
                                    :items="this.$store.state.items.includedInthePackage"
                                    :fields="fields"
                                    striped
                                    caption="List of items"
                                    footer
                                    >
                                    <template #Description="{item}">
                                        <td style="width:  30%" >  
                                            <p :class="{'discounted-text' : usePhilHealth && item.covered_by_philhealth == 1}">{{ item.description }}</p>
                                        </td>
                                    </template>
                                    <template #Quantity="{item}">
                                        <td style="width:  7%" class="text-md-center">  
                                            <CInput 
                                                    v-model="item.billing_quanity" 
                                                     class="centered-input form-control-sm" 
                                                    :disabled="item.item_type == 'Not Moving' || item.item_type == 'Discount'"
                                                    />
                                            <!--<CInput v-model="item.billing_quanity" value="1" v-on:change="test()"  class="centered-input form-control-sm" v-if="item.item_type != 'Not Moving' || item.item_type != 'Discount'"/>-->
                                        </td>
                                    </template>
                                    <template #Total="{item}">
                                        <td style="width:  7%"> 
                                            <p :class="{'discounted-text' : usePhilHealth && item.covered_by_philhealth == 1}">{{ item.price * item.billing_quanity }}</p>
                                        </td>
                                    </template>
                                    <template #Action="{item}">
                                        <td style="width:  7%" v-on:click="remove(item.description)"> 
                                            Delete
                                        </td>
                                    </template>
                                </CDataTable>
                                <CRow>
                                    <CCol sm="12">
                                        <CButton color="primary" @click="showModal()" class="float-right">Add Item</CButton>
                                    </CCol>
                                </CRow>
                                <div class="text-right">
                                    <br>
                                    <hr>
                                    <p class="text-success">Total : {{ getTotal }}</p>
                                    <p class="text-success">Discount : {{ getDiscount }}</p>
                                    <hr>
                                    <p class="text-success"> Grand Total: {{ getTotal -  getDiscount }}</p>
                                </div>
                            </CCol> 
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CModal
            title="Item List"
            color="primary"
            :show.sync="warningModal"
            >
            <select v-model="selected" class="form-control">
                <option v-for="item in items" 
                        :value="{ id: item.id, 
                                description: item.description,
                                price:item.price 
                                }" 
                    :key="item.id">{{ item.description }}</option>
            </select>

            <template #footer>
                <CButton type="button" size="sm" color="primary" :block="true" @click.prevent="addItem()">
                    <CIcon name="cil-check-circle"/> Add
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
export default {
    name:'TreatmentItems',
    data() {
        return {
            items:[],
            itemIncludedInPackage :[],
            warningModal: false,
            fields:[
                    'Description',
                    'Quantity',
                    {key:'price',label:'Price'},
                    'Total',
                    'Action'],
            selected:[],
            discountedText : 'discounted-text'
        }
    },
    props:{
        usePhilHealth: false
    },
    created () {
        this.$http.get('items')
        .then((response) => {
            this.items = response.data;
            this.$store.state.items.includedInthePackage = this.items.filter(itemIncludedInPackage => itemIncludedInPackage.include_in_package == 'Yes');
        });
    },

    computed:{
         getTotal(){
          var total = 0;
          this.$store.state.items.includedInthePackage.forEach(function(item,index){
              if(item.item_type != 'Discount'){
                total += item.price * item.billing_quanity;
              }
          });
          this.total = total;
          return this.total;
        },
        getDiscount(){
            var itemCoveredByPhilHealth = 0;
            var totalDiscount = 0;
            var discount = 0;
            var discounted = false;
            this.$store.state.items.includedInthePackage.forEach(function(item,index){
                if(item.covered_by_philhealth == 1){
                    itemCoveredByPhilHealth += item.price;
                }
                if(item.item_type == 'Discount'){
                    discount += item.price;
                    discounted = true;
                }
            });
            //this.totalDiscount = itemCoveredByPhilHealth;
            return (discounted) ? itemCoveredByPhilHealth : 0;
        }
    },
    methods: {
        showModal(){
          this.warningModal = true;
        },
       
        remove(description){
            this.$store.state.items.includedInthePackage = this.$store.state.items.includedInthePackage.filter(itemIncludedInPackage => itemIncludedInPackage.description != description);
        },
        addItem(){
            const found = this.$store.state.items.includedInthePackage.some(el => el.description === this.selected.description);
            if(!found){
                this.$store.state.items.includedInthePackage.push({
                    description:this.selected.description,
                    price:this.selected.price,
                    billing_quanity:1,
                    item_type:'Moving'
                });
            }
            else{
                alert('Item already exist!');
            }
        }
    }
}
</script>

<style scoped>

.discounted-text{
    text-decoration: line-through;
}
</style>