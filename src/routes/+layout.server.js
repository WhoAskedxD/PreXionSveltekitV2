export const load = ({ locals, url }) => {
	if (locals.user) {
		return {
            url:url.pathname,
			user: locals.user
		};
	}

	return {
        url:url.pathname,
		user: undefined
	};
};