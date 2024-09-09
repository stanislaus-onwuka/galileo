/* eslint-disable react/prop-types */

function AuthLayout({ children }) {
    return (
        <main className="bg-background p-6 flex h-screen">
            <section className="flex flex-col items-center bg-white rounded-2xl w-full max-w-[600px] py-[100px]">
                {children}
            </section>
            <section className="relative w-full px-10">
                <div className="absolute top-[-21px] right-0">
                    <img src="/assets/svgs/auth-logo.svg"/>
                </div>
                <h2 className="text-[#A6C4C4] text-2xl absolute bottom-0 ">Empowering Artisans, <br/> Enhancing Lives</h2>
            </section>
        </main>
    )
}

export default AuthLayout