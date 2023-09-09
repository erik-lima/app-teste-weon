import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        addressList: [],
        snackbarController : {
            show : false,
            text : '',
            color : 'success'
        }
    },
    getters: {
        getAddressList: state => state.addressList.sort((a, b) => b.createdAt - a.createdAt),
        getAddressByIndex: state => index => state.addressList[index],
        getAddressByZip: state => zip => state.addressList.find(e => {
            return e.zip == zip 
        }),
        getSnackbarData : state => state.snackbarController
    },
    mutations: {
        setAddressToList(state, item) {
            state.addressList.push(item);
        },
        updateAddressInList(state, item) {
            const index = parseInt(item.index);
            delete item.index;
            Vue.set(state.addressList, index, item);
        },
        removeAddressFromList(state, index) {
            state.addressList.splice(index, 1);
        },
        setSnackbarData(state, snackbarData) {
            Vue.set(state.snackbarController, 'show', snackbarData.show);
            Vue.set(state.snackbarController, 'text', snackbarData.text);
            Vue.set(state.snackbarController, 'color', snackbarData.color);
            // state.snackbarData = snackbarData;
        }
    },
    actions: {
        storeAddress({ commit }, zipData) {
            commit('setAddressToList', zipData)
        },
        updateAddress({ commit }, zipData) {
            commit('updateAddressInList', zipData)
        },
        removeAddress({ commit }, index) {
            commit('removeAddressFromList', index)
        },
        changeSnackbarData({commit},snackbarData) {
            commit('setSnackbarData', snackbarData);
        }
    }
})
