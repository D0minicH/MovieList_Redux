import React, { useState, useEffect } from 'react'
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

    /** wurde in Filter-Klasse verschoben, um den call zu verhindern
     * const dispatch = useDispatch()
     * // Im Callback die Action erstellen und mit dem Dispatcher zum Store senden
     * const updateFilterTerm = term => dispatch({ type: 'UPDATE_FILTER_TERM', filterTerm: term })
     */

    return <main>
        <Filter term={ filterTerm } updateFilterTerm={ updateFilterTerm } />
        { _.map(filter(movies, filterTerm), movie => <Movie key={ movie.rank } data={ movie } />) }
    </main>
}

export default App
