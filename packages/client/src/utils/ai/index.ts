import OpenAI from "openai";
import { convertWavToMp3 } from "./wavToMp3";

// OpenAI for Whisper
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function speechToText(audioBlob: Blob | null, audioUrl: string) {
    try {
        // Step 1: Convert audio to MP3
        // await new Promise((resolve, reject) => {
        //   ffmpeg(audioUrl)
        //     .toFormat("mp3")
        //     .save(convertedPath)
        //     .on("end", resolve)
        //     .on("error", reject);
        // });

        if (!audioBlob) {
            alert("blob is null");
            return;
        }

        const mp3Blob = await convertWavToMp3(audioBlob);
        console.log(mp3Blob);

        // Step 2: Transcribe using Whisper
        const transcription = await openai.audio.transcriptions.create({
            file: mp3Blob,
            model: "whisper-1",
            language: "en", // or auto
        });

        const rawText = transcription.text;
        console.log(rawText);
    } catch (error) {
        console.error("Error:", error);
        return;
    }
    // });
}
