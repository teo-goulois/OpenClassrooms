import React from 'react'
import '../styles/home.scss'
import { Link } from 'react-router-dom'
import apartments from '../lib/apartments.json'
import MaxContainer from '../components/MaxContainer'

const Home = () => {
  return (
    <MaxContainer>
      <div className="home-container">
        <div className="bg-img">
          <div className="background-filter" />
          <h1>
            Chez vous,
            <br /> partout et ailleurs
          </h1>
        </div>

        <div className="apartments-wrapper">
          {apartments.map((apartment) => {
            return (
              <Link
                key={apartment.id}
                to={`/apartment/${apartment.id}`}
                className="card_apartment"
              >
                <img src={apartment.cover} alt={apartment.title} />
                <div className="apartment_filter" />
                <p>{`${apartment.title}`}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </MaxContainer>
  )
}

export default Home
