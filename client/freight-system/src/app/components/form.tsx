'use client'

import FieldsProps from "../utils/interfaces/form-fields"

interface FormProps {
    fields: FieldsProps[],
}

const Form: React.FC<FormProps> = ({ fields }) => {

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-y-5 gap-x-5 bg-gray-700 min-w-[800px] max-w-4xl w-full mx-auto rounded-lg p-5">
                {
                    fields && (
                        fields.map((field) => {
                            if (field.type === 'text' || field.type === 'password') {
                                return (
                                    <input
                                        className={field.className}
                                        type={field.type}
                                        id={field.id}
                                        key={field.id}
                                        placeholder={field.placeholder}
                                        disabled={field.disabled}
                                        maxLength={field.maxLength}
                                    >
                                    </input>
                                )
                            }

                            if (field.type === 'select' && field.options) {
                                return (
                                    <select id={field.id} key={field.id} className={field.className}>
                                        <option key={''} value={''} className="italic">Select Status</option>
                                        {
                                            field.options.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                        })
                    )
                }
            </div>
        </div>
    )
}

export default Form