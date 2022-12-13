import React from 'react'
import styles from './LikeDislikeButton.module.css'
import classnames from 'classnames'

export const LIKE = 1,
  NEUTRAL = 0,
  DISLIKE = -1

export default function LikeDislikeButton({
  likes,
  dislikes,
  id,
  imp,
  onImpChange,
}) {
  return (
    <p className={styles.container}>
      <span className={styles.subcontainer}>
        {likes}&nbsp;
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={
            imp !== LIKE
              ? styles.buttonIcon
              : classnames(styles.buttonIcon, styles.positive)
          }
          onClick={() => onImpChange(id, LIKE)}
          xmlns="http://www.w3.org/2000/svg"
          alt="Like Icon Button"
          aria-label="Like Icon Button"
        >
          <path
            d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
            stroke="#C9D1D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className={styles.subcontainer}>
        {dislikes}&nbsp;
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={
            imp !== DISLIKE
              ? styles.buttonIcon
              : classnames(styles.buttonIcon, styles.negative)
          }
          onClick={() => onImpChange(id, DISLIKE)}
          xmlns="http://www.w3.org/2000/svg"
          alt="Dislike Icon Button"
          aria-label="Dislike Icon Button"
        >
          <path
            d="M17 2H19.67C20.236 1.98999 20.7859 2.18813 21.2154 2.55681C21.645 2.9255 21.9242 3.43905 22 4V11C21.9242 11.5609 21.645 12.0745 21.2154 12.4432C20.7859 12.8119 20.236 13.01 19.67 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72003C5.2377 1.99454 4.76965 2.16359 4.40212 2.47599C4.0346 2.78839 3.79235 3.22309 3.72003 3.7L2.34003 12.7C2.29652 12.9866 2.31586 13.2793 2.39669 13.5577C2.47753 13.8362 2.61793 14.0937 2.80817 14.3125C2.99842 14.5313 3.23395 14.7061 3.49846 14.8248C3.76297 14.9435 4.05012 15.0033 4.34003 15H10Z"
            stroke="#C9D1D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </p>
  )
}
