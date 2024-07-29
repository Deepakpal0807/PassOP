import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import useMedia from 'use-media';

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([]);
  const [copy, setcopy] = useState(false);
  
  const getpassword = async () => {
    
      let req = await fetch("http://localhost:3000/");
      let password = await req.json();
      setpasswordarray(password || []);
      console.log(password);
    
  }

  useEffect(() => {
    getpassword();
  }, []);

  const isMediumScreen = useMedia({ minWidth: '1133px' });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    if (!showPassword) {
      alert("Show Password");
    } else {
      alert("Hide Password");
    }
    if (ref.current) {
      ref.current.src = showPassword ? "images/open.png" : "images/close.png";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

        // If any such id exists in the db, delete it 
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

        setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

        // Otherwise clear the form and show toast
        setForm({ site: "", username: "", password: "" })
        toast('Password saved!', {
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
        toast('Error: Password not saved!');
    }

}


  const handleedit = (id) => {
    const x=confirm("Edit password");
    if(x){

      setForm({ ...passwordarray.filter(i => i.id === id)[0], id: id })
      setpasswordarray(passwordarray.filter(item => item.id !== id))

    }
}

  const handledelete = async(index) => {
    const x = confirm("Delete Password");
    if (x) {
      const updatearray = passwordarray.filter((item) => item.id !== index);
      setpasswordarray(updatearray);
      // localStorage.setItem("passwords", JSON.stringify(updatearray));
      let req= await fetch("http://localhost:3000/",{method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({index})
      })
      toast('🦄 Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      console.log("Delete cancelled");
    }
  };

  const copyToClipboard = (text) => {
    toast('🦄 Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
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
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-34 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="md:px-40 md:py-16 md:mx-auto w-full">
        <div className="font-bold ml-4 pt-4">
          <span className="text-green-500 font-bold font-serif text-2xl">
            &lt;{" "}
          </span>
          <span className="text-2xl text-white font-serif">Pass</span>
          <span className="text-green-500 font-serif text-2xl"> OP/&gt;</span>
          <div className="text-purple-400 font-serif text-lg pt-3 pl-2">
            Your own password manager
          </div>
        </div>
        <div className="text-black flex flex-col p-4">
          <input
            type="text"
            name="site"
            id="website"
            value={form.site}
            onChange={handleChange}
            className="rounded-full my-4 py-1 px-4"
            placeholder="Enter Website URL"
          />
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              className="rounded-full flex-1 px-4 py-1 md:w-4/5 text-black"
              placeholder="Enter Username"
            />
            <div className="relative flex-1 md:w-1/5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full px-4 py-1 w-full text-black"
                placeholder="Enter Password"
              />
              <span className="absolute right-3 w-6 h-8 top-1.5">
                <img
                  ref={ref}
                  src={showPassword ? "images/close.png" : "images/open.png"}
                  alt="Toggle Password Visibility"
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="flex w bg-purple-500 rounded-full max-w-[50%] m-auto items-center w-fit text-black font-bold font-serif text-md py-1 justify-end hover:bg-purple-700 hover:text-white px-3 hover:border"
        >
          <lord-icon
            src="https://cdn.lordicon.com/zrkkrrpl.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#121331,secondary:#110a5c"
          ></lord-icon>
          Save Password
        </button>
        <div className="passwords container text-white mt-6 mx-auto w-full">
          <h2 className="font-serif font-bold text-xl py-2 px-4">
            Your <span className="text-green-500">Pass</span>words
          </h2>
          {passwordarray.length === 0 && (
            <div>
              <h4 className="font-serif font-bold text-lg">No Password to show</h4>
            </div>
          )}
          {passwordarray.length !== 0 && (
            <table className="w-11/12 overflow-hidden rounded-xl mx-auto">
              <thead>
                <tr className="bg-purple-600 max-w-[100%]">
                  <th className="py-3">Website Url</th>
                  <th className="py-3">Username</th>
                  <th className="py-3">Password</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-50 text-black text-md w-11/12">
                {passwordarray.map((item, index) => (
                  <tr key={index} className="border border-black justify-between">
                    <td className="py-3 text-center border border-y-black px-2">
                      <div className="flex flex-row justify-center text-center items-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-md px-3 "
                        >
                          {isMediumScreen
                            ? item.site.length > 20
                              ? item.site
                              : item.site.substring(0, 22) + "..."
                            : item.site.substring(0, 8) + "..."}
                        </a>
                        <span>
                          <button onClick={() => copyToClipboard(item.site)}>
                            <i className="fa-regular fa-copy"></i>
                          </button>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center border border-y-black">
                      <div className="flex flex-row justify-center text-center items-center">
                        <span className="px-2">
                          {isMediumScreen
                            ? item.username.substring(0, 15)
                            : item.username.substring(0, 6) + "..."}
                        </span>
                        <span>
                          <button onClick={() => copyToClipboard(item.username)}>
                            <i className="fa-regular fa-copy"></i>
                          </button>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-center border border-y-black">
                      <div className="flex flex-row justify-center text-center items-center">
                        <span className="px-2 font-bold">{"   .........   "}</span>
                        <span>
                          <button onClick={() => copyToClipboard(item.password)}>
                            <i className="fa-regular fa-copy"></i>
                          </button>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 w-[10%] text-center">
                      <div className="flex flex-row justify-center text-center items-center">
                        <span className="text-bold" onClick={() => handleedit(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            colors="primary:#121331,secondary:#110a5c"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginLeft: "4px",
                            }}
                          ></lord-icon>
                        </span>
                        <button onClick={() => handledelete(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#110a5c"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginLeft: "4px",
                            }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
