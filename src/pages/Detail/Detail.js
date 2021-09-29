import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/layout/Detail.scss'
import { Tabs, Radio, Space, Collapse } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { latThongTinChiTietPhimAction } from '../../Redux/action/QuanLiRapAction';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function Detail(props) {

    const dispatch = useDispatch();
    const { filmDetail } = useSelector(state => state.danhSachPhimReducer)
    let danhGia = filmDetail.danhGia * 10;
    let star;
    useEffect(() => {
        star = filmDetail.danhGia / 2
        let { id } = props.match.params;
        dispatch(latThongTinChiTietPhimAction(id));
    }, [])

    console.log({ filmDetail });

    function callback(key) {
        console.log(key);
    }

    const text = `
        ${filmDetail.moTa}
        `;


    return (
        <div className="detail  relative" >
            
                <div className="overlay pb-20" >

                <div className="chi-tiet z-10 mb-10" >
                    <div style={{ width: '80%', margin: '0 auto' }} >
                        <div className="row pt-40" >
                            <div className="col-4 col-md-4"  >
                                <img className="object-cover md:w-full w-75" style={{ borderRadius: '20px'}} src={filmDetail.hinhAnh} />
                                <button className="btn button mt-5" >Trailer</button>
                            </div>
                            <div className="col-8 col-md-4" >
                                <h1 className="text-green-100 md:text-3xl text-xl">{filmDetail.tenPhim}</h1>
                                {/* <p className="text-gray-300" >Mô tả : <span>{filmDetail.moTa}</span></p> */}
                                <p className="text-green-100 text-base md:text-xl">Trạng thái : <span className="text-md:base text-sm text-red-800" >{filmDetail.dangChieu ? 'Đang chiếu' : ''}</span ><span className="text-base text-black">{filmDetail.sapChieu ? 'Sắp chiếu' : ''}</span></p>
                                <p className="text-green-100 text-base md:text-xl">Đánh giá :<span className="text-md:base text-sm text-red-800"> {filmDetail.danhGia}/10</span></p>
                                <p className="text-green-100 text-base md:text-xl">Ngày khởi chiếu :<span className="text-base text-red-800"> {filmDetail.ngayKhoiChieu}</span></p>
                                {/* <p className="text-green-100 text-xl">Mô tả : <span span style={{height:'100px'}} className="text-base text-white">{filmDetail.moTa}</span></p> */}
                                <Collapse  defaultActiveKey={['3']} onChange={callback}>
                                    <Panel showArrow={false} header="Mô tả" key="1">
                                        <p>{text}</p>
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className=" col-12 mt-3 col-md-4 flex flex-col items-center" >
                                <div class={`c100 p${danhGia} green`} >
                                    <span>{`${danhGia}`}%</span>
                                    <div class="slice">
                                        <div class="bar"></div>
                                        <div class="fill"></div>
                                    </div>
                                </div>
                                <div>
                                    <Rate disabled defaultValue={star} />
                                </div>
                                <p className="md:text-xl text-sm text-center" >Đánh giá</p>
                            </div>

                        </div>
                    </div>
                </div>


                <div style={{ width: '60%', margin: '0 auto' }} className="z-10 bg-white" >
                    <Tabs defaultActiveKey="1" centered style={{ background: 'rgb(15, 33, 51)' }}  >
                        <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
                            <div >
                                <Tabs tabPosition={'left'} >
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return <TabPane
                                            tab={<div className="flex flex-row items-center justify-center">
                                                <img src={htr.logo} className="rounded-full mb-2 w-full" style={{ width: 50 }} alt="..." />
                                                <div className="text-center text-green-600 ml-2">
                                                    {htr.tenHeThongRap}
                                                </div>
                                            </div>}
                                            key={index}>
                                            {htr.cumRapChieu?.slice(0, 2).map((cumRap, index) => {
                                                return <div className="mt-5" key={index}>
                                                    <div className="flex flex-row">
                                                        <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                                                        <div className="ml-2">
                                                            <p className="text-gray-100" style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                            <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className="thong-tin-lich-chieu grid gap-5 grid-cols-4">
                                                        {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-600 ">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            })}



                                        </TabPane>
                                    })}


                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
                            Thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
                            Đánh giá
                        </TabPane>
                    </Tabs>
                </div>
                
                </div>
        </div>

    )
}