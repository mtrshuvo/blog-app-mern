import "./sidebar.css"
import { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";

function Sidebar() {
    const [cats,setCats] = useState([]);
    useEffect(()=> {
const getCats = async () => {
    const res = await axios.get("/categories/");
    setCats(res.data);
}
getCats()
    },[])
    return (
        <div className="sidebar" >
            <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            {/* <ul className="sidebarList">
                {cats.map(c => (
                    <Link to={`/?cat=${c.name}`} className="link" >

                <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
            </ul> */}

            </div>
            <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW ME</span>
           

            </div>
        </div>
    )
}

export default Sidebar
