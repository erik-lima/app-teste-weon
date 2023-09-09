import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "panel" */ '../views/layouts/Panel.vue'),
        children : [
            {
                path: '',
                component: () => import(/* webpackChunkName: "panle.addresses" */ '../views/pages/Addresses/Index.vue'),
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
