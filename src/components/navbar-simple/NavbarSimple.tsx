import {useEffect, useState} from 'react';
import {Group, Code, Image, Combobox, Title} from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout, IconHome, IconBuildingWarehouse, IconCheck, IconGraph,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import  './navbar-simple.scss';
import Header = Combobox.Header;
import {useLocation, useNavigate} from "react-router-dom";
import {ImageComponent} from "../ImageComponent/ImageComponent";

const data = [
    { link: '/mcb/inventory', label: 'Inventory', icon: IconBuildingWarehouse},
    { link: '/mcb/tmr', label: 'TMR', icon: IconReceipt2 },
    { link: '/', label: 'Approvals', icon: IconCheck},
    { link: '/mcb/trends', label: 'Analysis', icon: IconGraph},
];

export function NavbarSimple() {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState('Home');

    const links = data.map((item) => (
        <a
            className={"link"}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                navigate(item['link']);
            }}
        >
            <item.icon className={"linkIcon"} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    useEffect(() => {
        // Update the active link based on the current route
        const currentRoute = location.pathname;

        // Find the corresponding label in your data array
        const matchingItem = data.find((item) => item.link === currentRoute);

        if (matchingItem) {
            setActive(matchingItem.label);
        }
    }, [location.pathname]);

    return (
        <nav className={"navbar"}>
            <div className={"navbarMain"}>
                <Group className={"header"} justify="space-between">
                    <ImageComponent
                        src={"https://logos-world.net/wp-content/uploads/2021/11/US-Army-Logo.png"}
                    />

                    <Title order={4} className='title'>CENTCOM Logistics</Title>
                    <Code fw={700} style={{backgroundColor:'rgb(27 42 61)', color:'white'}}>v1.0.0</Code>
                </Group>
                {links}
            </div>

            <div className={"footer"}>
                <a href="#" className={"link"} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={"linkIcon"} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={"link"} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={"linkIcon"} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}