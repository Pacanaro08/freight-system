import { useState, useEffect } from "react";
import { InputClass, DisabledInputClass } from "./input-class"
import { validateToken } from "../utils/validate-token";
import TokenResponse from "../utils/interfaces/token-response";
import FieldsProps from "./interfaces/form-fields"


const UserStructureBase: FieldsProps[] = [
    { className: `${InputClass}`, type: 'text', id: '1', key: 'usercode', required: true, placeholder: 'User Code *', maxLength: 50 },
    { className: `${InputClass}`, type: 'text', id: '2', key: 'username', required: true, placeholder: 'Name *', maxLength: 100 },
    { className: `${InputClass}`, type: 'text', id: '3', key: 'useremail', required: true, placeholder: 'E-Mail *', maxLength: 100 },
    { className: `${InputClass}`, type: 'password', id: '4', key: 'userpassword', required: true, placeholder: 'Password *', maxLength: 50 },
    { className: `${InputClass}`, type: 'select', id: '5', key: 'userstatus', required: true, placeholder: 'Status *', options: ['Active', 'Inactive'] },
    { className: `${DisabledInputClass}`, type: 'text', id: '6', key: 'usercompany', placeholder: 'Company', disabled: true },
    { className: `${DisabledInputClass}`, type: 'text', id: '7', key: 'userbranch', placeholder: 'Branch', disabled: true },
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
            return { ...field, value: list?.companyName || "Loading..." };
        }

        if (field.id === '7') {
            return { ...field, value: list?.branchName || "Loading..." };
        }

        return field;
    });

    return updatedUserStructure;
}


export {
    UserStructure
}