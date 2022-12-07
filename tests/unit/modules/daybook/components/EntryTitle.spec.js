import { shallowMount } from "@vue/test-utils";
import EntryTitle from '@/modules/daybook/components/EntryTitle'
import { journalState } from '../../../mock-data/test-journal-state';

describe('Pruebas en el componente EntryTitle', () => { 

    const mockRouter = { push: jest.fn() }

    const wrapper = shallowMount(EntryTitle, {
        props: {
            entry: {
                ...journalState.entries[0]
            }
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })
  
    test('debe de hacer match con el snapshot', () => { 
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de redireccionar al hacer click en el entry-container', () => {
        wrapper.find('div').trigger('click');
        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: journalState.entries[0].id } });
    });

    test('Pruebas en las propiedades computadas', () => { 

        expect(wrapper.vm.day).toBe(6);
        expect(wrapper.vm.month).toBe('Diciembre');
        expect(wrapper.vm.yearDay).toBe('2022, Martes');
        expect(wrapper.vm.shortText).toBe(journalState.entries[0].text);

    });

});