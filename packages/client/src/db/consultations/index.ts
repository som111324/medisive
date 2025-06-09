import supabase from "../../utils/supabase/client";

export async function createConsultation(newConsultation: any) {
    console.log(newConsultation);
    const { data, error } = await supabase
        .from("consultations")
        .insert({
            transcription: newConsultation.transcription,
            summary: newConsultation.summary,
            doctor_id: newConsultation.doctor_id,
            patient_id: newConsultation.patient_id,
            chief_complaint: newConsultation.chief_complaint,
            symptoms: newConsultation.symptoms,
            treatment: newConsultation.treatment,
            follow_up: newConsultation.follow_up,
        })
        .select(`*, doctor:users!doctor_id(*), patient:users!patient_id(*)`);
    // .select();

    if (error) {
        console.log("error", error);
        return {
            success: false,
            data: null,
        };
    }

    return {
        success: true,
        data: data,
    };
}

export async function getAllConsultationsByDoctor(doctorId: string) {
    try {
        console.log("doctorId", doctorId);

        const { data, error } = await supabase
            .from("consultations")
            .select(`*, doctor:users!doctor_id(*), patient:users!patient_id(*)`)
            .eq("doctor_id", doctorId);

        if (error) {
            console.log("error in catch in getAllConsultationsByDoctor", error);
            return {
                success: false,
                data: null,
            };
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.log("error in catch in getAllConsultationsByDoctor", error);
        return {
            success: false,
            data: null,
        };
    }
}

export async function getAllConsultationsByPatient(patientId: string) {
    try {
        console.log("patientId", patientId);

        const { data, error } = await supabase
            .from("consultations")
            .select(`*, doctor:users!doctor_id(*), patient:users!patient_id(*)`)
            .eq("patient_id", patientId);

        if (error) {
            console.log(
                "error in catch in getAllConsultationsByPatient",
                error,
            );
            return {
                success: false,
                data: null,
            };
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.log("error in catch in getAllConsultationsByPatient", error);
        return {
            success: false,
            data: null,
        };
    }
}

export async function getConsultation(id: string) {
    try {
        console.log("consultationId", id);

        const { data, error } = await supabase
            .from("consultations")
            .select(`*, doctor:users!doctor_id(*), patient:users!patient_id(*)`)
            .eq("id", id);

        if (error) {
            console.log("error in catch in getConsultation", error);
            return {
                success: false,
                data: null,
            };
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.log("error in catch in getConsultation", error);
        return {
            success: false,
            data: null,
        };
    }
}
