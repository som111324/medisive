// Textarea Component
interface TextareaProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    error?: string;
    fullWidth?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    id,
    value,
    onChange,
    placeholder,
    rows = 3,
    error,
    fullWidth = false,
}) => {
    return (
        <div className={fullWidth ? "w-full" : ""}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`block w-full px-3 py-2 border ${
                    error ? "border-red-300 bg-red-50" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Textarea;
