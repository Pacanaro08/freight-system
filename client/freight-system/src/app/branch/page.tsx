'use client'

import { useRouter } from "next/navigation";
import { Select, ThemeProvider, createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary: {
            main: purple[700],
        }
    }
})

function selectBranch() {

    const router = useRouter();

    function goBack() {
        router.back()
    }

    return (
        <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
            <div className="bg-gray-400 p-8 rounded shadow-md w-96">
                <ThemeProvider theme={theme}>
                    <h2 className="text-2xl font-bold text-center mb-7">Branches</h2>
                    <div className="mb-4">
                        <Select
                            className="w-full"
                            id="company"
                            size="small"
                            color="primary"
                            sx={{ border:'1px solid' }}
                        >

                        </Select>
                    </div>
                    <div className="mb-7">
                        <Select
                            className="w-full"
                            id="branch"
                            size="small"
                            color="primary"
                            sx={{ border:'1px solid' }}
                        >

                        </Select>
                    </div>
                    <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900 transition mb-3 cursor-pointer">
                        Select
                    </button>
                    <button onClick={() => goBack()} className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-500 transition cursor-pointer">
                        Return
                    </button>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default selectBranch