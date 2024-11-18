import {Box, Button, Flex, IconButton, Spacer, useColorMode,} from "@chakra-ui/react";
import {ArrowForwardIcon, HamburgerIcon, MoonIcon, SunIcon, UnlockIcon} from '@chakra-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {toggleDrawer} from "../../store/drawer/drawer.slice.ts";
import {useNavigate} from "react-router-dom";
import {UserInfoPanel} from "../UserInfoPanel/UserInfoPanel.tsx";
import {Activity} from "../Activity/Activity.tsx";

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


    return <Flex py={2} px={10}>

        {
            user ? <Box>
                <IconButton aria-label={"Toggle menu"} icon={<HamburgerIcon/>} onClick={handleBurgerClick}/>
            </Box> : null
        }

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
