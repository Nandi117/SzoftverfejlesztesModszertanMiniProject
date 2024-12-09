import {Navigate, Outlet} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {useAuth} from "../../hooks/useAuth.ts";

/**
 * PrivateRoutes Component
 *
 * This component acts as a route guard for protected routes in the application. It ensures that
 * only authenticated users can access the nested routes by verifying the presence of an authentication token.
 *
 * Features:
 * - Redirects unauthenticated users to the login page.
 * - Allows authenticated users to access the nested routes defined under this component.
 *
 * Dependencies:
 * - `react-router-dom`: For navigation and rendering nested routes.
 *   - `Navigate`: Used to redirect unauthenticated users.
 *   - `Outlet`: Placeholder for rendering nested routes when authenticated.
 * - `useAuth`: Custom hook to retrieve the authentication token from cookies.
 * - `routes`: Configuration object containing route paths for navigation (e.g., `routes.login`).
 *
 * Behavior:
 * - Retrieves the `token` from the `useAuth` hook.
 * - If the `token` is not present:
 *   - Logs the missing token for debugging purposes.
 *   - Redirects the user to the login page (`routes.login`) using the `Navigate` component.
 * - If the `token` exists:
 *   - Renders the `Outlet`, allowing access to nested routes.
 *
 * Props:
 * - None. The component relies on the `useAuth` hook and `routes` configuration for its functionality.
 *
 * Usage:
 * - Wrap this component around protected routes in the routing configuration.
 * - Example:
 *   ```
 *   <Route element={<PrivateRoutes />}>
 *       <Route path="/dashboard" element={<Dashboard />} />
 *       <Route path="/profile" element={<Profile />} />
 *   </Route>
 *   ```
 *
 * Notes:
 * - Ensure the `useAuth` hook correctly retrieves and validates the authentication token.
 * - The `routes` configuration should include the correct path for the login page.
 */

export const PrivateRoutes = () =>{

    const {token} = useAuth();

    console.log(token)
    if (!token) return <Navigate to={routes.login} replace/>;

    return <Outlet/>

}