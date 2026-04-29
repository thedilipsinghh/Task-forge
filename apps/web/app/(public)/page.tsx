import Link from "next/link";
import React from "react";

const Home = () => {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <h1 className="text-xl font-bold">MyApp</h1>
                <div className="space-x-6">
                    <button className="hover:text-blue-600">Home</button>
                    <button className="hover:text-blue-600">About</button>
                    <button className="hover:text-blue-600">Contact</button>
                    {/* Login Button */}
                    <Link href="/signin">
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Build Something Meaningful
                </h2>
                <p className="text-gray-600 max-w-xl mb-6">
                    This is your starting point. Stop overthinking and start building real
                    features that solve real problems.
                </p>
                <div className="space-x-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Get Started
                    </button>
                    <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-6 px-8 pb-16">
                {["Fast", "Scalable", "Modern"].map((item, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">{item}</h3>
                        <p className="text-gray-600">
                            Don’t just read docs — build something that proves you understand it.
                        </p>
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer className="text-center py-6 bg-white border-t text-gray-500">
                © 2026 MyApp. All rights reserved.
            </footer>
        </main>
    );
};

export default Home;