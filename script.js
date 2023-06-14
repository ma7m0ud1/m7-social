let baseurl = "https://tarmeezacademy.com/api/v1"
setupui()



//>>>>>>>>>>>  CREAT POST FN
function creatpost() {
    let title = document.getElementById("title-input").value
        //alert(title)
    let body = document.getElementById("body-input").value
    let img = document.getElementById("image-input").files[0]

    let postid = document.getElementById("post-id-input").value
        //alert(postid)

    let iscreat = postid == null || postid == ""
        //alert(iscreat)


    let formdata = new FormData()
    formdata.append("title", title)
    formdata.append("body", body)
    formdata.append("image", img)

    const token = localStorage.getItem("token")
    const headers = {
        "Content-Type": "multipart/form-data", //مو ضروري كتابة هذا السطر لان الاكسيوس حيعرف النوع هو ملتي بارت او جاسون
        "Authorization": `Bearer ${token}`
    }
    if (iscreat) {


        const url = `${baseurl}/posts`
        toggleloader(true)
        axios.post(url, formdata, {
                headers: headers
            })
            .then(function(response) {
                console.log(response)



                const modal = document.getElementById("creat-post-modal") // من خلال هذه الاسطر بقدر اخفي المودال بعد
                const modalinstance = bootstrap.Modal.getInstance(modal) // تسجيل الدخول باستخدام بوتستراب
                modalinstance.hide() //

                showalert(" New post has been created", "success")
                setupui()
                getposts(true, 1)
                location.reload()
            })
            .catch((error) => {

                showalert(error.response.data.message, "danger")
            })
            .finally(() => {
                toggleloader(false)
            })
    } else {
        formdata.append("_method", "put")
        const url = `${baseurl}/posts/${postid}`


        toggleloader(true)
        axios.post(url, formdata, {
                headers: headers
            })
            .then(function(response) {
                console.log(response)



                const modal = document.getElementById("creat-post-modal") // من خلال هذه الاسطر بقدر اخفي المودال بعد
                const modalinstance = bootstrap.Modal.getInstance(modal) // تسجيل الدخول باستخدام بوتستراب
                modalinstance.hide() //

                showalert("  Updated post successfully ", "success")
                location.reload()
                getposts(true, 1)
                setupui()



            })
            .catch((error) => {

                showalert(error.response.data.message, "danger")
            })
            .finally(() => {
                toggleloader(false)
            })
    }



}
//>>>>>>>>>>>  //CREAT POST FN//

