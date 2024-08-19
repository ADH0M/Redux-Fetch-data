const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

// ------------------- Actions ----------------------
const PENDING = 'pending';
const FULLFILLED = 'fulfilled';
const REJECTED = 'rejected';

function FETCH_PENDING() {
    return {
        type: PENDING,
    };
}

function FETCH_FULLFILLED(data) {
    return {
        type: FULLFILLED,
        payload: data,
    };
}

function FETCH_REJECTED(error) {
    return {
        type: REJECTED,
        payload: error,
    };
}

const initialState = {
    loading: true,
    data: [],
    error: '',
};

const FETCH_API = (state = initialState, action) => {
    switch (action.type) {
        case PENDING:
            return {
                ...state,
                loading: true,
            };
        case FULLFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case REJECTED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(FETCH_API, applyMiddleware(thunkMiddleware));

const actionCreator = () => {
    return function (dispatch) {
        dispatch(FETCH_PENDING());
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => {
                const user = response.data;
                dispatch(FETCH_FULLFILLED(user));
            })
            .catch((error) => {
                dispatch(FETCH_REJECTED(error.message));
            });
    };
};

store.subscribe(() => {
    console.log('The action is', store.getState());
});

store.dispatch(actionCreator());
