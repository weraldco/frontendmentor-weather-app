import { useState } from 'react';

const VoiceSearch = () => {
	const [text, setText] = useState('');
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

	recognition.onresult = (event) => {
		const speechToText = event.results[0][0].transcript;
		setText(speechToText);
		stopListening();
	};

	recognition.onerror = (event) => {
		console.error('Speech recognition error', event.error);
		stopListening();
	};

	return (
		<div style={{ textAlign: 'center', marginTop: '40px' }}>
			<h2>🎤 Voice Search Demo</h2>
			<button onClick={isListening ? stopListening : startListening}>
				{isListening ? 'Stop Listening' : 'Start Voice Search'}
			</button>
			<p>Recognized Text:</p>
			<h3>{text || 'Say something...'}</h3>
		</div>
	);
};

export default VoiceSearch;
