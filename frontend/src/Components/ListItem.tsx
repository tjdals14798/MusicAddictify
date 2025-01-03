import React from "react";

interface MusicListItemProps {
  videoId: string;
  thumbnail: string;
  title: string;
  composer: string;
  onClickOpenModal: () => void;
}

const ListItem: React.FC<MusicListItemProps> = ({
  thumbnail,
  title,
  composer,
  onClickOpenModal,
}) => {
  return (
    <li
      className="h-36 flex py-6 my-4 items-center hover:bg-gray-200 rounded-lg transition"
      onClick={onClickOpenModal}
    >
      {/* 썸네일 */}
      <img
        src={thumbnail}
        alt={title}
        className="h-36 rounded-lg object-cover" // 150x150 크기
      />
      {/* 곡 정보 */}
      <div className="ml-8 flex flex-col justify-between flex-1 h-full">
        <p className="text-xl font-semibold text-gray-900">{title}</p>
        <p className="text-base font-semibold text-gray-600">{composer}</p>
      </div>
      {/* 액션 버튼 */}
      <button className="bg-white border-2 border-red-600 text-red-600 mr-2 px-4 py-2 rounded hover:bg-red-300 hover:shadow-lg transition duration-200">
        📌
      </button>
    </li>
  );
};

export default ListItem;
