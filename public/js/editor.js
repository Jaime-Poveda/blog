const blogTitleField = document.querySelector(".title");
const articleFeild = document.querySelector(".article");


// banner
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener("change", () => {
    uploadImage(uploadInput, "image");
})


const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append("image", file);

        fetch("/upload", {
            method: "post",
            body: formdata
        }).then(res => res.json()).then(data => {
            if (uploadType == "image") {
                addImage(data, file.name);
            } else {
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

const letters = "abcdefghijklmnopqrstuvwxyz";
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

publishBtn.addEventListener("click", () => {
    if (articleFeild.value.length && blogTitleField.value.length) {
        // generating id
        let blogTitle = blogTitleField.value.split(" ").join("-");

        /* let id = "";
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        } */

        // setting up docName
        //let docName = `${blogTitle}-${id}`;
        let date = new Date();

        // access firestore
        /* db.collection("posts").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`,
            //publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,

        }).then(() => {
            console.log("data entered");
        }).catch((err) => {
            console.error(err);
        }) */

        // Add a new document with a generated id.
        /* db.collection("posts").add({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            }); */

        // Mi método con el nombre del post como id
        db.collection("posts").doc(blogTitle.toLowerCase()).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            //publishedAt: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`,

        }).then(() => {
            location.href = `/${blogTitle.toLowerCase()}`;
            //console.log("data entered");
        }).catch((err) => {
            console.error(err);
        })
    }
})