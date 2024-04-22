import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  Doctors: [],
  listTime: [],
  allRequiredDoctorInfor: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.data,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.data,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.data,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
      };
      case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      return {
        ...state,
        allRequiredDoctorInfor: action.data,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILDED:
      return {
        ...state,
        allRequiredDoctorInfor : []
      };
    case actionTypes.READ_USER_REDUX_ACTIONS_SUCCESS:
      return {
        ...state,
        users: action.data,
      };
    case actionTypes.READ_USER_REDUX_ACTIONS_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      return {
        ...state,
        topDoctors: action.dataDoctor,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
      return {
        ...state,
        topDoctors: [],
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        Doctors: action.data,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
      return {
        ...state,
        Doctors: [],
      };
      case actionTypes.FETCH_ALL_TIME_SUCCESS:
      return {
        ...state,
        listTime: action.data,
      };
    case actionTypes.FETCH_ALL_TIME_FAILDED:
      return {
        ...state,
        listTime: [],
      };
    default:
      return state;
  }
};

export default appReducer;
