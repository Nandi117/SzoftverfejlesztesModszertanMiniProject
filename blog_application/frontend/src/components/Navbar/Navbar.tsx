import {Box, Button, Flex, IconButton, Spacer, useColorMode} from "@chakra-ui/react";
import {ArrowForwardIcon, HamburgerIcon, MoonIcon, SunIcon, UnlockIcon} from '@chakra-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {toggleDrawer} from "../../store/drawer/drawer.slice.ts";
import {useNavigate} from "react-router-dom";
import {UserInfoPanel} from "../UserInfoPanel/UserInfoPanel.tsx";
import {Activity} from "../Activity/Activity.tsx";
import {Logo} from "../Logo/Logo.tsx";

/**
 * Navbar Component
 *
 * This component renders a responsive and fixed navigation bar at the top of the application. It integrates
 * Chakra UI for styling, Redux for state management, and React Router for navigation. The Navbar includes
 * user-specific functionality, theme toggling, and navigation controls.
 *
 * Features:
 * - Displays a logo and optional menu button for authenticated users.
 * - Includes buttons for "Sign In" and "Sign Up" when the user is not logged in.
 * - Offers a theme toggle button to switch between light and dark modes.
 * - Displays an activity menu and user info panel for authenticated users.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For responsive and styled UI components (`Flex`, `Box`, `Button`, `IconButton`).
 * - `react-redux`: For accessing global state (`user` info) and managing the drawer's open/close state.
 * - `react-router-dom`: For navigation (`useNavigate`).
 * - Custom Components:
 *   - `Logo`: Displays the application logo.
 *   - `UserInfoPanel`: Displays user-related information or controls.
 *   - `Activity`: Provides user activity-related features.
 * - Chakra Icons: For interactive elements (`HamburgerIcon`, `MoonIcon`, `SunIcon`, etc.).
 *
 * Behavior:
 * - If a user is authenticated (`user` exists in Redux state):
 *   - Displays the drawer toggle button (`HamburgerIcon`).
 *   - Displays the `Activity` and `UserInfoPanel` components.
 * - If no user is authenticated:
 *   - Shows "Sign In" and "Sign Up" buttons.
 * - Theme toggling:
 *   - The `IconButton` toggles the color mode (`light` or `dark`) via `useColorMode`.
 * - Navigation:
 *   - "Sign In" button navigates to the `/login` route.
 *   - "Sign Up" button navigates to the `/signup` route.
 * - Drawer management:
 *   - The drawer can be toggled using the `handleBurgerClick` function, which dispatches the `toggleDrawer` action.
 *
 * Structure:
 * - `Flex`: Main container with a horizontal layout.
 *   - Logo: Displays the `Logo` component.
 *   - Spacer: Pushes user-related controls to the far right.
 *   - Controls: Includes activity, theme toggle, and authentication buttons.
 * - Style:
 *   - Fixed position at the top with a responsive background based on the color mode.
 *   - `zIndex` ensures the Navbar is always on top of other elements.
 *
 * Props:
 * - None. The component relies on Redux for `user` state and `toggleDrawer` action.
 */

export const Navbar = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    console.log(user)

    const {toggleColorMode, colorMode} = useColorMode()
    const navigate = useNavigate();

    const handleBurgerClick = () => {
        dispatch(toggleDrawer());
    }

    const handleSignInClick = () => {
        navigate("/login");
    }

    const handleSignUpClick = () => {
        navigate("/signup");
    }


    return <Flex
        py={2}
        px={10}
        gap={10}
        width={"100%"}
        alignItems={"center"}
        position={"fixed"}
        top={0}
        background={colorMode === "dark" ? "rgba(255, 255, 255, 0.16);" : " rgba(0, 0, 0, 0.16);"}
        zIndex={50}>

        {
            user ? <Box>
                <IconButton data-testid={"menu-btn"} aria-label={"Toggle menu"} icon={<HamburgerIcon/>} onClick={handleBurgerClick}/>
            </Box> : null
        }
        <Box>
            <Logo/>
        </Box>


        <Spacer/>
        <Flex gap={2} width={"300px"} justifyContent={"end"}>

            {
                user ? <Activity/> : null
            }

            <IconButton aria-label={"Theme change button"} icon={colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
                        variant={"ghost"} onClick={toggleColorMode}/>

            {
                user ? null :
                    <Button leftIcon={<UnlockIcon/>} colorScheme={"teal"} onClick={handleSignInClick}>Sign In</Button>
            }
            {
                user ? null : <Button leftIcon={<ArrowForwardIcon/>} colorScheme={"teal"} onClick={handleSignUpClick}
                                      variant='outline'>Sign Up</Button>
            }


            <UserInfoPanel/>
        </Flex>

    </Flex>

}
