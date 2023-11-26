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

  return (
    <div className='w-full h-[80%] text-black flex flex-col gap-9'>
        {allMission.map((single) => (
            <h1 className='w-[50%] bg-sky-500 font-bold text-white rounded-lg' key={single._id}>{single.mission}</h1>
        ))}
    </div>
  )
}

export default mission