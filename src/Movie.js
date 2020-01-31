import React from 'react'

const Movie = ({ data }) => <section>
    <span>{ data.rank }.</span>
    <span>{ data.year }</span>
    <span>{ data.title }</span>
    <span>{ data.director }</span>
</section>

export default Movie