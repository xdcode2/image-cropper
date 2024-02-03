/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            poppins: ["Poppins", "sans-serif"],
        },
        extend: {
            colors: {
                primary: {
                    10: "#b6cef0",
                    20: "#94b7e9",
                    30: "#72a0e3",
                    40: "#5089dc",
                    50: "#2e72d5",
                    60: "#2760b4",
                    70: "#1f4e92",
                    80: "#183c71",
                    90: "#102a4f",
                },
                white: {
                    50: "#ebeff3",
                    100: "#ffffff",
                },
                gray: "#a9aeba",
            },
        },
    },
    important: true,
    plugins: [],
};
