import React, {useState} from "react"
import '../App.css'
import menu from "../images/orng-menu-icon.svg"
import closeMenu from "../images/orng-close-icon.svg"


function Navbar(){
    const [mobileOpen, setMobileOpen] = useState(true)
    const userId = localStorage.getItem("id")
    console.log("User ID: ", userId)
    const toggleNav = () => {
        setMobileOpen(!mobileOpen);
    }

    return(
        <nav className = "flex justify-between max-w-full w-full bg-purple-600 border-b-2 border-yellow-500 items-center text-yellow-500 font-serif drop-shadow-lg">
            
           {/* Desktop Navagation */}
           {mobileOpen &&(
            <>
                <div className="flex justify-between items-center px-6 py-4">
                    <a className = "hover:underline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold" href = "/">The Hunt</a>
                </div>
                <div className = "hidden sm:flex text-md sm:text-lg md:text-2xl lg:text-4xl text-yellow-500 space-x-10 pb-1 drop-shadow-lg">
                    <a className = "hover:underline" href = "/hunt/create/">Create</a>
                    <a className = "hover:underline" href = "/hunt/list/play">Play</a>
                    <a className = "hover:underline" href = "/hunt/list/edit">Edit</a>
                    <a className = "hover:underline" href = {`/user/all/info/id:${userId}`}>User Info</a>
                </div>
            </>
            )}
            {/* Mobile Navagation */}
            {!mobileOpen &&(
            <>
                <div className = "flex flex-col items-start text-yellow-500 px-4 pb-2 space-y-2 drop-shadow-lg sm:hidden">
                    <a className = "hover:underline font-bold m-1" href = "/">The Hunt</a>
                    <a className = "hover:underline m-1" href = "/hunt/create/">Create</a>
                    <a className = "hover:underline m-1" href = "/hunt/list/play">Play</a>
                    <a className = "hover:underline m-1" href = "/hunt/list/edit">Edit</a>
                    <a className = "hover:underline m-1" href = {`/user/all/info/id:${userId}`}>User Info</a>
                </div>
            </>
            )}
            {/* Change to rely on breakpoints rather than mobileOpen. Might have issues if user starts via mobile */}
            {mobileOpen &&(
            <button onClick={toggleNav}><img src = {menu} className="visible min-h-8 min-w-8 hover:cursor-pointer sm:invisible"/></button>
            )}

            {!mobileOpen &&(
            <button onClick={toggleNav}><img src = {closeMenu} className=" fixed min-h-8 min-w-8 top-2 right-2 visible hover:cursor-pointer sm:invisible"/></button>
            )}
        </nav>
    )
}

export default Navbar