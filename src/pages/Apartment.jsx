import React from 'react'
import '../styles/apartment.scss'

import { useParams, redirect  } from 'react-router-dom'
import { useApartment } from '../hooks/useApartment'
// Components
import Carousel from '../components/Carousel'
import Tag from '../components/Tag'
import Rating from '../components/Rating'
import UserCard from '../components/UserCard'
import Dropdown from '../components/Dropdown'
import MaxContainer from '../components/MaxContainer'

const Apartment = () => {
  // get id from url
  const { id } = useParams()
  const apartment = useApartment(id)

  if (!apartment) {
    return redirect("/error")
  }
  return (
    <MaxContainer>
      <div className="apartment">
        <Carousel images={apartment.pictures} />

        <div className="apartment_header">
          <div className="apartment_title">
            <h1>{apartment.title}</h1>
            <p> {apartment.location} </p>
          </div>
          <div className="apartment_header_user">
            <UserCard
              name={apartment.host.name}
              picture={apartment.host.picture}
            />
          </div>
        </div>

        <div className="apartment_meta">
          <div className="apartment_meta_tags">
            {apartment.tags.map((tag) => {
              return <Tag key={tag} title={tag} />
            })}
          </div>

          <div className="apartment_meta_wrapper">
            <Rating rating={apartment.rating} />

            <div className="apartment_meta_wrapper_user">
              <UserCard
                name={apartment.host.name}
                picture={apartment.host.picture}
              />
            </div>
          </div>
        </div>

        <div className="apartment_infos">
          <Dropdown title="Description" body={apartment.description} />
          <Dropdown title="Équipements" body={apartment.equipments} />
        </div>
      </div>
    </MaxContainer>
  )
}

export default Apartment
