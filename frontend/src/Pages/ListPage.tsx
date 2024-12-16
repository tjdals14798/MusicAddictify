import React from 'react'
import ListItem from '../Components/ListItem';

const ListPage: React.FC = () => {

  const musicList = [
    {
      id: 1,
      thumbnail: "https://via.placeholder.com/150", // 예시 이미지 URL
      title: "Song Title 1",
      composer: "Composer Name 1",
      views: "1.2M",
    },
    {
      id: 2,
      thumbnail: "https://via.placeholder.com/150",
      title: "Song Title 2",
      composer: "Composer Name 2",
      views: "950K",
    },
    {
      id: 3,
      thumbnail: "https://via.placeholder.com/150",
      title: "Song Title 3",
      composer: "Composer Name 3",
      views: "870K",
    },
    // 더미 데이터 추가 가능
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Top 100 Latest Songs
      </h1>
      <ul className="divide-y divide-gray-300">
        {musicList.map((music) => (
          <ListItem
          key={music.id}
          thumbnail={music.thumbnail}
          title={music.title}
          composer={music.composer}
          views={music.views}
        />
        ))}
      </ul>
    </div>
  </div>
  )
}

export default ListPage