'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { validateToken } from '../utils/validate-token';
import TokenResponse from '../utils/interfaces/token-response';

const homeButtons = 'w-full h-full py-10 bg-purple-700 text-white cursor-pointer rounded-b-md hover:bg-purple-800';
const leftButton = `${homeButtons} rounded-tr-4xl`;
const middleButton = `${homeButtons} rounded-t-4xl`;
const rightButton = `${homeButtons} rounded-tl-4xl`;


function homepage() {

    const [screen, setScreen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchToken() {
            const response: TokenResponse = await validateToken();
            if (response.code == 200) {
                setScreen(true);
            } else {
                router.push('./');
            }
        }

        fetchToken();
    }, []);

    return (
        <>
            {
                screen && (
                    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
                        <div className="bg-gray-400 p-20 rounded-xl shadow-md w-3xl h-fit grid grid-cols-3 place-items-center gap-x-10">
                            <button onClick={() => router.push('./users')} className={leftButton}>Users</button>
                            <button onClick={() => router.push('./companies')} className={middleButton}>Companies</button>
                            <button onClick={() => router.push('./branches')} className={rightButton}>Branches</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default homepage;