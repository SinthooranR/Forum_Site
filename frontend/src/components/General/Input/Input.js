import React from 'react';

const Input = (props) => {
    return (
        <React.Fragment>
            <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} style={{ height: "50px", fontSize: "1.2rem", marginBottom: "5%", border: "1px solid silver" }} />
        </React.Fragment>
    )
}

export default Input;