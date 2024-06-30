export async function apiClient<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        const errorMessage = await response.json();
        if (errorMessage && errorMessage.hasOwnProperty("detail")) {
            throw new Error(errorMessage["detail"]);
        } else {
            throw new Error("An error occurred while processing the request.");
        }
    }
    if (response.status === 204) {
        return true as unknown as T;
    }
    return response.json();
}
