import React from 'react'
import { Form } from 'react-bootstrap'
import { IoSearchOutline } from "react-icons/io5";
import './header.css'
import { MdHome } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { TbUsersMinus } from "react-icons/tb";

const Header = () => {
    return (
        <>
            <div className="d-flex ">
                <div className="left gap-5 d-flex align-items-center">
                    <div className="search d-flex align-items-center">
                        <div className="img">
                            <img style={{ width: '100px' }} src="https://logowik.com/content/uploads/images/facebook-new-2023-icon9594.logowik.com.webp" alt="" />
                        </div>
                        <div className="search-bar d-flex align-items-center border rounded-pill px-4">
                            <span>
                                <IoSearchOutline size={30} />
                            </span>
                            <Form.Control type='search' className='border-0' placeholder='Search the facebook' />
                        </div>
                    </div>
                    <div className="icons fs-1 d-flex gap-5 ">
                        <MdHome />
                        <CiPlay1 />
                        <BsShop />
                        <TbUsersMinus />
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default Header