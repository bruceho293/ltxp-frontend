import React, { useMemo, useState } from 'react'
import styles from './Home.module.css'
import laptopSpecsSrc from '../assets/images/laptopspec.svg'
// import imageDefault from '../assets/images/image_default.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import classnames from 'classnames'
import axios from 'axios'

export default function Home() {
  const { pathname, hash, key } = useLocation()
  const [brandLogos, setBrandLogos] = useState([])
  const host = process.env.REACT_APP_HOST
  const brandLogoURI = host + '/api/brands/'
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(brandLogoURI)
      .then((response) => {
        const logos = response.data.map((brandLogo) => {
          return {
            brand: brandLogo.name,
            src: brandLogo.logo,
            alt: `Logo image of ${brandLogo.name}`,
          }
        })
        setBrandLogos(logos)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0)
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) element.scrollIntoView()
      }, 0)
    }
  }, [pathname, hash, key])

  const brandLogoImages = useMemo(() => {
    const brandLogosExists = brandLogos.filter(
      (brandLogo) => brandLogo.src !== null
    )

    return brandLogosExists.map((brandLogo) => (
      <img
        key={brandLogo.brand}
        className={styles.brandImg}
        src={brandLogo.src}
        alt={brandLogo.alt}
      />
    ))
  }, [brandLogos])

  return (
    <>
      <div className={classnames(styles.container, styles.homePage)}>
        <div className={styles.section}>
          <h1>Laptop SpecsPrice</h1>
          <p>
            Where laptops and components from a set of brands meet together in
            terms of the market value and specification.
          </p>
          <button className={styles.btn} onClick={() => navigate('/search')}>
            Try searching a laptop
          </button>
        </div>
        <div className={styles.section}>
          <img
            src={laptopSpecsSrc}
            className={styles.homeImg}
            alt="Laptop with Specs"
            aria-label="Image of laptop, gpu, cpu and storage"
          />
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          LTXP database covers a wide range of famous brands.
        </h1>
        <div className={styles.brands_container}>
          <div className={styles.brands_list}>{brandLogoImages}</div>
          <div className={styles.brands_list} aria-hidden="True">
            {brandLogoImages}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <h1 id="contact" className={styles.heading}>
          Message Me
        </h1>
        <form className={styles.contact}>
          <div className={classnames(styles.group, styles.halfWidth)}>
            <input
              type="text"
              className={styles.contactName}
              id="firstName"
              name="firstName"
              required
            />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className={classnames(styles.group, styles.halfWidth)}>
            <input
              type="text"
              className={styles.contactName}
              id="lastName"
              name="lastName"
              required
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
          <div className={classnames(styles.group, styles.fullWidth)}>
            <input type="email" id="email" name="email" required />
            <label htmlFor="email">Your Email</label>
          </div>
          <div className={classnames(styles.group, styles.fullWidth)}>
            <textarea id="message" name="message" required />
            <label htmlFor="message">Your Message</label>
          </div>
          <button type="submit">Send It</button>
        </form>
      </div>
    </>
  )
}
