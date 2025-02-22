import{a as p,s as L,i as l}from"./assets/vendor-9OJ7S6ua.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();async function c({query:r,page:s,perPage:n}){const i={baseURL:"https://pixabay.com/api/",params:{key:"48827874-cd9b9c73a8babeb73b5d7fdc9",q:`${r}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:`${s}`,per_page:`${n}`}};return await new p.create(i).get("")}function b(r){const{webformatURL:s,largeImageURL:n,likes:i,views:t,comments:a,downloads:d,tags:h}=r,f=new Set(h.split(", ")),y=Array.from(f.values()).join(", ");return`<li>
            <a href="${n}">
              <img src="${s}" alt="Tags: ${y}" />
            </a>
            <table class="photo-info">
              <tr>
                <th>Likes</td>
                <th>Views</td>
                <th>Comments</td>
                <th>Downloads</td>
              </tr>
              <tr>
                <td>${i}</td>
                <td>${t}</td>
                <td>${a}</td>
                <td>${d}</td>
              </tr>
            </table>
          </li>`}function m(r){return r.map(b).join("")}const e={queryForm:document.querySelector("[data-image-query]"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadmoreBtn:document.querySelector(".load-more-btn"),endMsg:document.querySelector(".end-msg")},q={close:!1,showCounter:!1,captionDelay:250,captionsData:"alt",scrollZoom:"false",scrollZoomFactor:"false",disableScroll:"true"},o={query:"",page:1,perPage:40,lastPage:1};function u(){o.page<o.lastPage?e.loadmoreBtn.classList.remove("hidden"):(e.loadmoreBtn.classList.add("hidden"),e.endMsg.classList.remove("hidden"))}function w(){const r=e.gallery.firstElementChild.getBoundingClientRect();scrollBy({behavior:"smooth",top:r.height*2})}const B=async r=>{if(r.preventDefault(),e.gallery.innerHTML="",e.loadmoreBtn.classList.add("hidden"),e.endMsg.classList.add("hidden"),o.query=r.target.elements.query.value.trim(),!o.query){e.loadmoreBtn.classList.add("hidden"),l.warning({message:"Query field is empty. Please enter your query!",position:"center"});return}e.loader.classList.remove("hidden"),o.page=1;try{const s=await c(o);e.loader.classList.add("hidden"),s.data.hits.length?(e.gallery.innerHTML=m(s.data.hits),g.refresh(),o.lastPage=Math.ceil(s.data.totalHits/o.perPage),u()):l.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"center"})}catch(s){e.loader.classList.add("hidden"),l.error({message:`${s.message}`,position:"center"})}},v=async()=>{e.loader.classList.remove("hidden"),scrollBy({behavior:"smooth",top:44}),o.page+=1;try{const r=await c(o);e.loader.classList.add("hidden"),e.gallery.insertAdjacentHTML("beforeend",m(r.data.hits)),g.refresh(),w(),u()}catch(r){e.loader.classList.add("hidden"),e.loadmoreBtn.classList.add("hidden"),e.endMsg.classList.add("hidden"),l.error({message:`${r.message}`,position:"center"})}},g=new L(".gallery a",q);e.queryForm.addEventListener("submit",B);e.loadmoreBtn.addEventListener("click",v);
//# sourceMappingURL=index.js.map
