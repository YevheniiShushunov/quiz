import React from 'react';

interface Button {
    name: string;
    onClick?: () => void;
    disable?: boolean;
    buttonType?: "submit" | "button" | "reset" | undefined;
}

const Button = ({name, onClick, disable, buttonType = "button"}: Button) => {
    return (
        <div>
            <button
                type={buttonType}
                disabled={disable}
                onClick={onClick}
                className="btn mt-2 ml-2 text-white bg-btngreen hover:bg-green-700">{name}
            </button>
        </div>
    );
};

export default Button;