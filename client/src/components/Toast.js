import React from 'react';

const Toast = ({error, green}) => {
    return error === "" ? "" : <div className={green ? "toast toastGreen" : "toast"}>
        {error}
    </div>
}

export default Toast;
