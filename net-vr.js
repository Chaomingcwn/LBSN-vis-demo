const elem = document.getElementById('net-vis-vr');
      let Graph;
      let graphData;
      let selectedNode = null; // Track selected node

      // Load Network Data
      fetch('../data_process/truncated_node_data.json')
          .then(response => response.json())
          .then(data => {
              graphData = data; // Store the data

              Graph = new ForceGraphVR(elem)
                  .graphData(graphData)
                  .nodeAutoColorBy('group')
                  .nodeLabel(node => `${node.id}: ${node.friends} friends`)
                  .onNodeClick(highlightNode);

              // Listen for clicks anywhere in the 3D space
              document.addEventListener('click', handleBackgroundClick);
          })
          .catch(error => console.error("Error loading network data:", error));

      // Function to highlight selected node and grey out unlinked nodes
      function highlightNode(node) {
          selectedNode = node; // Store selected node
          const linkedNodes = new Set();
          const linkedLinks = new Set();

          // Identify directly connected nodes
          graphData.links.forEach(link => {
              if (link.source.id === node.id) {
                  linkedNodes.add(link.target.id);
                  linkedLinks.add(link);
              } else if (link.target.id === node.id) {
                  linkedNodes.add(link.source.id);
                  linkedLinks.add(link);
              }
          });

          // Update node and link colors
          Graph.nodeColor(n => linkedNodes.has(n.id) || n.id === node.id ? "red" : "#888");
          Graph.linkColor(link => linkedLinks.has(link) ? "white" : "#888");
      }

        // Function to reset the graph when clicking empty space
        function handleBackgroundClick(event) {
            if (!selectedNode) return; // No selection to reset
            selectedNode = null; // Clear selection

            // **Reset node colors using nodeAutoColorBy()**
            Graph.nodeAutoColorBy('group');
            Graph.linkColor(() => "white");
        }