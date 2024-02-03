import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";

const DragZone = ({ setFile }) => {
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFile(file);
    };

    return (
        <div
            className={`h-[300px] max-w-[500px] w-full border-2 border-dashed rounded-lg flex items-center justify-center flex-col gap-y-2 ${
                dragOver ? "border-primary-50" : "border-primary-30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <RiImageAddFill
                size={42}
                className="text-gray"
            />
            <p className="text-gray text-center font-medium">
                Drag and drop an image file or <br />
                <label
                    htmlFor="image-file"
                    className="text-primary-30 underline cursor-pointer hover:text-primary-50"
                >
                    browse to upload
                </label>
            </p>
            <input
                type="file"
                id="image-file"
                accept="image/png, image/jpg, image/jpeg"
                value=""
                hidden
                onChange={(event) => {
                    setFile(event.target.files[0]);
                }}
            />
        </div>
    );
};

export default DragZone;
