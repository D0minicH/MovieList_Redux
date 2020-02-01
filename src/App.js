import React, { useEffect } from 'react'
import _ from 'lodash'
import './css/style.css'

import Filter from './Filter'
import Movie from './Movie'

import { useSelector, useDispatch } from 'react-redux'

/**
 * Filtert die Liste abhängig vom Term. Der Term wird in allen Properties
 * des Movie-Objektes gesucht.
 * 
 * @param {array} movies Die Liste der Filme
 * @param {string} term Der String nachdem gefiltert werden soll
 * @return {array} Die gefilterte Liste der Filme
 */
const filter = (movies, term) => {
    let filterTerm = '^(?=.*' + _.trim(term).split(/\s+/).join(')(?=.*') + ').*$'
    let pattern = RegExp(filterTerm, 'i')

    return _.filter(movies, movie => 
            pattern.test(_.join([movie.year, movie.director, movie.title], ' ')))
}

const App = () => {
    const movies = useSelector(state => state.movies, _.isEqual)
    // Selektor für den filterTerm, damit wir den aktuellen Zustand mitbekommen
    const filterTerm = useSelector(state => state.filterTerm, _.isEqual)

    const dispatch = useDispatch()

    const data = () => {
        dispatch(
            async dispatch => {
                dispatch({ type: 'LOADING_MOVIES' })
                const response = await fetch('https://softwarelab.ch/api/public/v1/movies')
                const movies = await response.json()
                dispatch({ type: 'MOVIES_LOADED', movies: movies })
            }
        )
    }

    useEffect(data, []) // wie componentDidMount

    return <main>
        <Filter term={ filterTerm } />
        { _.map(filter(movies, filterTerm), movie => <Movie key={ movie.rank } data={ movie } />) }
    </main>
}

export default App
