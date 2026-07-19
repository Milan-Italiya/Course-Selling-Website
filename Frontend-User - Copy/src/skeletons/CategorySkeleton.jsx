import React from 'react'

import '../css/Skeleton/CategorySkeleton.css'

const CategorySkeleton = () => {

    return (

        <div className='category-skeleton'>

            {
                [1,2,3,4].map((item) => (

                    <div
                        className='category-card-skeleton'
                        key={item}
                    ></div>
                ))
            }

        </div>
    )
}

export default CategorySkeleton