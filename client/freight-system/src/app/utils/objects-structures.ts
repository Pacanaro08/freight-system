import { useState, useEffect } from "react";
import { InputClass, DisabledInputClass } from "./input-class"
import { validateToken } from "../utils/validate-token";
import TokenResponse from "../utils/interfaces/token-response";
import FieldsProps from "./interfaces/form-fields"


const UserStructureBase: FieldsProps[] = [
    { className: `${InputClass}`, type: 'text', id: '1', placeholder: 'User Code', maxLength: 50 },
    { className: `${InputClass}`, type: 'text', id: '2', placeholder: 'Name', maxLength: 100 },
    { className: `${InputClass}`, type: 'text', id: '3', placeholder: 'E-Mail', maxLength: 100 },
    { className: `${InputClass}`, type: 'password', id: '4', placeholder: 'Password', maxLength: 50 },
    { className: `${InputClass}`, type: 'select', id: '5', placeholder: 'Status', options: ['Active', 'Inactive'] },
    { className: `${DisabledInputClass}`, type: 'text', id: '6', placeholder: '', disabled: true },
    { className: `${DisabledInputClass}`, type: 'text', id: '7', placeholder: '', disabled: true },
]


function UserStructure() {
    const [list, setList] = useState<TokenResponse | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await validateToken();
            setList(response);
        }
        fetchData();
    }, []);

    const updatedUserStructure = UserStructureBase.map(field => {
        if (field.id === '6') {
            return { ...field, placeholder: list?.companyName || "Loading..." };
        }

        if (field.id === '7') {
            return { ...field, placeholder: list?.branchName || "Loading..." };
        }

        return field;
    });

    return updatedUserStructure;
}


export {
    UserStructure
}