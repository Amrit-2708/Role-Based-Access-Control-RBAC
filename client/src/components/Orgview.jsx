import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//components
import Navbar from './Navbar';
import Spinner from './spinner';


const Orgview = () => {
    const [users, setUsers] = useState([]); // State to store user data
    const [error, setError] = useState(null); // State for errors
    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const [currentPage, setCurrentPage] = useState(1); // State to manage current page
    const [rowsPerPage] = useState(5); // Number of rows per page

    const navigate = useNavigate();

    // Function to change the page
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("user");
        const role = localStorage.getItem("role");

        if (role === "admin") {
            setIsAdmin(true);
        }

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        // Fetch users when the component mounts
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://rbac-server.vercel.app/users");

                if (response.data.message === "Users retrieved successfully") {
                    setUsers(response.data.data); // Store the users in state
                }
                setLoading(false);
            } catch (error) {
                setError("Error fetching users"); // Handle the error
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers(); // Call the function to fetch users
    }, []); // Empty dependency array to run only once when the component mounts

    function handleclick(userId) {
        navigate(`/user/${userId}`, { state: { isAdmin } }); 
    }

    function handleaddUser() {
        navigate('/add')
    }

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage); // Total number of pages
    const startIndex = (currentPage - 1) * rowsPerPage; // Start index for the current page
    const endIndex = startIndex + rowsPerPage; // End index for the current page
    const currentUsers = filteredUsers.slice(startIndex, endIndex); // Slice users for the current page

    return (
        <div className=''>
            <Navbar isAdmin={isAdmin} />
            {loading && <div className='h-screen w-full flex justify-center items-center'> <Spinner color={"black"} width={"w-20"} marginRight='mr-0'/></div>}
            {users.length >0 && (<div className='bordder-8 bg-cyan-900 flex justify-center'>
                <h1 className='text-5xl text-white font-bold mt-5 mb-5'>Welcome {localStorage.getItem("role")}</h1>
            </div>)}
            {users.length>0 && (<div className='bg-cyan-900 flex justify-center pt-12 iteems-center h-screen'>
                <div className="bg-pinnk-400 border-yellow-500 flex flex-col overflow-x-auto">
                    <div className="relative bg-red-d400 border-8d mb-2 flex flex-col sm:flex-row justify-between">
                        <input
                            className={`${isAdmin ? "w-1/2" : "w-full"} focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 py-2 pl-10 ring-slate-200 shadow-sm`}
                            type="text"
                            aria-label="Filter projects"
                            placeholder="Search user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                        {isAdmin && (<button onClick={handleaddUser}
                            className="w-1/2 sm:1/4 font-semibold border border-slate-200 text-white bg-black"
                        >
                            Add User
                        </button>)}
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='shadow-2xl font-[Poppins] border-2 border-cyan-200'>
                            <thead className='text-white'>
                                <tr>
                                    <th className='px-6 py-3 bg-cyan-800'>ID</th>
                                    <th className='px-6 py-3 bg-cyan-800'>Name</th>
                                    <th className='px-6 py-3 bg-cyan-800'>Email</th>
                                    <th className='px-6 py-3 bg-cyan-800'>Role</th>
                                    <th className='px-6 py-3 bg-cyan-800'>Option</th>
                                </tr>
                            </thead>


                            <tbody className='text-cyan-900 text-center'>
                                {/* Conditional rendering of filtered users */}
                                {currentUsers.length > 0 && (
                                    currentUsers.map((user, index) => (
                                        <tr key={user._id} className='hover:bg-cyan-100 bg-cyan-200 duration-300 border-b-8 border-cyan-800'>
                                            <td className='py-3 px-6'>{startIndex + index + 1}</td>
                                            <td className='py-3 px-6'>{user.name}</td>
                                            <td className='py-3 px-6'>{user.email}</td>
                                            <td className='py-3 px-6'>{user.role}</td>
                                            <td>
                                                <button onClick={() => handleclick(user._id)} className='py-3 px-6 font-bold'>View Details</button>
                                            </td>
                                        </tr>
                                    )))}
                                {filteredUsers.length === 0 && (<tr>
                                    <td colSpan="5" className='hover:bg-cyan-100 bg-cyan-200 duration-300 border-b-8 border-cyan-800'>No users found</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-l"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-white px-4 py-2">{currentPage} / {totalPages}</span>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>)}
            {error && (<div className='text-3xl font-bold font-serif Times New Roman bg-cyan-900 flex justify-center items-center h-screen'>
                <div>
                    <span>{error}. Please try again</span>
                </div>
            </div>)}
        </div>
    );
}

export default Orgview;



