import React, { useState, useEffect } from 'react';

interface Option {
    id: number;
    value: string;
}

interface SelectProps {
    options: Option[];
    onChange: (value: string) => void;
    id: string;
    name: string;
    className?: string;
    placeholder?: string;
    register?: any; // Assuming register is a function from a form library like react-hook-form
    defaultValue?: any; // Add defaultValue prop
}

const Select: React.FC<SelectProps> = ({ options, onChange, id, name, className, placeholder, register, defaultValue }) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div>
            <select
                id={id}
                name={name}
                value={selectedValue}
                onChange={handleChange}
                className={className}
                {...(register ? register(name, { required: true }) : {})}
            >
                <option value="" disabled>{placeholder || 'Select an option'}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;