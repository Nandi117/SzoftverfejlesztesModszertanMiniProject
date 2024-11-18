import { Box, Heading, Text, List, ListItem, Center } from "@chakra-ui/react";

const VersionInformation = () => {
    return (
        <Center>
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
            </Box>
        </Center>
    );
};

export default VersionInformation;