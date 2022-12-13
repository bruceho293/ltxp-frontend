import React from 'react'
import styles from './Home.module.css'
import laptopSpecsSrc from '../assets/images/laptopspec.svg'
import imageDefault from '../assets/images/image_default.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import classnames from 'classnames'

export default function Home() {
  const { pathname, hash, key } = useLocation()
  const brandImgs = []
  const navigate = useNavigate()

  // Mock data
  const brandImgDetail = {
    brand: 'Default Brand',
    src: imageDefault,
    alt: 'Logo of a brand.',
  }

  for (let i = 0; i < 22; i++) {
    brandImgs.push(
      <div key={i}>
        <img
          className={styles.brandImg}
          src={brandImgDetail.src}
          alt={brandImgDetail.alt}
        />
      </div>
    )
  }

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
        <div className={styles.brands}>{brandImgs}</div>
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
