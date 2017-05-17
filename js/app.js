import main, {add, substract} from './math'

console.log(add(1,2))
console.log(substract(2,1))
main()

const app = document.querySelector('#app')

const state = {
  source: 'mashable',
  articles: [
    {
      image: '',
      title: '',
      theme: '',
      impressions: '',
      summary: '',
      link: '',
    }
  ]
}

function fetchUrl(url) {
  return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
}

function fetchMashableArticles() {
  return fetchUrl('http://mashable.com/stories.json')
  .then(res => res.json())
  .then(data => {
    return data.new.map(article => {
      return {
        image: article.feature_image,
        title: article.display_title,
        theme: article.channel,
        impressions: article.formatted_shares,
        summary: article.excerpt,
        link: article.short_url
      }
    })
  })
}

function fetchArticles(source) {
  if (source === 'mashable') {
    return fetchMashableArticles()
  }
}

fetchArticles(state.source)
.then(articles => state.articles = articles)
.then(() => render(app, state))

function renderArticles(articles) {
  return articles.map(article => `
    <article class="article">
      <section class="featuredImage">
        <img src="${article.image}" alt="" />
      </section>
      <section class="articleContent">
          <a href="${article.link}"><h3>${article.title}</h3></a>
          <h6>${article.theme}</h6>
      </section>
      <section class="impressions">
        ${article.impressions}
      </section>
      <div class="clearfix"></div>
    </article>
  `)
}


function render(container, data) {
  container.innerHTML = `
  <header>
    <section class="container">
      <a href="#"><h1>Feedr</h1></a>
      <nav>
        <ul>
          <li><a href="#"><span>Select Source</span></a>
            <ul>
                <li><a href="#">Mashable</a></li>
                <li><a href="#">Reddit</a></li>
                <li><a href="#">Digg</a></li>
            </ul>
          </li>
        </ul>
        <section id="search">
          <input type="text" name="name" value="">
          <a href="#"><img src="images/search.png" alt="" /></a>
        </section>
      </nav>
      <div class="clearfix"></div>
    </section>
  </header>
  <div id="popUp" class="loader hidden">
    <a href="#" class="closePopUp">X</a>
    <div class="container">
      <h1>Article title here</h1>
      <p>
        Article description/content here.
      </p>
      <a href="#" class="popUpAction" target="_blank">Read more from source</a>
    </div>
  </div>
  <section id="main" class="container">
    ${renderArticles(data.articles)}
  </section>
  `
}

render(app, state)
