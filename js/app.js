
// This is how to import files
// import main, {add, substract} from './math'
//
// console.log(add(1,2))
// console.log(substract(2,1))
// main()

import {fetchMashableArticles, fetchRedditArticles, renderArticles} from './articles'


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
      link: ''
    }
  ]
}


function fetchArticles(source) {
  if (source === 'mashable') {
    return fetchRedditArticles() //from module articles.js
  }
}

fetchArticles(state.source) //news source function input
.then(articles => state.articles = articles)
.then(() => render(app, state))


//Renders the main content of the page. Articles get rendered in fetch articles module

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

render(app, state) // render function gets called
