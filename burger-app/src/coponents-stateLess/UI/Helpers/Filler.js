import React from 'react';

const Filler = (props) => {

    const style = {
        height: props.height+'px',
    };

    return (
        <div style={style} ></div>
    );

}

export default Filler;