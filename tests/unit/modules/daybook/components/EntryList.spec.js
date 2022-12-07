import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import EntryList from '@/modules/daybook/components/EntryList'
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Pruebas en el componente EntryList', () => { 

    //mock completo
    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: {
    //         isLoading: false,
    //         entries: journalState
    //     }
    // }
    // const store = createStore({
    //     modules: {
    //         journal: {...journalMockModule}
    //     }
    // })


    //usando el store que ya tenemos

    
    const store = createVuexStore(journalState);
    const mockRouter = {
        push: jest.fn()
    }

    //para que sepa de que tipo es
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },

                plugins: [store]
            }
        });

        jest.clearAllMocks();
    })

    test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => { 
        expect(wrapper.findAll('entry-title-stub').length).toBe(2);
        expect(wrapper.html()).toMatchSnapshot();

    });

    test('debe de llamar el getEntries by term y filtrar las entradas', async() => { 

        const input = wrapper.find('input')
        await input.setValue('subir')

        expect(wrapper.findAll('entry-title-stub').length).toBe(1);

    });

    test('el boton de nuevo debe de redireccionar a /new', () => { 

        const button = wrapper.find('button');
        button.trigger('click');

        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(mockRouter.push).toHaveBeenCalledWith({ name:'entry', params: { id: 'new' }});



    });

});