async function addToCart(cartId, productId) {
    let response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "POST",
        body: JSON.stringify({ quantity: 1 }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let result = await response.json();
    console.log(result);
}

async function logout() {
    let response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (result.status === "sucess") window.location.href = "/login";
}
