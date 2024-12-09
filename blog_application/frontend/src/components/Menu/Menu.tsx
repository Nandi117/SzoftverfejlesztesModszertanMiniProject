import {Badge, Box, Button, Flex, Spacer, Text} from "@chakra-ui/react";
import {menuItems} from "../../config/menu.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeDrawer} from "../../store/drawer/drawer.slice.ts";
import {Logo} from "../Logo/Logo.tsx";

/**
 * Menu Component
 *
 * This component renders a navigational menu for the application, integrating with Chakra UI for styling,
 * Redux for state management, and React Router for navigation. It is designed for use in a sidebar or drawer.
 *
 * Features:
 * - Displays a list of menu items configured in the `menuItems` configuration file.
 * - Includes a logo and tagline at the top.
 * - Allows users to navigate to different routes in the application.
 * - Closes the drawer automatically after a menu item is selected.
 * - Includes a "Version information" button at the bottom.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For responsive and styled UI components (`Flex`, `Button`, `Box`, `Spacer`, `Text`).
 * - `react-router-dom`: For navigation (`useNavigate`).
 * - `react-redux`: For managing the drawer's state (`useDispatch` and `closeDrawer` action).
 * - `menuItems`: Configuration array containing menu item details (id, route, display text).
 * - `Logo`: Custom component for displaying the application logo.
 *
 * Behavior:
 * - The `menuItems` array is mapped to generate a list of buttons, each corresponding to a menu item.
 * - Clicking a menu item:
 *   - Navigates to the specified route using `useNavigate`.
 *   - Dispatches the `closeDrawer` action to close the drawer.
 * - A "Version information" button is placed at the bottom to navigate to the `/version-information` route.
 *
 * Structure:
 * - `Flex`: The main container with a vertical layout.
 *   - Header:
 *     - `Logo`: Displays the app logo.
 *     - Tagline: A text below the logo.
 *   - Divider: A horizontal rule separating the header from the menu items.
 *   - Menu Items: A list of buttons generated from the `menuItems` array.
 *   - Spacer: Pushes the "Version information" button to the bottom.
 *   - Footer: A button to display version information.
 *
 * Props:
 * - None. The component relies on the `menuItems` configuration and external dependencies.
 */

export const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenuItemClick = (route: string) => {
        navigate(route);
        dispatch(closeDrawer());
    };

    return (
        <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
            <Flex alignItems={"center"} width={"100%"} justifyContent={"space-around"} py={4}>
                <Logo/>
                <Text fontSize={14}>Where words find their wings.</Text>
            </Flex>
            <hr/>
            {menuItems.map((menuItem) => {
                return (
                    <Box key={menuItem.id} width={"100%"} pt={2}>
                        <Button width={"100%"} onClick={() => handleMenuItemClick(menuItem.route)}>
                            {menuItem.displayText}
                        </Button>
                    </Box>
                );
            })}
            <Spacer />
            <Box>
                <Badge>v1.0.2</Badge>
                <Button width={"100%"} colorScheme={"teal"} onClick={() => handleMenuItemClick("/version-information")}>
                    Version information
                </Button>

            </Box>
        </Flex>
    );
};