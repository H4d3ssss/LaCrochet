export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6EFE6]">
            <h1 className="text-4xl font-bold mb-4">
                <span className="text-[#3A2E28]">Welcome to </span>
                <span className="font-serif text-[1.5em] text-[#3A2E28] transition duration-300 hover:text-[#7C8A6A]">La Crochet</span></h1>
            <p className="text-lg text-[#C97B5E] mb-8 pb-10">Your cozy corner for artisanal crochet supplies and timeless handmade pieces.</p>
            <a href="#shop" className="bg-[#7C8A6A] text-white px-6 py-3 rounded-full border-[#E4D9CE] hover:bg-[#F6EFE6] hover:text-[#7C8A6A] transition duration-300">Shop Now</a>
        </div>
    )
}
