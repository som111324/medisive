// Section Component
interface SectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({
    title,
    icon,
    children,
    className = "",
}) => {
    return (
        <div className={`mb-6 ${className}`}>
            <div className="flex items-center mb-3">
                <div className="text-blue-600 mr-2">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">{children}</div>
        </div>
    );
};

export default Section;
