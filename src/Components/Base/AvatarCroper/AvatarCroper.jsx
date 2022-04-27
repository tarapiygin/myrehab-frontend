import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utils';
import styles from './AvatarCroper.module.css';

export default function AvatarCroper({ img, onCropped, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {
    setCroppedAreaPixels(newCroppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        img,
        croppedAreaPixels,
      );
      onCropped(croppedImage);
    } catch (e) {
      onCropped(null);
    }
  }, [croppedAreaPixels, img, onCropped]);

  return (
    <div className={styles.cropContainer}>
      <div className={styles.AvatarCroper}>
        <Cropper
          image={img}
          crop={crop}
          zoom={zoom}
          aspect={3 / 2}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={styles.controls}>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
          className="zoom-range"
        />
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={showCroppedImage}
            className={`btn btn-primary ${styles.buttonSave}`}
          >
            Сохранить
          </button>
          <button
          type="button"
          className={`btn btn-secondary ${styles.buttonClose}`}
          onClick={onClose}
          >
            Отменить
          </button>
        </div>
      </div>

      </div>
  );
}
