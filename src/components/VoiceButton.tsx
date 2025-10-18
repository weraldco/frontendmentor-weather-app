/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

declare global {
	interface Window {
		webkitSpeechRecognition: any;
		SpeechRecognition: any;
	}
}

const VoiceButton = ({ setCity }: { setCity: (e: string) => void }) => {
	const [isListening, setIsListening] = useState(false);

	// Get the SpeechRecognition API (some browsers use webkit prefix)
	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	const recognition = new SpeechRecognition();
	recognition.continuous = false; // stop after user stops speaking
	recognition.interimResults = false; // only final results
	recognition.lang = 'en-US'; // language

	const startListening = () => {
		if (!SpeechRecognition) {
			alert('Speech Recognition not supported in this browser.');
			return;
		}
		setIsListening(true);
		recognition.start();
	};

	const stopListening = () => {
		recognition.stop();
		setIsListening(false);
	};

	recognition.onresult = (event: any) => {
		const speechToText = event.results[0][0].transcript;
		setCity(speechToText);
		stopListening();
	};

	recognition.onerror = (event: any) => {
		console.error('Speech recognition error', event.error);
		stopListening();
	};

	return (
		<button
			type="button"
			onClick={isListening ? stopListening : startListening}
			className={`${
				isListening
					? 'bg-red-500'
					: 'bg-[var(--blue-500)] hover:bg-[var(--blue-700)]'
			}  duration-200 cursor-pointer px-3 rounded-xl relative`}
		>
			<img
				src="./images/microphone-solid-full.svg"
				alt="Microphone logo"
				className="w-[35px] text-white"
			/>
			{isListening && (
				<img
					src="./images/microphone-solid-full.svg"
					alt="Microphone logo"
					className="w-[25px] text-white absolute top-3 animate-ping"
				/>
			)}
		</button>
	);
};

export default VoiceButton;
