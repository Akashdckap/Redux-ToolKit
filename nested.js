const redux = require('redux');
const createStore = redux.createStore;
const produce = require('immer').produce;//to short hand the reduce return value



const initialState = {
    name: "Akash",
    address: {
        street: "5467 38",
        city: "Chennai",
        state: "Tamilnadu"
    }
}

const STREET_UPDATED = 'STREET_UPDATED';

const updatedStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     },
            // }

        //immer
        return produce(state,(draft) =>{
            draft.address.street = action.payload
        })
        default: {
            return state
        }
    }
}

const store = createStore(reducer);
console.log('initial state----',store.getState());

const unSubscribe = store.subscribe(()=>{console.log("updated State---",store.getState())});
store.dispatch(updatedStreet('456 mini street'));
unSubscribe();
