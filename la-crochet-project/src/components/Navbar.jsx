function Navbar() {
    return (
        <nav class="bg-gray-800 p-4 flex flex-row items-center justify-between">
    
            <img class="store-logo" alt="Store Logo"></img>
            <div class="nav-links">
                <ul class="flex flex-row space-x-4 text-white">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

            <div class="cart-icon">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-13h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1V5a1 1 0 011-1z"></path></svg>
            </div>
        </nav>

    );
}

export default Navbar;