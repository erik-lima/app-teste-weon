<template>
    <v-dialog v-model="open" width="500" persistent>
        <v-card v-if="addressDeleteData">
            <v-card-text class="text-center pt-5">
                <p class="text-h6">{{ $t('wishDelete') }} {{ addressDeleteData.zip }}?</p>
            </v-card-text>
            <v-card-text class="text-center">
                <v-btn class="mx-1" @click="open = !open" color="error">{{ $t('cancel') }}</v-btn>
                <v-btn class="mx-1" @click="confirm" text>{{ $t('delete') }}</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { showSnackbarMessage } from '@/utils/helpers'
export default {
    name: 'DeleteAddress',
    props: {
        "is-open": Boolean,
        addressDeleteData: Object
    },
    computed: {
        // Forma manuaç para evitar o erro de mutação de prop
        open: {
            get: function () {
                return this.isOpen
            },
            set: function (newValue) {
                this.$emit('update:isOpen', newValue)
            }
        }
    },
    methods: {
        // Remove o registro da lista
        confirm() {
            showSnackbarMessage(this.$t('successDeleteItem'), "success");
            this.$store.dispatch('removeAddress', this.addressDeleteData.index)
            this.open = false;
        }
    }
}

</script>