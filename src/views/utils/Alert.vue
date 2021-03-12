<template>
    <CAlert :show="this.$store.state.alertVisibility" :color="this.$store.state.alertType">{{this.$store.state.alertMsg}}</CAlert>
</template>

<script>

export default {
    name:'Alert'
}
</script>