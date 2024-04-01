import React from 'react';
import { StarRating } from "star-ratings-react";
import { FaUserCircle } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    return (
        <div className="flex items-start gap-3 flex-col">
            <div className="flex items-center gap-3">

                {
                    !review.image ? <FaUserCircle className="w-6 h-6 rounded-full" /> : <img src={review.image} alt="user" className="w-7 h-7 object-cover rounded-full" />
                }
                <div className='flex gap-2'>
                    <h3 className="text-lg font-semibold">{review.user}</h3>
                    <StarRating rating={review.rating} size={20} maxRating={review.rating} textColor={"white"} edit={false} />
                </div>
            </div>
            <p className="text-sm text-justify">{review.comment}</p>
        </div>
    )
}

export default ReviewCard
