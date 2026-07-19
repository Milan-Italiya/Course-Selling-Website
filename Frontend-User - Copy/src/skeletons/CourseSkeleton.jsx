import React from 'react'

import '../css/Skeleton/CourseSkeleton.css'

const CourseSkeleton = () => {

    return (

        <div className='course-skeleton-container'>

            {
                [1,2,3].map((item) => (

                    <div
                        className='course-skeleton-card'
                        key={item}
                    >

                        <div className='course-image-skeleton'></div>

                        <div className='course-title-skeleton'></div>

                        <div className='course-text-skeleton'></div>

                        <div className='course-btn-skeleton'></div>

                    </div>
                ))
            }

        </div>
    )
}

export default CourseSkeleton