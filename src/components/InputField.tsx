import React from 'react'

interface Props {
    name: string
    id?: string
    labelContent: string
    typeInput: string
    register: any
    autocomplete?: string
    pattern?: string
    placeholder?: string
    onBlur?: any
}

const InputField = ({
    name,
    typeInput,
    labelContent,
    register,
    autocomplete,
    pattern,
    placeholder,
    onBlur
}: Props) => {
    return (
        <>
            <label className="font-bold ml-4 dark:text-gray-200 text-black" htmlFor={name}>
                {labelContent}
            </label>
            <div className="mb-2 w-84">
                <input
                    className="text-lg text-black ml-3 w-80 pl-2 py-3
                     focus:border-blue-500 focus:outline-none border
                      border-gray-900 dark:border-white rounded-md
                      dark:bg-gray-600 dark:focus:border-purple-500
                      dark:text-gray-200"
                    type={typeInput}
                    name={name}
                    id={name}
                    ref={register}
                    autoComplete={autocomplete}
                    pattern={pattern}
                    placeholder={placeholder}
                    onBlur={onBlur}
                />
            </div>
        </>
    )
}

const Error = ({ error }: string | any) => {
    return (
        <>
            <p className="text-red-500 text-left pl-4 mb-2">{error}</p>
        </>
    )
}

export { InputField, Error }
