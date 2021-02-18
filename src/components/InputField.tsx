import React from 'react';

interface Props {
    name: string;
    id?: string;
    labelContent: string;
    typeInput: string;
    register: any;
    autocomplete?: string
}

const InputField = ({
    name,
    typeInput,
    labelContent,
    register,
    autocomplete
}: Props) => {
    return (
        <>
            <label className="font-bold ml-4" htmlFor={name}>{labelContent} </label>
            <div className="mb-2 w-92">
                <input
                    className="text-lg ml-3 w-64 sm:w-80 pl-2 py-3 focus:border-blue-500 focus:outline-none border border-gray-900 rounded-md"
                    type={typeInput}
                    name={name}
                    id={name}
                    ref={register()}
                    autoComplete={autocomplete}
                />
            </div>
        </>
    );
};

const Error = ({ error }: string | any) => {
    return (
        <>
            <p className="text-red-500 text-left pl-4 mb-2">{error}</p>
        </>
    );
};

export { InputField, Error };
