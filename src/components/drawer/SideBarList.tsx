import { Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, ButtonProps, styled, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { Items, SideBarItem } from "./SideBarListItems";
import { NavButton } from "../CustomButton/CustomButtons";
import { btnAzulUnahur } from "../CustomButton/buttonStyles";
import { ControlDeAcceso } from "../ControlDeAcceso/ControlDeAcceso";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#06A3C9"),
    backgroundColor: "#06A3C9",
  }));

const SideBarList = () => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    return (
        <>
            <Toolbar />
            <List>
                {Items.map((item, index) => (
                    <SideBarItem
                        key={index}
                        ItemIcon={item.ItemIcon} 
                        ItemText={item.ItemText}
                        rolesPermitidos={item.rolesPermitidos}
                        ItemIndex={index}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        navigateTo={item.navigateTo}
                    />
                ))}
                <Divider />

                <ControlDeAcceso rolesPermitidos={["admin", 'superadmin']}>
                <NavButton 
                    nombre="Nueva Convocatoria"
                    iconoDerecho={<AddIcon />}
                    type="button"
                    style={btnAzulUnahur} 
                    navigateTo={"/Form"}                
                />
                </ControlDeAcceso>
            </List>
        </>
    )
};

export default SideBarList;