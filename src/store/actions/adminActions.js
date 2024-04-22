import actionTypes from "./actionTypes";
import {
  getAllCodeApi,
  createNewUserApi,
  getAllUsers,
  deleteUserApi,
  editUserApi,
  getTopDoctorHomeServiceApi,
  getAllDoctors,
  postSaveInfoDoctors,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
import axios from "axios";
import { toast } from "react-toastify";
export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
    }
  };
};
export const fetchRoleSuccess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
export const createNewUserReduxActions = (data) => {
  return async (dispatch, getState) => {
    try {
      let resApi = await createNewUserApi(data);
      console.log("createNewUserReduxActions", resApi);
      if (resApi && resApi.errCode === 0) {
        toast.success("create new user success");
        dispatch(readUserReduxActions());
      }
    } catch (e) {
      console.log("qwe", e);
    }
  };
};
export const readUserReduxActions = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res1 = await getTopDoctorHomeServiceApi(10);
      console.log("res1111", res1);
      if (res && res.errCode === 0) {
        dispatch(readUserReduxActionsSuccess(res.users));
      } else {
        dispatch(readUserReduxActionsFailed());
      }
    } catch (e) {
      dispatch(readUserReduxActionsFailed());
    }
  };
};
export const readUserReduxActionsSuccess = (user) => ({
  type: actionTypes.READ_USER_REDUX_ACTIONS_SUCCESS,
  data: user,
});
export const readUserReduxActionsFailed = () => ({
  type: actionTypes.READ_USER_REDUX_ACTIONS_FAILED,
});
export const deleteUserReduxActions = (userId) => {
  return async (dispatch, getState) => {
    try {
      let resApi = await deleteUserApi(userId);
      console.log("deleteUserReduxActions", resApi);
      if (resApi && resApi.errCode === 0) {
        toast.success("delete new user success");
        dispatch(readUserReduxActions());
      }
    } catch (e) {
      console.log("qwe", e);
    }
  };
};
export const editUserReduxActions = (user) => {
  return async (dispatch, getState) => {
    try {
      let resApi = await editUserApi(user);
      console.log("editUserReduxActions", resApi);
      if (resApi && resApi.errCode === 0) {
        toast.success("edit user success");
        dispatch(readUserReduxActions());
      }
    } catch (e) {
      console.log("qwe", e);
    }
  };
};
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeServiceApi(10);
      if (res && res.errCode === 0) {
        console.log("top doctor", res);
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      console.log("top-doctor failed", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
      });
    }
  };
};
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      console.log("ALL-doctor failed", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
      });
    }
  };
};
export const postSaveInfoDoctorsActions = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await postSaveInfoDoctors(data);
      if (res && res.errCode === 0) {
        toast.success(res.data);
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
        });
      } else {
        toast.error("error save detail doctor");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      console.log("ALL-doctor failed", e);
      toast.error("error save detail doctor");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTORS_FAILDED,
      });
    }
  };
};
export const fetchAllTimeActions = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("TIME");
      console.log('adminAction', res)
      if (res && res.errCode === 0) {
        toast.success("succ all time");
        dispatch({
          type: actionTypes.FETCH_ALL_TIME_SUCCESS,
          data: res.data,
        });
      } else {
        toast.error("error all time doctor");
        dispatch({
          type: actionTypes.FETCH_ALL_TIME_FAILDED,
        });
      }
    } catch (e) {
      console.log("ALL-time failed", e);
      toast.error("error all time doctor");
      dispatch({
        type: actionTypes.FETCH_ALL_TIME_FAILDED,
      });
    }
  };
};
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getstate) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START })
      let resPrice = await getAllCodeApi("PRICE");
      let resPayment = await getAllCodeApi("PAYMENT");
      let resProvince = await getAllCodeApi("PROVINCE");
      let resSpecialty = await getAllSpecialty();

      let resClinic = await getAllClinic();
      console.log('check trong adminaction',resPayment)
      if (resPrice?.errCode === 0 && resPayment?.errCode === 0 
        && resProvince?.errCode === 0 && resSpecialty?.errCode === 0
        && resClinic?.errCode === 0) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        }
        console.log('cheack có vào if ko') 
        dispatch(fetchRequiredDoctorInforSuccess(data))
      } else { dispatch(fetchRequiredDoctorInforFailed()); }
    }

    catch (e) { dispatch(fetchRequiredDoctorInforFailed()); }
  }
}
export const fetchRequiredDoctorInforSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: data
})
export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILDED
})