// tailwind.config.js
export default {
	content: [
	  './components/**/*.{vue,js}',
	  './layouts/**/*.{vue,js}',
	  './pages/**/*.{vue,js}',
	  './app.vue',
	],
	theme: {
	  extend: {
		colors: {
		  'border': 'hsl(240, 5%, 84%)',
		  'input': 'hsl(0, 0%, 100%)',
		  'ring': 'hsl(240, 5%, 84%)',
		  'background': 'hsl(0, 0%, 100%)',
		  'foreground': 'hsl(240, 10%, 4%)',
		},
	  },
	},
	plugins: [],
  }