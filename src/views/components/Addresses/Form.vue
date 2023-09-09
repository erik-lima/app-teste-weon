<template>
    <v-dialog v-model="open" scrollable persistent width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                <span v-if="addressData.index !== undefined && addressData.index !== null">{{ $t('updateAddress') }}</span>
                <span v-else>{{ $t('newAddress') }}</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="open = !open"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-form :disabled="loading">
                <v-card-text>
                    <v-row class="mt-5">
                        <v-col cols=".">
                            <v-text-field @keyup="changeZipValue" v-model="addressData.zip" outlined hide-details
                                :label="$t('zip')"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field readonly v-model="addressData.address" :label="$t('address')" outlined
                                hide-details> </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field readonly v-model="addressData.complement" :label="$t('complement')" outlined
                                hide-details></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field readonly v-model="addressData.location" :label="$t('location')" outlined
                                hide-details></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field readonly v-model="addressData.city" :label="$t('city')" outlined
                                hide-details></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field readonly v-model="addressData.state" :label="$t('state')" outlined
                                hide-details></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <span v-if="addressData.index !== undefined && addressData.index !== null"
                        v-text="`# ${addressData.index}`"></span>
                    <v-spacer></v-spacer>
                    <v-btn v-if="addressData.index !== undefined && addressData.index !== null" @click="updateAddAddress"
                        color="primary">{{ $t('update') }}</v-btn>
                    <v-btn v-else @click="confirmAddAddress" color="primary">{{ $t('confirm') }}</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>


<script>
import axios from '@/plugins/axios'
import { showSnackbarMessage, isValidZipCode } from '@/utils/helpers'

export default {
    name: "FormAddresses",
    props: {
        "is-open": Boolean,
        zip: String,
        addressEditData: Object
    },
    data() {
        return {
            loading: true,
            addressData: {
                zip: '',
                address: '',
                complement: '',
                location: '',
                city: '',
                state: ''
            }
        }
    },
    watch: {
        // Aguarda por atualizações dos dados do endereço
        addressEditData(newValue) {
            if (newValue) {
                this.setAddressValues(newValue);
                if (newValue.index === undefined) {
                    this.loadZipCode(newValue.zip)
                }
            }
        }
    },
    methods: {
        // Helper para adicionar as informações aos campos corretos
        setAddressValues(addressData) {
            this.addressData = {
                index: addressData && addressData.index ? addressData.index : null,
                zip: addressData ? addressData.cep || addressData.zip : '',
                address: addressData ? addressData.logradouro || addressData.address : '',
                complement: addressData ? addressData.complemento || addressData.complement : '',
                location: addressData ? addressData.bairro || addressData.location : '',
                city: addressData ? addressData.localidade || addressData.city : '',
                state: addressData ? addressData.uf || addressData.state : '',
            }
            if (addressData && addressData.createdAt) {
                this.addressData.createdAt = addressData.createdAt;
            }
        },
        // Faz a busca do CEP no viacep
        async loadZipCode(zipCode) {
            try {
                this.loading = true;
                const { data } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
                if (!data || data.erro) {
                    throw this.$t('invalidZip')
                }
                if (this.addressData.index) {
                    data.index = this.addressData.index;
                }
                if (this.addressData.createdAt) {
                    data.createdAt = this.addressData.createdAt;
                }

                this.setAddressValues(data);
            } catch (err) {
                this.setAddressValues(null);
                showSnackbarMessage(err.toString(), 'error')
            } finally {
                this.loading = false;
            }
        },
        // Confirma os dados do endereço e adiciona ao store
        confirmAddAddress() {
            if (isValidZipCode(this.addressData.zip)) {
                const findCep = this.$store.getters.getAddressByZip(this.addressData.zip);
                if (findCep) {
                    showSnackbarMessage(this.$t('alreadyRegisterip'), 'error')
                } else {
                    this.addressData.createdAt = new Date();
                    this.addressData.updatedAt = null;
                    this.$store.dispatch('storeAddress', this.addressData)
                    showSnackbarMessage(this.$t('registerItem'), 'success')
                    this.open = false;
                }
            } else {
                showSnackbarMessage(this.$t('invalidZip'), 'error')
            }

        },
        // Quando o usuário troca o valor do CEP, é esperado a quantidade de caracteres correta para disparar para o viacep
        changeZipValue() {
            const clearZip = this.addressData.zip.split('-').join('').split('.').join('');
            if (clearZip.length == '8') {
                this.loadZipCode(clearZip)
            }
        },
        // Grava as atualizações de CEP
        updateAddAddress() {
            this.addressData.updatedAt = new Date();
            this.$store.dispatch('updateAddress', this.addressData)
            showSnackbarMessage(this.$t('updatedItem'), 'success')
            this.open = false;
        }
    },
    computed: {
        // Controle manual para evitar o problema de mutar um prop apontado pelo lint
        open: {
            get: function () {
                return this.isOpen
            },
            set: function (newValue) {
                this.$emit('update:isOpen', newValue)
            }
        }
    }
}

</script>