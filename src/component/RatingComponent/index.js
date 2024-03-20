import { Rating, Stack } from '@mui/material'
import React from 'react'

function RatingComponent ( {
    ratingValue,
    setRatingValue
} )
{


    return (
        <>
            <Stack spacing={ 1 } direction='row' style={ { justifyContent: 'center', alignItems: 'center' } }>
                <p style={ { fontFamily: 'Poppins-Regular' } }>Kredit Skor Pelanggan :</p>
                <Rating name="largeRating" value={ ratingValue } onChange={ ( event, newValue ) => { setRatingValue( newValue ) } } size='large' />
            </Stack>
        </>
    )
}

export default RatingComponent
