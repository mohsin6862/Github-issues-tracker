document.getElementById('login-btn').addEventListener('click',function(){
   const userName = document.getElementById('username');
   const password = document.getElementById('password');
   const getUserName = userName.value;
   const getPassword = password.value;
//    console.log('username : ',getUserName, 'pasword : ', getPassword) 
if(getUserName == 'admin'&& getPassword == 'admin'){
    alert('Sign in Successful')
    window.location.assign("./home.html");
}
})