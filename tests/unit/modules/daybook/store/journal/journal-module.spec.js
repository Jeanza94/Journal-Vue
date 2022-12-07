import { createStore } from "vuex";
import journal from '@/modules/daybook/store/journal';
import { journalState } from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
    modules: {
        journal:{
            ...journal,
            state: {...initialState}
        }
    }
})


describe('vuex-pruebas en el journal module', () => { 

    //basicas
    test('este es el estado inicial, debe de tener este state', () => { 
        const store = createVuexStore(journalState);
        const { isLoading, entries} = store.state.journal;

        expect(isLoading).toBeFalsy();
        expect(entries).toEqual(journalState.entries)
    });

    //mutations
    test('mutation: setEntries', () => { 
        const store = createVuexStore({
            isLoading: true,
            entries: []
        });

        store.commit('journal/setEntries', journalState.entries);

        const { isLoading, entries } = store.state.journal;
        
        expect(isLoading).toBeFalsy();
        expect(entries).toEqual(journalState.entries)

    });

    test('mutation: updateEntry', () => { 

        const store = createVuexStore(journalState);
        const entryUpdate = {
            id: '-NIbpKlI0ZuK_IQpaJ1K',
            text: 'mira lo que se avecina',
            date: 1670336817817
        }

        store.commit('journal/updateEntry', entryUpdate);

        const { entries } = store.state.journal
        const entry = entries.find(entry => entry.id === entryUpdate.id);

        expect(entries.length).toBe(2);
        expect(entry).toEqual(entryUpdate)
    });

    test('mutation: addEntry deleteEntry', () => { 

        const store = createVuexStore(journalState);
        const newEntry = {
            id: 'ABC-123',
            text: 'hola mundo',
            date: 167981749871
        }

        store.commit('journal/addEntry', newEntry);
        
        const { entries } = store.state.journal;
        const entry = entries.find(entry => entry.id === 'ABC-123');

        expect(entries.length).toBe(3);
        expect(entry).toBeTruthy();

        store.commit('journal/deleteEntry', 'ABC-123');
        
        const { entries: entriesAfterDelete } = store.state.journal;
        const deleteEntry = entriesAfterDelete.find(entry => entry.id === 'ABC-123')
        
        expect(entriesAfterDelete.length).toBe(2);
        expect(deleteEntry).toBeFalsy();
        
    });

    //getters
    test('getters: getEntriesByTerm, getEntryById', () => { 

        const store = createVuexStore(journalState);
        const [entry1, entry2] = journalState.entries
        //getEntriesByTerm
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('subir').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('subir')).toEqual([entry1 ])

        //getEntrYByID
        expect(store.getters['journal/getEntryById']('-NIbpKlI0ZuK_IQpaJ1K')).toEqual(entry1)
    });

    //Actions
    test('actions: loadEntries', async() => { 
        const store = createVuexStore({isLoading: true, entries: []});

        await store.dispatch('journal/loadEntries');

        expect(store.state.journal.entries.length).toBe(2);

    });

    test('actions: udpateEntry', async () => {
        const store = createVuexStore(journalState);
        const updatedEntry = {
            id: '-NIbpKlI0ZuK_IQpaJ1K',
            date: 1670336817815,
            text: 'estamos testiando el updateEntry'
        }

        await store.dispatch('journal/updateEntry', updatedEntry);

        expect(store.state.journal.entries.length).toBe(2);
        expect(store.state.journal.entries.find(e =>e.id === updatedEntry.id)).toEqual(updatedEntry);

    });

    test('actions: createEntry, deleteEntry', async() => { 

        const store = createVuexStore(journalState);
        const newEntry = {
            date: 1670336813333,
            text: 'Creamos una entrada desde el testing'
        };

        const entry = await store.dispatch('journal/createEntry', newEntry);

        expect(store.state.journal.entries.length).toBe(3);
        expect(store.state.journal.entries.find(e => e.id === entry.id)).toEqual(entry)

        await store.dispatch('journal/deleteEntry', entry.id);
        expect(store.state.journal.entries.length).toBe(2);
        expect(store.state.journal.entries.find(e => e.id === entry.id)).toBeFalsy()

        

    });

});