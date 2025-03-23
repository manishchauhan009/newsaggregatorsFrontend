import React from 'react';

function Test() {
    const element = "<div><h1>hello</h1><h2>world</h2></div>";

    return (
        <div>
            <p>Testing Component Render</p>
            <div dangerouslySetInnerHTML={{ __html: element }} />
        </div>
        
    );
}

export default Test;
