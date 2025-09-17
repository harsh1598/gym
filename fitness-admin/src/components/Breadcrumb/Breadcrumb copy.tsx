import React from 'react';

interface PropData {
    pageName: any;
}

const Breadcrumb = (props: PropData) => {

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-between">
                <li className="">
                    <i className="fa fa-arrow-left me-2" style={{ cursor: 'pointer' }} onClick={() => window.history.back()}></i>Back
                </li>
                <li className="">
                    <span>Setting</span> / {props.pageName}
                </li>
            </ol>
        </nav>
    )
}

export default Breadcrumb;
