import journalApi from "@/api/journalApi"


export const loadEntries = async ( { commit } ) => {
    try {
        const { data } = await journalApi.get('/entries.json');
        const idArr = Object.keys(data);
        const entries = idArr.map(id => {
            return {
                id,
                ...data[id]
            }
        });
        
        commit('setEntries', entries);
    } catch (error) {
        commit('setEntries', [])
    }
    
}

export const updateEntry = async ({ commit }, entry = {}) => {
    const { id, ...rest } = entry;
    const { data } = await journalApi.put(`/entries/${ id }.json`, {...rest})
    
    if (!data) return;

    data.id = id;
    commit('updateEntry', data);
    return data;

}

export const createEntry = async ({ commit }, entry = {}) => {
    if ( entry.text.trim().length === 0 ) {
        console.log(entry.text)
        return console.log('Escribe algo en el texto')
    }
    const { data } = await journalApi.post(`/entries.json`, entry );

    if (!data) {
        return console.log('No se pudo crear en firebase')
    }

    entry.id = data.name;

    commit('addEntry', entry)
    return entry;
}

export const deleteEntry = async({ commit }, id = '') => {
    try {
        await journalApi.delete(`/entries/${id}.json`)
        commit('deleteEntry', id)
    } catch (error) {   
        console.log(error);
    }

}