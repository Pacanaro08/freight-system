'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "../utils/validate-token";
import Grid from "../components/grid";

interface TokenResponse {
    message: string,
    code: number
};

function displayUsers() {

    const [screen, setScreen] = useState(false);
    const [warning, setWarning] = useState(true);
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
                        <div className="bg-gray-900 min-h-screen">
                            <div className="flex justify-center items-center h-full">
                                {
                                    headers && users && (
                                        <Grid headers={headers} data={users}></Grid>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default displayUsers;