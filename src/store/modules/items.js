// initial state
const state = {
    includedInthePackage: [],
}
// initial getters
const getters = {
    allIncludedInthePackage: state => {
      return state.includedInthePackage;
    }
}

export default {
    state,
    getters
}