const crypto = require("crypto");

let usersId = []; // global variable (GV)

module.exports={
    cookieParser: (uiCookie)=>{
        const cookie = uiCookie;
        let cookiesArr = cookie.split(";");
        cookiesArr = cookiesArr.map(e=>e.trim())
        const filtered = cookiesArr.filter(el => el.startsWith('token='))
        const userTokenArr = filtered[0].split('=');
        const userToken = userTokenArr[1];
        return userToken;
    },


    setId: (id, token)=>{
        usersId.push({id,token})
        return 
    },
    
    getId: (token)=>{
        return usersId.find(obj=> obj.token === token)
    },

    clearUser: (id)=>{
        usersId = usersId.filter(user=> user.id !== id)
        return
    }

}