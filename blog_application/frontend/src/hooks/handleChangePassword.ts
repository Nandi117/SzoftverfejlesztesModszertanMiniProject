import axios from "axios";

export const changePassword = async (
    currentPassword: string,
    newPassword: string,
    token: string
): Promise<string> => {
    if (!token) {
        throw new Error("No authentication token found. Please log in again.");
    }

    const response = await axios.post(
        "/change-password",
        { currentPassword, newPassword },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.message; // Assuming the backend sends a success message
};
