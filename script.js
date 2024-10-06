url = "http://34.173.204.121:5000";

// Handle form submission for inserting data
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const gender = document.getElementById("gender").value;

    if (!name || !gender) {
      showNotification("Please fill in all fields.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);

    fetch(`${url}/insert`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          showNotification(data.error, "error");
        } else {
          showNotification(
            data.message || "Data inserted successfully!",
            "success"
          );
        }
      })
      .catch((error) => {
        showNotification(error.message || "An error occurred", "error");
        console.error("Error:", error);
      });
  });

// Handle form submission for file uploads
document
  .getElementById("fileUploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const file = document.getElementById("file").files[0];
    if (!file) {
      showNotification("Please select a file to upload.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch(`${url}/upload-to-bucket`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          showNotification(data.error, "error");
        } else {
          showNotification("File uploaded successfully!", "success");
          location.reload();
        }
      })
      .catch((error) => {
        showNotification(
          "An error occurred while uploading the file.",
          "error"
        );
        console.error("Error:", error);
      });
  });

// Handle fetching data from the database
document
  .getElementById("fetchDataButton")
  .addEventListener("click", function () {
    fetch(`${url}/fetch`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Clear existing list

        if (data.Users && data.Users.length > 0) {
          data.Users.forEach((user) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Name: ${user[0]}, Gender: ${user[1]}`;
            userList.appendChild(listItem);
          });
        } else {
          showNotification(data.message || "No users found.", "info");
        }
      })
      .catch((error) => {
        showNotification("An error occurred while fetching data.", "error");
        console.error("Error:", error);
      });
  });

// Function to display messages
function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = "notification"; // Reset class

  if (type === "success") {
    notification.style.backgroundColor = "rgba(0, 123, 255, 0.9)";
  } else {
    notification.style.backgroundColor = "rgba(220, 53, 69, 0.9)"; // Red for error
  }

  notification.style.display = "block";
  setTimeout(() => {
    notification.style.opacity = "0"; // Fade out
    setTimeout(() => {
      notification.style.display = "none"; // Hide after fade out
      notification.style.opacity = "1"; // Reset opacity for future use
    }, 500); // Wait for fade out to finish
  }, 5000); // Show for 5 seconds
}
