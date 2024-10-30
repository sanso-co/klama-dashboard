import { ChangeEvent } from "react";
import styles from "./upload.module.scss";
import { ImageIcon } from "@/assets/icons/ImageIcon";

interface ImageUploadProps {
    image: string | null;
    width?: number;
    placeholderLabel?: string;
    onImageSelect: (image: string | null) => void;
}

export const ImageUpload = ({
    image,
    onImageSelect,
    placeholderLabel = "Click to upload",
    width = 300,
    ...props
}: ImageUploadProps) => {
    const height = Math.round(width * (169 / 300));

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageSelect(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        onImageSelect(null);
    };

    return (
        <>
            {!image ? (
                <label
                    className={styles.uploadLabel}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                >
                    <div className={styles.uploadContent}>
                        <ImageIcon />
                        {placeholderLabel}
                    </div>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className={styles.hiddenInput}
                        {...props}
                    />
                </label>
            ) : (
                <div
                    className={styles.imageContainer}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                >
                    <img src={image} className={styles.image} alt="Uploaded" />
                    <div className={styles.overlay}>
                        <button onClick={handleRemove} className={styles.removeButton}>
                            Remove
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
