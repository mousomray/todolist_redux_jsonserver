import React from 'react'
import { Hourglass } from 'react-loader-spinner'

const Pageloader = () => {
    return (
        <>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </>
    )
}

export default Pageloader
