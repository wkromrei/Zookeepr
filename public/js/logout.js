document.querySelector("#logout").addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert("Failed to log out");
    }
  } catch (err) {
    console.error("Failed to log out", err);
    alert("Failed to log out");
  }
});
