let addPostBtn = document.querySelector('.create-post-btn');
let logOutBtn = document.querySelector('.log-out-btn');
async function getBuyRequests(){
    return await fetch('http://localhost:3000/buy/submit')
          .then((res) => res.json())
          .then((data) => data);
  }


//This event happens when the object document is completely loaded.
document.addEventListener('DOMContentLoaded',function(){
    //When the page is loading, these functions will be called.
    addPosts();
    addCallbackRequests();
    addEmails();
    addSub();
    addUser();
    addBuy();
})

addPostBtn.addEventListener('click', function(){
    let articlesTab = document.getElementById('v-pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let createTab = document.getElementById('v-pills-create-post');
    createTab.classList.add('show');
    createTab.classList.add('active');

})

/*getPosts func. is an async. func. and that means that the variable called
posts is not going to wait for the answer from the getPosts func.
That's why we need to use async-await!!*/
async function addPosts(){
    let posts = await getPosts(); 
    //posts: we have an array of all post stored in the DB.
    let articles = document.querySelector('.articles');
    /*we have to be sure that every time we work with the articles,
    this div is empty without any articles*/
    articles.innerHTML='';

    let i =1; //order number

    posts.forEach((post) =>{
        let postHTML = `
    <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${post.id}">
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    //Let's add some articles
    articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

    //---
    async function addCallbackRequests(){
        let requests = await getCallbackRequests(); 
        //requests: we have an array of all requests stored in the DB.
         let requestsBlock = document.querySelector('#v-pills-callback');
         /*we have to be sure that every time we work with the requestsBlock,
         this div is empty without any requests*/
         requestsBlock.innerHTML='';

          let i =1; //order number
   
    requests.forEach((request) =>{
        let requestHTML = `
    <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${request.id}">
        <div class="name w60">${request.phoneNumber}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    //Let's add some articles
    requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
    }

    //--
    async function addSub(){
        let requests = await getEmailsRequests(); 
        console.log(requests);
        //requests: we have an array of all requests stored in the DB.
         let Block = document.querySelector('#sub');
         /*we have to be sure that every time we work with the requestsBlock,
         this div is empty without any requests*/
         Block.innerHTML='';

          let i =1; //order number
         requests.forEach((request) =>{
                let requestHTML = `
            <article class="d-flex justify-content-between align-items-center article-inline">
                <div class="num w5">${i++}</div>
                <input class="id" type="hidden" value="${request.id}">
                <div class="name w60">${request.email}</div>
                <div class="date w30">${request.date}</div>
            </article>`;
            //Let's add some articles
            Block.insertAdjacentHTML('beforeend', requestHTML);
        })
    }


    async function addUser(){
        let requests = await getUserRequests(); 
        //requests: we have an array of all requests stored in the DB.
         let userBlock = document.querySelector('#user');
         /*we have to be sure that every time we work with the requestsBlock,
         this div is empty without any requests*/
         userBlock.innerHTML='';

          let i =1; //order number
   
    requests.forEach((request) =>{
        let requestHTML = `
    <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" id ="id" value="${request.id}">
        <div class="name w60">${request.name}</div>
        <div class="date w30">${request.email}</div>
    </article>`;
    //Let's add some articles
    userBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
    }
//---
async function addEmails(){
    let emails = await getEmails(); 
    //emails: we have an array of all emails stored in the DB.
     let emailsBlock = document.querySelector('#v-pills-mails');
     /*we have to be sure that every time we work with the emailsBlock,
     this div is empty without any requests*/
     emailsBlock.innerHTML='';

      let i =1; //order number

emails.forEach((emailRequest) =>{
    let emailHTML = `
<article class="d-flex justify-content-between align-items-center article-inline">
    <div class="num w5">${i++}</div>
    <input class="id" type="" value="${emailRequest.id}">
    <div class="name w30">${emailRequest.name}</div>
    <div class="email w30">${emailRequest.email}</div>
    <div class="date w30">${emailRequest.date}</div>
    <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    <div class="text w100">${emailRequest.text}</div>
</article>`;
//Let's add some articles
emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
})
}


async function addBuy(){
    let buy = await getBuyRequests(); 
    //emails: we have an array of all emails stored in the DB.
     let buyBlock = document.querySelector('#v-pills-buy');
     /*we have to be sure that every time we work with the emailsBlock,
     this div is empty without any requests*/
     buyBlock.innerHTML='';

      let i =1; //order number

buy.forEach((buyRequest) =>{
    let buyHTML = `
<article class="d-flex justify-content-between align-items-center article-inline">
    <div class="num w5">${i++}</div>
    <input class="id" type="hidden" value="${buyRequest.id}">
    <div class="name w30">${buyRequest.fn+ " " + buyRequest.ln}</div>
    <div class="email w30">${buyRequest.dateD}</div>
    <div class="date w30">${buyRequest.dateR}</div>
</article>`;
//Let's add some articles
buyBlock.insertAdjacentHTML('beforeend', buyHTML);
})
}

//deleting cookie
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})