import React, { useContext, useEffect, useState } from 'react'
import styles from './Profile.module.css'
import avatarHolder from '../assets/images/avatar.svg'
import data from '../data/mock-laptop-data.json'
import AvatarEditor from 'react-avatar-editor'

import { useItemList } from '../hooks/useItemList'
import { AuthContext } from '../contexts/AuthProvider'
import ItemList from '../components/ItemList'

export default function Profile() {
  const properties = useItemList({ data: data, isProfile: true })
  const [isAvatarEditor, setIsAvatarEditor] = useState(false)
  const [avatarScale, setAvatarScale] = useState(1)
  const [imgSrc, setImgSrc] = useState('')
  const [newImgSrc, setNewImgSrc] = useState('')

  const { logout } = useContext(AuthContext)

  let timer
  const INACTIVE_EDITOR_DURATION = 5 * 60 * 1000

  useEffect(() => {
    if (isAvatarEditor) {
      if (!timer) {
        timer = setInterval(() => {
          setIsAvatarEditor(false)
          clearInterval(timer)
        }, INACTIVE_EDITOR_DURATION)
      }
    } else {
      if (timer) clearInterval(timer)
    }
  }, [isAvatarEditor])

  const handleChange = (e) => {
    e.preventDefault()
    setNewImgSrc(e.target.files[0])
  }

  const handleClick = () => {
    if (isAvatarEditor) clearInterval(timer)
    setIsAvatarEditor(!isAvatarEditor)
    setNewImgSrc('')
  }

  const handleScaleChange = (e) => {
    const newScale = e.target.value
    setAvatarScale(newScale)
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Your Profile</h2>
        <button onClick={logout}>LOG OUT</button>
        <div className={styles.section}>
          <div className={styles.profile}>
            <div className={styles.imgContainer}>
              {isAvatarEditor ? (
                <div className={styles.avatarEditor}>
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
                  <input
                    type="range"
                    value={avatarScale}
                    min={1}
                    max={10}
                    onChange={handleScaleChange}
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
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <div className={styles.container}>
        <h2>Your Interest</h2>
        <ItemList {...properties} />
      </div>
    </>
  )
}
