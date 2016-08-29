function logout (){
    localStorage.clear();
    sessionStorage.clear();
    window.app.navigate("", {trigger: true});
}

export default logout;