import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider as StoreProvider} from "react-redux"
import {lazy, Suspense} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {routes} from "./config/routes.ts";
import {Layout} from "./components/Layout/Layout.tsx";
import {store} from "./store/store.ts";


/*Lazy imports for optimizing page performance */
const OwnBlogPosts = lazy(() => import("./pages/OwnBlogPosts/OwnBlogPosts.tsx"));
const NewBlogPost = lazy(()=>import("./pages/OwnBlogPosts/pages/NewBlogPost/NewBlogPost.tsx"));
const BlogPost = lazy(()=>import("./pages/BlogPost/BlogPost.tsx"));
const LogInPage = lazy(()=>import("./pages/LogInPage/LogInPage.tsx"));
function App() {


    return (
        <StoreProvider store={store}>
            <ChakraProvider>
                <Router>
                    <Suspense>
                        <Routes>
                            <Route path={"/"} element={<Layout/>}>
                                {/* Own blog posts */}
                                <Route path={routes.ownPosts.main} element={<OwnBlogPosts/>}/>
                                <Route path={routes.ownPosts.new} element={<NewBlogPost/>}/>

                                {/* Common blog post */}
                                <Route path={routes.posts + "/:id"} element={<BlogPost/>}/>
                            </Route>

                                {/* Log in page */}
                                <Route path="/login" element={<LogInPage/>}/> {/* New Login route */}
                        </Routes>
                    </Suspense>

                </Router>
            </ChakraProvider>
        </StoreProvider>

    )
}

export default App
