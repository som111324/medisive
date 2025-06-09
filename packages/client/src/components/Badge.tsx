// Badge Component
interface BadgeProps {
    children: React.ReactNode;
    variant?: "success" | "warning" | "info" | "danger";
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "info",
    className = "",
}) => {
    const variantClasses = {
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-blue-100 text-blue-800",
        danger: "bg-red-100 text-red-800",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;
