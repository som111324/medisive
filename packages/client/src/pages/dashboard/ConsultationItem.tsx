import React from "react";
import { ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Consultation } from "../../types/consultation";

interface ConsultationItemProps {
    consultation: Consultation;
    role: string;
}

const ConsultationItem: React.FC<ConsultationItemProps> = ({
    consultation,
    role,
}) => {
    return (
        <Link
            to={`/dashboard/consultation/${consultation.id}`}
            className="block rounded-lg border border-secondary-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <div className="mt-0.5 rounded-md bg-primary-100 p-2 text-primary-600">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h3 className="font-medium text-secondary-900">
                            {role === "DOCTOR"
                                ? consultation.patient.full_name
                                : consultation.doctor.full_name ||
                                  "Unnamed Consultation"}
                        </h3>
                        <p className="mt-1 text-sm text-secondary-500">
                            {new Date(
                                consultation.created_at,
                            ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                        <p className="mt-2 text-sm text-secondary-700 line-clamp-2">
                            {consultation.chief_complaint ||
                                "No summary available"}
                        </p>
                    </div>
                </div>
                <div className="ml-4 flex-shrink-0 self-center text-secondary-400">
                    <ChevronRight size={16} />
                </div>
            </div>
        </Link>
    );
};

export default ConsultationItem;
