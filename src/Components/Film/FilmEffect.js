import React from 'react'
import { NavLink } from 'react-router-dom';

export default function FilmEffect(props) {

  const phim = props.phim;

  return (
    <div className="mb-5 relative" style={{ display: 'flex', justifyContent: 'center' }} >
      <div className="card">
        <div className="image">
          <img  onError={(e) => {
                        e.target.onError = null; e.target.src = "http://movieapi.cyberlearn.vn/hinhanh/raya-and-the-last-dragon_gp03.png"
                    }} className="object-cover w-full h-full" src={phim.hinhAnh}  />
        </div>
        <div className="details">
          <div className="center">
            <h1 className="font-semibold mt-2" style={{ fontSize: '15px' }} >{phim.tenPhim}<br /></h1>
            <p className="text-left ml-2" >Đánh giá : <span className="text-red-500" >{phim.danhGia}/10</span></p>
            <div style={{ bottom: '-40px', left: '8px' }} className="overlay2 absolute   flex justify-around  text-light text-center text-2xl text-dark">
              <i class="fas fa-play i-icon mr-4 "></i>
              <NavLink to={`/detail/${phim.maPhim}`}><i class="fas fa-plus  i-icon mr-4"></i></NavLink>
              <i  class="fas fa-heart  i-icon mr-4"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
