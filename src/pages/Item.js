import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Item.module.css'
import imageDefault from '../assets/images/image_default.svg'
import LikeDislikeButton from '../components/LikeDislikeButton'
import classnames from 'classnames'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'

const host = process.env.REACT_APP_HOST

const componentTypeMapper = {
  cpu: 'CPU',
  gpu: 'GPU',
  ram: 'RAM',
  storage: 'DISK',
}

export default function Item() {
  const { slug } = useParams()
  const [laptop, setLaptop] = useState({})
  const [specs, setSpecs] = useState('')
  const [matchingSpecs, setMatchingSpecs] = useState('')
  const [matchingSpecsTotalPrice, setMatchingSpecsTotalPrice] = useState(0)
  const [priceDifferenceSign, setPriceDifferenceSign] = useState('+')

  const laptopDetailURL = host + 'api/laptops/' + slug
  const laptopMatchingSpecsURL = laptopDetailURL + '/get-matching-components/'

  const loadLaptopDetail = () => {
    return axios
      .get(laptopDetailURL)
      .then(response => {
        let currentLaptop = response.data
        if (Number(currentLaptop.price_difference) < 0) {
          setPriceDifferenceSign('-')
          currentLaptop.price_difference = -Number(
            currentLaptop.price_difference
          )
        }
        setLaptop({
          name: currentLaptop.name,
          slug: currentLaptop.slug,
          brand_name: currentLaptop.brand_name,
          price: currentLaptop.brand_name,
          link: currentLaptop.brand_name,
          updated: currentLaptop.updated,
          specs: currentLaptop.specs,
          price_difference: currentLaptop.price_difference,
          like_count: currentLaptop.like_count,
          dislike_count: currentLaptop.dislike_count,
        })

        console.log(currentLaptop)
        const apiSpecs = currentLaptop.specs
        const initSpecs = {
          cpu: apiSpecs.find(
            component => component.category == componentTypeMapper.cpu
          ).name,
          gpu: apiSpecs.find(
            component => component.category == componentTypeMapper.gpu
          ).name,
          ram: apiSpecs.find(
            component => component.category == componentTypeMapper.ram
          ).name,
          storage: apiSpecs.find(
            component => component.category == componentTypeMapper.storage
          ).name,
        }
        setSpecs(initSpecs)
      })
      .catch(error => console.log(error))
  }

  const loadLaptopMatchingSpecs = () => {
    return axios
      .get(laptopMatchingSpecsURL)
      .then(response => {
        const data = response.data
        const matchingSpecs = {
          cpu: data.find(
            component => component.category == componentTypeMapper.cpu
          ),
          gpu: data.find(
            component => component.category == componentTypeMapper.gpu
          ),
          ram: data.find(
            component => component.category == componentTypeMapper.ram
          ),
          storage: data.find(
            component => component.category == componentTypeMapper.storage
          ),
        }
        let totalAllPrice = 0
        Object.keys(matchingSpecs).forEach(
          spec =>
            (totalAllPrice =
              totalAllPrice + Number(matchingSpecs[spec].total_price))
        )
        totalAllPrice = totalAllPrice.toFixed(2)

        setMatchingSpecsTotalPrice(totalAllPrice)
        setMatchingSpecs(matchingSpecs)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadLaptopDetail()
    loadLaptopMatchingSpecs()
  }, [])

  return (
    <>
      <div className={classnames(styles.container, styles.fullViewHeight)}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={imageDefault} alt="Default Icon" />
        </div>
        <div className={styles.section}>
          <p className={classnames(styles.title)}>
            <i>{laptop.name}</i>
          </p>
          <div className={styles.subsection}>
            <p>
              Brand: <i>{laptop.brand_name}</i>
            </p>
            <p>
              Price: <i>$ {laptop.price}</i>
            </p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.subsection}>
            <p className={styles.info}>
              Processor: <i>{specs.cpu}</i>
            </p>
            <p className={styles.info}>
              Memory: <i>{specs.ram}</i>
            </p>
            <p className={styles.info}>
              Graphics: <i>{specs.gpu}</i>
            </p>
            <p className={styles.info}>
              Storage: <i>{specs.storage}</i>
            </p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.subsection}>
            <p>
              {/* Need to adjust the Date format from the server */}
              {/* Updated: {formatDistanceToNow(new Date(laptop.updated))} */}
              {/* Updated: {new Date(laptop.updated).toLocaleString()} */}
              Updated:{' '}
              {formatDistanceToNow(
                new Date('2023-01-27T17:13:35.210220-05:00')
              )}
              {/* Updated: <i> Up to date </i> */}
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
          <LaptopComponent component={matchingSpecs.cpu} label="Processor" />
          <LaptopComponent component={matchingSpecs.ram} label="Memory" />
          <LaptopComponent component={matchingSpecs.gpu} label="Graphics" />
          <LaptopComponent component={matchingSpecs.storage} label="Storage" />
        </div>
        <div className={styles.bar}>
          <p>
            <b>Specification:</b> <i>${matchingSpecsTotalPrice}</i>
          </p>
          <p>
            <b>Laptop:</b> <i>${laptop.price}</i>
          </p>
          <p>
            <b>Comparison: </b>
            <i>
              <span
                className={
                  priceDifferenceSign == '+' ? styles.positive : styles.negative
                }
              >
                {priceDifferenceSign}${laptop.price_difference}
              </span>
            </i>
          </p>
          <LikeDislikeButton likes={10} dislikes={5} />
        </div>
      </div>
    </>
  )
}

const LaptopComponent = ({ component, label }) => {
  const defaultValue = 'Unvailable'
  const defaultComponent = {
    name: defaultValue,
    link: defaultValue,
    brand: defaultValue,
    comp_count: defaultValue,
    total_price: defaultValue,
    updated: defaultValue,
  }

  const { name, link, brand, comp_count: qnty, total_price, updated } =
    component !== undefined ? component : defaultComponent

  return (
    <div className={styles.card}>
      <p className={styles.title}>{label}</p>
      <div className={styles.detail}>
        <p className={styles.btnLink}>
          <a href={link} aria-label="Click here to go to the Source">
            {name}
          </a>
        </p>
        <div className={styles.subDetail}>
          <p>
            <b>Brand:</b> <i>{brand}</i>
          </p>
          <p>
            <b>Qnty:</b> <i>{qnty}</i>
          </p>
          <p>
            <b>Price:</b> <i>${total_price}</i>
          </p>
        </div>
      </div>
      <p>
        <b>Updated:</b> <i>Up to Date</i>
      </p>
    </div>
  )
}
