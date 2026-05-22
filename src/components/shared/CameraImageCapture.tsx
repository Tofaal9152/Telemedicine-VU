"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";

interface Props {
  name: string;
  label: string;
  aspect?: "square" | "landscape";
  theme?: "dark" | "light";
}

export default function CameraImageCapture({
  name,
  label,
  aspect = "square",
  theme = "dark",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const openCamera = useCallback(async () => {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      setStream(ms);
      setCameraOpen(true);
      setReady(false);
    } catch {
      fileInputRef.current?.click();
    }
  }, []);

  useEffect(() => {
    if (cameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraOpen, stream]);

  const closeCamera = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraOpen(false);
    setReady(false);
  }, [stream]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPreview(dataUrl);

    canvas.toBlob(
      (blob) => {
        if (!blob || !hiddenInputRef.current) return;
        const file = new File([blob], `${name}-capture.jpg`, {
          type: "image/jpeg",
        });
        const dt = new DataTransfer();
        dt.items.add(file);
        hiddenInputRef.current.files = dt.files;
      },
      "image/jpeg",
      0.92
    );

    closeCamera();
  }, [name, closeCamera]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    if (hiddenInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      hiddenInputRef.current.files = dt.files;
    }
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (hiddenInputRef.current) hiddenInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isDark = theme === "dark";

  return (
    <>
      <div className="space-y-2">
        <p
          className={`text-sm font-medium ${
            isDark ? "text-white/90" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {label}
        </p>

        {/* Preview Card */}
        <div
          onClick={!preview ? openCamera : undefined}
          className={[
            "relative overflow-hidden rounded-2xl border-2 border-dashed flex items-center justify-center transition-all",
            isDark
              ? "border-white/25 bg-white/5"
              : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900",
            !preview
              ? isDark
                ? "cursor-pointer hover:border-white/50 hover:bg-white/10"
                : "cursor-pointer hover:border-gray-400 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800"
              : "",
            aspect === "square" ? "h-40 w-40 mx-auto" : "h-40 w-full",
          ].join(" ")}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt={label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
              <button
                type="button"
                onClick={clear}
                className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-500 rounded-full p-1 transition-colors z-10"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </>
          ) : (
            <div
              className={`flex flex-col items-center gap-2 select-none ${
                isDark
                  ? "text-white/40"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <Camera className="w-10 h-10" />
              <span className="text-xs">ছবি তুলতে ট্যাপ করুন</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={openCamera}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
              isDark
                ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <Camera className="w-4 h-4" />
            ক্যামেরা
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
              isDark
                ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <Upload className="w-4 h-4" />
            গ্যালারি
          </button>
        </div>
      </div>

      {/* Hidden inputs — the named one goes into FormData */}
      <input
        ref={hiddenInputRef}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent absolute top-0 inset-x-0 z-10">
            <button
              type="button"
              onClick={closeCamera}
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <span className="text-white text-sm font-semibold tracking-wide">
              {label}
            </span>
            <div className="w-9" />
          </div>

          {/* Video feed */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              onCanPlay={() => setReady(true)}
              className="w-full h-full object-cover"
            />

            {/* Guide overlay — NID landscape frame */}
            {aspect === "landscape" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Dark vignette */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Card frame */}
                <div className="relative z-10 w-[82%] h-[52%] rounded-2xl">
                  {/* Clear window */}
                  <div className="absolute inset-0 bg-transparent rounded-2xl ring-2 ring-white/80" />
                  {/* Corner accents */}
                  <span className="absolute -top-px -left-px w-7 h-7 border-t-[3px] border-l-[3px] border-white rounded-tl-2xl" />
                  <span className="absolute -top-px -right-px w-7 h-7 border-t-[3px] border-r-[3px] border-white rounded-tr-2xl" />
                  <span className="absolute -bottom-px -left-px w-7 h-7 border-b-[3px] border-l-[3px] border-white rounded-bl-2xl" />
                  <span className="absolute -bottom-px -right-px w-7 h-7 border-b-[3px] border-r-[3px] border-white rounded-br-2xl" />
                  {/* Label */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/80 text-xs whitespace-nowrap bg-black/40 px-3 py-1 rounded-full">
                    NID কার্ড ফ্রেমের মধ্যে রাখুন
                  </span>
                </div>
              </div>
            )}

            {/* Guide overlay — square (profile photo) */}
            {aspect === "square" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative z-10 w-64 h-64 rounded-full ring-2 ring-white/80">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/80 text-xs whitespace-nowrap bg-black/40 px-3 py-1 rounded-full">
                    মুখ ফ্রেমে রাখুন
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Capture button bar */}
          <div className="absolute bottom-0 inset-x-0 pb-10 pt-6 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent">
            <button
              type="button"
              onClick={capture}
              disabled={!ready}
              className="w-20 h-20 rounded-full bg-white border-[5px] border-white/30 shadow-xl disabled:opacity-30 hover:scale-105 active:scale-95 transition-transform"
            />
          </div>
        </div>
      )}
    </>
  );
}
