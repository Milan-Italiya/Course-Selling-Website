/* HomeSkeleton.jsx */

import React from 'react'

import '../css/Skeleton/HomeSkeleton.css'

const HomeSkeleton = () => {

  return (

    <div className='home-skeleton'>

      {/* NAVBAR */}

      <div className='skeleton-navbar'>

        <div className='skeleton-logo'></div>

        <div className='skeleton-nav-links'>

          <span></span>
          <span></span>
          <span></span>
          <span></span>

        </div>

      </div>

      {/* HERO SLIDER */}

      <div className='skeleton-slider'>

        <div className='slider-overlay'></div>

        <div className='slider-content'>

          <div className='slider-title skeleton-shimmer'></div>

          <div className='slider-text skeleton-shimmer'></div>

          <div className='slider-dots'>

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

          </div>

        </div>

        <button className='slider-arrow left'>
          ❮
        </button>

        <button className='slider-arrow right'>
          ❯
        </button>

      </div>

    </div>
  )
}

export default HomeSkeleton