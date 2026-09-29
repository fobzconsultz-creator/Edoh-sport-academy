import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, CheckCircle2, PenTool } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  sublabel?: string;
  required?: boolean;
  value?: string;
  onChange: (dataUrl: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  sublabel,
  required = false,
  value,
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(Boolean(value));

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Function to configure canvas size and styling
    const configureCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      
      // Save current drawing if any
      let currentData: string | null = null;
      if (hasDrawn) {
        currentData = canvas.toDataURL('image/png');
      }

      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);

      ctx.strokeStyle = '#FFD000';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Restore drawing
      const imageToRestore = currentData || value;
      if (imageToRestore) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
          setHasDrawn(true);
        };
        img.src = imageToRestore;
      }
    };

    configureCanvas();

    // Listen for orientation/resize changes
    window.addEventListener('resize', configureCanvas);
    return () => window.removeEventListener('resize', configureCanvas);
  }, [value]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onChange(dataUrl);
  }, [isDrawing, onChange]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);
    onChange('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="font-semibold text-white">
            {label} {required && <span className="text-[#FFD000]">*</span>}
          </span>
          {sublabel && <p className="text-neutral-400 mt-0.5">{sublabel}</p>}
        </div>
        <div className="flex items-center gap-2">
          {hasDrawn && (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Recorded
            </span>
          )}
          <button
            type="button"
            onClick={clearCanvas}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      <div className="relative border border-[#3A331A] rounded-lg bg-[#0D0D0D] overflow-hidden focus-within:border-[#FFD000] transition-colors">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-32 block touch-none cursor-crosshair bg-[#0D0D0D]"
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-neutral-500 text-xs">
            <PenTool className="w-4 h-4 mb-1 opacity-50" />
            <span>Sign with finger or stylus inside this box</span>
          </div>
        )}

        <div className="absolute bottom-1 right-2 text-[10px] text-neutral-600 font-mono pointer-events-none">
          SECURE CANVAS • STATUTORY ATTESTATION
        </div>
      </div>
    </div>
  );
};
