import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Crop,
  Check,
  X,
  RefreshCw,
  Move,
  UserCheck,
  Maximize2,
} from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onCropComplete: (croppedDataUrl: string) => void;
  onCancel: () => void;
  title?: string;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  onCropComplete,
  onCancel,
  title = 'Align & Crop Passport Photo (3:4 Ratio)',
}) => {
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showFaceGuide, setShowFaceGuide] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Viewport / Crop box dimensions (3:4 ratio)
  const CROP_WIDTH = 270;
  const CROP_HEIGHT = 360; // 270 / 360 = 3 / 4

  // Reset transforms whenever a new image is loaded
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;

        // Auto-scale to fill 3:4 crop box
        const scaleX = CROP_WIDTH / img.naturalWidth;
        const scaleY = CROP_HEIGHT / img.naturalHeight;
        const initialScale = Math.max(scaleX, scaleY, 1);

        setScale(initialScale);
        setRotation(0);
        setOffset({ x: 0, y: 0 });
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  // Real-time canvas render
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to crop box
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;

    ctx.clearRect(0, 0, CROP_WIDTH, CROP_HEIGHT);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.save();

    // Center transform
    ctx.translate(CROP_WIDTH / 2 + offset.x, CROP_HEIGHT / 2 + offset.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Draw image centered
    ctx.drawImage(
      img,
      -img.naturalWidth / 2,
      -img.naturalHeight / 2,
      img.naturalWidth,
      img.naturalHeight
    );

    ctx.restore();

    // Update real-time mini preview
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPreviewUrl(dataUrl);
  }, [scale, rotation, offset]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setScale((prev) => Math.min(Math.max(prev + zoomDelta, 0.5), 4));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    if (imageRef.current) {
      const scaleX = CROP_WIDTH / imageRef.current.naturalWidth;
      const scaleY = CROP_HEIGHT / imageRef.current.naturalHeight;
      setScale(Math.max(scaleX, scaleY, 1));
    } else {
      setScale(1);
    }
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  };

  // Export high-resolution 3:4 passport image (600x800px)
  const handleConfirmCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    const exportWidth = 600;
    const exportHeight = 800; // 3:4 high definition

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;

    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate ratio factor between display crop box and high-res export
    const factor = exportWidth / CROP_WIDTH;

    ctx.save();
    ctx.translate(exportWidth / 2 + offset.x * factor, exportHeight / 2 + offset.y * factor);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale * factor, scale * factor);

    ctx.drawImage(
      img,
      -img.naturalWidth / 2,
      -img.naturalHeight / 2,
      img.naturalWidth,
      img.naturalHeight
    );

    ctx.restore();

    const highResDataUrl = exportCanvas.toDataURL('image/jpeg', 0.95);
    onCropComplete(highResDataUrl);
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#FFD000]/60 rounded-2xl shadow-2xl overflow-hidden text-neutral-200 my-4 sm:my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 bg-[#1B1B1B] border-b border-[#3A331A]">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#252010] border border-[#443812] flex items-center justify-center text-[#FFD000] shrink-0">
              <Crop className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-white text-sm sm:text-base truncate">
                {title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono truncate">
                OFFICIAL 3:4 · RED / WHITE BACKGROUND
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
            aria-label="Close cropper"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Body */}
        <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Main Cropping Viewport + Preview Column */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Interactive Canvas Viewport */}
            <div className="md:col-span-8 flex flex-col items-center">
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
                className="relative w-[270px] h-[360px] rounded-xl overflow-hidden border-2 border-[#FFD000] bg-[#0A0A0A] shadow-2xl cursor-grab active:cursor-grabbing select-none"
                style={{ touchAction: 'none' }}
              >
                {/* Active Working Canvas */}
                <canvas
                  ref={canvasRef}
                  width={CROP_WIDTH}
                  height={CROP_HEIGHT}
                  className="w-full h-full block"
                />

                {/* Passport Composition Guides (Rule of thirds + Head oval) */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Rule of thirds grid lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-25">
                    <div className="border-r border-b border-[#FFD000]" />
                    <div className="border-r border-b border-[#FFD000]" />
                    <div className="border-b border-[#FFD000]" />
                    <div className="border-r border-b border-[#FFD000]" />
                    <div className="border-r border-b border-[#FFD000]" />
                    <div className="border-b border-[#FFD000]" />
                    <div className="border-r border-[#FFD000]" />
                    <div className="border-r border-[#FFD000]" />
                    <div />
                  </div>

                  {/* Face Alignment Oval Overlay */}
                  {showFaceGuide && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[170px] h-[220px] rounded-[50%] border-2 border-dashed border-[#FFD000]/60 shadow-[0_0_15px_rgba(255,208,0,0.15)] flex flex-col items-center justify-between py-4">
                        <span className="text-[9px] font-mono uppercase bg-black/70 px-2 py-0.5 rounded text-[#FFD000]">
                          Head Top
                        </span>
                        <div className="w-12 h-[1px] bg-[#FFD000]/40" />
                        <span className="text-[9px] font-mono uppercase bg-black/70 px-2 py-0.5 rounded text-[#FFD000]">
                          Chin Line
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Viewport Corners */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#FFD000]" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#FFD000]" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#FFD000]" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#FFD000]" />
                </div>

                {/* Move Hint Overlay */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                  <span className="text-[10px] font-mono uppercase bg-black/80 text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700 flex items-center gap-1.5">
                    <Move className="w-3 h-3 text-[#FFD000]" />
                    Drag to Reposition
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 mt-2 text-center">
                Scroll / Pinch to zoom · Click and drag to align face within guides
              </div>
            </div>

            {/* Right: Live Preview & Alignment Standards */}
            <div className="md:col-span-4 space-y-4">
              <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#2F2917] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFD000] block font-bold">
                  Live Passport Preview (3:4)
                </span>

                <div className="flex justify-center">
                  <div className="w-24 h-32 rounded-lg border-2 border-[#3A331A] overflow-hidden bg-black shadow-lg relative">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Crop Live Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 py-0.5 text-center text-[8px] font-mono text-[#FFD000]">
                      3:4 BADGE
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-400 leading-tight space-y-1 pt-1 border-t border-[#231F14]">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <UserCheck className="w-3 h-3 text-[#FFD000]" />
                    <span>Official FCT FA Pass Specification</span>
                  </div>
                  <p>Eyes must be level, facing forward, and unobstructed.</p>
                </div>
              </div>

              {/* Guide Toggle */}
              <button
                type="button"
                onClick={() => setShowFaceGuide(!showFaceGuide)}
                className={`w-full py-2 px-3 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                  showFaceGuide
                    ? 'bg-[#221C0D] border-[#FFD000] text-[#FFD000]'
                    : 'bg-[#181818] border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{showFaceGuide ? 'Face Guide: Active' : 'Show Face Guide'}</span>
              </button>
            </div>

          </div>

          {/* Controls Bar: Zoom Slider, Rotate, Reset */}
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2D2817] space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Zoom Slider */}
              <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                <button
                  type="button"
                  onClick={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
                  className="p-1.5 text-neutral-400 hover:text-white rounded bg-[#242424] hover:bg-[#303030] transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <div className="flex-1 max-w-xs">
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-[#FFD000] cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setScale((prev) => Math.min(prev + 0.2, 4))}
                  className="p-1.5 text-neutral-400 hover:text-white rounded bg-[#242424] hover:bg-[#303030] transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-[#FFD000] w-12 text-right">
                  {Math.round(scale * 100)}%
                </span>
              </div>

              {/* Rotate & Reset Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleRotate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-[#252525] hover:bg-[#333] rounded-lg border border-[#3A331A] transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#FFD000]" />
                  <span>Rotate 90°</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white bg-[#252525] hover:bg-[#333] rounded-lg border border-neutral-800 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#181818] border-t border-[#3A331A] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white bg-[#222] hover:bg-[#2c2c2c] rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmCrop}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-[0_0_20px_rgba(255,208,0,0.3)] transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Apply & Save 3:4 Crop</span>
          </button>
        </div>

      </div>
    </div>
  );
};
