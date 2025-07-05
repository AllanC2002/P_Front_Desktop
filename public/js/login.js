document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const flashContainer = document.getElementById("flash-container");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const payload = {
            User_mail: email,
            password: password
        };

        try {
            const response = await fetch("http://52.203.72.116:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            flashContainer.innerHTML = "";

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.href = "profile.html"; 
            } else {
                flashContainer.innerHTML = `<p class="flash error">Invalid credentials.</p>`;
            }
        } catch (error) {
            console.error("Login error:", error);
            flashContainer.innerHTML = `<p class="flash error">Login service unreachable.</p>`;
        }
    });
});
