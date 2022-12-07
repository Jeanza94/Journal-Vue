import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import EntryView from '@/modules/daybook/views/EntryView'
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    close: jest.fn(),
}))

const createVuexStore = ( initialState ) => {
    return createStore({
        modules:{
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })
}

describe('Pruebas en el componente EntryView', () => { 

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn();
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(EntryView, {

            props: {
                id: journalState.entries[0].id
            },

            global: {
                mocks: {
                    $router: mockRouter
                },

                plugins: [store]
            }
        })
    })

    test('debe de sacar al usuario porque el id no existe', () => { 

        const wrapper = shallowMount(EntryView, {
            
            props: {
                id:'Este id no es valido'
            },

            global: {
                mocks: {
                    $router: mockRouter
                },

                plugins: [ store ]
            }
        } )

        expect(mockRouter.push).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
        
        
    });
    
    test('debe de mostrar la entrada correctamente', () => { 
        expect(wrapper.html()).toMatchSnapshot();
        expect(mockRouter.push).not.toHaveBeenCalled();
        
    });

    test('debe de borrar la entrada y salida', (done) => { 
        jest.setTimeout(10000)
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))
        wrapper.find('.btn-danger').trigger('click');

        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Esta seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si estoy seguro'
        })

        setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalled();
            expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
            done()
        }, 1);
        


    });

});