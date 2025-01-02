import React, { useState } from "react";
import ListItem from "../Components/ListItem";
import Instance_YT from "../../axios/yt_axios";

const ListPage: React.FC = () => {
  const [musicVideos, setMusicVideos] = useState<any[]>([]);
  const testLoad = async () => {
    const list = await Instance_YT.get("/videos", {
      params: {
        chart: "mostPopular",
        videoCategoryId: "10", // 음악 카테고리 ID
        regionCode: "KR",
        maxResults: 10,
      },
    });
    console.log(list);
    setMusicVideos(
      list.data.items.map((item: any) => ({
        videoId: item.id,
        thumbnail: item.snippet.thumbnails.medium.url,
        title: item.snippet.title,
        composer: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Top 100 Latest Songs
        </h1>
        <button onClick={testLoad}>gasdfasdf</button>
        <ul className="divide-y divide-gray-300">
          {musicVideos.map((music) => (
            <ListItem
              key={music.videoId}
              thumbnail={music.thumbnail}
              title={music.title}
              composer={music.composer}
              views={music.viewCount}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
