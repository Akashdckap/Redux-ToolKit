const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions

// console.log('initalStat--------',store.getState());
const unSubscribe = store.subscribe(()=>{console.log("updatedState--------",store.getState())})

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());

store.dispatch(cakeActions.reStocked(3));
unSubscribe()