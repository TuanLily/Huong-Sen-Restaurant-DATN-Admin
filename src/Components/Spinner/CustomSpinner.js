import React from 'react'
import './CustomSpinner.css'

function CustomSpinner() {
    return (
        <>
            <div class="custom-loader">
                <div class="circle">
                    <div class="dot"></div>
                    <div class="outline"></div>
                </div>
                <div class="circle">
                    <div class="dot"></div>
                    <div class="outline"></div>
                </div>
                <div class="circle">
                    <div class="dot"></div>
                    <div class="outline"></div>
                </div>
                <div class="circle">
                    <div class="dot"></div>
                    <div class="outline"></div>
                </div>
            </div>
        </>
    );
}

export default CustomSpinner