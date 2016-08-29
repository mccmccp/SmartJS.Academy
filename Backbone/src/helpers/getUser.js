function getUser () {
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    if(user){
        return JSON.parse(user);
    }
}

export default getUser; 