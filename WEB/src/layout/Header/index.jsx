import React, { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styles from './index.module.css';


export default function HeaderComponent() {
    const { setAuth, setToken, user } = useContext(AppContext);

    function logout() {
        setToken(null);
        setAuth(false);
        localStorage.removeItem('token')
    }

    console.log(user)

    return (
        <div className={styles.master} >
            <div className={styles.pathContainer} >
                <p>Agenda</p>
            </div>

            <div className={styles.userContainer} >
                <UserOutlined style={{ fontSize: "22px", color: "#333", margin: '10px' }} />
                <p>{user.name ? user.name : 'Anonimo'}</p>
            </div>

            <button className={styles.logoutButton} onClick={logout} >
                <LogoutOutlined style={{ fontSize: "20px", color: "#333" }} />
            </button>

        </div>
    )
}