'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '../utils/validate-token';
import { UserStructure } from '../utils/objects-structures';
import WarningToast from '../components/warning-toast';
import TokenResponse from '../utils/interfaces/token-response';
import Form from '../components/form';


const userBase = {
    'usercode': 'User Code',
    'username': 'Name',
    'useremail': 'E-Mail',
    'userpassword': 'Password',
    'userstatus': 'Status',
}

function configureUser() {

    const [screen, setScreen] = useState(true);
    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');
    const [finalAnswer, setFinalAnswer] = useState({});
    const router = useRouter();

    useEffect(() => {
        async function fetchToken() {
            const response: TokenResponse = await validateToken()
            if (response.code == 200) {
                setScreen(true);
            } else {
                router.push('./');
            };
        };

        fetchToken();
    }, []);

    function formFinalAnswer(answers: { [key: string]: string | number | any }) {
        setFinalAnswer(answers);
    }

    function handleFinalAnswer() {
        let error = false;
        let user_code: any = '';
        let user_email: any = '';
        let fields = '';

        if (finalAnswer && Object.keys(finalAnswer).length > 0) {
            Object.keys(userBase).map((value: string, index: number) => {
                if (value in finalAnswer) {
                    if (Object.values(finalAnswer)[index] === '') {
                        fields += Object.values(userBase)[index] + ', ';
                        error = true;
                    } else {
                        let field = Object.keys(userBase)[index]
                        if (field === 'usercode') {
                            user_code = Object.values(finalAnswer)[index];
                        };

                        if (field === 'useremail') {
                            user_email = Object.values(finalAnswer)[index];
                        };
                    };
                } else {
                    fields += Object.values(userBase)[index] + ', ';
                    error = true;
                };
            });

            if (error) {
                setWarning(`Missing: ${fields.substring(0, fields.length - 2)}`);
            } else {
                isExistent(user_code, user_email);
            };
        } else {
            setWarning('Fill all required Fields!');
        };
    };

    function isExistent(user_code: string, user_email: string) {
        try {
            fetch('http://127.0.0.1:8000/configure_user/existence', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'user_code': user_code,
                    'user_email': user_email,
                })
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        if (data.code == 200) {
                            insertDB();
                        } else {
                            setWarning(data.message);
                        };
                    } else {
                        setWarning('Something went wrong. Try again later.');
                    };
                });
        } catch (e) {
            setWarning(String(e));
        };
    };

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
                                setSuccess('Success!')
                                setTimeout(() => {
                                    router.push('/users');
                                }, 1000)
                                break;
                            default:
                                setWarning(key);
                                break;
                        };
                    } else {
                        setWarning('Something went wrong. Try again later.');
                    };
                });
        } catch (e) {
            setWarning(String(e));
        };
    };

    function handleMessages() {
        setWarning('');
    };

    return (
        <>
            {
                screen && (
                    <div className='bg-gray-900 min-h-screen flex flex-col'>
                        {warning && (
                            <WarningToast
                                message={warning}
                                onClose={() => handleMessages()}
                                type='error'
                            />
                        )}
                        {success && (
                            <WarningToast
                                message={success}
                                onClose={() => handleMessages()}
                                type='success'
                            />
                        )}
                        <div className='bg-gray-700 my-10 min-w-[800px] max-w-4xl w-full mx-auto rounded-lg p-5'>
                            <div className='grid grid-cols-2 h-fit gap-x-10'>
                                <div className='w-full grid grid-cols-2 gap-x-10 col-start-2'>
                                    <button onClick={() => handleFinalAnswer()} className='px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-blue-500 hover:ring-1 hover:bg-blue-50'>Confirm</button>
                                    <button onClick={router.back} className='px-3 py-2 bg-white rounded border w-full cursor-pointer hover:ring-red-500 hover:ring-1 hover:bg-red-50'>Close</button>
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