import { CHANGE_TAB_ACTIVE, DAT_VE_HOAN_TAT, GET_CHI_TIET_PHONG_VE } from "../../utils/settings";
import { ThongTinLichChieu } from './../../_Core/Models/ThongTinPhongVe';
import { DAT_GHE, CHUYEN_TAB } from './../../utils/settings';

const stateDefault = {
    chiTietDatVe : new ThongTinLichChieu(),
    danhSachGheDangDat : [],
    danhSachGheKhachDangDat : [{maGhe:95561}],
    tabActive : "1"
}

export const quanLyDatVeReducer = (state =stateDefault, action) =>{
    switch (action.type) {
        
        case GET_CHI_TIET_PHONG_VE : {
            state.chiTietDatVe = action.payload;
            return {...state};
        }

        case DAT_GHE : {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.payload.maGhe)
            if(index!=-1){
                danhSachGheCapNhat.splice(index,1);
            }else{
                danhSachGheCapNhat.push(action.payload)
            }

            state.danhSachGheDangDat = [...danhSachGheCapNhat];

            return {...state}
        }

        case DAT_VE_HOAN_TAT:{
            state.danhSachGheDangDat = [];
            return {...state}
        }

        case CHUYEN_TAB : {
            state.tabActive = "2";
            return {...state}
        }

        case CHANGE_TAB_ACTIVE : {
            state.tabActive = action.payload.toString();
            return {...state}
        }

        default:
            return {...state};
    }
}