// token qoshish
export const saveTokin = (token)=>{
  localStorage.setItem("token" , token)
}
// token  olish
export const getToken = ()=>{
  return localStorage.getItem("token")
}

// tekshirish

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

//tozalash
export const logout = () => {
  localStorage.removeItem("token");
};
