import React, { useContext } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PodcastIcon from "@mui/icons-material/Podcasts";
import GroupsIcon from '@mui/icons-material/Groups';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import { Link, NavLink } from "react-router-dom";
import { FormatListNumbered } from "@mui/icons-material";
import { ControlDeAcceso, FunctionControlDeAcceso } from "../ControlDeAcceso/ControlDeAcceso";
import { UserContext } from "../../pages/Login/userContext";

interface SideBarListProps {
    ItemIcon: React.ReactNode;
    ItemText: string;
    ItemIndex: number;
    selectedIndex: number | null;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    navigateTo: string
    rolesPermitidos: string[];
}

export const SideBarItem = ({ ItemIcon, ItemText, ItemIndex, rolesPermitidos, selectedIndex, setSelectedIndex, navigateTo }: SideBarListProps) => {

    const handleListItemClick = () => {
        setSelectedIndex(ItemIndex);
    };
    const { usuario } = useContext(UserContext)
    


    return (
        <ControlDeAcceso rolesPermitidos={rolesPermitidos}>
        <ListItem disablePadding sx={{
            ":hover": {
                backgroundColor: '#06A3C9',
                color: 'white'
            },
            ":checked": {
                backgroundColor: '#56A42C'
            }
            }}
        >
            <ListItemButton
                component={Link} to={navigateTo}
                selected={selectedIndex === ItemIndex}
                onClick={handleListItemClick}
                sx={{
                    "&.Mui-selected": {
                        backgroundColor: '#56A42C',
                        color: 'white'
                    }
                }}
            >
                <ListItemIcon>
                    {ItemIcon}
                </ListItemIcon>
                <ListItemText primary={ItemText} />
            </ListItemButton>
        </ListItem>
        </ControlDeAcceso>
    )
};

export const Items = [
    {
        ItemIcon: <PodcastIcon />,
        ItemText: 'Convocatorias',
        navigateTo: '/Convocatorias',
        rolesPermitidos: ['admin', 'super_admin', 'investigador']
    },
    {
        ItemIcon: <FormatListNumbered />,
        ItemText: 'Formatos',
        navigateTo: '/Formatos',
        rolesPermitidos: ['admin', 'super_admin']
    },
    {
        ItemIcon: <GroupsIcon />,
        ItemText: 'Usuarios',
        navigateTo: '/Usuarios',
        rolesPermitidos: ['super_admin']
    },
];