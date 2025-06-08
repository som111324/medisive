// Select Component
interface SelectProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    leftIcon?: React.ReactNode;
    error?: string;
    fullWidth?: boolean;
    required?: boolean;
}

const Select: React.FC<SelectProps> = ({
    label,
    id,
    value,
    onChange,
    options,
    leftIcon,
    error,
    fullWidth = false,
    required = false,
}) => {
    return (
        <div className={fullWidth ? "w-full" : ""}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 z-10">
                        {leftIcon}
                    </div>
                )}
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`block w-full ${leftIcon ? "pl-10" : "pl-3"} pr-8 py-2 border ${
                        error ? "border-red-300 bg-red-50" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white`}
                >
                    <option value="">Select...</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Select;
