import {
	UMAMI_API_CLIENT_ENDPOINT,
	UMAMI_API_CLIENT_SECRET,
	UMAMI_API_CLIENT_USER_ID
} from '$env/static/private';
import { t } from '$lib/trpc';
import { getClient } from '@umami/api-client';

export const umami = getClient({
	userId: UMAMI_API_CLIENT_USER_ID,
	secret: UMAMI_API_CLIENT_SECRET,
	apiEndpoint: UMAMI_API_CLIENT_ENDPOINT
});

export const analytics = t.router({});
