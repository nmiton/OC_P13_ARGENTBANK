const initialState = {
	user: null,
	loading: false,
	error: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_REQUEST":
			return { ...state, loading: true, error: null };
		case "LOGIN_SUCCESS":
			return { ...state, loading: false, user: action.payload, error: null };
		case "LOGIN_FAILURE":
			return { ...state, loading: false, user: null, error: action.payload };
		case "LOGOUT":
			return initialState;
		case "UPDATE_IDENTITY":
			return {
				user: {
					...state.user,
					...action.payload,
				},
			};
		default:
			return initialState;
	}
};

export default authReducer;
