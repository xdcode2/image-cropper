# Image Cropper

Build an Image Cropper using React JS & TailwindCSS

![Image Cropper](./public/Image%20Cropper.png)

## 🛠️ Tools

-   React JS
-   TailwindCSS
-   Framer Motion
-   React Easy Crop
-   React Icons

## 🔍 Features

-   Drag And Drop File
-   Crop Image
-   Download Image

## 🚀 Getting Started

To get started follow these steps:

#### Cloning the Repository

Using CLI:

```bash
git clone https://github.com/xdcode2/image-cropper.git
```

**\*\*_Ensure you have installed [Git](https://git-scm.com) on your machine._**

Using GitHub:

-   Go to the project [repository](https://github.com/xdcode2/image-cropper) on my GitHub page
-   Click on the green button on the top 👆
-   Click Download ZIP

#### Installation

Install the project dependencies using npm:

```bash
npm install
```

**\*\*_Ensure you have installed [NodeJS](https://nodejs.org/en) on your machine._**

#### Running the Project

```bash
npm run dev
```

**\*\*_This project uses [Vite](https://vitejs.dev)._**

## 💻 Code Snippets

`useFileReader.jsx`:

```js
import { useEffect, useState } from "react";

const bytesToMB = (bytes) => {
    if (bytes === 0) return 0;

    return Math.round((bytes / (1024 * 1024)) * 100) / 100;
};

export const useFileReader = (options) => {
    const { method, accept, maxFileSize } = options;
    const [file, setFile] = useState(null);
    const [error, setError] = useState({ type: null, msg: null });
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!file) return;

        const fileType = file.name.split(".").pop().toLowerCase(),
            fileSizeMB = bytesToMB(file.size);

        if (accept && !accept.includes(fileType)) {
            setError({ type: "fileType", msg: `Invalid file type: ${fileType}. Accepted types: ${accept.join(", ")}` });
        }

        if (maxFileSize && fileSizeMB > maxFileSize) {
            setError({ type: "fileSize", msg: `File size exceeds the maximum limit of ${maxFileSize} MB.` });
        }

        const fr = new FileReader();

        fr.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentLoaded = (event.loaded / event.total) * 100;
                setProgress(percentLoaded);
            }
        };

        fr.onload = () => {
            setResult(fr.result);
            setProgress(100);
        };

        fr.onerror = (err) => {
            setError({ type: "fileRead", msg: `Error reading file: ${file.name}. ${err.message}` });
        };

        fr[method](file);

        return () => {
            setError({ type: null, msg: null });
            setResult(null);
            setProgress(0);
        };
    }, [file]);

    return [{ result, error, file, progress }, setFile];
};
```

`tailwindcss.config.js`:

```js
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
```

`index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .btn-primary-fill {
        @apply h-10 px-4 bg-primary-50 rounded-lg text-white-100 hover:bg-primary-60 transition-colors duration-300;
    }
    .btn-primary-outlined {
        @apply h-10 px-4 border border-solid border-primary-50 rounded-lg text-primary-50 hover:border-primary-60 hover:text-primary-60 transition-colors duration-300;
    }
}
```

`.eslintrc.cjs`:

```js
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
};
```

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J1NMYT7)

Hey bro please don't forget to subscribe to [my channel](https://www.youtube.com/@_xdcode_ "XD Code") 😊😊.
