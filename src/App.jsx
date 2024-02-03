import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useFileReader } from "./hooks";
import { DragZone, ImageCropper } from "./components";

function App() {
    const [openCropper, setOpenCropper] = useState(false);
    const [{ result, error, file }, setFile] = useFileReader({
        method: "readAsDataURL",
        accept: ["png", "jpg", "jpeg"],
        maxFileSize: 5,
    });

    useEffect(() => {
        if (result && !error.type) setOpenCropper(true);
        else setOpenCropper(false);
    }, [result, error.type]);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-2 bg-white-50 font-poppins">
            <DragZone setFile={setFile} />
            {(error.type === "fileType" || error.type === "fileSize") && <p className="text-red-500 font-medium">{error.msg}</p>}
            <AnimatePresence>
                {openCropper && (
                    <ImageCropper
                        imageSrc={result}
                        file={file}
                        setFile={setFile}
                        setOpenCropper={setOpenCropper}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
