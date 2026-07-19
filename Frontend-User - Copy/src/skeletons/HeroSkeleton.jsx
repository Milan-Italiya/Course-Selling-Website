import React from 'react'

import '../css/Skeleton/HeroSkeleton.css'

const HeroSkeleton = () => {

    return (

        <div className='hero-skeleton'>

            <div className='hero-skeleton-left'>

                <div className='skeleton-title'></div>

                <div className='skeleton-text'></div>

                <div className='skeleton-btn'></div>

            </div>

            <div className='hero-skeleton-right'></div>

        </div>
    )
}

export default HeroSkeleton