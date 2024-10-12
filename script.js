// Set user information (Assuming stored in localStorage previously)
document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("user-name");
    const p24Link = localStorage.getItem("p24-link");
  
    document.getElementById("user-name").textContent = userName;
    document.getElementById("p24-link").textContent = p24Link;
  
    // Fetch JSON data from the properties.json file
    fetch("properties.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const dataDisplay = document.getElementById("dataDisplay");
  
        // Loop through the array and display each property
        data.forEach((property) => {
          const propertyDiv = document.createElement("div");
          propertyDiv.classList.add("property");
  
          const linkElement = document.createElement("p");
          linkElement.textContent = "Link: " + property.link;
  
          const roomsElement = document.createElement("p");
          roomsElement.textContent = "Rooms: " + property.rooms;
  
          const sizeElement = document.createElement("p");
          sizeElement.textContent = "Size: " + property.size;
  
          const priceElement = document.createElement("p");
          priceElement.textContent = "Price: " + property.price;
  
          const locationElement = document.createElement("p");
          locationElement.textContent = "Location: " + property.location;
  
          const dateScrapedElement = document.createElement("p");
          dateScrapedElement.textContent = "Date Scraped: " + property.dateScraped;
  
          // Append all elements to the propertyDiv
          propertyDiv.appendChild(linkElement);
          propertyDiv.appendChild(roomsElement);
          propertyDiv.appendChild(sizeElement);
          propertyDiv.appendChild(priceElement);
          propertyDiv.appendChild(locationElement);
          propertyDiv.appendChild(dateScrapedElement);
  
          // Append propertyDiv to the dataDisplay
          dataDisplay.appendChild(propertyDiv);
        });
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  });
  