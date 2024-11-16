import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider as StoreProvider} from "react-redux"
import {lazy, Suspense} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {routes} from "./config/routes.ts";
import {Layout} from "./components/Layout/Layout.tsx";
import {store} from "./store/store.ts";
import {PrivateRoutes} from "./components/PrivateRoutes/PrivateRoutes.tsx";
import {useAuth} from "./hooks/useAuth.ts";


/*Lazy imports for optimizing page performance */
const AllBlogPosts = lazy(() => import("./pages/AllBlogPosts/AllBlogPosts.tsx"));
const OwnBlogPosts = lazy(() => import("./pages/OwnBlogPosts/OwnBlogPosts.tsx"));
const NewBlogPost = lazy(() => import("./pages/OwnBlogPosts/pages/NewBlogPost/NewBlogPost.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost/BlogPost.tsx"));
const LogInPage = lazy(() => import("./pages/LogInPage/LogInPage.tsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.tsx"));

function App() {


    const {} = useAuth();

    return (
        <StoreProvider store={store}>
            <ChakraProvider>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>

                            <Route path={"/"} element={<Layout/>}>
                                {/* Own blog posts */}
                                <Route element={<PrivateRoutes/>}>
                                    <Route path={routes.ownPosts.main} element={<OwnBlogPosts/>}/>
                                    <Route path={routes.ownPosts.new} element={<NewBlogPost/>}/>
                                </Route>
                                {/* All blog posts */}
                                <Route path={routes.allPosts} element={<AllBlogPosts/>}/>
                                {/* Common blog post */}
                                <Route path={routes.posts + "/:id"} element={<BlogPost/>}/>
                            </Route>





                            {/* Log in page */}
                            <Route path="/login" element={<LogInPage/>}/> {/* New Login route */}

                            {/* Sign in page */}
                            <Route path="/signup" element={<SignUpPage/>}/> {/*signup route*/}
                        </Routes>
                    </Suspense>

                </Router>
            </ChakraProvider>
        </StoreProvider>

    )
}

export default App
