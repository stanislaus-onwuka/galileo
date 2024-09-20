import { useAuth } from "../../context/auth-context";

const Header = () => {
    const { user } = useAuth()
    const { firstName, lastName } = user.user

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">{`Welcome back,${firstName} ${lastName}`}</h1>
            <div className="flex space-x-4">
                <select className="border border-gray-300 rounded-md px-4 py-2">
                    <option>24 hours</option>
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>12 months</option>
                    <option>All time</option>
                </select>
            </div>
        </div>
    );
};

export default Header;
