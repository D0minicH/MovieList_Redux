import React from 'react'
import _ from 'lodash'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import App from './App'
import ReduxThunk from 'redux-thunk'


const REDUCERS = {
    'UPDATE_FILTER_TERM': (state, action) => ({ ...state, filterTerm: action.filterTerm }),
    'LOADING_MOVIES': (state, action) => ({ ...state, isLoading: true }),
    'MOVIES_LOADED': (state, action) => ({ ...state, isLoading: true, movies: action.movies })
}

const reducer = (state, action) => _.get(REDUCERS, action.type, _.identity)(state, action)

const initialState = {
    movies: [],
    filterTerm: '',
    isLoading: false
}

const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk) )

ReactDOM.render(
    <Provider store={ store }>
    <App />
    </Provider>,
    document.getElementById('app')
)