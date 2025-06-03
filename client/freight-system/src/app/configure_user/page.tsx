'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { validateToken } from "../utils/validate-token";
import TokenResponse from "../utils/interfaces/token-response";
import FieldsProps from "../utils/interfaces/form-fields";
import Form from "../components/form";
import UserStructure from "../utils/objects-structures";


function configureUser() {

    const [screen, setScreen] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     async function fetchToken() {
    //         const response: TokenResponse = await validateToken()
    //         if (response.code == 200) {
    //             setScreen(true);
    //         } else {
    //             router.push('./');
    //         }
    //     }

    //     fetchToken();
    // }, [])

    return (
        <>
            {
                screen && (
                    <div className="bg-gray-900 min-h-screen flex flex-col">
                        <div className="bg-gray-700 my-10 min-w-[800px] max-w-4xl w-full mx-auto rounded-lg p-5">
                            <div className="grid grid-cols-2 h-fit gap-x-10">
                                <div className="w-full grid grid-cols-2 gap-x-10 col-start-2">
                                    <button className="px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-blue-500 hover:ring-1 hover:bg-blue-50">Confirm</button>
                                    <button className="px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-red-500 hover:ring-1 hover:bg-red-50">Close</button>
                                </div>
                            </div>
                        </div>
                        <Form fields={UserStructure} />
                    </div>
                )
            }
        </>
    )
}

export default configureUser