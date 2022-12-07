import { shallowMount } from "@vue/test-utils";
import HomeView from '@/views/HomeView'

describe('Pruebas en el componente HomeView', () => { 

    test('Hacer click en un boton debe de redireccionar a no-entry', () => { 

        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(HomeView, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        });

        wrapper.find('button').trigger('click');

        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'});
        
    });

});