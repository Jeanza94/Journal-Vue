
export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries];
    state.isLoading = false;
}

export const updateEntry = ( state, entryUpdated ) => {
    
    state.entries = state.entries.map(entry => {
        if ( entry.id === entryUpdated.id ) {
            return entryUpdated
        }
        return entry;
    });
    
    
}

export const addEntry = ( state, entry ) => {
    state.entries = [entry, ...state.entries];
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id)
}