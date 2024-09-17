import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UserBreakdown = () => {
    const chartData = [
        { name: "Jan", pts: 1 },
        { name: "Feb", pts: 1.5 },
        { name: "Mar", pts: 2 },
        { name: "Apr", pts: 2.5 },
        { name: "May", pts: 4 },
        { name: "Jun", pts: 5 },
    ];

    return (
        <div className="bg-white p-6 rounded-lg border border-[#EAECF0]">
            <h2 className="text-xl font-semibold mb-4">Users Breakdown</h2>
            {/* Include your graph implementation here */}
            {/* <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">No data exists</div> */}

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pts" stroke="#8884d8" fill="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserBreakdown;
