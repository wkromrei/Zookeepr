document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add");
  const deleteButton = document.getElementById("delete");

  addButton.addEventListener("click", async function () {
    const name = prompt("Enter the name of the new animal:");
    const description = prompt("Enter the description of the new animal:");
    const amount = parseInt(prompt("Enter the amount of the new animal:"));

    console.log(name, description, amount);

    // Adding an animal
    try {
      const response = await fetch("/animal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          amount: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create animal");
      }

      location.reload();
    } catch (error) {
      console.error("Error creating animal:", error);
      alert("Failed to create animal. Please try again.");
    }
  });

  deleteButton.addEventListener("click", async function () {
    const animalId = prompt("Enter the ID of the animal to delete:");
    const amountToDelete = parseInt(
      prompt("Enter the amount to delete from the animal:")
    );

    console.log(animalId, amountToDelete);
    // deleting an animal
    try {
      const response = await fetch(`/animal/${animalId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountToDelete,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete animal");
      }

      location.reload();
    } catch (error) {
      console.error("Error deleting animal:", error);
      alert("Failed to delete animal. Please try again.");
    }
  });
});
