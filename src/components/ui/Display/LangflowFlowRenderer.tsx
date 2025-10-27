import React from "react";

interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    display_name: string;
    description?: string;
    icon?: string;
    icon_bg_color?: string;
    [key: string]: any;
  };
  measured?: {
    width: number;
    height: number;
  };
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  animated?: boolean;
}

interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
}

interface LangflowFlowRendererProps {
  flowData: FlowData;
  flowName?: string;
  flowDescription?: string;
  className?: string;
}

const LangflowFlowRenderer: React.FC<LangflowFlowRendererProps> = ({
  flowData,
  flowName = "Langflow Flow",
  flowDescription,
  className = ""
}) => {
  const { nodes, edges, viewport } = flowData;

  // Calculate canvas dimensions based on node positions
  const getCanvasDimensions = () => {
    if (!nodes.length) return { width: 800, height: 600 };
    
    const minX = Math.min(...nodes.map(n => n.position.x));
    const maxX = Math.max(...nodes.map(n => n.position.x + (n.measured?.width || 200)));
    const minY = Math.min(...nodes.map(n => n.position.y));
    const maxY = Math.max(...nodes.map(n => n.position.y + (n.measured?.height || 100)));
    
    return {
      width: Math.max(800, maxX - minX + 200),
      height: Math.max(600, maxY - minY + 200)
    };
  };

  const canvasDimensions = getCanvasDimensions();

  // Node component
  const NodeComponent: React.FC<{ node: FlowNode }> = ({ node }) => {
    const { position, data, measured } = node;
    const width = measured?.width || 200;
    const height = measured?.height || 80;

    return (
      <div
        className="flow-node"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: width,
          height: height,
          background: data.icon_bg_color || '#ffffff',
          border: '2px solid #e1e5e9',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          userSelect: 'none'
        }}
      >
        {data.icon && (
          <div 
            className="node-icon"
            style={{
              fontSize: '24px',
              marginBottom: '8px',
              color: '#4a5568'
            }}
          >
            {data.icon}
          </div>
        )}
        <div 
          className="node-title"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#2d3748',
            textAlign: 'center',
            lineHeight: '1.2'
          }}
        >
          {data.display_name}
        </div>
        {data.description && (
          <div 
            className="node-description"
            style={{
              fontSize: '12px',
              color: '#718096',
              textAlign: 'center',
              marginTop: '4px',
              lineHeight: '1.3'
            }}
          >
            {data.description}
          </div>
        )}
      </div>
    );
  };

  // Edge component
  const EdgeComponent: React.FC<{ edge: FlowEdge; nodes: FlowNode[] }> = ({ edge, nodes }) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return null;

    const sourceX = sourceNode.position.x + (sourceNode.measured?.width || 200) / 2;
    const sourceY = sourceNode.position.y + (sourceNode.measured?.height || 80) / 2;
    const targetX = targetNode.position.x + (targetNode.measured?.width || 200) / 2;
    const targetY = targetNode.position.y + (targetNode.measured?.height || 80) / 2;

    return (
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <defs>
          <marker
            id={`arrowhead-${edge.id}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#a0aec0"
            />
          </marker>
        </defs>
        <path
          d={`M ${sourceX} ${sourceY} L ${targetX} ${targetY}`}
          stroke="#a0aec0"
          strokeWidth="2"
          fill="none"
          markerEnd={`url(#arrowhead-${edge.id})`}
          style={{
            strokeDasharray: edge.animated ? '5,5' : 'none',
            animation: edge.animated ? 'dash 1s linear infinite' : 'none'
          }}
        />
      </svg>
    );
  };

  return (
    <div className={`langflow-flow-renderer ${className}`}>
      <div 
        className="flow-header"
        style={{
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: '#2d3748' }}>
          {flowName}
        </h3>
        {flowDescription && (
          <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
            {flowDescription}
          </p>
        )}
      </div>
      
      <div 
        className="flow-canvas"
        style={{
          position: 'relative',
          width: '100%',
          height: '600px',
          background: '#f8f9fa',
          border: '1px solid #e1e5e9',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'grab'
        }}
      >
        {/* Render edges first (behind nodes) */}
        {edges.map(edge => (
          <EdgeComponent 
            key={edge.id} 
            edge={edge} 
            nodes={nodes} 
          />
        ))}
        
        {/* Render nodes */}
        {nodes.map(node => (
          <NodeComponent 
            key={node.id} 
            node={node} 
          />
        ))}
        
        {/* Flow controls */}
        <div 
          className="flow-controls"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}
        >
          <button
            style={{
              padding: '8px 12px',
              background: '#ffffff',
              border: '1px solid #e1e5e9',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#4a5568'
            }}
            onClick={() => {
              // Reset zoom functionality would go here
              console.log('Reset zoom');
            }}
          >
            Reset View
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -10;
          }
        }
        
        .flow-node:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        
        .flow-canvas:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default LangflowFlowRenderer;
