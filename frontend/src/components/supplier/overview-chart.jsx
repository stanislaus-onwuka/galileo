import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ name: "Jan", quantity: 2400 },
	{ name: "Feb", quantity: 1398 },
	{ name: "Mar", quantity: 9800 },
	{ name: "Apr", quantity: 3908 },
	{ name: "May", quantity: 4800 },
	{ name: "Jun", quantity: 3800 },
];

const OverviewChart = () => {
	return (
		<div>
			<h3 className="text-[36px] leading-[120%] font-medium mb-4">Quotations Overview</h3>
			<div className="bg-white rounded shadow-sm">
				<ResponsiveContainer width="100%" height={500}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="quantity" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default OverviewChart;
