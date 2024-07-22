import { routes } from './instruction.js';
    import { routeImages } from './routeImages.js';

    function scrollToSearch() {
      const searchSection = document.getElementById('search-section');
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }

    document.getElementById('routeForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const start = document.getElementById('start').value;
      const destination = document.getElementById('destination').value;
      
      const routeKey = `${start}-${destination}`;
      const routeInstructions = routes[routeKey];
      const images = routeImages[routeKey];
      
      const routeDiv = document.getElementById('route');
      routeDiv.innerHTML = '';

      const map = document.getElementById('map');
      map.style.display = 'none';

      if (routeInstructions) {
        routeInstructions.forEach((instruction, index) => {
          const instructionDiv = document.createElement('div');
          instructionDiv.className = 'instruction';
          instructionDiv.id = `instruction-${index}`;
          
          const instructionText = document.createElement('p');
          instructionText.textContent = instruction;
          instructionDiv.appendChild(instructionText);
          
          const nextButton = document.createElement('button');
          nextButton.textContent = 'Next';
          nextButton.className = 'btn btn-primary';
          nextButton.onclick = function() {
            document.getElementById(`instruction-${index}`).style.display = 'none';
            if (index + 1 < routeInstructions.length) {
              document.getElementById(`instruction-${index + 1}`).style.display = 'block';
              if (index + 1 < images.length) {
                map.src = images[index + 1];
              } else {
                map.style.display = 'none';
              }
            } else {
              const destinationMessage = document.createElement('p');
              destinationMessage.textContent = "You've reached your destination!";
              routeDiv.appendChild(destinationMessage);
            }
          };
          instructionDiv.appendChild(nextButton);

          const previousButton = document.createElement('button');
          previousButton.textContent = 'Previous';
          previousButton.className = 'btn btn-primary';
          previousButton.onclick = function() {
            if (index - 1 >= 0) {
              document.getElementById(`instruction-${index}`).style.display = 'none';
              document.getElementById(`instruction-${index - 1}`).style.display = 'block';
              if (index - 1 < images.length) {
                map.src = images[index - 1];
              } else {
                map.style.display = 'none';
              }
            }
          };
          instructionDiv.appendChild(previousButton);
          
          routeDiv.appendChild(instructionDiv);
        });
        
        document.getElementById('instruction-0').style.display = 'block';
        map.src = images[0];
        map.style.display = 'block';
      } else {
        routeDiv.textContent = 'No route available for the selected combination.';
      }
    });