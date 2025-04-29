'use client'

import { useRouter } from "next/navigation"

function selectBranch() {

    const router = useRouter();

    function goBack() {
        router.back()
    }

    return (
        <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
            <div className="bg-gray-400 p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-7">Select your branch</h2>
                <div className="mb-4">
                    <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700" type="email" id="email" placeholder="Company" />
                </div>
                <div className="mb-7">
                    <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700" type="password" id="password" placeholder="Branch" />
                </div>
                <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900 transition mb-3 cursor-pointer">
                    Select
                </button>
                <button onClick={() => goBack()} className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-500 transition cursor-pointer">
                    Return
                </button>
            </div>
        </div>
    )
}

export default selectBranch