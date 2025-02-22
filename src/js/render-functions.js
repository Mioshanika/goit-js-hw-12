function imageTemplate(img) {
  const {
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    downloads,
    tags,
  } = img;
  const uniqueTags = new Set(tags.split(', '));
  const altAttr = Array.from(uniqueTags.values()).join(', ');
  return `<li>
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="Tags: ${altAttr}" />
            </a>
            <table class="photo-info">
              <tr>
                <th>Likes</td>
                <th>Views</td>
                <th>Comments</td>
                <th>Downloads</td>
              </tr>
              <tr>
                <td>${likes}</td>
                <td>${views}</td>
                <td>${comments}</td>
                <td>${downloads}</td>
              </tr>
            </table>
          </li>`;
}
export function imagesTemplate(imgs) {
  return imgs.map(imageTemplate).join('');
}
