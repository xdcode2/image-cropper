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
