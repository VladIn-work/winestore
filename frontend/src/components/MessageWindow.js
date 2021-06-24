import React from "react";

export const MessageWindow  = (props) => {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    );
};