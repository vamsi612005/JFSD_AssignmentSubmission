const initialState = {
    user: null, // Store user details (e.g., name, role)
    isAuthenticated: false,
    sessionExpiration: null, // Timestamp for session expiration
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                sessionExpiration: Date.now() + 30 * 60 * 1000, // 30 minutes from now
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                sessionExpiration: null,
            };
        default:
            return state;
    }
};

export default userReducer;
