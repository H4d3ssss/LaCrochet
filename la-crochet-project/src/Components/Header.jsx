function Header() {
    return (
        <>
        <nav className="flex justify-between items-center p-4 bg-[#D7BDB0]">
            <div>
                <a href="#" className="text-[#EDEEE9] font-serif text-bold text-3xl">La Crochet.</a>
            </div>
            <div className="flex space-x-4">
                <a href="#" className="text-[#EDEEE9] hover:text-[#D6CCC2]">Button 1</a>
                <a href="#" className="text-[#EDEEE9] hover:text-[#D6CCC2">Button 2</a>
                <a href="#" className="text-[#EDEEE9] hover:text-[#D6CCC2]">Button 3</a>
            </div>
            <div>
                <p>Search Bar</p>
            </div>
        </nav>
        </>
    )
}

export default Header