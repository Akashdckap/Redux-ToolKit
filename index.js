const redux = require('redux');
// import { redux } from 'redux';
// import { createStore } from 'redux';
const createStore = redux.createStore
// import { createStore } from "redux";
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()

// console.log("from index.js")
// #Action
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICE_CREAM_ORDER = 'ICE_CREAM_ORDE';
const REICE_CREAM_STOCKED = 'REICE_CREAM_STOCKED'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}
// console.log("-------------",orderCake().quantity)

function reorderCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function iceCreamOrder(qty = 1) {
    return {
        type: ICE_CREAM_ORDER,
        payload: qty
    }
}
function reOrderIceCream(qty = 1) {
    return {
        type: REICE_CREAM_STOCKED,
        payload: qty
    }
}
// #Reducer
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 10,
// }

const initialCakeState = {
    numOfCakes: 10
}
const initialIcecreamState = {
    numOfIceCreams: 10
}

const cakeReducer = (state = initialCakeState, action = orderCake() ) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}
console.log("hello---------",cakeReducer())


const iceCreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDER:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case REICE_CREAM_STOCKED:
            return {
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}


//Reducer can be pass only one so now we are going to use combineReducers 
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer,
});

const store = createStore(rootReducer,applyMiddleWare(logger));
console.log("InitialState", store.getState());

const unSubscribe = store.subscribe(() => {});

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(reorderCake(3));

const actions = bindActionCreators({ orderCake, reorderCake, iceCreamOrder, reOrderIceCream }, store.dispatch)
// actions.orderCake();
// actions.orderCake();
// actions.orderCake();
// actions.reorderCake(3);

actions.iceCreamOrder();
actions.iceCreamOrder();
actions.iceCreamOrder();
actions.reOrderIceCream(3);

unSubscribe();
