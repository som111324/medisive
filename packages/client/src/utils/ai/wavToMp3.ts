// First install the package: npm install @breezystack/lamejs
import { Mp3Encoder } from "@breezystack/lamejs";

/**
 * Convert WAV Blob to MP3 Blob using @breezystack/lamejs npm package
 * @param wavBlob - The WAV audio blob to convert
 * @param bitrate - MP3 bitrate in kbps (default: 128)
 * @returns Promise<Blob> - The converted MP3 blob
 */
export async function convertWavToMp3(
    wavBlob: Blob,
    bitrate: number = 128,
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = async () => {
            try {
                const arrayBuffer = fileReader.result as ArrayBuffer;
                const audioContext = new (window.AudioContext ||
                    (window as any).webkitAudioContext)();

                // Decode the WAV data to AudioBuffer
                const audioBuffer =
                    await audioContext.decodeAudioData(arrayBuffer);

                // Get audio properties
                const channels = audioBuffer.numberOfChannels;
                const sampleRate = audioBuffer.sampleRate;
                const length = audioBuffer.length;

                // Initialize MP3 encoder
                const mp3encoder = new Mp3Encoder(
                    channels,
                    sampleRate,
                    bitrate,
                );
                const mp3Data: Uint8Array[] = [];

                // Process audio data based on channel configuration
                if (channels === 1) {
                    // Mono audio processing
                    const samples = convertFloat32ToInt16(
                        audioBuffer.getChannelData(0),
                    );
                    const mp3Buffer = mp3encoder.encodeBuffer(samples);
                    if (mp3Buffer.length > 0) {
                        mp3Data.push(mp3Buffer);
                    }
                } else if (channels === 2) {
                    // Stereo audio processing
                    const leftChannel = convertFloat32ToInt16(
                        audioBuffer.getChannelData(0),
                    );
                    const rightChannel = convertFloat32ToInt16(
                        audioBuffer.getChannelData(1),
                    );
                    const mp3Buffer = mp3encoder.encodeBuffer(
                        leftChannel,
                        rightChannel,
                    );
                    if (mp3Buffer.length > 0) {
                        mp3Data.push(mp3Buffer);
                    }
                } else {
                    // Handle multi-channel by downmixing to stereo
                    const leftChannel = convertFloat32ToInt16(
                        audioBuffer.getChannelData(0),
                    );
                    const rightChannel =
                        channels > 1
                            ? convertFloat32ToInt16(
                                  audioBuffer.getChannelData(1),
                              )
                            : leftChannel;
                    const mp3Buffer = mp3encoder.encodeBuffer(
                        leftChannel,
                        rightChannel,
                    );
                    if (mp3Buffer.length > 0) {
                        mp3Data.push(mp3Buffer);
                    }
                }

                // Flush remaining encoder data
                const remainingBuffer = mp3encoder.flush();
                if (remainingBuffer.length > 0) {
                    mp3Data.push(remainingBuffer);
                }

                // Create final MP3 blob
                const mp3Blob = new Blob(mp3Data, { type: "audio/mp3" });
                resolve(mp3Blob);
            } catch (error) {
                reject(
                    new Error(
                        `MP3 conversion failed: ${(error as Error).message}`,
                    ),
                );
            }
        };

        fileReader.onerror = () => {
            reject(new Error("Failed to read WAV blob"));
        };

        // Start reading the WAV blob
        fileReader.readAsArrayBuffer(wavBlob);
    });
}

/**
 * Convert Float32Array audio data to Int16Array
 * @param buffer - Float32Array containing audio samples
 * @returns Int16Array - Converted 16-bit audio samples
 */
function convertFloat32ToInt16(buffer: Float32Array): Int16Array {
    const length = buffer.length;
    const result = new Int16Array(length);

    for (let i = 0; i < length; i++) {
        // Clamp the float32 value to [-1, 1] range and convert to 16-bit
        const clampedValue = Math.max(-1, Math.min(1, buffer[i]));
        result[i] = Math.round(clampedValue * 0x7fff);
    }

    return result;
}

// Usage example:
// const mp3Blob: Blob = await convertWavToMp3(audioBlob, 128);
