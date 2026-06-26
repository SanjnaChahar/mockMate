function Navbar(){
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

            {/*Logo on the left */}
            <div className="text-2x1 font-bold text-purple-400">
                Mock<span className="text-white">Mate</span>
            </div>

            {/* Buttons on the right */}
            <div className="flex gap-4">
                <button className="text-gray-300 hover:text-white transition">
                    Login
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
                    Get Started
                </button>
            </div>

        </nav>
    )
}
export default Navbar