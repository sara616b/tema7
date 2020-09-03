document.addEventListener("DOMContentLoaded", hentdata);
let container = document.querySelector("section");
let temp = document.querySelector("template");
let filter = "alle";
let retter;
let popup = document.querySelector("#popup");

async function hentdata() {
    console.log("hentData");
    //https://docs.google.com/spreadsheets/d/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/edit#gid=0
    //id, kategori, navn, pris, kort, lang, oprindelse, billede
    const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
    const respons = await fetch(link);
    retter = await respons.json();
    addEventListenersToButtons();
    vis();
};

function vis() {
    console.log("viser retter");
    console.log(retter);
    container.innerHTML = "";
    retter.feed.entry.forEach((ret) => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            const klon = temp.cloneNode(true).content;
            klon.querySelector("h3").textContent = ret.gsx$navn.$t;
            klon.querySelector(".kategori").textContent += ret.gsx$kategori.$t;
            klon.querySelector(".pris").textContent += ret.gsx$pris.$t + " kr.";
            klon.querySelector(".kort").textContent += ret.gsx$kort.$t;
            klon.querySelector("img").src = "imgs/small/" +
                ret.gsx$billede.$t + "-sm.jpg";
            klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));
            container.appendChild(klon);
            console.log("appendChild");

        }
    });
};

document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");


function visDetaljer(ret) {
    console.log(ret);
    popup.style.display = "block";
    popup.querySelector("#navn").textContent = ret.gsx$navn.$t;
    popup.querySelector("img").src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
    popup.querySelector("#pris").textContent = ret.gsx$pris.$t + " kr.";
    popup.querySelector("#lang").textContent = ret.gsx$lang.$t;
    popup.querySelector("#detaljer").textContent = ret.gsx$kategori.$t + ", " + ret.gsx$oprindelse.$t;
}

function addEventListenersToButtons() {
    console.log("addEventListenersToButtons");
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });

};

function filterBTNs() {
    console.log("filterBTNs")
    filter = this.dataset.kategori;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    });
    this.classList.add("valgt");
    document.querySelector("h2").textContent = this.textContent;
    vis();
}
