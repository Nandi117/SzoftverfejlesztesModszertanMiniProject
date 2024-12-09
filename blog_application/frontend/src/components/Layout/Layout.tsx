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

/**
 * Layout Component
 *
 * This component serves as the main layout for the application, combining navigation, content display,
 * and a responsive drawer menu. It uses Chakra UI for styling and `react-router-dom` for routing.
 *
 * Features:
 * - `Navbar`: A persistent navigation bar displayed at the top of the page.
 * - `ScrollTopBtn`: A button to scroll back to the top of the page.
 * - `Outlet`: Placeholder for rendering nested routes.
 * - `Drawer`: A collapsible sidebar menu that can be toggled open or closed.
 * - Redux integration to manage the state of the drawer.
 *
 * Dependencies:
 * - `react-router-dom`: For managing nested routes and rendering child components via `Outlet`.
 * - `@chakra-ui/react`: For UI components such as `Drawer` and its subcomponents.
 * - `react-redux`: For managing global state, specifically the drawer's open/close status.
 * - `Navbar`, `Menu`, `ScrollTopBtn`: Custom components used for navigation and utility.
 *
 * Behavior:
 * - The drawer is controlled by the Redux `drawer` slice.
 *   - The `opened` state determines whether the drawer is open.
 *   - The `toggleDrawer` action toggles the open/close state of the drawer.
 * - The `handleClose` function dispatches the `toggleDrawer` action to close the drawer.
 *
 * Structure:
 * - `Navbar`: Always visible at the top of the page.
 * - `ScrollTopBtn`: A utility button for easy navigation back to the top of the page.
 * - `Outlet`: Dynamically renders child components based on the current route.
 * - `Drawer`:
 *   - Opens on the left side when triggered.
 *   - Contains:
 *     - `DrawerCloseButton`: Button to close the drawer.
 *     - `DrawerHeader`: Space for drawer title or branding.
 *     - `DrawerBody`: Contains the `Menu` component for navigation or additional options.
 *     - `DrawerFooter`: Placeholder for additional footer content (currently empty).
 *
 * Props:
 * - None. The component relies on Redux for state management and child components for content.
 */


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