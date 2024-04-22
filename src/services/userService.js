import axios from "../axios"
const handleLoginApi = (useremail, userpassword) => {
    return axios.post('/api/login', { email: useremail, password: userpassword })
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserApi = (data) => {
    console.log('axios', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserApi = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });

}
const editUserApi = (data) => {
    console.log('apidata edit', data)
    return axios.put('/api/edit-user', data)

}
const getAllCodeApi = (inputType) => {
    return axios.get(`/allcode?type=${inputType}`)
}
const getTopDoctorHomeServiceApi = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)

}
const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}
const postSaveInfoDoctors = (data) => {
    return axios.post('/api/info-doctors', data)
}
const UpDateInfoDoctors = (data) => {
    return axios.put('/api/update-info-doctors', data)
}
const getDetailInfoDoctorByIdApi = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)

}
const getScheduleDoctorApi = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?id=${id}&date=${date}`)
}
const createManageScheduleApi = (data) => {

    return axios.post('/api/create-manage-schedule', data)
}
const getExtraInforDoctorById = (id) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${id}`)
}
const getProfileDoctorById = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${id}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}
const getAllSpecialty = () => {
    return axios.get('/api/get-specialty')
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
const getAllClinic = () => {
    return axios.get('/api/get-clinic')
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
   return axios.post('/api/send-remedy', data)
}
export {
    handleLoginApi, getAllUsers,
    createNewUserApi, deleteUserApi,
    editUserApi, getAllCodeApi,
    getTopDoctorHomeServiceApi,
    getAllDoctors, postSaveInfoDoctors,
    getDetailInfoDoctorByIdApi,
    UpDateInfoDoctors,
    createManageScheduleApi,
    getScheduleDoctorApi,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getAllDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getAllDetailClinicById,
    getListPatientForDoctor,
    postSendRemedy

}