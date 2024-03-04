import React, { useState } from 'react';

function App() {
    const [history, setHistory] = useState([]);
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:5173/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ history: history, question: question })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud fetch: ' + response.statusText);
            }

            const data = await response.json();
            
            setHistory(data.history);
            
            setQuestion('');
        } catch (error) {
            console.error(error);
            
        }
    };

    const handleInputChange = (e) => {
        setQuestion(e.target.value); 
    };

    return (
        <div className="App">
            <div className="chat-container">
                {history.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.parts}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={question}
                    onChange={handleInputChange}
                    placeholder="Escribe tu pregunta..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App;
