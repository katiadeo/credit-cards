import { CreditCardOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="header">
            <nav className="nav">
                <NavLink to="/">
                    <Button
                        size="large"
                        type="primary"
                        shape="round"
                        className="recordsBtn"
                        icon={<CreditCardOutlined />}
                    >
                        Records
                    </Button>
                </NavLink>
                <NavLink to="/create">
                    <Button
                        size="large"
                        shape="round"
                        type="primary"
                        className="addBtn"
                        icon={<PlusOutlined />}
                    >
                        Add
                    </Button>
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
