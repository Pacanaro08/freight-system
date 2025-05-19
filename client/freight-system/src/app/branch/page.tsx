'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function selectBranch() {

    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://127.0.0.1:8000/db-procedures/companies', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        setCompanies(data.companies)
                    } else {
                        console.log('error')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (e) {
            console.error(e)
        }
    }, [])

    function goBack() {
        router.back()
    }

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
                            setBranches(data.branches)
                        } else {
                            console.log('error')
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (e) {
                console.error(e)
            }
        } else {
            setBranches([])
        }
    }

    function handleSelectedBranch(currentBranch: string) {
        if (currentBranch) {
            // jwt save company and branch
        }
    }

    return (
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
                                companies.map((company: { company_id: string, company_name: string }) => {
                                    return <option key={company.company_id} value={company.company_id}>{company.company_name}</option>
                                })
                            )
                        }
                    </select>
                </div>
                <div className="mb-7">
                    <select
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
                        onChange={(e) => handleSelectedBranch(e.target.value)}
                    >
                        <option key={''} value={''}>Select the Branch</option>
                        {
                            branches && (
                                branches.map((branch: { branch_id: string, branch_name: string }) => {
                                    return <option key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</option>
                                })
                            )
                        }
                    </select>
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