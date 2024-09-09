/* eslint-disable react/prop-types */

function MainLayout({ children }) {
    return (
        <div>
            <nav className="flex justify-between items-center py-[22px] px-4">
                <div>
                    <img src="/assets/svgs/customer/company-logo.svg" alt="Logo" />
                </div>
                <div>
                    {/* <button className="border rounded-full border-neutral-40 p-1">
                        <img src="/assets/menu.svg" alt="Mobile menu button" className="w-7" />
                    </button> */}
                    <button className="rounded-full border-neutral-40 p-1 underline">Login/signup</button>
                </div>
            </nav>
            {children}
            <footer className="flex justify-between px-4 py-7 mt-14">
                <div></div>
                <ul className="flex gap-6 items-center">
                    <li>FAQ</li>
                    <li>Terms & Conditions</li>
                    <li>Privacy</li>
                </ul>
            </footer>
        </div>
    );
}

export default MainLayout;
