<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" class="text-center" offset-md="4">
                <v-text-field @keyup.enter="openAddressDetails" outlined rounded v-model="zip" clearable></v-text-field>
                <v-btn color="primary" @click="openAddressDetails">{{ $t('checkZip') }}</v-btn>
            </v-col>
            <v-col cols="2">
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="mt-10">
                <list-addresses @setIndex="setIndexToEdit" @setIndexDelete="setIndexToDelete"></list-addresses>
            </v-col>
        </v-row>

        <form-address :addressEditData="addressToEdit" :zip="zip" :is-open.sync="openAddressModal"></form-address>

        <delete-address :addressDeleteData="addressToDelete" :is-open.sync="openDeleteAddressModal"></delete-address>
    </v-container>
</template>

<script>
import ListAddresses from '@/views/components/Addresses/List.vue';
import FormAddress from '@/views/components/Addresses/Form.vue';
import DeleteAddress from '@/views/components/Addresses/Delete.vue';
import { showSnackbarMessage, isValidZipCode } from '@/utils/helpers'

export default {
    name: 'IndexAdresses',
    components: {
        ListAddresses,
        FormAddress,
        DeleteAddress
    },
    data: () => ({
        openDeleteAddressModal: false,
        openAddressModal: false,
        zip: '',
        addressToEdit: null,
        addressToDelete: null
    }),
    methods: {
        // Busca registro para edição
        setIndexToEdit(index) {
            const addresData = this.$store.getters.getAddressByIndex(index);
            addresData.index = index.toString();
            this.addressToEdit = addresData;
            this.openAddressModal = true;
        },
        // Busca registro para remover o registro
        setIndexToDelete(index) {
            const addresData = this.$store.getters.getAddressByIndex(index);
            addresData.index = index.toString();
            this.addressToDelete = addresData;
            this.openDeleteAddressModal = true;
        },
        // Abre a modal depois de inserir o CEP no campo
        openAddressDetails() {
            if (this.zip != '' && isValidZipCode(this.zip)) {
                this.addressToEdit = {
                    zip: this.zip
                };
                this.openAddressModal = true;
            } else {
                showSnackbarMessage(this.$t('invalidZip'), "error");
            }
        }
    }
};

</script>