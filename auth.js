async function handleGitHubCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
        console.error("❌ GitHub OAuth code not found in URL!");
        alert("GitHub authentication failed: No code found.");
        return;
    }

    console.log("✅ GitHub OAuth Code Received:", code);
    const backendUrl = "https://alietedal.ir:8080";

    try {
        const response = await fetch(`${backendUrl}/api/github-auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("🔄 Response Status:", response.status);
        const data = await response.json();
        console.log("✅ Backend Response:", data);

        if (data.success) {
            window.location.href = "https://etedalpour.github.io/testpage/second-page.html";
        } else {
            alert("❌ GitHub authentication failed: " + data.message);
        }
    } catch (error) {
        console.error("❌ Error communicating with backend:", error);
        alert("Network error: " + error.message);
    }
}

// Add this to help debug CORS issues
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// Automatically call handleGitHubCallback if on the callback page
if (window.location.pathname.includes("callback.html")) {
    handleGitHubCallback();
}
