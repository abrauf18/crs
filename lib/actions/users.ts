import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Get all users (Admin only)
 * GET /users
 */
export const getAllUsersAction = async (
    accessToken: string,
    params?: {
        page?: number;
        limit?: number;
        role?: string;
        sortBy?: string;
        orderBy?: string;
    }
) => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.role) queryParams.append('role', params.role);
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.orderBy) queryParams.append('orderBy', params.orderBy);

        const url = `${BASE_URL}/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            return { success: false, error: errorMessage };
        }
        const errorMessage =
            error instanceof Error ? error.message : 'Failed to fetch users';
        return { success: false, error: errorMessage };
    }
};

/**
 * Get user profile by ID
 * GET /users/:id
 */
export const getUserProfileAction = async (
    accessToken: string,
    userId: string
) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            return { success: false, error: errorMessage };
        }
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Failed to fetch user profile';
        return { success: false, error: errorMessage };
    }
};

/**
 * Update user profile
 * PUT /users/update/:id
 * Accepts FormData with: firstName, lastName, password, profilePicture (file)
 */
export const updateUserProfileAction = async (
    accessToken: string,
    userId: string,
    formData: FormData
) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/users/update/${userId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            return { success: false, error: errorMessage };
        }
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Failed to update user profile';
        return { success: false, error: errorMessage };
    }
};

/**
 * Delete user profile
 * DELETE /users/delete/:id
 */
export const deleteUserProfileAction = async (
    accessToken: string,
    userId: string
) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/users/delete/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            return { success: false, error: errorMessage };
        }
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Failed to delete user profile';
        return { success: false, error: errorMessage };
    }
};
