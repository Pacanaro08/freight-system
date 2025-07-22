'use client'

interface GridProps {
    headers: string[],
    data: never[],
    onDelete: (data: any) => void,
    onUpdate: (data: any) => void,
}

const Grid: React.FC<GridProps> = ({ headers, data, onDelete, onUpdate }) => {

    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                <table className="table-auto min-w-[800px] w-full border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-6 py-3 min-w-[74px] text-left" key='buttonDel'></th>
                            <th className="px-6 py-3 min-w-[80px] text-left" key='buttonUpd'></th>
                            {headers &&
                                headers.map(header => (
                                    <th className="px-6 py-3 min-w-[200px] text-left" key={header}>{header.toUpperCase()}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data &&
                            data.map((data, index) => (
                                <tr className="border-b hover:bg-gray-200" key={index}>
                                    <td><button onClick={() => onDelete(data)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer">Delete</button></td>
                                    <td><button onClick={() => onUpdate(data)} className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">Update</button></td>
                                    {headers &&
                                        headers.map(header => (
                                            <td className="px-6 py-3 text-left" key={header}>{data[header]}</td>
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