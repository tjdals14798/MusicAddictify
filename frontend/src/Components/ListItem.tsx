import React from "react";

interface MusicListItemProps {
  thumbnail: string;
  title: string;
  composer: string;
  views: string;
}

const ListItem: React.FC<MusicListItemProps> = ({
  thumbnail,
  title,
  composer,
  views,
}) => {
  return (
    <li className="flex items-center py-4 hover:bg-gray-50 transition">
      {/* 썸네일 */}
      <img
        src={thumbnail}
        alt={title}
        className="w-36 h-36 rounded-lg object-cover" // 150x150 크기
      />
      {/* 곡 정보 */}
      <div className="ml-8 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-600">Composer: {composer}</p>
        <p className="text-base text-gray-500">Views: {views}</p>
      </div>
      {/* 액션 버튼 */}
      <button className="bg-white-500 border-2 border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-300 hover:shadow-lg transition duration-200">
        📌
      </button>
    </li>
  );
};

export default ListItem;
