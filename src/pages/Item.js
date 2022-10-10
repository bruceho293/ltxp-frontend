import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './Item.module.css'
import imageDefault from '../assets/images/image_default.svg'
import LikeDislikeButton from '../components/LikeDislikeButton'
import classnames from 'classnames'

export default function Item() {
  const params = useParams()
  console.log(params)
  return (
    <>
      <div className={classnames(styles.container, styles.fullViewHeight)}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={imageDefault} alt="Default Icon" />
        </div>
        <div className={styles.section}>
          <p className={classnames(styles.title, styles.btnLink)}>
            <i>HP 15 -XONSHDJS HD Laptop</i>
          </p>
          <div className={styles.subsection}>
            <p>
              Brand: <i>HP</i>
            </p>
            <p>
              Price: <i>$ 429</i>
            </p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.subsection}>
            <p className={styles.info}>
              Processor:{' '}
              <i>Intel Celeron N4020 Dual Core Processor Up to 2.8 GHz</i>
            </p>
            <p className={styles.info}>
              Memory: <i>4 GB DDR4 on board</i>
            </p>
            <p className={styles.info}>
              Graphics: <i>Intel Iris Xe Graphics</i>
            </p>
            <p className={styles.info}>
              Storage: <i>128 GB eMMC</i>
            </p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.subsection}>
            <p>
              Updated: <i>1 month, 2 weeks ago</i>
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.btn}>Source</button>
              <button className={styles.btn}>Back to Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className={classnames(styles.container, styles.verticalFlex)}>
        <p className={styles.title}>Similar Laptop Specification</p>
        <div className={styles.cards}>
          <LaptopComponent />
          <LaptopComponent />
          <LaptopComponent />
          <LaptopComponent />
        </div>
        <div className={styles.bar}>
          <p>
            <b>Specification:</b> <i>$215.50</i>
          </p>
          <p>
            <b>Laptop:</b> <i>$374.16</i>
          </p>
          <p>
            <b>Comparison:</b> <i>-$156.86</i>
          </p>
          <LikeDislikeButton likes={10} dislikes={5} />
        </div>
      </div>
    </>
  )
}

const LaptopComponent = () => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>Processor</p>
      <div className={styles.detail}>
        <p className={styles.btnLink}>
          <a href="/" aria-label="Click here to go to the Source">
            Intel CPI BX8070110100F Core i3 10100F 3.6 GHz 6MB LGCA1200 4C 8T
          </a>
        </p>
        <div className={styles.subDetail}>
          <p>
            <b>Qnty:</b> <i>1</i>
          </p>
          <p>
            <b>Price:</b> <i>$114.99</i>
          </p>
        </div>
      </div>
      <p>
        <b>Updated:</b> <i>3 months. 1 week ago</i>
      </p>
    </div>
  )
}
