export function baseScriptCode() {
const form = document.getElementById('form');
      const firstName = document.getElementById('name');
      const p24_link = document.getElementById('p24_link');
      
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = firstName.value;
        const onlyLink = p24_link.value;

        localStorage.setItem('name', username);
        localStorage.setItem('p24_link', onlyLink);

        window.location.href = "next.html";
      })
      document.getElementById("form").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form refresh
            
            // Get the input value
            const p24Link = document.getElementById("p24_link").value;

            // Send the p24Link to the server
            fetch('http://localhost:8000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: p24Link }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Scraped Data:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          });

      //   document.getElementById("sortForm").addEventListener("submit", function(event) {
      //     event.preventDefault();
      //     const sortOption = document.querySelector('input[name="sort"]:checked').value;
      //   // Send the sort option to the server
      //   fetch('http://localhost:8000/sort', {
      //       method: 'POST',
      //       headers: {
      //           'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ sortValue: sortOption }),
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //       console.log('Sorted Data:', data);
      //   })
      //   .catch(error => {
      //       console.error('Error:', error);
      //   });
      // });
      
}