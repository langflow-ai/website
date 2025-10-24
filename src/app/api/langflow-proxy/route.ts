import { NextRequest, NextResponse } from 'next/server';

const LANGFLOW_BASE_URL = 'https://host-langflow-production-3bd2.up.railway.app';
const FLOW_ID = '74583fec-a451-4aae-9bc3-7c807a178f37';

// Function to create a server-side rendered flow page
function createFlowEmbedPage(flowData: any, flowId: string, baseUrl: string): string {
  // Extract flow data from the API response
  const flowNodes = flowData?.data?.nodes || [];
  const flowEdges = flowData?.data?.edges || [];
  const viewport = flowData?.data?.viewport || { x: 0, y: 0, zoom: 1 };
  
  // Calculate canvas dimensions based on node positions
  const getCanvasDimensions = () => {
    if (!flowNodes.length) return { width: 800, height: 600 };
    
    const minX = Math.min(...flowNodes.map((n: any) => n.position.x));
    const maxX = Math.max(...flowNodes.map((n: any) => n.position.x + (n.measured?.width || 200)));
    const minY = Math.min(...flowNodes.map((n: any) => n.position.y));
    const maxY = Math.max(...flowNodes.map((n: any) => n.position.y + (n.measured?.height || 100)));
    
    return {
      width: Math.max(800, maxX - minX + 200),
      height: Math.max(600, maxY - minY + 200)
    };
  };

  const canvasDimensions = getCanvasDimensions();

  // Generate nodes HTML
  const nodesHtml = flowNodes.map((node: any) => {
    const { position, data, measured } = node;
    const width = measured?.width || 200;
    const height = measured?.height || 80;

    return `
      <div class="flow-node" style="
        position: absolute;
        left: ${position.x}px;
        top: ${position.y}px;
        width: ${width}px;
        height: ${height}px;
        background: ${data.icon_bg_color || '#ffffff'};
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: default;
        user-select: none;
        transition: all 0.2s ease;
      ">
        ${data.icon ? `<div class="node-icon" style="font-size: 24px; margin-bottom: 8px; color: #4a5568;">${data.icon}</div>` : ''}
        <div class="node-title" style="font-size: 14px; font-weight: 600; color: #2d3748; text-align: center; line-height: 1.2;">
          ${data.display_name}
        </div>
        ${data.description ? `<div class="node-description" style="font-size: 12px; color: #718096; text-align: center; margin-top: 4px; line-height: 1.3;">${data.description}</div>` : ''}
      </div>
    `;
  }).join('');

  // Generate edges HTML
  const edgesHtml = flowEdges.map((edge: any) => {
    const sourceNode = flowNodes.find((n: any) => n.id === edge.source);
    const targetNode = flowNodes.find((n: any) => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return '';

    const sourceX = sourceNode.position.x + (sourceNode.measured?.width || 200) / 2;
    const sourceY = sourceNode.position.y + (sourceNode.measured?.height || 80) / 2;
    const targetX = targetNode.position.x + (targetNode.measured?.width || 200) / 2;
    const targetY = targetNode.position.y + (targetNode.measured?.height || 80) / 2;

    return `
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
        <defs>
          <marker id="arrowhead-${edge.id}" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#a0aec0" />
          </marker>
        </defs>
        <path d="M ${sourceX} ${sourceY} L ${targetX} ${targetY}" stroke="#a0aec0" stroke-width="2" fill="none" marker-end="url(#arrowhead-${edge.id})" style="stroke-dasharray: ${edge.animated ? '5,5' : 'none'}; animation: ${edge.animated ? 'dash 1s linear infinite' : 'none'};" />
      </svg>
    `;
  }).join('');

  // Generate the complete flow HTML
  const flowHtml = `
    <div class="langflow-flow-renderer server-rendered-flow" style="width: 100%;">
      <div class="flow-header" style="margin-bottom: 20px; text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #2d3748;">${flowData?.name || 'Langflow Flow'}</h3>
        <p style="margin: 0; color: #718096; font-size: 14px;">${flowData?.description || 'Interactive flow visualization'}</p>
      </div>
      
      <div class="flow-canvas" style="
        position: relative;
        width: 100%;
        height: 600px;
        background: #f8f9fa;
        border: 1px solid #e1e5e9;
        border-radius: 8px;
        overflow: hidden;
        cursor: grab;
      ">
        ${edgesHtml}
        ${nodesHtml}
        
        <div class="flow-controls" style="
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 8px;
          z-index: 10;
        ">
          <button style="
            padding: 8px 12px;
            background: #ffffff;
            border: 1px solid #e1e5e9;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            color: #4a5568;
            transition: all 0.2s ease;
          " onclick="resetView()">
            Reset View
          </button>
        </div>
      </div>
    </div>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Langflow Flow - ${flowData?.name || flowId}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #f8f9fa;
            min-height: 100vh;
        }
        .flow-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .flow-header {
            padding: 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .flow-header h1 {
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 600;
        }
        .flow-header p {
            margin: 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .flow-content {
            padding: 24px;
        }
        .server-rendered-flow {
            width: 100%;
        }
        .flow-canvas {
            background: #f8f9fa;
            border: 1px solid #e1e5e9;
            border-radius: 8px;
            overflow: hidden;
        }
        .flow-node {
            transition: all 0.2s ease;
        }
        .flow-node:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
            transform: translateY(-1px);
        }
        .flow-controls button {
            transition: all 0.2s ease;
        }
        .flow-controls button:hover {
            background: #f7fafc !important;
            border-color: #cbd5e0 !important;
        }
        @keyframes dash {
            to {
                stroke-dashoffset: -10;
            }
        }
    </style>
</head>
<body>
    <div class="flow-container">
        <div class="flow-header">
            <h1>${flowData?.name || 'Langflow Flow'}</h1>
            <p>${flowData?.description || 'Interactive flow visualization'}</p>
        </div>
        <div class="flow-content">
            ${flowHtml}
        </div>
    </div>
    
    <script>
        console.log('🚀 Server-rendered Flow Page Loaded');
        console.log('🆔 Flow ID:', '${flowId}');
        console.log('📊 Flow Data:', ${JSON.stringify(flowData, null, 2)});
        
        // Add interactive functionality
        document.addEventListener('DOMContentLoaded', function() {
            const flowCanvas = document.querySelector('.flow-canvas');
            if (flowCanvas) {
                let isPanning = false;
                let startX, startY, scrollLeft, scrollTop;
                
                // Pan functionality
                flowCanvas.addEventListener('mousedown', (e) => {
                    isPanning = true;
                    flowCanvas.style.cursor = 'grabbing';
                    startX = e.pageX - flowCanvas.offsetLeft;
                    startY = e.pageY - flowCanvas.offsetTop;
                    scrollLeft = flowCanvas.scrollLeft;
                    scrollTop = flowCanvas.scrollTop;
                });
                
                flowCanvas.addEventListener('mouseleave', () => {
                    isPanning = false;
                    flowCanvas.style.cursor = 'grab';
                });
                
                flowCanvas.addEventListener('mouseup', () => {
                    isPanning = false;
                    flowCanvas.style.cursor = 'grab';
                });
                
                flowCanvas.addEventListener('mousemove', (e) => {
                    if (!isPanning) return;
                    e.preventDefault();
                    const x = e.pageX - flowCanvas.offsetLeft;
                    const y = e.pageY - flowCanvas.offsetTop;
                    const walkX = (x - startX) * 2;
                    const walkY = (y - startY) * 2;
                    flowCanvas.scrollLeft = scrollLeft - walkX;
                    flowCanvas.scrollTop = scrollTop - walkY;
                });
                
                // Zoom functionality
                flowCanvas.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    const zoomFactor = 0.1;
                    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
                    const currentTransform = flowCanvas.style.transform || 'scale(1)';
                    const scale = parseFloat(currentTransform.match(/scale\\(([^)]+)\\)/)?.[1] || '1');
                    const newScale = Math.max(0.1, Math.min(3, scale + delta));
                    flowCanvas.style.transform = \`scale(\${newScale})\`;
                });
            }
            
            // Reset view functionality
            window.resetView = function() {
                const flowCanvas = document.querySelector('.flow-canvas');
                if (flowCanvas) {
                    flowCanvas.style.transform = 'scale(1)';
                    flowCanvas.scrollLeft = 0;
                    flowCanvas.scrollTop = 0;
                }
            };
        });
    </script>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Langflow Proxy: Fetching flow data server-side');
    
    // Fetch flow data from Langflow API
    const response = await fetch(`${LANGFLOW_BASE_URL}/api/v1/flows/${FLOW_ID}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LangflowProxy/1.0)',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch flow data: ${response.status} ${response.statusText}`);
    }

    const flowData = await response.json();
    console.log('✅ Flow data fetched successfully:', {
      name: flowData?.name,
      nodes: flowData?.data?.nodes?.length || 0,
      edges: flowData?.data?.edges?.length || 0
    });

    // Create server-side rendered HTML
    const html = createFlowEmbedPage(flowData, FLOW_ID, LANGFLOW_BASE_URL);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('❌ Langflow proxy error:', error);
    
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Langflow Flow</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              background: #f8f9fa;
            }
            .error-container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              max-width: 400px;
            }
            .error-icon { font-size: 3rem; margin-bottom: 1rem; }
            .error-title { color: #e74c3c; margin-bottom: 0.5rem; font-weight: 600; }
            .error-message { color: #666; margin-bottom: 1.5rem; line-height: 1.5; }
            .retry-btn {
              background: #3498db;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 6px;
              cursor: pointer;
              font-size: 14px;
              transition: background 0.2s ease;
            }
            .retry-btn:hover {
              background: #2980b9;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-icon">⚠️</div>
            <div class="error-title">Flow not available</div>
            <div class="error-message">Unable to load the Langflow flow at this time. Please try again later.</div>
            <button class="retry-btn" onclick="window.location.reload()">Try again</button>
          </div>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  }
}
