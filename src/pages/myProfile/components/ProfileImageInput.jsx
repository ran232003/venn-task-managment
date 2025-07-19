import React, { useRef, useState, useEffect } from "react";
import profilePic from "../profile.jpg";

const ProfileImageInput = ({ onImageSelect, initialImage }) => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    if (initialImage) {
      setPreview(
        typeof initialImage === "string"
          ? initialImage
          : URL.createObjectURL(initialImage)
      );
    }
  }, [initialImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageSelect(file);
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="profile-pic-wrapper"
        onClick={() => inputRef.current.click()}
        style={{ cursor: "pointer" }}
      >
        <img
          src={preview || profilePic}
          alt="profile"
          className="profile-pic"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ProfileImageInput;
