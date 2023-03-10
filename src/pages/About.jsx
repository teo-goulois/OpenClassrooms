import React from 'react'
import '../styles/about.scss'

// Images
import aboutImg from '../assets/images/about.png'
// Components
import MaxContainer from '../components/MaxContainer'
import Dropdown from '../components/Dropdown'

const DROPDOWN_CONTENT = [
  {
    title: 'Fiabilité',
    body: 'Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes.',
  },
  {
    title: 'Respect',
    body: 'La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.',
  },
  {
    title: 'Service',
    body: "Nos équipes se tiennent à votre disposition pour vous fournir une expérience parfaite. N'hésitez pas à nous contacter si vous avez la moindre question.",
  },
  {
    title: 'Sécurité',
    body: "La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes.",
  },
]

const About = () => {
  return (
    <MaxContainer>
      <div className="about">
        <div className="about_img">
          <div className="about_img_filter"></div>
          <img src={aboutImg} alt="landscape" />
        </div>

        <div className="about_dropdowns">
          {DROPDOWN_CONTENT.map((item, index) => {
            return <Dropdown key={index} title={item.title} body={item.body} />
          })}
        </div>
      </div>
    </MaxContainer>
  )
}

export default About
