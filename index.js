import redux from 'redux'
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return{
        type: CAKE_ORDERED,
        payload: 1
    } 
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
}

const initialCakeState = {
    numberOfCakes : 10,
}

const initialIcecreamState = {
    numberofIcecreams : 10
}

const cakeReducer = (state=initialCakeState, action)=> {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes -1
            }
        case CAKE_RESTOCKED: 
            return {
                ...state,
                  numberOfCakes: state.numberOfCakes + action.payload
            }
        default:
            return state
    }
}


const icecreamReducer = (state=initialIcecreamState, action)=> {
    switch(action.type){
        case ICECREAM_ORDERED: 
        return {
            ...state,
                numberofIcecreams: state.numberofIcecreams - action.payload
        }
        case ICECREAM_RESTOCKED: 
            return {
                ...state,
                    numberofIcecreams: state.numberofIcecreams + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake : cakeReducer,
    icecream : icecreamReducer
})

const store = createStore(rootReducer)
console.log('Initial state', store.getState())


const unsubscribe = store.subscribe(() => console.log('update state ',store.getState()))
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))
const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIcecream()
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcecream(3)


unsubscribe()
