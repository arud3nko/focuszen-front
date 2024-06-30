export async function apiClient<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}