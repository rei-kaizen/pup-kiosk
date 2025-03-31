// Area data - stores information for each area
const areaData = {
    1: {
        imgSource: "images/pylon.jpg",
        heading: "The Pylon",
        description: "The Pylon originally stood for the true, the good, and the beautiful. It is one of the most iconic landmarks of PUP, symbolizing the university's commitment to excellence and values."
    },
    2: {
        imgSource: "images/mural.jpg",
        heading: "The Mural",
        description: "The Mural is a cut and welded brass mural relief (2.5 x 9.3 meters) built by national artist Eduardo Castrillo in 1974. It represents the struggles and achievements of the Filipino people."
    },
    3: {
        imgSource: "images/lounge.jpg",
        heading: "Visitor's Lounge",
        description: "The Visitor's Lounge serves as a reception area for campus guests and provides a comfortable space for waiting and small meetings."
    },
    4: {
        imgSource: "images/open-court.jpg",
        heading: "Open Court",
        description: "The Open Court is a versatile space used for various university events, sports activities, and student gatherings, promoting camaraderie and physical fitness among students."
    },
    5: {
        imgSource: "images/tennis-court.jpg",
        heading: "Law Tennis Court",
        description: "The Law Tennis Court provides a dedicated space for students, faculty, and staff to engage in recreational and competitive tennis matches, supporting a healthy and active lifestyle."
    },
    6: {
        imgSource: "images/basketball-court.jpg",
        heading: "Basketball Court",
        description: "A popular hub for student-athletes and sports enthusiasts, the Basketball Court hosts intramural games, varsity training, and casual play, fostering school spirit and teamwork."
    },
    7: {
        imgSource: "images/souvenir-shop.jpg",
        heading: "Souvenir Shop",
        description: "The Souvenir Shop offers a variety of PUP merchandise, including shirts, accessories, and memorabilia, allowing students and visitors to take home a piece of the university's identity."
    },
    8: {
        imgSource: "images/mabini-shrine.jpg",
        heading: "Mabini Shrine",
        description: "The Mabini Shrine honors Apolinario Mabini, the 'Brains of the Revolution.' It serves as a historical site where visitors can learn about his contributions to Philippine independence."
    },
    9: {
        imgSource: "images/mabini-museum.jpg",
        heading: "Mabini Museum",
        description: "Located within the PUP campus, the Mabini Museum houses artifacts, writings, and memorabilia related to Apolinario Mabini, preserving his legacy and influence on Philippine history."
    },
    10: {
        imgSource: "images/obelisk.jpg",
        heading: "Obelisk",
        description: "The Obelisk stands as a symbol of PUP's enduring legacy and mission of providing quality education. It represents strength, knowledge, and the university's commitment to national development."
    },
};

// Function to show the scenery box with area information
function showSceneryBox(imgSource, heading, description) {
    const sceneryBox = document.getElementById('scenery-box');
    const sceneryImg = document.getElementById('scenery-img');
    const sceneryHeading = document.getElementById('scenery-heading');
    const sceneryDescription = document.getElementById('scenery-description');
    
    // Set content
    sceneryImg.src = imgSource;
    sceneryHeading.textContent = heading;
    sceneryDescription.textContent = description;
    
    // Display the box
    sceneryBox.style.display = 'block';
}

// Function to align the scenery box near the cursor/area
function alignSceneryBox(x, y) {
    const sceneryBox = document.getElementById('scenery-box');
    const mapContainer = document.querySelector('.map-container');
    const containerRect = mapContainer.getBoundingClientRect();
    
    // Calculate position (adjust these values based on testing)
    const offsetX = 30; // Increased distance from cursor/highlight
    const offsetY = 20; // Increased offset
    
    // Position relative to the map container
    let posX = x + offsetX;
    let posY = y - offsetY;
    
    // Make sure the box doesn't go off-screen
    const boxWidth = sceneryBox.offsetWidth;
    const boxHeight = sceneryBox.offsetHeight;
    
    if (posX + boxWidth > containerRect.width) {
        posX = x - boxWidth - offsetX; // Position to the left if not enough space on the right
    }
    
    if (posY + boxHeight > containerRect.height) {
        posY = containerRect.height - boxHeight - 10; // Keep it within the container
    }
    
    if (posY < 0) {
        posY = 10; // Don't go above the top
    }
    
    // Set the position
    sceneryBox.style.left = posX + 'px';
    sceneryBox.style.top = posY + 'px';
}

// Function to remove/hide the scenery box
function removeSceneryBox() {
    const sceneryBox = document.getElementById('scenery-box');
    sceneryBox.style.display = 'none';
}

// Improved function to show highlight around a map area
function showHighlight(shapeType, coords) {
    const highlightEl = document.getElementById('highlight-element');
    const mapImg = document.getElementById('pup-map-img');
    const mapRect = mapImg.getBoundingClientRect();
    const imgWidth = mapImg.width;
    const imgHeight = mapImg.height;
    
    // For a circle
    if (shapeType === 'circle') {
        const [centerX, centerY, radius] = coords;
        
        // Calculate scale factor for responsive design
        const scaleX = imgWidth / mapImg.naturalWidth;
        const scaleY = imgHeight / mapImg.naturalHeight;
        
        // Apply scale
        const scaledX = centerX * scaleX;
        const scaledY = centerY * scaleY;
        const scaledRadius = radius * scaleX; // Using scaleX for simplicity
        
        // Position and size the highlight - using transform to center it
        highlightEl.style.left = scaledX + 'px';
        highlightEl.style.top = scaledY + 'px';
        highlightEl.style.width = (scaledRadius * 2) + 'px';
        highlightEl.style.height = (scaledRadius * 2) + 'px';
        highlightEl.style.display = 'block';
        
        // Return center coordinates for positioning the info box
        return [scaledX, scaledY];
    }
    // Add support for other shapes (rect, poly) if needed
    
    return [0, 0]; // Default return
}

// Function to hide the highlight
function hideHighlight() {
    const highlightEl = document.getElementById('highlight-element');
    highlightEl.style.display = 'none';
}

// Function to activate an area (show highlight and info)
function activateArea(areaId, shapeType, coords) {
    // Show highlight
    const [centerX, centerY] = showHighlight(shapeType, coords);
    
    // Get area data
    const area = areaData[areaId];
    if (area) {
        // Show scenery box
        showSceneryBox(area.imgSource, area.heading, area.description);
        
        // Align the box
        alignSceneryBox(centerX, centerY);
    }
}

// Function to deactivate an area
function deactivateArea() {
    hideHighlight();
    removeSceneryBox();
}

// Add event listener to handle image loading
window.addEventListener('load', function() {
    // You can add initialization code here if needed
    console.log('PUP KIOSK application loaded successfully!');
    
    // Get the natural dimensions of the map image for scaling calculations
    const mapImg = document.getElementById('pup-map-img');
    mapImg.onload = function() {
        console.log(`Map natural dimensions: ${mapImg.naturalWidth} x ${mapImg.naturalHeight}`);
    };
});