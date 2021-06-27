import React, { useState, useEffect } from 'react';
import './Nav.css';



function Nav() {
    const [show,handleShow] = useState(false);

    //so we are adding this event listener as we are on main content then the black background color should not appear on navbar it should be transparent but as we scroll down the the background color should appear
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        //here we are removing this as we say refresh again then there should not be any listener else there will be n number of listeners
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    // so basically if show is true add one more class to the div
    return (        
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"/>

            <img className="nav_avatar" src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" alt="Avatar"/>
        </div>
    );
}

export default Nav
