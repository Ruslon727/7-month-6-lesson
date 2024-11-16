import { act, useEffect, useState } from 'react'
import { useAxios } from '../hook/useAxios'
import { API_KEY, IMG_URL } from '../hook/useEnv'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import YouTube from 'react-youtube'


function SingleMovie() {
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState({})
    const [changeImg, setChangeImg] = useState(false)
    const [actors, setActors] = useState([])
    const [videos, setVideos] = useState([])

    useEffect(() => {
        useAxios().get(`/${id}?api_key=${API_KEY}`).then(res => {
            setMovieInfo(res.data)
        })
    }, [])

    useEffect(() => {
        useAxios().get(`/${id}/credits?api_key=${API_KEY}`).then(res => {
            setActors(Array.isArray(res.data.cast) ? res.data.cast : []);
        })
    }, [])

    useEffect(() => {
        useAxios().get(`/${id}/videos?api_key=${API_KEY}`).then(res => {
            setVideos(res.data.results.splice(0, 5))
        })
    }, [])

    return (
        <div className='flex justify-between'>
            <div className='w-[20%] space-y-5 rounded-md border-[2px] border-white p-5 h-[90vh] overflow-y-auto'>
                {actors.length > 0 ? (
                    actors.map(item => (
                        <div className='bg-[#000009] p-3 rounded-md' key={item.id}>
                            <img className='h-[300px] rounded-md w-full object-cover' src={`${IMG_URL}/${item.profile_path}`} alt={item.name} />
                            <h2 className='text-center text-white text-[20px] font-bold'>{item.character}</h2>
                            <p className='text-center text-white text-[18px] font-bold'>{item.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No actors found.</p>
                )}
            </div>
            <div className='w-[54%] rounded-md border-[2px] border-white p-5 h-[90vh] overflow-y-auto'>
                <h2 className='text-center font-bold text-[25px] text-white mb-5'>{movieInfo?.title}</h2>
                <div onMouseLeave={() => setChangeImg(false)} onMouseEnter={() => setChangeImg(true)} className='h-[800px] relative overflow-hidden rounded-md'>
                    <img className={`h-full  w-full object-cover absolute duration-300 rounded-md ${changeImg ? "left-[-120%]" : "left-0"}`} src={`${IMG_URL}/${movieInfo.poster_path}`} alt="Movie img" height={300} />
                    <img className={`h-full  w-full object-cover absolute duration-300 rounded-md ${changeImg ? "right-0" : "right-[-120%]"}`} src={`${IMG_URL}/${movieInfo.backdrop_path}`} alt="Movie img" height={300} />
                </div>
                <p className='text-[20px] font-semibold text-white mt-5'>{movieInfo.overview}</p>
                <p className='text-white text-[20px] mt-5'>Budget: {movieInfo.budget}$</p>
                <div className='flex space-x-5 mt-5'>
                    {movieInfo.genres && movieInfo.genres.map(item => (
                        <Button size='large' key={item.id} variant='contained'>{item.name}</Button>
                    ))}
                </div>
            </div>
            <div className='w-[25%] space-y-5 rounded-md border-[2px] border-white p-5 h-[90vh] overflow-y-auto'>
                {videos.map(item => <YouTube className='w-full' videoId={item.key} key={item.id}/>)}
            </div>
        </div>
    )
}

export default SingleMovie