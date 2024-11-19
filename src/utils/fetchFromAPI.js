import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

// define function call API get list video from BE

export const getVideoAPI = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-videos`)
    return data;
  } catch (error) {
    console.log("err api get list video")
  }
};

// define function call API get list video

export const getTypesVideoAPI = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-types-video`)
    return data;
  } catch (error) {
    console.log("err api get types video")
  }
};

// define function call api get list videos by type id
export const getVideosByTypeId = async (typeId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-videos/${typeId}`)
    return data
  } catch (error) {
    console.log("error api get list video by typeId")
  }
}

export const getVideoById = async (videoId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-video/${videoId}`)
    return data
  } catch (error) {
    console.log("error api get video by videoid")
  }
}


export const signUpAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, payload)
    return data;
  } catch (error) {
    throw error
  }
}

export const loginAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, payload)
    return data;
  } catch (error) {
    throw error;
  }
}



export const loginFacebookAPI = async (payload) => {
  try {
    // payload: email, name, id
    const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, payload);
    return data;
  } catch (error) {
    throw error;
  }
}

export const forgotPasswordAPI = async (payload) => {
  try {
    // payload: email
    let {data} = await axios.post(`${BASE_URL}/auth/forgot-password`, payload)
    return data;
  } catch (error) {
    throw error;
  }
}

export const changePasswordAPI = async (payload) => {
  try {
    let {data} = await axios.post(`${BASE_URL}/auth/change-password`, payload)
    return data;
  } catch (error) {
    throw error;
  }
}