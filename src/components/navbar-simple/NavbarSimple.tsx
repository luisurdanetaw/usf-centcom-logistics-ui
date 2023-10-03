import { useState } from 'react';
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
    IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import  './navbar-simple.scss';
import Header = Combobox.Header;

const data = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings },
];

export function NavbarSimple() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={"link"}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={"linkIcon"} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={"navbar"}>
            <div className={"navbarMain"}>
                <Group className={"header"} justify="space-between">
                    <Image
                        radius="md"
                        src="https://logos-world.net/wp-content/uploads/2021/11/US-Army-Logo.png"
                        className='navbar-logo'
                    />
                    <Title order={4} className='title'>SPO Commodites</Title>
                    <Code fw={700} className={'version'}>v1.0.0</Code>
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