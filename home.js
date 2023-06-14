 getposts(true, 1)
 setupui()
     //========= pagenation ===========//
 let currentpage = 1
 window.addEventListener("scroll", () => {
         let endofpage = window.innerHeight + Math.ceil(window.pageYOffset) >= document.body.offsetHeight //هاد السطر بيحسب طول الصفحة وبيرجعلي اياها ك ترو او فولس 
         if (endofpage) { // اذا طول القيمة ترو فهاد يعني اني نزلت لاخر الصفحة 

             currentpage++ //   هنا بزيد قيمة الصفحة +1 لانتقل للصفحة التالية في الاستدعاء 
             getposts(false, currentpage)


         }
     })
     //========= //pagenation// ===========//


 //>>>>>>>>>>>  GETPOSTS FN
 function getposts(x, currentpage) {
     toggleloader(true)
     axios.get(`${baseurl}/posts?limit=2&page=${currentpage}`)

     .then(function(response) {
             toggleloader(false)
                 // handle success
             if (x == true) {
                 document.getElementById("maincont").innerHTML = ""
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
                    <div class="col-6 mb-4 "  >
                        <div class="card shadow" >
                            <div  id="userimg" class="card-header d-flex align-items-center" >
                                
                                <div onclick="profileclick(${post.author.id})" style="cursor: pointer; " class="d-flex align-items-center">
                                    <img  src= "${post.author.profile_image}" alt="" style="width: 40px;height:40px" class="image.png rounded-circle border border-2">
                                    <b  class="d-inline ">@${post.author.username}</b>
                                </div>
                                <div class="w-100"></div>
                                   ${editbtnshow} ${deletebtnshow}
                            </div>
                            <div class="card-body" style="cursor: pointer; " onclick="postclick(${post.id})">
                                
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
 //>>>>>>>>>>>  //GETPOSTS FN//