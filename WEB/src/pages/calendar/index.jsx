import React, { useState, useEffect, useContext } from 'react';
import { CalendarContext } from '../../contexts/calendarContext';
import { AppContext } from '../../contexts/appContext';
import useRequest from '../../hooks/useRequest';
import { ApiFilled, CalendarOutlined } from '@ant-design/icons';
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

export default function CalendarPage() {
    const { request } = useRequest();
    const { fetchClients, fetchQuerys, typeCalendar } = useContext(CalendarContext);
    const { user } = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchClients(request);
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await fetchQuerys(request);
        })()
    }, [typeCalendar])

    function menuBar(e) {
        let key = e.key

        if (key === '2') {
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

                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" onClick={menuBar} selectedKeys={{}} >
                        <Menu.Item key="2" icon={<ApiFilled />} >
                            AppSheet
                        </Menu.Item>
                    </Menu>

                </Sider>

                {/* Corpo Principal (Header, Content, Footer) */}
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