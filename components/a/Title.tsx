import React from 'react'
import style from '../../stylesheets/a/Title.module.scss'
import TitleB from '../b/Title'

const Title = () => {
  return(
    <>
      <TitleB />
      <div className={style.title}>
        A:タイトル（赤）
        <div className={style.title__sub}>サブタイトルは青</div>
      </div>
    </>
    )
}

export default Title