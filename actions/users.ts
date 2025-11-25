'use server';

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

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
        });

        const data = await response.json();
        return { success: true, data, status: response.status, statusText: response.statusText };
    } catch (error) {
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
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
        });

        const data = await response.json();
        return { success: true, data, status: response.status, statusText: response.statusText };
    } catch (error) {
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
        const response = await fetch(`${BASE_URL}/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
            body: formData,
        });

        const data = await response.json();
        return { success: true, data, status: response.status, statusText: response.statusText };
    } catch (error) {
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
        const response = await fetch(`${BASE_URL}/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
        });

        const data = await response.json();
        return { success: true, data, status: response.status, statusText: response.statusText };
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Failed to delete user profile';
        return { success: false, error: errorMessage };
    }
};
