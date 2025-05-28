'use client'

interface GridProps {
    headers: string[],
    data: never[],
}

const Grid: React.FC<GridProps> = ({ headers, data }) => {

    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                <table className="table-auto min-w-[800px] w-full border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-6 py-3 min-w-[74px] text-left" key='buttonDel'></th>
                            <th className="px-6 py-3 min-w-[80px] text-left" key='buttonUpd'></th>
                            <th className="px-6 py-3 min-w-[80px] text-left" key='buttonBra'></th>
                            {headers &&
                                headers.map(header => (
                                    <th className="px-6 py-3 min-w-[200px] text-left" key={header}>{header.toUpperCase()}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data &&
                            data.map((user, index) => (
                                <tr className="border-b hover:bg-gray-200" key={index}>
                                    <td><button onClick={() => console.log(user)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer">Delete</button></td>
                                    <td><button onClick={() => console.log(user)} className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">Update</button></td>
                                    <td><button onClick={() => console.log(user)} className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer">Branches</button></td>
                                    {headers &&
                                        headers.map(header => (
                                            <td className="px-6 py-3 text-left" key={header}>{user[header]}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Grid;