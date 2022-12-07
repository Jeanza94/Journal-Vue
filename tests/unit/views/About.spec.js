import { shallowMount } from "@vue/test-utils";
import AboutView from '@/views/AboutView'

describe('Pruebas en el componente AboutView', () => { 

    test('debe hacer match con el snapshot', () => { 

        const wrapper = shallowMount(AboutView);
        expect( wrapper.html() ).toMatchSnapshot();

    });
    
});