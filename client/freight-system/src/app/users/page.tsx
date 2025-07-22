'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "../utils/validate-token";
import WarningToast from "../components/warning-toast";
import TokenResponse from "../utils/interfaces/token-response";
import Grid from "../components/grid";
import WarinigModal from "../components/warning_modal";

type User = {
    email: string,
    name: string,
    status: string,
    user: string,
}

function displayUsers() {

    const [screen, setScreen] = useState(false);
    const [warning, setWarning] = useState('');
    const [userModal, setUserModal] = useState('');
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
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        setUsers(data.users)
                        setHeaders(data.headers)
                    } else {
                        setWarning('Something went wrong. Try again later.')
                    }
                })
                .catch((error) => {
                    setWarning(error);
                })
        } catch (e) {
            setWarning(String(e));
        }
    }

    function handleMessages() {
        setWarning('')
    }

    function onDelete(user: User) {
        let uppercaseUser = user.user.toUpperCase()
        setUserModal(uppercaseUser)
    }

    function onUpdate(user: User) {
        console.log(user.user)
    }

    function onModalYes() {
        try {
            fetch('http://127.0.0.1:8000/configure_user/delete', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_code: userModal
                })
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        const key = `${data.code} - ${data.message}`;
                        switch (key) {
                            case '200 - Success':
                                setWarning('Success!')
                                break;
                            default:
                                setWarning(key);
                                break;
                        };
                    } else {
                        setWarning('Something went wrong. Try again later.');
                    };
                })
                .finally(() => setUserModal(''))
                .finally(() => getUsers())
        } catch (e) {
            setWarning(String(e))
        }
    }

    function onModalNo() {
        setUserModal('')
        console.log('no')
    }

    return (
        <>
            {
                screen && (
                    <>
                        {warning && (
                            <WarningToast
                                message={warning}
                                onClose={() => handleMessages()}
                                type='error'
                            />

                        )}
                        {userModal && (
                            <WarinigModal
                                title='Warning'
                                message={`Do you wish to delete the user "${userModal}"?`}
                                btnYes='Yes, delete'
                                btnNo='No'
                                onYes={onModalYes}
                                onNo={onModalNo}
                            />
                        )}
                        <div className="bg-gray-900 min-h-screen flex flex-col">
                            <div className="bg-gray-700 my-10 min-w-[800px] max-w-4xl w-full mx-auto rounded-lg p-5">
                                <div className="grid grid-cols-2 h-fit place-items-center gap-x-10">
                                    <div className="flex justify-center items-center w-full">
                                        <input
                                            className='w-full bg-white px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:bg-purple-50'
                                            type='email'
                                            id='email'
                                            placeholder='User or E-Mail'
                                        />
                                        <button
                                            className="px-3 py-2 bg-white rounded border cursor-pointer hover:ring-purple-500 hover:ring-1 hover:bg-purple-50"
                                        >
                                            Search
                                        </button>
                                    </div>
                                    <div className="w-full grid grid-cols-2 gap-x-10">
                                        <button
                                            onClick={() => router.push('./configure_user')}
                                            className="px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-blue-500 hover:ring-1 hover:bg-blue-50"
                                        >
                                            Insert
                                        </button>
                                        <button className="px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-green-500 hover:ring-1 hover:bg-green-50">Export</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                {
                                    headers && users && (
                                        <Grid headers={headers} data={users} onDelete={onDelete} onUpdate={onUpdate}></Grid>
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