import React from 'react';

interface FormProps {
    data: any
}

const Form: React.FC< React.PropsWithChildren<FormProps> > = ({ data }) => {
    return (
        <pre className="w-full h-full">
            { JSON.stringify(data, null, 2) }
        </pre>
    );
  };
export default Form;


