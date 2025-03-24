import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [sveltekit()],
		server: {
			proxy: {
				'/api': {
					target: env.VITE_API_URL || 'http://localhost:4242',
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
};
