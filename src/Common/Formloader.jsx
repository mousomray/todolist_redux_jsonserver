import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Formloader = () => {
    return (
        <>
            <RotatingLines
                visible={true}
                height="40"
                width="40"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </>
    )
}

export default Formloader

