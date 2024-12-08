import { Box, Heading, Text, List, ListItem, Center } from "@chakra-ui/react";

const VersionInformation = () => {
    return (
        <Center mt={"5vh"}>
            <Box p={5} maxW="600px" textAlign="center">
                <Heading as="h1" mb={5}>Version Information</Heading>
                <Text mb={3}><strong>Version:</strong> 1.0.0</Text>
                <Text mb={3}><strong>Features:</strong></Text>
                <List spacing={3} textAlign="left">
                    <ListItem>AllBlogPosts Page: Display all blog posts with search functionality.</ListItem>
                    <ListItem>CommentsModal: Add and display comments for each post.</ListItem>
                    <ListItem>Superlike: Special like feature with higher value than regular likes.</ListItem>
                    <ListItem>Redux Store: Manage state for posts and comments.</ListItem>
                    <ListItem>Search Functionality: Search posts based on keywords.</ListItem>
                    <ListItem>Version Information Page: Display version and feature information.</ListItem>
                </List>

                <Box mt={"2em"}>
                    <Text mb={3}><strong>Version:</strong> 1.0.1</Text>
                    <Text mb={3}><strong>Features:</strong></Text>
                    <List spacing={3} textAlign="left">
                        <ListItem>Activity: Display the current user activity (only for blog post management).</ListItem>
                        <ListItem>New blog post: Users can add background templates to their posts.</ListItem>
                        <ListItem>Translation: Users can translate blog posts to hungarian language.</ListItem>
                        <ListItem>Password changing: Users can change their passwords in the user profile section.</ListItem>
                        <ListItem>Version Information Page: Display version and feature information v1.0.1.</ListItem>
                    </List>
                </Box>


                <Box mt={"2em"}>
                    <Text mb={3}><strong>Version:</strong> 1.0.2</Text>
                    <Text mb={3}><strong>Features:</strong></Text>
                    <List spacing={3} textAlign="left">
                        <ListItem>Activity: Display the current user activity (commenting activity as well).</ListItem>
                        <ListItem>Accounts page: Users can see all registered accounts.</ListItem>
                        <ListItem>Updated UI: More attractive UI enabled.</ListItem>
                        <ListItem>Automated tests: Test automatization.</ListItem>
                        <ListItem>Version Information Page: Display version and feature information v1.0.2.</ListItem>
                    </List>
                </Box>

            </Box>


        </Center>
    );
};

export default VersionInformation;