function getpostsinprofile(x, id) {


    axios.get(`${baseurl}/users/${id}/posts`)

    .then(function(response) {
            // handle success
            if (x == true) {
                document.getElementById("posts").innerHTML = ""
            }
            let posts = response.data.data



            for (post of posts) {

                //              هنا الاسطر الخاصة باظهار زر التعديل لما يكون البوست خاص بالمسخدم
                let editbtnshow = ``
                let deletebtnshow = ``
                let user = getcurrentuser()
                let ismypost = user != null && post.author.id == user.id

                if (ismypost) {
                    editbtnshow = `<button onclick="editsetup('${encodeURIComponent(JSON.stringify(post))}')" id="edittt-btn" class="btn btn-secondary d-flex mx-2" data-bs-toggle="modal"  >Edit</button>
          <!--  في الاونكليك بدل ما ابعت البيانات كل وحدة لحال زي الاي دي و العنوان ارسلت البوست كامل كاوبجكت
               ولان الاتش تي ام ال ما بيدعم ارسال الاوبجكت فاستخدمت هي الدالة اليي في الحدث ورجعتها لاوبجكت في الدالة حتى اقدر استخدمه 
               https://stackoverflow.com/questions/12109811/javascript-pass-an-object-as-the-argument-to-a-onclick-function-inside-stringا -->`
                    deletebtnshow = ` <button onclick="deletepostsetup(${post.id})"  id="delete-btn" class="btn btn-danger  d-flex"  >Delete</button>
           `

                } else {
                    editbtnshow = ''
                    deletebtnshow = ''
                }
                //              هنا الاسطر الخاصة باظهار زر التعديل لما يكون البوست خاص بالمسخدم
                let posttitle = ""


                if (post.title != null) {
                    posttitle = post.title
                }




                let content = `
           <!--  POSTS  -->
           <div class="col-6 mb-4 "  style="cursor: pointer; ">
               <div class="card shadow" >
                   <div id="userimg" class="card-header d-flex align-items-center">
                       
                       
                       <img  src= "${post.author.profile_image}" alt="" style="width: 40px;height:40px" class="image.png rounded-circle border border-2">
                       <b class="d-inline w-100">@${post.author.username}</b>
                          ${editbtnshow} ${deletebtnshow}
                   </div>
                   <div class="card-body" onclick="postclick(${post.id})">
                       
                       <img src="${post.image}" alt="" style="width: 100%;" >
                      
                       
                       <p class="text-secondary mt-1">${post.created_at}</p>
                       <h5>${posttitle}</h5>
                       <p>${post.body}.</p>
                       <hr>
                       <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                               <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                           </svg>
                           <span> 
                               (${post.comments_count}) comments
                           </span>
                           
                       </div>
                   </div>
               </div>
           </div>
           <!--//  POSTS  //-->`

                document.getElementById("maincont").innerHTML += content
                    //showeditbtn(post.author.id)

            }


        })
        .catch(function(error) {

            console.log(error);
        })

}
//>>>>>>>>>>>  EDIT SETUP MODAL FN
function editsetup(postobj) {

    let post = JSON.parse(decodeURIComponent(postobj))
    console.log(post.id)
    document.getElementById("post-id-input").value = post.id // هاد السطر حاستخدمه في الدالة المشتركة بين انشاء وتعديل البوست عشان استرجع الاي دي واقدر اعدل البوست من خلاله مع العلم ان الانبوت مخفي ولا يظهر للمستخدم
    document.getElementById("titlemodal").innerHTML = "Edit Post"
    document.getElementById("accept-btn").innerHTML = "Edit "

    document.getElementById("title-input").value = post.title
    document.getElementById("body-input").value = post.body

    // السطرين التاليين بينشئو اوبجكت جديد من المودال واللي بخصصه عمزاجي لما اعمل حذث الضغط
    let editpostmodal = new bootstrap.Modal(document.getElementById("creat-post-modal"), {})
    editpostmodal.toggle()
}
//>>>>>>>>>>>  //EDIT SETUP MODAL FN//

//>>>>>>>>>>>  CREAT SETUP MODAL FN
function creatpostsetup() {
    // السطرين التاليين بينشئو اوبجكت جديد من المودال واللي بخصصه عمزاجي لما اعمل حذث الضغط
    let addpostmodal = new bootstrap.Modal(document.getElementById("creat-post-modal"), {})
    addpostmodal.toggle()


    document.getElementById("post-id-input").value = null
        //alert(document.getElementById("post-id-input").value)
    document.getElementById("titlemodal").innerHTML = "Creat Post"
    document.getElementById("accept-btn").innerHTML = "Publish "
    document.getElementById("title-input").value = ""
    document.getElementById("body-input").value = ""

}
//>>>>>>>>>>>  //CREAT SETUP MODAL FN//


//>>>>>>>>>>>  DELETE SETUP MODAL FN
function deletepostsetup(id) {

    let addpostmodal = new bootstrap.Modal(document.getElementById("delete-post-modal"), {})
    addpostmodal.toggle()
    document.getElementById("post-id-input-delete").value = id
    console.log(document.getElementById("post-id-input-delete").value)

}
//>>>>>>>>>>>  DELETE SETUP MODAL FN

