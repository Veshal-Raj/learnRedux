import redux from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';



const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequset = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequset())
        axios.get('https://jsonplaceholder.typicode.com/users/')
            .then((response) => {
                // response.data is the users
                const users = response.data.map((user) => user.id)
                dispatch(fetchUsersSucceeded(users))
            }).catch(error => {
                // error.message is the error message
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunk.default))

store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())
