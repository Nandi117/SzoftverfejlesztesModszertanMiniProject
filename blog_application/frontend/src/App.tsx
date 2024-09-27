import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider as StoreProvider} from "react-redux"
import {lazy, Suspense} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {routes} from "./config/routes.ts";
import {Layout} from "./components/Layout/Layout.tsx";
import {store} from "./store/store.ts";


const OwnBlogPosts = lazy(() => import("../src/pages/OwnBlogPosts/OwnBlogPosts.tsx"));
const NewBlogPost = lazy(()=>import("../src/pages/OwnBlogPosts/pages/NewBlogPost/NewBlogPost.tsx"));
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
                            </Route>
                        </Routes>
                    </Suspense>

                </Router>
            </ChakraProvider>
        </StoreProvider>

    )
}

export default App
