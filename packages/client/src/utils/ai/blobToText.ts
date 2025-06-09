interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}

interface ConvertAudioOptions {
    language?: string;
    continuous?: boolean;
    interimResults?: boolean;
    maxAlternatives?: number;
}

/**
 * Converts an audio Blob to text using the Web Speech API
 * @param audioBlob - The audio Blob to convert
 * @param options - Optional configuration for speech recognition
 * @returns Promise that resolves to the transcribed text
 */
async function convertAudioBlobToText(
    audioBlob: Blob,
    options: ConvertAudioOptions = {},
): Promise<string> {
    return new Promise((resolve, reject) => {
        // Check if Web Speech API is supported
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            reject(
                new Error("Web Speech API is not supported in this browser"),
            );
            return;
        }

        // Create audio element to play the blob
        const audio = new Audio();
        const audioUrl = URL.createObjectURL(audioBlob);
        audio.src = audioUrl;

        // Initialize speech recognition
        const recognition = new SpeechRecognition();

        // Configure recognition settings
        recognition.lang = options.language || "en-US";
        recognition.continuous = options.continuous ?? true;
        recognition.interimResults = options.interimResults ?? false;
        recognition.maxAlternatives = options.maxAlternatives || 1;

        let finalTranscript = "";

        // Set up event handlers
        recognition.onstart = () => {
            console.log("Speech recognition started");
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const transcript = result[0].transcript;

                if (result.isFinal) {
                    finalTranscript += transcript + " ";
                } else {
                    interimTranscript += transcript;
                }
            }

            console.log("interimTranscript", interimTranscript);

            // If we have interim results enabled, you might want to handle them here
            if (options.interimResults && interimTranscript) {
                console.log("Interim result:", interimTranscript);
            }
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
            URL.revokeObjectURL(audioUrl); // Clean up object URL
            resolve(finalTranscript.trim());
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error("Speech recognition error:", event.error);
            URL.revokeObjectURL(audioUrl); // Clean up object URL
            reject(new Error(`Speech recognition error: ${event.error}`));
        };

        // Start playing audio and recognition simultaneously
        audio
            .play()
            .then(() => {
                recognition.start();
            })
            .catch((error) => {
                URL.revokeObjectURL(audioUrl);
                reject(new Error(`Failed to play audio: ${error.message}`));
            });

        // Stop recognition when audio ends
        audio.onended = () => {
            setTimeout(() => {
                recognition.stop();
            }, 1000); // Small delay to catch any remaining speech
        };
    });
}

/**
 * Alternative approach: Convert Blob to MediaStream for real-time recognition
 * This approach uses MediaRecorder API in reverse - useful for pre-recorded audio
async function convertAudioBlobToTextAlternative(
    audioBlob: Blob,
    options: ConvertAudioOptions = {},
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            // Check browser support
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                throw new Error(
                    "Web Speech API is not supported in this browser",
                );
            }

            // Create audio context to process the blob
            const audioContext = new AudioContext();
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Create a buffer source
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;

            // Create a media stream destination
            const dest = audioContext.createMediaStreamDestination();
            source.connect(dest);

            // Set up speech recognition
            const recognition = new SpeechRecognition();
            recognition.lang = options.language || "en-US";
            recognition.continuous = options.continuous ?? true;
            recognition.interimResults = options.interimResults ?? false;

            let transcript = "";

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        transcript += event.results[i][0].transcript + " ";
                    }
                }
            };

            recognition.onend = () => {
                console.log('recognition ended here')
                audioContext.close();
                resolve(transcript.trim());
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                audioContext.close();
                reject(new Error(`Speech recognition error: ${event.error}`));
            };

            // Start recognition and play audio
            recognition.start();
            source.start();

            // Stop recognition when audio ends
            source.onended = () => {
                setTimeout(() => {
                    recognition.stop();
                }, 1000);
            };
        } catch (error) {
            reject(error);
        }
    });
}
 */

// Example usage:
/*
// Basic usage
const audioBlob = new Blob([audioData], { type: 'audio/wav' });
convertAudioBlobToText(audioBlob)
  .then(text => console.log('Transcribed text:', text))
  .catch(error => console.error('Error:', error));

// With options
convertAudioBlobToText(audioBlob, {
  language: 'en-US',
  continuous: true,
  interimResults: false
})
  .then(text => console.log('Transcribed text:', text))
  .catch(error => console.error('Error:', error));
*/

// Export the functions
export { convertAudioBlobToText, convertAudioBlobToTextAlternative };
export type { ConvertAudioOptions, SpeechRecognitionResult };
