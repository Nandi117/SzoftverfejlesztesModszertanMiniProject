

/**
 * Application Routes Configuration
 *
 * This module defines the routes used throughout the application, providing a centralized structure for managing route paths.
 *
 * Features:
 * - Centralized route management.
 * - Nested routes for related functionalities.
 * - Easily extendable for future route additions.
 *
 * Exported Object:
 * - `routes`: An object containing route paths as key-value pairs. 
 *   - Keys represent logical names of routes.
 *   - Values represent the actual paths used in the application.
 *
 * Routes:
 * 1. **Authentication**:
 *    - `login`: Route to the login page (`"/login"`).
 *    - `signUp`: Route to the sign-up page (`"/signup"`).
 *
 * 2. **Posts**:
 *    - `allPosts`: Home route displaying all posts (`"/"`).
 *    - `ownPosts`:
 *      - `main`: Route to display the user's own posts (`"/ownPosts"`).
 *      - `new`: Route to create a new post (`"/ownPosts/new"`).
 *    - `posts`: General route for posts management or viewing (`"posts"`).
 *
 * 3. **Accounts**:
 *    - `accounts`: Route related to account management or listing (`"accounts"`).
 *
 * Usage:
 * Import the `routes` object and use it for navigation or route definitions.
 * 
 * Example in a component:
 * ```javascript
 * import { routes } from './routes';
 * import { Link } from 'react-router-dom';
 * 
 * <Link to={routes.login}>Login</Link>
 * ```
 * 
 * Example in a router:
 * ```javascript
 * import { routes } from './routes';
 * import { Route } from 'react-router-dom';
 * 
 * <Route path={routes.signUp} element={<SignUpPage />} />
 * ```
 *
 * Notes:
 * - Adjust route paths based on project requirements.
 * - Ensure consistency when updating or adding routes across the project.
 */

export const routes = {


    login:"/login",
    signUp:"/signup",

    allPosts: "/",
    ownPosts:{
        main:"/ownPosts",
        new:"/ownPosts/new"
    },
    posts: "posts",
    accounts:"accounts"
}
