import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/appContext';
import { ApiFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { motion } from "framer-motion";
import HeaderComponent from '../../layout/Header'
import ContentComponent from '../../layout/Content';

import styles from './index.module.css'
import Logo from '../../components/Logo';

const { Sider, Footer } = Layout;

const pageVariants = {
    initial: { opacity: 0, scale: 0.8 }, // Aparece pequeno e invisível
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } }, // Cresce e aparece
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }, // Some e diminui
};

const items = [
    { label: 'AppSheet', key: 'AppSheet', icon: <ApiFilled /> }
];

export default function CalendarPage() {
    const { user } = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(false);

    function menuBar(e) {
        let key = e.key

        if (key === 'AppSheet') {
            window.open(user.url, '_blank');
        }
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Layout className={styles.layout} >
                <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme='light' >
                    <div className={styles.titleSider} >
                        {
                            collapsed ? <p>...</p> : <Logo height='60px' />
                        }
                    </div>

                    <Menu
                        theme="light"
                        defaultSelectedKeys={['AppSheet']}
                        mode="inline"
                        onClick={menuBar}
                        selectedKeys={[]}
                        items={items}
                    />

                </Sider>

                <Layout>
                    <HeaderComponent />
                    <ContentComponent />
                    <Footer className={styles.footer}>
                        ©2024 Afinato todos os direitos reservados.
                    </Footer>
                </Layout>

            </Layout>
        </motion.div>
    );
};