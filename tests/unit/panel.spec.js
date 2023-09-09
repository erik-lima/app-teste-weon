import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'

import Panel from "@/views/layouts/Panel.vue"
import Index from "@/views/pages/Addresses/Index.vue"
import List from "@/views/components/Addresses/List.vue"
import Form from "@/views/components/Addresses/Form.vue"

const localVue = createLocalVue()

let vuetify;

beforeEach(() => {
    vuetify = new Vuetify();
});

describe("App", () => {
    let wrapper = mount(App, {
        localVue,
        vuetify,
        router,
        store,
        VueI18n,
        mocks: {
            $t: () => { }
        }
    })

    it('renders app correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });
})


describe("Panel", () => {
    let wrapper = shallowMount(Panel, {
        localVue,
        vuetify,
        router,
        store,
        VueI18n,
        mocks: {
            $t: () => { }
        }
    })

    it('renders panel correctly', () => {
        expect(wrapper.exists()).toBe(true);

        // expect(wrapper.element).toContain('v-snackbar');
    });
})

describe('Addresses', () => {
    let wrapper = shallowMount(Index, {
        localVue,
        vuetify,
        router,
        store,
        VueI18n,
        mocks: {
            $t: () => { }
        }
    })

    it('renders index correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Fail to open', async () => {
        expect(wrapper.vm.openAddressModal).toBe(false);
        wrapper.vm.zip = '837030';
        await wrapper.find('v-btn').trigger('click');
        expect(wrapper.vm.openAddressModal).toBe(false);
    });

    it('Open form', async () => {
        wrapper.vm.zip = '83703090';
        await wrapper.find('v-btn').trigger('click');
        expect(wrapper.vm.openAddressModal).toBe(true);
    });

});


describe('List', () => {
    let wrapper = shallowMount(List, {
        localVue,
        vuetify,
        router,
        store,
        VueI18n,
        mocks: {
            $t: () => { }
        }
    })

    it('renders list correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Empty data', async () => {
        const table = wrapper.find('v-alert');
        expect(table.exists()).toBe(true);
    });

    it('Find table', async () => {
        const wrapper2 = mount(Form, {
            localVue,
            vuetify,
            router,
            store,
            VueI18n,
            mocks: {
                $t: () => { }
            }
        });
        wrapper2.vm.open = true;
        wrapper2.vm.addressData = {
            zip : '83703090'
        }
        wrapper2.vm.confirmAddAddress();

        // Re-renderizado para pegar o valor do computed
        wrapper = shallowMount(List, {
            localVue,
            vuetify,
            router,
            store,
            VueI18n,
            mocks: {
                $t: () => { }
            }
        })

        expect(wrapper.vm.list.length).toBe(1);

        const table = wrapper.find('v-simple-table');
        expect(table.exists()).toBe(true);
    });
});

describe('Form', () => {
    let wrapper = shallowMount(Form, {
        localVue,
        vuetify,
        router,
        store,
        VueI18n,
        mocks: {
            $t: () => { }
        }
    })

    it('renders list correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('Confirm', async () => {
        wrapper.vm.loadZipCode('83703090');
        wrapper.vm.confirmAddAddress();

        expect(wrapper.vm.open).toBe(false);
    });
});