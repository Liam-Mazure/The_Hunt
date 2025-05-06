import React, {useState} from "react"
import '../App.css'
import menu from "../images/orng-menu-icon.svg"
import closeMenu from "../images/orng-close-icon.svg"


function Navbar(){
    const [mobileOpen, setMobileOpen] = useState(true)

    const toggleNav = () => {
        setMobileOpen(!mobileOpen);
    }

    return(
        <nav className = "flex justify-around bg-purple-600 border-2 border-yellow-500 items-center text-yellow-500 font-serif text-2xl drop-shadow-lg">
            {/* Desktop Navagation */}
           {mobileOpen &&(
            <>
                <div>
                    <a className = "hover:underline text-2x1 sm:text-4xl m-2 bold" href = "/">The Hunt</a>
                </div>

                <div className = "flex text-yellow-500 space-x-5 drop-shadow-lg invisible sm:visible m-2">
                    <a className = "hover:underline" href = "/createHunt">Create</a>
                    <a className = "hover:underline" href = "/play">Play</a>
                    <a className = "hover:underline" href = "/editHunt">Edit</a>
                    <a className = "hover:underline" href = "/user/all/info/id:1">User Info</a>
                </div>
            </>
            )}
            {/* Mobile Navagation */}
            {!mobileOpen &&(
            <>
                <div className = "flex flex-col text-yellow-500 space-x-80 drop-shadow-lg">
                    <a className = "hover:underline  text-4xl bold" href = "/">The Hunt</a>
                    <a className = "hover:underline m-1" href = "/createHunt">Create</a>
                    <a className = "hover:underline m-1" href = "/play">Play</a>
                    <a className = "hover:underline m-1" href = "/editHunt">Edit</a>
                    <a className = "hover:underline m-1" href = "/user/all/info/id:1">User Info</a>
                </div>
            </>
            )}
            
            {mobileOpen &&(
            <button onClick={toggleNav}><img src = {menu} className="visible hover:cursor-pointer sm:invisible"/></button>
            )}

            {!mobileOpen &&(
            <button onClick={toggleNav}><img src = {closeMenu} className=" fixed top-2 right-2 visible hover:cursor-pointer sm:invisible"/></button>
            )}
        </nav>
    )
}

export default Navbar