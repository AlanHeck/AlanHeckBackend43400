const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    let response = await fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let result = await response.json();

    if (result.status != "sucess") {
        Swal.fire({
            icon: "error",
            title: "...Oops",
            text: result.error,
        });
    } else {
        window.location.href = "/";
    }
});
