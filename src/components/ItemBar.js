import React from 'react'
import styles from './ItemBar.module.css'
import closeIcon from '../assets/images/closeIcon.svg'
import externalLinkIcon from '../assets/images/external-link.svg'
import LikeDislikeButton from './LikeDislikeButton'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function ItemBar({
  isLaptop,
  color,
  content,

  // For user-laptop interaction (like, dislike or neutral)
  onImpChange,

  // For term deletion in both Search and Filter
  isFilter,
  onDeleteSearchTerm,
  onDeleteFilter,

  // External Props
  ...props
}) {
  const borderColorStyle = {
    border: `1px solid ${color}`,
  }

  return (
    <div className={styles.container} style={borderColorStyle}>
      {isLaptop ? (
        <LaptopBar content={content} onImpChange={onImpChange} />
      ) : (
        <OptionBar
          content={content}
          onDeleteSearchTerm={onDeleteSearchTerm}
          onDeleteFilter={onDeleteFilter}
          isFilter={isFilter}
          filterID={props.filterID}
        />
      )}
    </div>
  )
}

function LaptopBar({ content, onImpChange }) {
  const {
    name,
    slug,
    price: cost,
    price_difference: costDiff,
    like_count: likes,
    dislike_count: dislikes,
    imp,
    updated,
  } = content
  const costSign = costDiff >= 0 ? '+' : '-'
  const date = formatDistanceToNow(new Date(updated))
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/laptop/' + slug)
  }

  return (
    <>
      <p className={styles.title}>{name}</p>
      <p>Updated: {date}</p>
      <div className={styles.nums}>
        <p>
          Price: ${cost} (
          <span
            className={costSign === '+' ? styles.positive : styles.negative}
          >
            {costSign}${costDiff < 0 ? -costDiff : costDiff}
          </span>
          )
        </p>
      </div>

      <LikeDislikeButton
        likes={likes}
        dislikes={dislikes}
        onImpChange={onImpChange}
        slug={slug}
        imp={imp}
      />

      <div className={styles.buttonLink} onClick={handleClick}>
        <img
          className={styles.icon}
          src={externalLinkIcon}
          alt="External Link Icon"
          aria-label="External Link Icon"
        />
        More Details
      </div>
    </>
  )
}

function OptionBar({
  filterID,
  content,
  onDeleteSearchTerm,
  onDeleteFilter,
  isFilter,
}) {
  return (
    <>
      <p>{content}</p>
      <img
        className={styles.icon}
        src={closeIcon}
        alt="Close Icon"
        aria-label="Close Icon"
        onClick={() =>
          isFilter ? onDeleteFilter(filterID) : onDeleteSearchTerm(content)
        }
      />
    </>
  )
}
