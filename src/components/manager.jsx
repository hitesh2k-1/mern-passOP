import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

const manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPassword()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        if (ref.current.src.includes("icons/eye.jpg")) {
            ref.current.src = "icons/eyeclose.jpg"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eye.jpg"
            passwordRef.current.type = "password"

        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error : invalid credentials', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Are you sure you want to delete")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const editPassword = async (id) => {
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
          // if such id exist in db delete it
          await fetch("http://localhost:3000/", {
            method: "DELETE", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id:form.id })
        })

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className="container text-white min-h-[calc(100vh-137px)] m-auto ">
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                </div>
                <div className='flex justify-center items-center flex-col' >
                    <div className="logo font-bold cursor-pointer ">
                        <span className='font-bold text-3xl text-green-400' >&lt;</span>
                        <span className='font-bold text-3xl' >Pass</span>
                        <span className='font-bold text-3xl text-green-400' >OP/&gt;</span>
                    </div>
                    <div className="text ">Your own password manager</div>
                    <div className="inputs flex flex-col  my-5 text-black gap-5 mx-5 px-10 w-full lg:w-1/2">
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className=' py-1 px-2 rounded-full' type="url" name='site' id='site' />
                        <div className='flex flex-col  sm:flex-row  gap-5 justify-between' >
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username or Email' className='py-1 w-full md:w-3/4 px-2 rounded-full' type="text" name='username' id='username' />
                            <div className='flex relative items-center w-1/2 m-auto justify-center  '>
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className=' px-2 w-full py-1 rounded-full' type="password" name='password' id='password' />
                                <span onClick={showPassword} className=' absolute right-2 cursor-pointer ' >
                                    <img ref={ref} width={24} src="icons/eye.jpg" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex items-center gap-2 px-4 py-1 hover:font-bold text-black bg-green-500 rounded-full' >
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                        Add Passowrd</button>

                </div>

                <div className="passwords flex items-center gap-3 mt-5 pb-10 flex-col justify-center ">
                    <h2 className='font-bold text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-1/2 rounded-xl overflow-hidden border border-black">
                        <thead className='bg-green-800 text-sm sm:text-lg mx-2 ' >
                            <tr>
                                <th className='py-2' >Site</th>
                                <th className='py-2' >Username</th>
                                <th className='py-2' >Password</th>
                                <th className='py-2' >Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 text-black ' >
                            {passwordArray.map((item, index) => {
                                return <tr key={index} >
                                    <td className='text-center py-2 text-blue-500 md:min-w-32 ' >
                                        <div className=' svgcopy flex justify-center items-center gap-2 cursor-pointer ' onClick={() => { copyText(item.site) }}> <a className='w-16 overflow-hidden sm:w-40 lg:w-60 px-2' href={item.site} target='_blank'> {item.site}</a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                            <path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        </div></td>
                                    <td className='text-center min-w-20 md:min-w-32 sm:min-w-24 py-2  ' >
                                    <div className=' svgcopy flex justify-center items-center gap-2 cursor-pointer   ' onClick={() => { copyText(item.username) }} > <span className='w-12 overflow-hidden sm:w-32 lg:w-60 px-2' >{item.username} </span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                            <path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        </div>
                                    </td>
                                    <td className='text-center min-w-20 md:min-w-32 sm:min-w-24 py-2 ' >
                                        <div className=' svgcopy w-16 overflow-hidden sm:w-40 lg:w-60 flex justify-center items-center gap-2 font-bold text-xl cursor-pointer ' onClick={() => { copyText(item.password) }} >
                                            <span className='w-12 overflow-hidden sm:w-32 lg:w-60 px-2'> {"*".repeat(item.password.length)}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                                <path d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                    </td>
                                    <td className='text-center md:min-w-32 py-2 sm:min-w-24 min-w-14' >
                                        <div className=' svgcopy flex justify-center gap-2 cursor-pointer '>
                                            <div className='' onClick={() => { editPassword(item.id) }} >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                                    <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <div className='' onClick={() => { deletePassword(item.id) }} >
                                                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>

        </>
    )
}

export default manager
