'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const homeButtons = 'w-full h-full py-10 bg-purple-700 text-white cursor-pointer rounded-b-md hover:bg-purple-800'
const leftButton = `${homeButtons} rounded-tr-4xl`
const middleButton = `${homeButtons} rounded-t-4xl`
const rightButton = `${homeButtons} rounded-tl-4xl`

function homepage() {

    const [screen, setScreen] = useState(true);
    const [warning, setWarning] = useState('');
    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://127.0.0.1:8000/tokens/get-authenticated-tokens', {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        if (data.code == 200) {
                            setScreen(true)
                        } else {
                            router.push('./')
                        }
                    } else {
                        setWarning('Something went wrong. Try again later.')
                    }
                })
                .catch((error) => {
                    setWarning(error)
                })
        } catch (e: any) {
            setWarning(e)
        }
    }, [])

    return (
        <>
            {
                screen && (
                    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
                        <div className="bg-gray-400 p-20 rounded-t-xl rounded-b-sm shadow-md w-3xl h-fit grid grid-cols-3 place-items-center gap-x-10">
                            <button onClick={() => router.push('./app/users')} className={leftButton}>Users</button>
                            <button onClick={() => router.push('./app/companies')} className={middleButton}>Companies</button>
                            <button onClick={() => router.push('./app/branches')} className={rightButton}>Branches</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default homepage