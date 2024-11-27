import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

//toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import DeleteConfirmationModal from './DeleteConfirmationModal'
import Spinner from "./spinner";
import Navbar from './Navbar';

const UserDetails = () => {
    const [edit, setEdit] = useState(false);

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();
    const [status, setStatus] = useState();

    const isFormValid = name && email && role && status;

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdmin } = location.state || {};

    const details_same_as_logged_in_user = localStorage.getItem("user") === id;
    const [shouldDelete, setShouldDelete] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (!token) {
            navigate(`/login`);
        }
    });

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://rbac-server.vercel.app/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching user details');
                setLoading(false);
            }
        };

        fetchUser(); // Fetch user data when the component mounts
    }, [id]); // Dependency on 'id' ensures that it reloads when the URL changes


    function handleEditUser() {
        setEdit(true);
    }

    function handleDeleteUser(e) {
        e.preventDefault();
        setShouldDelete(true);
    }

    const closeDeleteModal = () => {
        setShouldDelete(false); // Reset the state when modal is closed
    };

    const validateRole = (roleValue) => {
        if (roleValue !== "admin" && roleValue !== "user") {
            return false;
        }
        return true;
    };
    const validateStatus = (statusValue) => {
        if (statusValue !== "active" && statusValue !== "inactive") {
            return false;
        }
        return true;
    };

    function handleSaveUser() {

        if (!validateRole(role)) {
            toast.error("Role entered must be either 'admin' or 'user'");
            return;
        }
        if (!validateStatus(status)) {
            toast.error("Status entered must be either 'active' or 'inactive'");
            return;
        }
        setIsLoading(true);

        axios.patch(`https://rbac-server.vercel.app/update/${id}`, { name, email, role, status })
            .then((result) => {
                toast.success("Details edited succesfully.", { autoClose: 2000 });
                setTimeout(() => {
                    navigate(`/org/${id}`);
                }, 2000);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(`${error.response.data.message}`, { autoclose: 5000 });
                }
                else if (!error.response) {
                    toast.error(`${error.message}. Please try again later`, { autoclose: 5000 })
                }
                setIsLoading(false);
            });
    }

    function handleCancelEdit() {
        setEdit(false);
    }

    return (
        <div>
            <Navbar isAdmin={isAdmin} />
            {shouldDelete && (<DeleteConfirmationModal id={id} closeDeleteModal={closeDeleteModal} />)}
            {loading && <div className='h-screen w-full flex justify-center items-center'> <Spinner color={"black"} width={"w-20"} marginRight='mr-0'/></div>}
            {!loading && user && (<div className='bg-cyan-900 flex justify-center items-center h-screen'>
                <div className='w-11/12 sm:w-auto md:w-auto lg:w-auto flex flex-col items-start border-8 border-yellow-500 overflow-x-auto'>
                    <div className='flex flex-col mt-5 ml-8 mb-8 '>
                        <span className='text-2xl text-white font-bold'>ID</span>
                        <span className='text-white'>{user._id}</span>
                    </div>
                    <div className='flex flex-col ml-8 mb-5'>
                        <span className='text-2xl text-white font-semibold mb-1'>Name</span>
                        {!edit && (<span className='text-white font-semibold'>{user.name}</span>)}
                        {edit && (<input
                            type="text"
                            placeholder="Enter name"
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />)}
                    </div>
                    <div className='flex flex-col ml-8 mb-5'>
                        <span className='text-2xl text-white font-semibold mb-1'>Email</span>
                        {!edit && (<span className='text-white font-semibold'>{user.email}</span>)}
                        {edit && (<input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />)}
                    </div>
                    <div className='flex flex-col ml-8 mb-4'>
                        <span className='text-2xl text-white font-semibold mb-1'>Role</span>
                        {!edit && (<span className='text-white font-semibold'>{user.role}</span>)}
                        {edit && (<input
                            id="role"
                            name="role"
                            type="text"
                            placeholder="admin/user"
                            required
                            onChange={(e) => setRole(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />)}
                    </div>
                    <div className='flex flex-col ml-8 mb-8'>
                        <span className='text-2xl text-white font-semibold mb-1'>Status</span>
                        {!edit && (<span className='text-white font-semibold'>{user.status}</span>)}
                        {edit && (<input
                            id="status"
                            name="status"
                            type="text"
                            placeholder="active/inactive"
                            required
                            onChange={(e) => setStatus(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />)}
                    </div>

                    <div className="ml-8 mb-5 mr-8 flex flex-col sm:flex-row sm:space-x-20 md:flex-row md:self-center lg:flex-row lg:space-x-24">
                        {!edit && isAdmin && !details_same_as_logged_in_user && (<button onClick={handleDeleteUser}
                            className="w-[150px] h-10 px-4 font-semibold rounded-md mb-4 sm:mb-4 lg:mb-0 border border-slate-200 text-white bg-black"
                        >
                            Delete User
                        </button>)}
                        {edit && (<button
                            onClick={handleCancelEdit}
                            className="w-[150px] h-10 px-4 font-semibold rounded-md mb-4 sm:mb-4 lg:mb-0 border border-slate-200 text-white bg-black"
                        >
                            Cancel
                        </button>)}
                        {!edit && isAdmin && !details_same_as_logged_in_user && (<button
                            onClick={handleEditUser}
                            className="w-[150px] h-10 px-4 font-semibold rounded-md border border-slate-200 text-white bg-black"
                        >
                            Edit User
                        </button>)}
                        {edit && (<button
                            onClick={handleSaveUser}
                            disabled={!isFormValid}
                            className={`w-[150px] flex justify-center items-center h-10 px-4 font-semibold rounded-md border border-slate-200 text-white bg-black ${isFormValid ? "bg-black" : "bg-gray-500 cursor-not-allowed"}`}
                        >
                            {isLoading && <Spinner color={"white"} width={"w-5"} />} Save
                        </button>)}
                    </div>
                </div>
            </div>)}
            {!loading && error && (<div className='text-3xl font-bold font-serif Times New Roman bg-cyan-900 flex justify-center items-center h-screen'>
                <div>
                    <span>{error}. Please try again</span>
                </div>
            </div>)}
            <ToastContainer />
        </div>
    )
}

export default UserDetails
