import React from 'react'
import '../styles/home.scss'
import { Link } from 'react-router-dom'
import apartments from '../lib/apartments.json'

const Home = () => {
  return (
    <div className="home-container">
      <div className="bg-img">
        <div className="background-filter" />
        <h2>
          Chez vous,
          <br /> partout et ailleurs
        </h2>
      </div>

      <div className="apartments-wrapper">
        {apartments.map((apartment) => {
          return (
            <Link
              key={apartment.id}
              to={`/apartment/${apartment.id}`}
              className="apartment"
            >
              <img src={apartment.cover} alt={apartment.title} />
              <div className="apartment_filter" />
              <h3>{`${apartment.title}`}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home
