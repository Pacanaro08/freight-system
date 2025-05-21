'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CompanyProps {
    company_id: string,
    company_name: string,
};

interface BranchProps {
    branch_id: string,
    branch_name: string,
};

function selectBranch() {

    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [warning, setWarning] = useState('');
    const [screen, setScreen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://127.0.0.1:8000/db-procedures/companies', {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        if (data.code == 200) {
                            setScreen(true)
                            setCompanies(data.companies)
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

    function handleSelectedCompany(currentCompany: string) {
        if (currentCompany) {
            setSelectedCompany(currentCompany)

            try {
                fetch('http://127.0.0.1:8000/db-procedures/branches', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'company_id': currentCompany
                    })
                })
                    .then(response => response.json())
                    .then((data) => {
                        if (data) {
                            const key = `${data.code} - ${data.message}`
                            switch (key) {
                                case '200 - Success':
                                    setBranches(data.branches)
                                    break;
                                default:
                                    setWarning(key)
                                    break;
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
        } else {
            setBranches([])
        }
    }

    function goBack() {
        router.back()
    }

    function logIn() {
        if (selectedBranch && selectedCompany) {
            try {
                fetch('http://127.0.0.1:8000/db-procedures/authenticate', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'company_id': selectedCompany,
                        'branch_id': selectedBranch
                    })
                })
                    .then(response => response.json())
                    .then((data) => {
                        if (data) {
                            const key = `${data.code} - ${data.message}`
                            switch (key) {
                                case '200 - Success':
                                    router.push('/home')
                                    break;
                                default:
                                    setWarning(key)
                                    break;
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
        } else {
            setWarning('Select Company and Branch!')
        }
    }

    return (
        <>
            {
                screen && (
                    <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
                        <div className="bg-gray-400 p-8 rounded shadow-md w-96">
                            <h2 className="text-2xl font-bold text-center mb-7">Branches</h2>
                            <div className="mb-4">
                                <select
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
                                    onChange={(e) => handleSelectedCompany(e.target.value)}
                                >
                                    <option key={''} value={''}>Select the Company</option>
                                    {
                                        companies && (
                                            companies.map((company: CompanyProps) => {
                                                return <option key={company.company_id} value={company.company_id}>{company.company_name}</option>
                                            })
                                        )
                                    }
                                </select>
                            </div>
                            <div className="mb-7">
                                <select
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                >
                                    <option key={''} value={''}>Select the Branch</option>
                                    {
                                        branches && (
                                            branches.map((branch: BranchProps) => {
                                                return <option key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</option>
                                            })
                                        )
                                    }
                                </select>
                            </div>
                            {
                                warning && (
                                    <div className='-mt-4 mb-3 flex items-center justify-center'>
                                        <p className='text-red-800'>
                                            {warning}
                                        </p>
                                    </div>
                                )
                            }
                            <button onClick={() => logIn()} className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900 transition mb-3 cursor-pointer">
                                Select
                            </button>
                            <button onClick={() => goBack()} className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-500 transition cursor-pointer">
                                Return
                            </button>
                        </div>
                    </div>
                )}
        </>
    )
}

export default selectBranch