<template>
    <v-app id="inspire" dark>
        <v-app-bar app color="transparent" flat>
            <v-container class="py-0 fill-height">
                <v-toolbar-title>
                    <v-img width="100" src="/images/logo.png"></v-img>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title class="hidden-md-and-down">{{ $t('titleRight') }}</v-toolbar-title>
            </v-container>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-snackbar :color="snackbarData.color" v-model="snackbarData.show" :timeout="3000">
            {{ snackbarData.text }}
        </v-snackbar>
    </v-app>
</template>
  
<script>

export default {
    name: 'App',
    computed: {
        // Controle de snackbar
        snackbarData() {
            return this.$store.getters.getSnackbarData
        }
    },
};
</script>
  