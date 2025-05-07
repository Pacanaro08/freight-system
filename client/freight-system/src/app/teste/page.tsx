'use client'

import { useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function teste() {

    const [showUl, setShowUl] = useState(false)

    return (
        <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
            <div className="bg-gray-400 p-8 rounded shadow-md w-96">
                <Select>
                    <MenuItem>1</MenuItem>
                    <MenuItem>2</MenuItem>
                    <MenuItem>3</MenuItem>
                </Select>
            </div>
        </div>
    )
}

export default teste;