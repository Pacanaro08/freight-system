'use client'

const users: Record<string, any>[] = [
    { Usuario: 'Pietro', nome: 'Pietro', age: '30', raca: 'humano' },
    { Usuario: 'Luna', nome: 'Luna', age: '30', raca: 'maltes' },
]

function teste() {

    const headers = Object.keys(users[0])

    return (
        <div className="bg-gray-900 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                    <table className="table-auto min-w-[800px] w-full border-collapse">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                {headers.map(header => (
                                    <th className="px-6 py-3 min-w-[200px] text-left" key={header}>{header.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {users.map((user, index) => (
                                <tr className="border-b hover:bg-gray-200" onClick={() => console.log(user)} key={index}>
                                    {headers.map(header => (
                                        <td className="px-6 py-3 text-left" key={header}>{user[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default teste;