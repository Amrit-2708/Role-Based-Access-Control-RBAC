import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//hero icons
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import {
    ChevronUpDownIcon,
    CheckIcon,
} from "@heroicons/react/20/solid";

//component
import Spinner from "./spinner";
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";

//toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const roles = [
    {
        id: 1,
        name: 'admin',
    },
    {
        id: 2,
        name: 'user',
    },
]

export default function Example() {
    const [open, setOpen] = useState(true);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState(roles[1]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const isFormValid = name && email && role.name;
    const token = localStorage.getItem("user");

    function handleAddUser() {
        const final_role = role.name;
        setLoading(true);
        axios
            .post("https://rbac-server.vercel.app/adduser", { name, email, final_role })
            .then((result) => {
                toast.success(`${result.data.message}.`, {autoClose: 5000});
                setTimeout(() => {
                    navigate(`/org/${token}`);
                }, 5000);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(`${error.response.data.message}.`, { autoclose: 5000 });
                }
                else if (!error.response) {
                    toast.error(`${error.message}. Please try again later`, { autoclose: 5000 })
                }
                setLoading(false);
            });
    }

    function handleCancelAdd(){
        setOpen(false);
        setTimeout(() => {
            navigate(`/org/${token}`);
        }, 100);;
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/90 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-auto rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    <UserPlusIcon
                                        aria-hidden="true"
                                        className="size-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-gray-900"
                                    >
                                        Add New user
                                    </DialogTitle>

                                    <div className="mt-8">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="Enter name"
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Enter email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        />
                                    </div>

                                    <Listbox value={role} onChange={setRole}>
                                        <Label className="block text-sm/6 font-medium text-gray-900 mt-2">Role</Label>
                                        <div className="relative">
                                            <ListboxButton className="relattive w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                                                <span className="flex items-center">
                                                    <span className="block truncate">{role.name}</span>
                                                </span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                    <ChevronUpDownIcon aria-hidden="true" className="size-5 text-gray-400" />
                                                </span>
                                            </ListboxButton>

                                            <ListboxOptions
                                                transition
                                                className="absolute z-10 mt-1 w-full max-h-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                            >
                                                {roles.map((role) => (
                                                    <ListboxOption
                                                        key={role.id}
                                                        value={role}
                                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                                    >
                                                        <div className="flex items-center">
                                                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                                                {role.name}
                                                            </span>
                                                        </div>

                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                                            <CheckIcon aria-hidden="true" className="size-5" />
                                                        </span>
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                disabled={!isFormValid}
                                onClick={handleAddUser}
                                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto ${isFormValid ? "bg-red-600" : "bg-gray-500 cursor-not-allowed"}`}
                            >
                                {loading && <Spinner color={"white"} width={"w-5"} />}Add user
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={handleCancelAdd}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
            <ToastContainer />
        </Dialog>
    );
}
