import React from 'react'
import _ from 'lodash'

/**
 * Die Filter Komponente.
 * Hinweis. Das hier verwendete Form ist eine controlled
 * Component (https://reactjs.org/docs/forms.html).
 * 
 * @param {string} filterTerm Der aktuelle Filter-Term
 * @return {jsx} Das zu rendernde Element
 */

const Filter = ({ filterTerm }) => {
    const dispatch = useDispatch()

    const onChange = event => 
        dispatch({ type: 'UPDATE_FILTER_TERM', filterTerm: event.target.value })

    return <form>
        <input type='text' placeholder='Liste Filtern mit...' value={ filterTerm } onChange={ onChange } />
    </form>
}
   

export default Filter