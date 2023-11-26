'use client'
import React, {useState, useEffect} from 'react'


const mission = () => {
    const [allMission, setAllMission] = useState([])
    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/mission');
            const result = await response.json();
            setAllMission(result);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        }
        fetchData();
      }, [])

      const handleDelete = async (missionId) => {
        try {
          const res = await fetch(`http://localhost:5000/api/mission/${missionId}`, {
            method: 'DELETE',
          });
    
          if (res.ok) {
            // Hapus misi dari state setelah berhasil dihapus dari server
            setAllMission((prevMissions) => prevMissions.filter((mission) => mission._id !== missionId));
            console.log('Berhasil menghapus misi');
          } else {
            console.error('Gagal menghapus misi');
          }
        } catch (error) {
          console.error('Error deleting mission:', error);
        }
      };

  return (
    <div className='w-full h-[80%] text-black flex flex-col gap-9'>
        {allMission.map((single) => (
        <div className='flex'>
            <h1 className='w-[50%] bg-sky-500 font-bold text-white rounded-lg flex' key={single._id}>{single.mission}</h1>
            <button onClick={() => handleDelete(single._id)} className='text-white'>Delete</button>
        </div>
        ))}
    </div>
  )
}

export default mission