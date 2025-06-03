import FieldsProps from "./interfaces/form-fields"
import InputClass from "./input-class"

const UserStructure: FieldsProps[] = [
    {className: `${InputClass}`, type: 'text', id: '1', placeholder: 'User Code'},
    {className: `${InputClass}`, type: 'text', id: '2', placeholder: 'Name'},
    {className: `${InputClass}`, type: 'text', id: '3', placeholder: 'E-Mail'},
    {className: `${InputClass}`, type: 'text', id: '4', placeholder: 'Company'},
    {className: `${InputClass}`, type: 'text', id: '5', placeholder: 'Branch'},
    {className: `${InputClass}`, type: 'text', id: '6', placeholder: 'Password'},
    {className: `${InputClass}`, type: 'select', id: '7', placeholder: 'Status', options: ['Active', 'Inactive']},
]

export default UserStructure