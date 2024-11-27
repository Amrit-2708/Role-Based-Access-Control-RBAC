import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const token = localStorage.getItem("user");
    const navigate = useNavigate()
    function handleLoginbtnClick() {
        navigate('/login')
    }
    return (
        <div className=''>
            <Navbar />
            <div className="flex flex-col md:flex-row justify-between items-center p-6 md:p-16">
                <div className="flex w-11/12 md:w-1/2 justify-center items-center">
                    <img src="https://vrvsecurityservices.com/wp-content/uploads/2023/12/SERVICES.png"></img>
                </div>
                <div className="flex flex-col w-11/12 md:w-1/2">
                    <p className="text-gray-400 font-semibold">About Us</p>
                    <h1 className="leading-[40px] my-4 lg:my-0 xl:leading-loose text-4xl text-teal-600 font-bold">Welcome to VRV Security Services</h1>
                    <p className="leading-relaxed text-gray-400">
                        VRV Security Cum Man Power Agency is one of the leading Security
                        Services providers in Chennai. We have a team of professionally well
                        trained and managed manpower with all the foremost recent and
                        propelled security instruments. Our services mainly incorporate
                        Security Guards, Security Guards for Corporate Offices, Apartments,
                        Hotel, Restaurant Security Services, Industrial Security
                        Services, ATM and Banks, Super Markets, Shops, Hospital . Go down
                        Security Services. We also provide Man Power Supply for Domestic
                        help services, House Keeping Services, Patient / Baby care services,
                        Home Tution, Construction Labours , Industrial Labours Supply,
                        Industrial Skilled and Semi skilled Man power Supply.
                    </p>
                    {!token && (<div className="mt-4">
                        <button onClick={handleLoginbtnClick}
                            className="w-1/3 h-10 px-6 font-semibold rounded-md border border-slate-200 text-white bg-black"
                        >
                            Log In
                        </button>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
