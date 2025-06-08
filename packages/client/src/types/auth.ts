import { Doctor } from "./doctor";
import { Patient } from "./patient";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export interface AuthState {
    user: any;
    isAuthenticated: boolean;
    isLoading: boolean;
}

/*
Prompt: 
Given a transcription of a conversation between doctor and patient in the form of array of strings, generate a report, with output in the form of json only with fields - cheif_complaint, summary, treatment, symptoms and follow_up. If no information is provided for a certain point, provide an empty string for it. Transcription - ["Good morning, Mr. Sharma. What brings you in today?","Good morning, Doctor. I've been feeling quite tired lately, more than usual, and I've also had this persistent cough for about two weeks now.","I see. Can you describe the cough for me? Is it dry, or are you bringing anything up?","It's mostly dry, but sometimes, especially in the mornings, I feel a bit of phlegm. It's not a lot though.","Any other symptoms you've noticed? Fever, chills, body aches?","No fever, thankfully. I did have a slight headache a few days ago, but that's gone now. No body aches either.","Okay. Have you been around anyone who's been sick recently?","My son had a bit of a cold last week, but he's fine now. Nothing serious, just a runny nose and a sniffle.","And how long have you been feeling this general fatigue?","It's been about three weeks, maybe a month. I just feel drained even after a full night's sleep.","Are you having any trouble sleeping?","Not really. I fall asleep fine, but I wake up feeling like I haven't rested at all.","Have there been any changes in your diet or lifestyle recently?","Not really. Everything's pretty much the same. I try to eat healthy, and I go for a walk most days.","Are you experiencing any shortness of breath, especially when you're active?","A little bit, yes. When I walk up the stairs, I find myself a bit more winded than usual.","Alright. Let's take a look. I'll listen to your chest and then we'll consider some blood tests.","Okay, Doctor.","Breathe deeply for me, please. In and out.","Is everything alright?","Your breathing sounds a little wheezy, Mr. Sharma. Nothing too concerning at this point, but it's good we're looking into it.","So, what do you think it could be?","It could be a number of things. Given the persistent cough and fatigue, we need to rule out a few possibilities. The blood tests will give us a clearer picture.","What kind of blood tests?","We'll do a complete blood count, and also check your thyroid function and some inflammatory markers. This will help us understand if there's an underlying infection or another condition causing your symptoms.","How long will the results take?","You should have them back in about two or three days. Once we get those, we can discuss the next steps.","And in the meantime, what should I do about the cough?","For now, I'd recommend drinking plenty of fluids, warm water with honey can be soothing. Avoid irritants like smoke, and get plenty of rest. If the cough worsens significantly or you develop a fever, please contact us immediately.","Okay, I'll do that. Thank you, Doctor.", "You're welcome, Mr. Sharma. We'll be in touch once the results are in."];

 */
