import React from 'react';

import classes from "./CustomButton.module.css";

interface Props {
    children?: React.ReactNode;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton = (props: Props) => {
    return (
        <button
            className={classes.button}
            onClick={props.onClick}
            type={props.type || 'button'}
        >
            {props.children}
        </button>
    )
}

export {
    CustomButton,
}
