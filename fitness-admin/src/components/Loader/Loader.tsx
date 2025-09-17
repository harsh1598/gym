import React from 'react';
import './Loader.css'
import * as animatedData from "../../assets/test.json";
import { ThreeDot } from 'react-loading-indicators';

interface PropData {
    show: boolean;
    style?: boolean
}

const Loader = (props: PropData) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animatedData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <>
            {
                props.show && <div className="resultLoading">
                    {/* <div className='bg' style={{ backgroundColor: '#4c3f98ff' }}></div> */}

                    <div className="resultLoading card-header page-content" style={{ textAlign: 'center', marginTop: '15%' }}>
                        <ThreeDot variant="bounce" color="#7b544b32" size="medium" text="Loading" textColor="" />
                    </div>
                </div >
            }
        </>
    )
}

export default Loader;
