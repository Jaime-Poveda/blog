const postSection = document.querySelector(".posts-section");

db.collection("posts").orderBy("publishedAt", "desc").get().then((posts) => {
    posts.forEach(post => {
        /* if(blogId.id!=decodeURI(location.pathname.split("/").pop())){
            createPost(posts);
        } */
        createPost(post);
    });
})

const createPost = (post) => {
    let data = post.data();

    postSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + "..."}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + "..."}</p>
        <a href="/${post.id}" class"btn dark">read</a>
    </div>
    `;
}