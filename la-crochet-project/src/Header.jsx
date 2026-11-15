function Header() {
    return (
        <>
        <nav className="flex justify-between items-center p-4 bg-[#D7BDB0]">
            <div>
                <img src="" alt=""></img>
            </div>
            <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-[#EDEEE9]">Button 1</a>
                <a href="#" className="text-white hover:text-[#EDEEE9]">Button 2</a>
                <a href="#" className="text-white hover:text-[#EDEEE9]">Button 3</a>
            </div>
            <div>
                <p>Search Bar</p>
            </div>
        </nav>
        </>
    )
}

export default Header