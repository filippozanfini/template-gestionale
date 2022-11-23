import React from 'react';

interface DebuggerProps {
    data: any
}

const Debugger: React.FC<DebuggerProps> = ({ data }) => {
    return (
        <pre className="w-full h-full">
            { JSON.stringify(data, null, 2) }
        </pre>
    );
  };
export default Debugger;