//>>>>>>>>>>>  DELETE POST FN
function deletepost() {
    let id = document.getElementById("post-id-input-delete").value
    console.log(id)
    const token = localStorage.getItem("token")
        //console.log(token)

    const headers = {
        "Authorization": `Bearer ${token}`
    }
    const url = `${baseurl}/posts/${id}`
    toggleloader(true)

    axios.delete(url, {
            headers: headers
        })
        .then((response) => {
            console.log(response)
            showalert("Deleted post successfully", "success")
            const modal = document.getElementById("delete-post-modal") // من خلال هذه الاسطر بقدر اخفي المودال بعد
            const modalinstance = bootstrap.Modal.getInstance(modal) // تسجيل الدخول باستخدام بوتستراب
            modalinstance.hide()
            location.reload()
            getposts(true, 1)


        })
        .catch((error) => {

            showalert(error.response.data.message, "danger")
        })
        .finally(() => {
            toggleloader(false)
        })
}
//>>>>>>>>>>>  //DELETE POST FN//

//>>>>>>>>>>>  LOGIN FN
function login() {
    let username = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value
    const params = {
        "username": username,
        "password": password
    }
    const url = `${baseurl}/login`
    toggleloader(true)

    axios.post(url, params)
        .then(function(response) {

            const token = response.data.token
            console.log(token);

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("loginmodal") // من خلال هذه الاسطر بقدر اخفي المودال بعد
            const modalinstance = bootstrap.Modal.getInstance(modal) // تسجيل الدخول باستخدام بوتستراب
            modalinstance.hide() //

            showalert("Loged In Successful > Wellcome :)", "success")


            location.reload()
            setupui()
        })
        .catch((error) => {
            showalert(error.response.data.message, "danger")
        })
        .finally(() => {
            toggleloader(false)
        })


    setupui()

}
//>>>>>>>>>>>  //LOGIN FN//


//>>>>>>>>>>>  LOGOUT FN
function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    showalert("Loged Out successful", "success")
    setupui()
    location.reload()

}
//>>>>>>>>>>>  //LOGOUT FN//

//>>>>>>>>>>>  REGISTER FN
function register() {
    let username = document.getElementById("username-register-input").value
    let name = document.getElementById("name-register-input").value
    let password = document.getElementById("password-register-input").value
    let image = document.getElementById("image-register-input").files[0]

    let formdata = new FormData()
    formdata.append("username", username)
    formdata.append("name", name)
    formdata.append("password", password)
    formdata.append("image", image)
        /*const params = {
            "username": username,
            "password": password,                ==== نستخدم الجاسون في حال بدنا نرفع بيانات بدون ملفات بينما نستخدم الفورم داتا لما بدي ارفع ملف او صورة
            "name": name
        }*/
    const url = `${baseurl}/register`
    toggleloader(true)

    axios.post(url, formdata)
        .then(function(response) {
            console.log(response)
            const token = response.data.token
            console.log(token);
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(response.data.user))

            const modal = document.getElementById("registermodal") // من خلال هذه الاسطر بقدر اخفي المودال بعد
            const modalinstance = bootstrap.Modal.getInstance(modal) // تسجيل الدخول باستخدام بوتستراب
            modalinstance.hide() //

            showalert("WoW >> Register Successful", "success")
            setupui()
        })
        .catch((error) => {

            showalert(error.response.data.message, "danger")
        })
        .finally(() => {
            toggleloader(false)
        })

}
//>>>>>>>>>>>  //REGISTER FN//



//>>>>>>>>>>>  SETUPUI FN   باستدعيها لما بدي اغير حالة واجهة الهيدر مثلا بعد استدعاء دالة تسجيل الدخول لاظهار زر تسجيل الخروج وهكذا
function setupui() {


    let loginbtn = document.getElementById("login-div")
    let logoutbtn = document.getElementById("logout-div")
    let creatbtn = document.getElementById("creat-btn")





    let token = localStorage.getItem("token")


    if (token == null) {


        if (creatbtn != null) {
            creatbtn.style.setProperty("display", "none", "important") //addcomment
        }
        logoutbtn.style.setProperty("display", "none", "important")
        loginbtn.style.setProperty("display", "flex", "important")





    } else {

        if (creatbtn != null) {
            creatbtn.style.setProperty("display", "flex", "important")
        }
        loginbtn.style.setProperty("display", "none", "important")
        logoutbtn.style.setProperty("display", "flex", "important")


        /*if (addcomment != null && cont != null && com != null) {
            addcomment.style.setProperty("display", "flex", "important")
            cont.style.setProperty("display", "flex", "important")
            com.style.setProperty("display", "flex", "important")
        }*/


        let user = getcurrentuser()

        document.getElementById("userinfo").innerHTML = `
            <span id="user-idd" class="align-baseline">
                <b>${user.username}@</b>
            </span>
            <span id="user-image">
                <img src= "${user.profile_image}" alt="" style="width: 40px;" class="image.png rounded-circle border border-2">
            </span>`


    }
}
//>>>>>>>>>>>  //SETUPUI FN//

