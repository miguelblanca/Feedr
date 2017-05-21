/*
This are the main three sources that we are going to use in this project
Mashable: http://mashable.com/stories.json
Reddit: https://www.reddit.com/top.json
Digg: http://digg.com/api/news/popular.json
*/


export function fetchUrl(url) {
  return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
}

export function fetchMashableArticles() {
  return fetchUrl('http://mashable.com/stories.json')
  .then(res => res.json())
  .then(data => {
    console.log(data)
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

export function fetchRedditArticles() {
  return fetchUrl('https://www.reddit.com/top.json')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    return data.data.children.map(article => {

          return {
            image: article.data.thumbnail,
            title: article.data.title,
            theme: article.data.subreddit,
            impressions: article.data.score,
            summary: article.data.spoiler,
            link: article.data.url
        }
    })
  })
}

export function renderArticles(articles) {
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
  `).join('\n')
}
