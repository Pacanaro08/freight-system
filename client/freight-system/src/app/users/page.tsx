'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "../utils/validate-token";

interface TokenResponse {
    message: string,
    code: number
};

function displayUsers() {

    const [screen, setScreen] = useState(false);
    const [warning, setWarning] = useState(false); //TODO: create a component "warning" and import it here (code is commented)
    const [users, setUsers] = useState([]);
    const [headers, setHeaders] = useState<string[]>();
    const router = useRouter();

    useEffect(() => {
        async function fetchToken() {
            const response: TokenResponse = await validateToken()
            if (response.code == 200) {
                setScreen(true);
                getUsers();
            } else {
                router.push('./');
            }
        }

        fetchToken();
    }, [])

    function getUsers() {
        try {
            fetch('http://127.0.0.1:8000/db-procedures/get-users', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        setUsers(data.users)
                        setHeaders(data.headers)
                    } else {
                        console.log('Something went wrong. Try again later.')
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (e) {
            console.log(String(e));
        }
    }

    return (
        <>
            {
                screen && (
                    <>
                        {/* {
                            warning && (
                                <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabIndex={-1} aria-labelledby="hs-toast-error-example-label">
                                    <div className="flex p-4">
                                        <div className="shrink-0">
                                            <svg className="shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                                            </svg>
                                        </div>
                                        <div className="ms-3">
                                            <p id="hs-toast-error-example-label" className="text-sm text-gray-700 dark:text-neutral-400">
                                                This is an error message.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } */}
                        <div className="bg-gray-900 flex justify-center items-center min-h-screen">
                            <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                                    <table className="table-auto min-w-[800px] w-full border-collapse">
                                        <thead className="bg-gray-700 text-white">
                                            <tr>
                                                {headers &&
                                                    headers.map(header => (
                                                        <th className="px-6 py-3 min-w-[200px] text-left" key={header}>{header.toUpperCase()}</th>
                                                    ))
                                                }
                                                <th className="px-6 py-3 min-w-[95px] text-left" key='button'></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-700">
                                            {users &&
                                                users.map((user, index) => (
                                                    <tr className="border-b hover:bg-gray-200" key={index}>
                                                        {headers &&
                                                            headers.map(header => (
                                                                <td className="px-6 py-3 text-left" key={header}>{user[header]}</td>
                                                            ))
                                                        }
                                                        <td>
                                                            <button onClick={() => console.log(user)} className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">Editar</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default displayUsers;