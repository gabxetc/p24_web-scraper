// Set user information (Assuming stored in localStorage previously)
document.addEventListener("DOMContentLoaded", function () {
    
    const dataDisplay = document.getElementById("dataDisplay");
    dataDisplay.textContent = "JavaScript is connected!";

    console.log("JavaScript is connected");
  
    // Fetch JSON data from the properties.json file
    fetch("properties.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
  
        // Loop through the array and display each property
        data.forEach((property) => {
          const propertyDiv = document.createElement("div");
          propertyDiv.classList.add("property");
  
          // const linkElement = document.createElement("p");
          // linkElement.textContent = "Link: " + property.link;
          
          const linkElement = document.createElement("a");
          linkElement.href = property.link; // Set the href to the property iter, link
          linkElement.textContent = property.link; // Set the text content for the link
          linkElement.target = "_blank"; 
  
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
  