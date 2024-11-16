import { Box, Heading, Text } from "@chakra-ui/react";

const VersionInformation = () => {
    return (
        <Box p={5}>
            <Heading as="h1" mb={5}>Version Information</Heading>
            <Text mb={3}><strong>Version:</strong> 1.0.0</Text>
            <Text mb={3}><strong>Features:</strong></Text>
            <ul>
                <li>AllBlogPosts Page: Display all blog posts with search functionality.</li>
                <li>CommentsModal: Add and display comments for each post.</li>
                <li>Superlike: Special like feature with higher value than regular likes.</li>
                <li>Redux Store: Manage state for posts and comments.</li>
                <li>Search Functionality: Search posts based on keywords.</li>
                <li>Version Information Page: Display version and feature information.</li>
            </ul>
        </Box>
    );
};

export default VersionInformation;