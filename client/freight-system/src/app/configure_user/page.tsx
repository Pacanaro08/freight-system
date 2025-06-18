'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { validateToken } from "../utils/validate-token";
import { UserStructure } from "../utils/objects-structures";
import TokenResponse from "../utils/interfaces/token-response";
import FieldsProps from "../utils/interfaces/form-fields";
import Form from "../components/form";


const userBase = {
    'usercode': 'User Code',
    'username': 'Name',
    'useremail': 'E-Mail',
    'userpassword': 'Password',
    'userstatus': 'Status',
}

function configureUser() {

    const [screen, setScreen] = useState(true);
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [finalAnswer, setFinalAnswer] = useState({});
    const router = useRouter();

    useEffect(() => {
        async function fetchToken() {
            const response: TokenResponse = await validateToken()
            if (response.code == 200) {
                setScreen(true);
            } else {
                router.push('./');
            }
        }

        fetchToken();
    }, [])

    function formFinalAnswer(answers: { [key: string]: string | number | any }) {
        setFinalAnswer(answers)
    }

    function handleFinalAnswer() {
        let error = false
        let fields = ''

        if (finalAnswer && Object.keys(finalAnswer).length > 0) {
            Object.keys(userBase).map((value: string, index: number) => {
                if (value in finalAnswer) {
                    if (Object.values(finalAnswer)[index] === '') {
                        fields += Object.values(userBase)[index] + ', '
                        error = true
                    }
                } else {
                    fields += Object.values(userBase)[index] + ', '
                    error = true
                }
            });

            if (error) {
                setWarningMessage(`Missing: ${fields.substring(0, fields.length - 2)}`)
            } else {
                insertDB()
            }
            setWarning(error)
        } else {
            setWarning(true)
            setWarningMessage('Fill all required Fields!')
        }
    }

    function insertDB() {
        try {
            fetch('http://127.0.0.1:8000/configure_user/insert', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_data: finalAnswer
                })
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        const key = `${data.code} - ${data.message}`;
                        switch (key) {
                            case '200 - Success':
                                router.push('/users');
                                console.log(key)
                                break;
                            default:
                                setWarningMessage(key);
                                console.log(key)
                                break;
                        }
                    } else {
                        setWarningMessage('Something went wrong. Try again later.');
                        console.log('Something went wrong. Try again later.')
                    }
                })
        } catch (e) {
            console.log(String(e))
        }
    }

    return (
        <>
            {
                screen && (
                    <div className="bg-gray-900 min-h-screen flex flex-col">
                        <div className="bg-gray-700 my-10 min-w-[800px] max-w-4xl w-full mx-auto rounded-lg p-5">
                            <div className="grid grid-cols-2 h-fit gap-x-10">
                                <div className="w-full grid grid-cols-2 gap-x-10 col-start-2">
                                    <button onClick={() => handleFinalAnswer()} className="px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-blue-500 hover:ring-1 hover:bg-blue-50">Confirm</button>
                                    <button onClick={router.back} className="px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-red-500 hover:ring-1 hover:bg-red-50">Close</button>
                                </div>
                            </div>
                        </div>
                        <Form fields={UserStructure()} handleFinalAnswer={formFinalAnswer} />
                    </div>
                )
            }
        </>
    )
}

export default configureUser