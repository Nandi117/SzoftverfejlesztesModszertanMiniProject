import {Outlet} from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react'
import {Navbar} from "../Navbar/Navbar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {toggleDrawer} from "../../store/drawer/drawer.slice.ts";
import {Menu} from "../Menu/Menu.tsx";
import {ScrollTopBtn} from "../ScrollTopBtn/ScrollTopBtn.tsx";

export const Layout = () => {



    const opened = useSelector((state:any)=>state.drawer.opened);

    const dispatch = useDispatch();
    const handleClose = () => dispatch(toggleDrawer())


    return <>
        <Navbar/>
        <ScrollTopBtn/>
        <Outlet/>
        <Drawer
            isOpen={opened}
            placement={"left"}
            onClose={handleClose}
        >
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