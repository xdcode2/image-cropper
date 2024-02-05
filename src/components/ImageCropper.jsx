import { useState } from "react";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop";
import { RiCloseFill } from "react-icons/ri";

const ImageCropper = ({ imageSrc, file, setOpenCropper }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [croppedArea, setCroppedArea] = useState(null);

    const onCropComplete = (_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels);

    const handleSave = (croppedArea) => {
        const { x: cropX, y: cropY, width: cropWidth, height: cropHeight } = croppedArea;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        let image = new Image();
        image.src = imageSrc;

        ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        image.onload = () => {
            const dataURL = canvas.toDataURL();
            const aTag = document.createElement("a");
            aTag.href = dataURL;
            aTag.download = file.name;
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
        };
    };

    return (
        <motion.div
            className="fixed inset-0 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div
                className="absolute inset-0 bg-black/80"
                onClick={() => setOpenCropper(false)}
            ></div>
            <div className="relative sm:max-w-[600px] w-full sm:h-auto h-full bg-white-100 p-5 sm:rounded-xl flex flex-col gap-y-5 shadow-lg">
                <header className="flex justify-between">
                    <p className="text-primary-90 font-medium text-base">Image Cropper</p>
                    <RiCloseFill
                        size={24}
                        className="text-primary-90 cursor-pointer"
                        onClick={() => setOpenCropper(false)}
                    />
                </header>
                <div className="relative h-[350px] w-full border-2 border-dashed border-primary-50 rounded-lg overflow-hidden">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        minZoom={1}
                        maxZoom={2}
                        zoomWithScroll={false}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-2">
                        <label
                            htmlFor="zoom-input"
                            className="text-primary-90 font-medium"
                        >
                            Zoom: {parseInt(zoom * 100)}%
                        </label>
                        <input
                            type="range"
                            id="zoom-input"
                            className="appearance-none h-3 w-full rounded-full"
                            min={100}
                            max={200}
                            value={zoom * 100}
                            style={{ background: `linear-gradient(90deg, #72a0e3 ${zoom * 100 - 100}%, #d4d4d8 ${zoom * 100 - 100}%, #d4d4d8 100%)` }}
                            onChange={(e) => setZoom(e.target.value / 100)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="btn-primary-outlined"
                        onClick={() => setOpenCropper(false)}
                    >
                        Close
                    </button>
                    <button
                        className="btn-primary-fill"
                        onClick={() => handleSave(croppedArea)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ImageCropper;
