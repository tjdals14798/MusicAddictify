import React, { useState } from "react";
import ListItem from "../Components/ListItem";
import Instance_YT from "../../axios/yt_axios";
import OnePlayModal from "../Components/OnePlayModal";

const ListPage: React.FC = () => {
  const [musicVideos, setMusicVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // 선택된 비디오 ID
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태

  const testLoad = async () => {
    const list = await Instance_YT.get("/playlistItems", {
      params: {
        playlistId: "PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m",
        maxResults: 5,
      },
    });
    console.log(list);
    setMusicVideos(
      list.data.items.map((item: any) => ({
        videoId: item.snippet.resourceId.videoId,
        thumbnail: item.snippet.thumbnails.medium.url,
        title: item.snippet.title,
        composer: item.snippet.videoOwnerChannelTitle,
      }))
    );
  };

  const openModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          한국 인기곡 Top 100
        </h1>
        <button onClick={testLoad}>데이터 불러오기</button>
        <ul>
          {musicVideos.map((music) => (
            <ListItem
              key={music.videoId}
              videoId={music.videoId}
              thumbnail={music.thumbnail}
              title={music.title}
              composer={music.composer}
              onClickOpenModal={() => openModal(music.videoId)}
            />
          ))}
        </ul>
      </div>
      <OnePlayModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={selectedVideo}
      />
    </div>
  );
};

export default ListPage;
