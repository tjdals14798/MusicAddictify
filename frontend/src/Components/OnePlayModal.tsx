import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
}

const OnePlayModal: React.FC<ModalProps> = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-6xl h-[80%] relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-700 text-lg font-bold"
          >
            ✖
          </button>
          {videoId ? (
            <div className="w-full h-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube Video Player"
                allow="autoplay;"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-center">비디오를 로드하는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnePlayModal;
