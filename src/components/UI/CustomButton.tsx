import React from 'react';

import classes from "./CustomButton.module.css";
import {Link} from "react-router-dom";

interface Props {
    children?: React.ReactNode;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    to?: string;
}

const CustomButton = (props: Props) => {
    return (
        props.to
            ? <Link className={`${classes.button} ${classes.link}`} to={props.to}>{props.children}</Link>
            : <button
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
