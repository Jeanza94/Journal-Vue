import { shallowMount } from "@vue/test-utils";
import FabButton from '@/modules/daybook/components/FabButton'

describe('Pruebas en el componente FabButton', () => { 

    test('La propiedad por defecto de icon sea fa-plus', () => { 

        const wrapper = shallowMount(FabButton);
        
        expect(wrapper.find('i').classes().includes('fa-plus')).toBeTruthy();
        
    });

    test('La propiedad icon sea pasada al componente', () => { 

        const wrapper = shallowMount(FabButton, {
            props: {
                icon: 'hola-mundo'
            }
        });
        
        expect(wrapper.find('i').classes().includes('hola-mundo')).toBeTruthy();
        
    });

    test('Al hacer click en el boton debe emitir la propiedad on:click', () => { 

        const wrapper = shallowMount(FabButton);
        
        wrapper.find('button').trigger('click');
        
        expect(wrapper.emitted('on:click')).toBeTruthy();

    });

});