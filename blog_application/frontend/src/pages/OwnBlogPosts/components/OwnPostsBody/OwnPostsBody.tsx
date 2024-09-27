import {Grid, GridItem} from "@chakra-ui/react";
import {OwnPostItem} from "./components/OwnPostItem/OwnPostItem.tsx";


const articles: any[] = [
    {
        title: "How to Learn JavaScript",
        content: "JavaScript is a versatile language used for web development...",
        author: "John Doe"
    },
    {
        title: "Understanding React",
        content: "React is a popular library for building user interfaces...",
        author: "Jane Smith"
    },
    {
        title: "Mastering CSS Grid",
        content: "CSS Grid allows for complex layouts with simple code...",
        author: "Alice Johnson"
    },
    {
        title: "Responsive Web Design",
        content: "Responsive design is essential in a mobile-first world...",
        author: "Michael Brown"
    },
    {
        title: "Introduction to Node.js",
        content: "Node.js allows JavaScript to run on the server side...",
        author: "Chris Evans"
    },
    {title: "Building RESTful APIs", content: "APIs are crucial for modern web applications...", author: "Sarah White"},
    {
        title: "TypeScript vs JavaScript",
        content: "TypeScript adds static types to JavaScript...",
        author: "David Wilson"
    },
    {
        title: "Functional Programming in JS",
        content: "Functional programming promotes immutability and pure functions...",
        author: "Tom Harris"
    },
    {
        title: "Asynchronous JavaScript",
        content: "Understanding callbacks, promises, and async/await is crucial...",
        author: "Linda Green"
    },
    {
        title: "Debugging JavaScript",
        content: "Effective debugging is key to solving coding issues...",
        author: "Paul King"
    },
    {
        title: "Introduction to Vue.js",
        content: "Vue.js is a progressive framework for building user interfaces...",
        author: "Emily Clark"
    },
    {
        title: "State Management in React",
        content: "State management can be complex, but tools like Redux simplify it...",
        author: "George White"
    },
    {
        title: "Understanding Webpack",
        content: "Webpack is a powerful module bundler for JavaScript applications...",
        author: "Anna Lee"
    },
    {
        title: "Building Progressive Web Apps",
        content: "Progressive Web Apps provide a native app experience on the web...",
        author: "James Brown"
    },
    {
        title: "Security Best Practices",
        content: "Web security is crucial in modern applications, including XSS and CSRF prevention...",
        author: "John Black"
    },
    {
        title: "JavaScript Design Patterns",
        content: "Design patterns can help you write more organized and scalable code...",
        author: "Jessica Green"
    },
    {
        title: "Introduction to GraphQL",
        content: "GraphQL is a query language for your API, making data fetching more efficient...",
        author: "Steve Rogers"
    },
    {
        title: "Understanding the DOM",
        content: "The Document Object Model is key to manipulating HTML dynamically with JavaScript...",
        author: "Susan Stone"
    },
    {
        title: "ES6 Features You Should Know",
        content: "ES6 introduced several new features such as arrow functions and template literals...",
        author: "Karen Turner"
    },
    {
        title: "Handling Forms in React",
        content: "Forms are a crucial part of user interaction in React applications...",
        author: "Peter Parker"
    }
];


export const OwnPostsBody = () => {


    return <Grid templateColumns='repeat(5, 1fr)' gap={6} mt={5} width={"50%"}>
        {
            articles.map((item, index) => {
                return <GridItem key={index} width={"100%"}>
                    <OwnPostItem data={item}/>
                </GridItem>
            })
        }

    </Grid>


}