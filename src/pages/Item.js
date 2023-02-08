import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './Item.module.css'
import imageDefault from '../assets/images/image_default.svg'
import LikeDislikeButton from '../components/LikeDislikeButton'
import classnames from 'classnames'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { COMPONENT_TYPE_API } from '../constants/global'

const host = process.env.REACT_APP_HOST

export default function Item() {
  const { slug } = useParams()
  const [laptop, setLaptop] = useState({
    name: '',
    slug: '',
    brand_name: '',
    price: 0,
    link: '',
    updated: '',
    specs: [],
    price_difference: 0,
    like_count: 0,
    dislike_count: 0,
  })
  const [specs, setSpecs] = useState('')
  const [matchingSpecs, setMatchingSpecs] = useState('')
  const [matchingSpecsTotalPrice, setMatchingSpecsTotalPrice] = useState(0)
  const [priceDifferenceSign, setPriceDifferenceSign] = useState('+')

  const laptopDetailURL = host + 'api/laptops/' + slug
  const laptopMatchingSpecsURL = laptopDetailURL + '/get-matching-components/'
  const navigate = useNavigate()

  const loadLaptopDetail = () => {
    return axios
      .get(laptopDetailURL)
      .then(response => {
        const currentLaptop = response.data
        if (Number(currentLaptop.price_difference) < 0) {
          setPriceDifferenceSign('-')
        }
        const apiSpecs = currentLaptop.specs

        // Get all the components in a category
        let initSpecs = {
          cpu: apiSpecs.filter(
            component => component.category === COMPONENT_TYPE_API.cpu
          ),
          gpu: apiSpecs.filter(
            component => component.category === COMPONENT_TYPE_API.gpu
          ),
          ram: apiSpecs.filter(
            component => component.category === COMPONENT_TYPE_API.ram
          ),
          storage: apiSpecs.filter(
            component => component.category === COMPONENT_TYPE_API.storage
          ),
        }

        initSpecs = {
          cpu: initSpecs.cpu
            .map(component => component.name)
            .toString()
            .split(',')
            .join(', '),
          gpu: initSpecs.gpu
            .map(component => component.name)
            .toString()
            .split(',')
            .join(', '),
          ram: initSpecs.ram
            .map(component => component.name)
            .toString()
            .split(',')
            .join(', '),
          storage: initSpecs.storage
            .map(component => component.name)
            .toString()
            .split(',')
            .join(', '),
        }

        setSpecs(initSpecs)
        setLaptop(currentLaptop)
      })
      .catch(error => console.log(error))
  }

  const loadLaptopMatchingSpecs = () => {
    return axios
      .get(laptopMatchingSpecsURL)
      .then(response => {
        const data = response.data
        const matchingSpecs = {
          cpu: data.filter(
            component => component.category === COMPONENT_TYPE_API.cpu
          ),
          gpu: data.filter(
            component => component.category === COMPONENT_TYPE_API.gpu
          ),
          ram: data.filter(
            component => component.category === COMPONENT_TYPE_API.ram
          ),
          storage: data.filter(
            component => component.category === COMPONENT_TYPE_API.storage
          ),
        }
        let totalAllPrice = 0
        Object.keys(matchingSpecs).forEach(spec =>
          matchingSpecs[spec].forEach(
            component =>
              (totalAllPrice = totalAllPrice + Number(component.total_price))
          )
        )
        totalAllPrice = totalAllPrice.toFixed(2)

        setMatchingSpecsTotalPrice(totalAllPrice)
        setMatchingSpecs(matchingSpecs)
      })
      .catch(error => console.log(error))
  }

  const handleClickToSource = sourceLink => {
    console.log(`SouceLink: ${laptop}`)
    window.location.assign(sourceLink)
  }

  const handleClickBack = () => {
    navigate(-1)
  }

  const distanceToNow = useMemo(() => {
    if (laptop.updated === '') return 'Unavailable'
    const dateObject = new Date(laptop.updated)
    return formatDistanceToNow(dateObject, { addSuffix: true })
  }, [laptop])

  useEffect(() => {
    loadLaptopDetail()
    loadLaptopMatchingSpecs()
  })

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
              {/* Updated: {formatDistanceToNow(new Date(sampleDateTime))} */}
              {/* Updated:{' '}
              {formatDistanceToNow(new Date(laptop.updated.toString()))} */}
              {/* Updated: {new Date(new Date(laptop.updated)).toLocaleDateString} */}
              {/* Updated:{' '}
              {formatDistanceToNow(
                new Date('2023-01-27T17:13:35.210220-05:00')
              )} */}
              {/* Updated: <i> Up to date </i> */}
              {/* 
                CURRENT ALTERNATIVE 
              */}
              Updated: <i>{distanceToNow}</i>
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.btn}
                onClick={() => handleClickToSource(laptop.link)}
              >
                Source
              </button>
              <button className={styles.btn} onClick={() => handleClickBack()}>
                Back to Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={classnames(styles.container, styles.verticalFlex)}>
        <p className={styles.title}>Similar Laptop Specification</p>
        <div className={styles.cards}>
          <LaptopComponent components={matchingSpecs.cpu} label="Processor" />
          <LaptopComponent components={matchingSpecs.ram} label="Memory" />
          <LaptopComponent components={matchingSpecs.gpu} label="Graphics" />
          <LaptopComponent components={matchingSpecs.storage} label="Storage" />
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
                  priceDifferenceSign === '+'
                    ? styles.positive
                    : styles.negative
                }
              >
                {priceDifferenceSign}$
                {priceDifferenceSign === '+'
                  ? laptop.price_difference
                  : -laptop.price_difference}
              </span>
            </i>
          </p>
          <LikeDislikeButton likes={10} dislikes={5} />
        </div>
      </div>
    </>
  )
}

const LaptopComponent = ({ components, label }) => {
  const defaultValueDisplay = <div className={styles.detail}>Unavailable</div>
  const componentsDisplay = components?.map(component => {
    return (
      <div className={styles.subcard} key={component.name}>
        <div className={styles.detail}>
          <p className={styles.btnLink}>
            <a
              href={component.link}
              aria-label="Click here to go to the Source"
            >
              {component.name}
            </a>
          </p>
          <div className={styles.subDetail}>
            <p>
              <b>Brand:</b> <i>{component.brand}</i>
            </p>
            <p>
              <b>Qnty:</b> <i>{component.comp_count}</i>
            </p>
            <p>
              <b>Price:</b> <i>${component.total_price}</i>
            </p>
          </div>
        </div>
        <p>
          <b>Updated:</b>{' '}
          <i>
            {formatDistanceToNow(new Date(component.updated), {
              addSuffix: true,
            })}
          </i>
        </p>
        <div className={classnames(styles.line, styles.positiveBkg)}></div>
      </div>
    )
  })

  const finalComponentDisplay =
    components?.length === 0 ? defaultValueDisplay : componentsDisplay

  return (
    <div className={styles.card}>
      <p className={styles.title}>{label}</p>
      {finalComponentDisplay}
    </div>
  )
}
