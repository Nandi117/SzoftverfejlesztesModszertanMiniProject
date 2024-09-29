import {Outlet} from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import {Navbar} from "../Navbar/Navbar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleDrawer} from "../../store/drawer/drawer.slice.ts";
import {Menu} from "../Menu/Menu.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

export const Layout = () => {


    useAuth();

    const opened = useSelector(state=>state.drawer.opened);
    const dispatch = useDispatch();
    const handleClose = () => dispatch(toggleDrawer())

    return <>
        <Navbar/>
        <Outlet/>
        <Drawer
            isOpen={opened}
            placement={"left"}
            onClose={handleClose}
        >

            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>

                <DrawerBody>
                    <Menu/>
                </DrawerBody>

                <DrawerFooter>

                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>

}