const API_URL = "/api/check"; // Backend API endpoint

// Function to check plagiarism and AI-generated text
export async function checkText(text) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text1: text, text2: "" }) // Sending only one text input
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        return data; // { plagiarism_score: XX, ai_generated: "Yes/No" }
    } catch (error) {
        console.error("Error checking text:", error);
        return { error: "Failed to analyze text" };
    }
}
