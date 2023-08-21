import React from 'react'

const SubNavbar = ({path}) => {
    return (
        <div className='pr-[70px] pl-[20px] md:pl-[70px] pb-[25px] pt-[25px] bg-white w-full'>
            <h1 className='font-extrabold text-4xl  '>
                {path}
            </h1>
        </div>
    )
}

export default SubNavbar