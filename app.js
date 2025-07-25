


function apifun(state_name){

  console.log(state_name)
}
let api='https://heritage-api.herokuapp.com/api/india'

// Function to handle clicks on states
function apifun(state_name) {
  console.log(state_name);
}

// Fetch heritage data from external API
async function fetchHeritageData() {
  try {
    const response = await fetch('https://heritage-api.herokuapp.com/api/india');
    const data = await response.json();
    console.log("Heritage API Data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch heritage data:", error);
    return [];
  }
}
console.log("✅ app.js is connected and running!");

document.addEventListener("DOMContentLoaded", function () {
  let culturalData = {};
  const popup = document.getElementById("data-container");
  let popupManuallyClosed = false;
  let hoverTimeout = null;

  // Function to load data from the JSON file
  async function loadData() {
    try {
      const response = await fetch("cultural_data.json");
      culturalData = await response.json();
      console.log("Cultural data loaded:", culturalData); // Debugging
      attachEventsToSVG();
    } catch (error) {
      console.error("Error loading cultural data:", error);
    }
  }

  // Function to show the popup with cultural data
  function showPopup(data) {
    // Update the content of the popup
    document.getElementById("state").textContent = "State: " + data.state;
    document.getElementById("dance").textContent = "Dance: " + data.dance;
    document.getElementById("music").textContent = "Music: " + data.music;
    document.getElementById("temples").textContent = "Temples: " + data.temples.join(", ");
    document.getElementById("clothing").textContent = "Clothing: " + data.clothing;
    document.getElementById("language").textContent = "Language: " + data.language;
    document.getElementById("festivals").textContent = "Festivals: " + data.festivals;
    document.getElementById("food").textContent = "Food: " + data.food;
    

    const templeImage = document.getElementById("temple_image");
    templeImage.src = data.temple_image;
    templeImage.alt = data.state + " Temple";
    templeImage.onerror = () => {
      templeImage.src = "images/temples/placeholder.jpg";
    };

    // Only display if not manually closed
    if (!popupManuallyClosed) {
      popup.style.display = "grid";
      console.log("Popup displayed for:", data.state); // Debugging
    }
  }

  // Attach hover events to the SVG elements for states
  function attachEventsToSVG() {
    Object.keys(culturalData).forEach((stateCode) => {
      const svgId = "IN-" + stateCode.toUpperCase();
      const el = document.getElementById(svgId);
    
      if (el) {
        console.log("SVG element found for state:", stateCode); // Debugging
      
        // Hovering over state to show popup
        el.addEventListener("mouseenter", () => {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            // Update popup content and display it
            showPopup(culturalData[stateCode]);
            popupManuallyClosed = false; // Ensure it shows on new hover
          }, 200);
        });

        // Mouse leave event to hide the popup if not hovering over popup
        el.addEventListener("mouseleave", () => {
          clearTimeout(hoverTimeout);
          setTimeout(() => {
            if (!popup.matches(":hover") && !popupManuallyClosed) {
              popup.style.display = "none";
              console.log("Popup hidden"); // Debugging
            }
          }, 150);
        });

        // Clicking on state redirects to detailed page
        const stateLinks = {
          "IN-AP": "pages/ap/ap.html",
          "IN-AR": "pages/ar/ar.html",
          "IN-AS":"pages/as/as.html",
          "IN-BR":"pages/br/br.html",
          "IN-CT":"pages/ct/ct.html",
          "IN-GA":"pages/ga/ga.html",
          "IN-GJ":"pages/gj/gj.html",
          "IN-HR":"pages/hr/hr.html",
          "IN-HP":"pages/hp/hp.html",
          "IN-JH":"pages/jh/jh.html",
          "IN-MN":"pages/mn/mn.html",
          "IN-ML":"pages/ml/ml.html",
          "IN-MZ":"pages/mz/mz.html",
          "IN-NL":"pages/nl/nl.html",
          "IN-OR":"pages/or/or.html",
          "IN-PB":"pages/pb/pb.html",
          "IN-RJ":"pages/rj/rj.html",
          "IN-SK":"pages/sk/sk.html",
          "IN-TN":"pages/tn/tn.html",
          "IN-TG":"pages/tg/tg.html",
          "TN-TR":"pages/tr/tr.html",
          "IN-UP":"pages/up/up.html",
          // Add more states here
        };
        
        Object.keys(stateLinks).forEach(stateId => {
          const element = document.getElementById(stateId);
          if (element) {
            element.style.cursor = "pointer";
            element.addEventListener("click", () => {
              window.location.href = stateLinks[stateId];
            });
          }
        }); 
        
    el.addEventListener("click", () => {
      const stateCode = el.id.replace("IN-", "").toLowerCase(); // Extracts 'ap', 'tg', etc.
      window.location.href = `pages/${stateCode}.html?state=${stateCode}`;
      console.log("Redirecting to:", url); // 👈 check console
  window.location.href = url;
    });
  }
  else {
    console.error("SVG element not found for state:", stateCode);
  }
});
}  
  // Close button event listener
  document.getElementById("close").addEventListener("click", () => {
    popup.style.display = "none";
    popupManuallyClosed = true;
  });


  // Load the data and initialize events
  loadData();
});
  




