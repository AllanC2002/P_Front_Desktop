const GET_PHOTO_URL = "http://174.129.238.113:8080/get-photo";
const GET_PUBLICATIONS_URL = "http://3.219.144.22:8080/my-publications";

// Get token
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

const headers = {
    Authorization: `Bearer ${token}`
};

// Allert message
const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.classList.add("hidden");
            window.location.href = "login.html";
        }, 400);
    }, 2000);
};

// Message flash
const flash = (msg, type = "error") => {
    const div = document.getElementById("flash-messages");
    div.innerHTML = `<div class="flash ${type}">${msg}</div>`;
};

// Load user profile photo
fetch(GET_PHOTO_URL, { headers })
    .then(res => res.ok ? res.blob() : null)
    .then(blob => {
        if (!blob) throw new Error("Photo error");
        const imgUrl = URL.createObjectURL(blob);
        document.getElementById("profile-photo").src = imgUrl;
    })
    .catch(() => flash("Could not load profile photo.", "warning"));

// Load user publications
fetch(GET_PUBLICATIONS_URL, { headers })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("publications");
        container.innerHTML = "";

        data.forEach(pub => {
            const div = document.createElement("div");
            div.classList.add("post");

            const header = document.createElement("div");
            header.classList.add("post-header");

            const date = document.createElement("span");
            date.textContent = pub.Datepublish;
            header.appendChild(date);
            div.appendChild(header);

            const text = document.createElement("div");
            text.classList.add("post-text");
            text.textContent = pub.Text;
            div.appendChild(text);

            if (pub.Multimedia) {
                const img = document.createElement("img");
                img.classList.add("post-image");
                img.src = `data:${pub.Multimedia.content_type};base64,${pub.Multimedia.image_base64}`;
                div.appendChild(img);
            }

            container.appendChild(div);
        });
    })
    .catch(() => flash("Could not load publications.", "warning"));

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    showToast("Logout Sucess.");
});
