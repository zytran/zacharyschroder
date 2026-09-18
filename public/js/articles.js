const ARTICLES = [
  {
    title: "Penn State women's hockey captain Tessa Janecke to throw first pitch for Friday's softball game",
    excerpt: "The Olympic gold medalist and Penn State captain will throw out the first pitch at Friday's Penn State softball game against Maryland at Beard Field at Nittany Lion Softball Park.",
    date: "April 2, 2026",
    source: "The Daily Collegian",
    url: "https://www.psucollegian.com/sports/softball/penn-state-womens-hockey-captain-tessa-janecke-to-throw-first-pitch-for-fridays-softball-game/article_6db2eb88-7c70-436b-8079-1da22a660ce5.html",
    image: "https://bloximages.newyork1.vip.townnews.com/psucollegian.com/content/tncms/assets/v3/editorial/1/2f/12ff488e-98ec-494e-9902-61979a238c83/69c057833ae15.image.jpg?resize=1476%2C982",
    categories: ["highlights", "recent", "hockey"]
  },
  {
    title: "YEKINDAR: \"I\'m not calling anymore, and hopefully I\'m not going to be in the future\"",
    excerpt: "The Latvian has handed the reins back to FalleN on Cache, Anubis, and Ancient.",
    date: "September 17, 2026",
    source: "HLTV",
    url: "https://www.hltv.org/news/45540/yekindar-im-not-calling-anymore-and-hopefully-im-not-going-to-be-in-the-future",
    image: "https://img-cdn.hltv.org/gallerypicture/t7JbrCAoAWkiNQxqtL74cP.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=107&mx=20&my=474&q=75&w=800&s=57e759b2a8c8ea9cb7c05b2297e0b9a0",
    categories: ["highlights", "recent"]
  },
  {
    title: "Grim: \"It was a great win for us, and much needed for everyone\'s confidence\"",
    excerpt: "NRG kicked off StarSeries Fall with a bang, upsetting MOUZ in the tournament's inaugural match.",
    date: "September 17, 2026",
    source: "HLTV",
    url: "https://www.hltv.org/news/45536/grim-it-was-a-great-win-for-us-and-much-needed-for-everyones-confidence",
    image: "https://img-cdn.hltv.org/gallerypicture/Jmxyp5SK7aaAfIojFp9QSs.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=107&mx=20&my=474&q=75&w=800&s=719d7850f2fc37c21e2d9d02cd924ccb",
    categories: ["highlights", "recent", "baseball"]
  },
  {
    title: "The MongolZ bench DarkMeister, tikuak",
    excerpt: "The squad's newest recruits have been moved to the bench.",
    date: "September 17, 2026",
    source: "HLTV",
    url: "https://www.hltv.org/news/45522/the-mongolz-bench-darkmeister-tikuak",
    image: "https://img-cdn.hltv.org/gallerypicture/HOUEPItNMoYuqVlYR1KP5Y.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=107&mx=20&my=473&q=75&w=800&s=a112a5de785ec5dd3fc9af9dc7cef428",
    categories: ["recent", "soccer"]
  },
  {
    title: "M80 win Roman Imperium Cup VIII",
    excerpt: "The team got revenge on Luminosity to lift its third trophy of the year.",
    date: "September 17, 2026",
    source: "HLTV",
    url: "#",
    image: "https://img-cdn.hltv.org/gallerypicture/mLiA5iQoMHSEGccUT4K980.jpg?auto=compress&fm=avif&ixlib=java-2.1.0&m=%2Fm.png&mw=107&mx=20&my=473&q=75&w=800&s=cdc457067c270cb6d3386e7d8952598a",
    categories: ["recent"]
  }
];


const listEl = document.getElementById('articleList');
const emptyEl = document.getElementById('articleEmpty');
const searchEl = document.getElementById('articleSearch');
const tabs = document.querySelectorAll('.articles-tab');

let activeFilter = 'highlights';
let query = '';

function render() {
  const q = query.trim().toLowerCase();

  const filtered = ARTICLES.filter(a => {
    const matchesTab = a.categories.includes(activeFilter);
    const matchesQuery = !q
      || a.title.toLowerCase().includes(q)
      || a.excerpt.toLowerCase().includes(q);
    return matchesTab && matchesQuery;
  });

  listEl.innerHTML = filtered.map(a => `
    <li class="article">
      <a class="article-link" href="${a.url}" target="_blank" rel="noopener">
        <div class="article-text">
          <h3 class="article-title">${a.title}</h3>
          <p class="article-excerpt">${a.excerpt}</p>
          <p class="article-meta">${a.date} · Article at <strong>${a.source}</strong> ↗</p>
        </div>
        <img class="article-thumb" src="${a.image}" alt="" loading="lazy">
      </a>
    </li>
  `).join('');

  emptyEl.hidden = filtered.length !== 0;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    activeFilter = tab.dataset.filter;
    render();
  });
});

searchEl.addEventListener('input', (e) => {
  query = e.target.value;
  render();
});

render();


function activateTab(filter) {
  const tab = document.querySelector(`.articles-tab[data-filter="${filter}"]`);
  if (!tab) return;
  tabs.forEach(t => {
    t.classList.remove('is-active');
    t.setAttribute('aria-selected', 'false');
  });
  tab.classList.add('is-active');
  tab.setAttribute('aria-selected', 'true');
  activeFilter = filter;
  render();
}

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    activateTab(tab.dataset.filter);
    if (e.detail !== 0) {
      tab.blur(); 
    }
  });
});

searchEl.addEventListener('input', (e) => {
  query = e.target.value;
  render();
});

function initFromHash() {
  const hash = window.location.hash.replace('#', '');
  const validFilters = ['highlights', 'recent', 'baseball', 'soccer', 'hockey'];

  if (validFilters.includes(hash)) {
    activateTab(hash);
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    render();
  }
}

window.addEventListener('load', initFromHash);
window.addEventListener('hashchange', initFromHash);