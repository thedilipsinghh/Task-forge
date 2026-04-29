import React from "react";

const Dashboard = () => {
    return (
        <main className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">MyApp</h2>

                <nav className="flex flex-col space-y-4">
                    <button className="text-left hover:text-blue-600">Dashboard</button>
                    <button className="text-left hover:text-blue-600">Tasks</button>
                    <button className="text-left hover:text-blue-600">Users</button>
                    <button className="text-left hover:text-blue-600">Settings</button>
                </nav>
            </aside>

            {/* Main Content */}
            <section className="flex-1 p-6">
                {/* Topbar */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {[
                        { title: "Total Tasks", value: "24" },
                        { title: "Completed", value: "18" },
                        { title: "Pending", value: "6" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-gray-500">{item.title}</h3>
                            <p className="text-2xl font-bold">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Tasks */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2">Task</th>
                                <th>Status</th>
                                <th>Due</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[
                                { name: "Build UI", status: "Completed", due: "Today" },
                                { name: "Fix Bugs", status: "Pending", due: "Tomorrow" },
                                { name: "Deploy App", status: "In Progress", due: "2 Days" },
                            ].map((task, i) => (
                                <tr key={i} className="border-b">
                                    <td className="py-2">{task.name}</td>
                                    <td>{task.status}</td>
                                    <td>{task.due}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;