export interface Patient {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    blood_type: string | null;
    allergies: string[] | null;
    chronic_conditions: string[] | null;
    date_of_birth: string;
    gender: string;
    age: number;
    last_visit?: string;
}
