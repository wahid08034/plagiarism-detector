import React, { useState } from "react";

function App() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const checkText = async () => {
        const response = await fetch("/api/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text1: text, text2: "" })
        });
        const data = await response.json();
        setResult(`Plagiarism: ${data.plagiarism_score}% | AI: ${data.ai_generated}`);
    };

    return (
        <div>
            <h1>Plagiarism & AI Detector</h1>
            <textarea value={text} onChange={e => setText(e.target.value)} />
            <button onClick={checkText}>Check</button>
            <h3>{result}</h3>
        </div>
    );
}

export default App;
