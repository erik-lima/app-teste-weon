<template>
    <v-simple-table v-if="list.length > 0" fixed-header heigt="500">
        <thead>
            <tr>
                <th>{{ $t('zip') }}</th>
                <th>{{ $t('address') }}</th>
                <th>{{ $t('complement') }}</th>
                <th>{{ $t('location') }}</th>
                <th>{{ $t('city') }}</th>
                <th>{{ $t('state') }}</th>
                <th class="text-right">{{ $t('actions') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(i, index) in list" :key="`tr-${index}`">
                <td>{{ i.zip }}</td>
                <td>{{ i.address }}</td>
                <td>{{ i.complement || '--' }}</td>
                <td>{{ i.location }}</td>
                <td>{{ i.city }}</td>
                <td>{{ i.state }}</td>
                <td class="text-right">
                    <v-btn color="success" @click="$emit('setIndex', index)" small><v-icon small>mdi-pencil</v-icon></v-btn>
                    <v-btn color="error" @click="$emit('setIndexDelete', index)" small class="ml-2"><v-icon small>mdi-delete</v-icon></v-btn>
                </td>
            </tr>
        </tbody>
    </v-simple-table>

    <v-alert v-else color="#C8933A">
        <p>{{ $t('noItens') }}</p>
    </v-alert>
</template>

<script>
export default {
    name: "ListAddresses",
    data() {
        return {

        }
    },
    computed: {
        // Pega os dados dos endereços para serem mostrados na listagem
        list() {
            return this.$store.getters.getAddressList
        }
    }
}
</script>