import React from 'react'

const UserCard = ({ name, picture }) => {
  return (
    <div className="user_wrapper">
      <p> {name} </p>
      <img src={picture} alt={name} />
    </div>
  )
}

export default UserCard
