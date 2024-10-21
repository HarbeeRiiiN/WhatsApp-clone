## Tailwind css

> https://tailwindcss.com/docs/installation

use `className = "xxx"`

edit preset:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", 👈
  theme: {
    extend: {
      colors: {
        dark_bg_1: "#111B21",
        dark_bg_2: "#202C33",
        ...
      },
    },
  },
  plugins: [],
};

```

```
@layer components {
  .customh1 {
    @apply text-blue-500 bg-red-200;
  }
}
```



switch to dark mode: parents' `className`	

