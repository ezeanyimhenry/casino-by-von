const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

// Helper function to make authenticated requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge with any existing headers
    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

// Types
export interface CasinoTable {
    id: string;
    name: string;
    type: string;
    max_seats: number;
    image_url?: string;
    description?: string;
    is_active: boolean;
    created_at: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    event_date: string;
    image_url?: string;
    location: string;
    capacity?: number;
    is_featured: boolean;
    created_at: string;
}

export interface Booking {
    id: string;
    user_id: string;
    table_id: string;
    booking_date: string;
    time_slot: string;
    num_seats: number;
    status: string;
    created_at: string;
}

export interface MembershipTier {
    id: string;
    name: string;
    min_spent: number;
    max_spent?: number;
    benefits: string[];
    color: string;
    icon: string;
    discount_percentage: number;
    priority_booking: boolean;
    created_at: string;
}

export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    phone?: string;
    total_spent: number;
    current_tier_id?: string;
    membership_tier?: MembershipTier;
    created_at: string;
    updated_at: string;
}

// Auth API
export const authApi = {
    register: async (data: { email: string; password: string; full_name: string; phone?: string }) => {
        return fetchWithAuth('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    login: async (email: string, password: string) => {
        const response = await fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.token) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }

        return response;
    },

    logout: async () => {
        try {
            await fetchWithAuth('/auth/logout', { method: 'POST' });
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
    },

    getCurrentUser: async (): Promise<UserProfile> => {
        return fetchWithAuth('/auth/user');
    },

    updateProfile: async (data: Partial<UserProfile>) => {
        return fetchWithAuth('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
};

// Tables API
export const tablesApi = {
    getAll: async (): Promise<CasinoTable[]> => {
        return fetchWithAuth('/tables');
    },

    getById: async (id: string): Promise<CasinoTable> => {
        return fetchWithAuth(`/tables/${id}`);
    },

    getAvailable: async (date: string, timeSlot: string): Promise<CasinoTable[]> => {
        return fetchWithAuth(`/tables/available?date=${date}&time_slot=${timeSlot}`);
    },
};

// Events API
export const eventsApi = {
    getAll: async (): Promise<Event[]> => {
        return fetchWithAuth('/events');
    },

    getById: async (id: string): Promise<Event> => {
        return fetchWithAuth(`/events/${id}`);
    },

    getFeatured: async (): Promise<Event[]> => {
        return fetchWithAuth('/events/featured');
    },

    getUpcoming: async (): Promise<Event[]> => {
        return fetchWithAuth('/events/upcoming');
    },
};

// Bookings API
export const bookingsApi = {
    create: async (data: {
        table_id: string;
        booking_date: string;
        time_slot: string;
        num_seats: number;
    }): Promise<Booking> => {
        return fetchWithAuth('/bookings', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getUserBookings: async (): Promise<Booking[]> => {
        return fetchWithAuth('/bookings/user');
    },

    getById: async (id: string): Promise<Booking> => {
        return fetchWithAuth(`/bookings/${id}`);
    },

    cancel: async (id: string) => {
        return fetchWithAuth(`/bookings/${id}/cancel`, {
            method: 'POST',
        });
    },
};

// Membership Tiers API
export const membershipApi = {
    getTiers: async (): Promise<MembershipTier[]> => {
        return fetchWithAuth('/membership/tiers');
    },

    getCurrentTier: async (): Promise<MembershipTier | null> => {
        return fetchWithAuth('/membership/current');
    },

    getProgress: async () => {
        return fetchWithAuth('/membership/progress');
    },
};

// Export a single API object
export const api = {
    auth: authApi,
    tables: tablesApi,
    events: eventsApi,
    bookings: bookingsApi,
    membership: membershipApi,
};