//>>>>>>>>>>> todo fade and show  ALERT FN
function showalert(messag, type) {
    document.getElementById("alertplace").innerHTML = `<div id="aalert" class=" w-50 start-0 d-flex  fade show">
            <div   class=" alert alert-${type}  alert-dismissible w-75 d-flex align-items-baseline " role="alert" style="height:55px">
                    <h7 class="alert-heading">${messag}</7>
                    <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>`

    setTimeout(() => {

        const alert = bootstrap.Alert.getOrCreateInstance('#aalert')
        alert.close()
    }, 3000)

}
//>>>>>>>>>>>  //ALERT FN//

//>>>>>>>>> GET CURRENT USER FN
function getcurrentuser() {
    let user = null
    let userinstorage = localStorage.getItem("user")
    if (userinstorage != null) {
        user = JSON.parse(userinstorage)
    }
    return user
}
//>>>>>>>>> //GET CURRENT USER FN//


//>>>>>>>>> PROFILE CLICK FN
function profileclick(x) {
    if (x == undefined) {
        let user = getcurrentuser()
        let id = user.id
        window.location = ` myprofile.html?userid=${id}`
    } else {
        window.location = ` myprofile.html?userid=${x}`
    }

}
//>>>>>>>>>// PROFILE CLICK FN//


//>>>>>>>>>>>  GET POST ID FN     هي الدالة بترسلي الاي دي تبع اي بوست للصفحة اللي بتعرضلي البوست 
function postclick(postid) {
    //alert(postid)
    window.location = ` postdetail.html?postid=${postid}` // هنا بارسل الاي دي كبراميتر مع الرابط للصفحة التانية
}
//>>>>>>>>>>>  //GET POST ID FN//

//>>>>>>>>>>>  loader FN
function toggleloader(show = true) {
    if (show) {
        document.getElementById("loader").style.visibility = 'visible'
    } else {
        document.getElementById("loader").style.visibility = 'hidden'

    }

}
//>>>>>>>>>>>  //loader FN//


//>>>>>>>>>>>  avaluation MODAL FN
function evaluationmodal() {

    let addpostmodal = new bootstrap.Modal(document.getElementById("evaluation-modal"), {})
    addpostmodal.toggle()


}

function evaluation() {
    let body = document.getElementById("ev-body").value
    let params = {
        "body": body
    }
    const token = localStorage.getItem("token")
    const headers = {
        "Content-Type": "multipart/form-data", //مو ضروري كتابة هذا السطر لان الاكسيوس حيعرف النوع هو ملتي بارت او جاسون
        "Authorization": `Bearer ${token}`
    }
    const url = `${baseurl}/courseReviews`
    toggleloader(true)
    axios.post(url, params, {
            headers: headers
        })
        .then((response) => {

            showalert("review has been sended", "success")
            const modal = document.getElementById("evaluation-modal") // من خلال هذه الاسطر بقدر اخفي المودال بعد
            const modalinstance = bootstrap.Modal.getInstance(modal) // تسجيل الدخول باستخدام بوتستراب
            modalinstance.hide() //

        })
        .catch((error) => {

            showalert(error.response.data.message, "danger")
        })
        .finally(() => {
            toggleloader(false)
        })
}
//>>>>>>>>>>>  avaluation MODAL FN