import { scaleLinear } from 'https://esm.sh/d3-scale';

    const weightColor = scaleLinear()
        .domain([0, 100])  // Adjust range based on check-in frequency
        .range(['lightblue', 'darkred'])
        .clamp(true);

    const globeEntity = document.getElementById('globe');
    const tooltip = document.querySelector("#globe-tooltip"); // Select tooltip entity

    const ratio = 10;

    // Function to load check-ins from JSON
    fetch("detailed_checkins.json")
        .then(response => response.json())
        .then(data => {
            console.log("Loaded check-ins:", data);

            // Convert check-ins to hex-bin data
            const checkinData = data.map(entry => ({
                lat: entry.latitude,
                lng: entry.longitude,
                weight: entry.total_checkIns / ratio || 1,  // Use count for weight if available
                label: entry.details || "Unknown Location" // Name of location
            }));

            // Update globe with check-in data
            globeEntity.setAttribute("globe", {
                hexBinPointLat: d => d.lat,
                hexBinPointLng: d => d.lng,
                hexBinPointWeight: d => d.weight,
                hexAltitude: ({ sumWeight }) => sumWeight * 0.0025, // Adjust height dynamically
                hexTopColor: d => weightColor(d.sumWeight),
                hexSideColor: d => weightColor(d.sumWeight)
                // onHover: hoverObj =>{
                //     document.querySelector('#globe-tooltip').setAttribute('value',
                //         hoverObj && hoverObj.type === 'hexbin' ? `${hoverObj.data.points.hexBinPointWeight} check-ins`
                //             : 'Hover over a HB');
                //     console.log("Hover event detected:", hoverObj.data.points)
                //     ;}
            });


            // Apply data to globe
            globeEntity.setAttribute("globe", "hexBinPointsData", checkinData);
        })
        .catch(error => console.error("Error loading check-in data:", error));