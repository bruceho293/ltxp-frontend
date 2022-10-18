import React, { useEffect, useState, useRef } from 'react'
import styles from './Profile.module.css'
import avatarHolder from '../assets/images/avatar.svg'
import { useItemList } from '../hooks/useItemList'
import data from '../data/mock-laptop-data.json'

import InforList from '../components/InfoList'
import AvatarEditor from 'react-avatar-editor'

export default function Profile() {
  const properties = useItemList({ data: data, isProfile: true })
  const [isAvatarEditor, setIsAvatarEditor] = useState(false)
  const [avatarScale, setAvatarScale] = useState(1)
  const [imgSrc, setImgSrc] = useState('')
  const [newImgSrc, setNewImgSrc] = useState('')

  const handleChange = e => {
    e.preventDefault()
    setNewImgSrc(e.target.files[0])
  }

  const handleClick = () => {
    setIsAvatarEditor(!isAvatarEditor)
    setNewImgSrc('')
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Your Profile</h2>
        <div className={styles.section}>
          <div className={styles.profile}>
            <div className={styles.imgContainer}>
              {isAvatarEditor ? (
                <div
                  className={styles.avatarEditor}
                  onFocus={() => setIsAvatarEditor(true)}
                  onBlur={() => setIsAvatarEditor(false)}
                >
                  <AvatarEditor
                    image={newImgSrc}
                    width={200}
                    height={200}
                    border={20}
                    borderRadius={100}
                    scale={avatarScale}
                  />
                  <input
                    type="file"
                    label="profile-image"
                    aria-label="Input button for upload image file"
                    onChange={handleChange}
                  />
                  <button>» Save Avatar «</button>
                </div>
              ) : (
                <img
                  className={styles.imageIcon}
                  src={imgSrc === '' ? avatarHolder : imgSrc}
                  alt="Profile Avatar"
                  aria-label="Profile Avatar"
                />
              )}
            </div>
            <button onClick={handleClick}>
              » {!isAvatarEditor ? 'Change Your Avatar' : 'Close Avatar Editor'}{' '}
              «
            </button>
          </div>

          <form className={styles.settings}>
            <label htmlFor="username">Username</label>
            <p>:</p>
            <input type="text" id="username" name="username" />
            <label htmlFor="email">Email</label>
            <p>:</p>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <p>:</p>
            <input type="password" id="password" name="password" />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <div className={styles.container}>
        <h2>Your Interest</h2>
        <InforList {...properties} />
      </div>
    </>
  )
}
