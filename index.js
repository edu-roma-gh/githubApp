const list = document.getElementById('list');
const searchInput = document.getElementById('searchInput');


searchInput.addEventListener('keyup', handleChange)

function searchOld(keyword) {
  const data = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt",
    "Ut labore et dolore magna aliqua",
    "Duis aute irure dolor in reprehenderit",
    "Voluptate velit esse cillum dolore",
    "Excepteur sint occaecat cupidatat non proident",
    "Sunt in culpa qui officia deserunt mollit anim id est laborum",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate",
    "Velit esse quam nihil molestiae consequatur",
    "Tempor incididunt ut labore et dolore magna aliqua",
    "Enim ad minim veniam quis nostrud exercitation ullamco",
    "Laboris nisi ut aliquip ex ea commodo consequat",
    "Duis aute irure dolor in reprehenderit in voluptate",
    "Velit esse cillum dolore eu fugiat nulla pariatur",
    "Excepteur sint occaecat cupidatat non proident sunt",
    "Sed quia non numquam eius modi tempora incidunt",
    "Ut enim ad minima veniam quis nostrum exercitationem",
    "Dolorem ipsum quia dolor sit amet consectetur",
    "Adipisci velit sed quia non numquam eius modi",
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = data.filter(function(text){
        if (text.includes(keyword)) {
          return true
        }
        return false
      })
      resolve(result);
    }, 150)
  })
  
}

async function search(keyword) {
  return fetch(
    `https://api.github.com/search/users?q=${keyword}`, 
    {
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": "Bearer YOUR_TOKEN",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    }
  )
  .then(res => res.json())
}

async function handleChange(e) {
  if (e.target.value.length <= 2) return
  const data = await search(e.target.value)

  const oldResult = list.querySelectorAll('li');
  oldResult.forEach(e => e.remove());
  if (data.items.length === 0) {
    const notFound = document.createElement('li');
    notFound.innerText = "Items with matching text not found!!!";
    notFound.classList.add('notFound');
    list.appendChild(notFound);
  }
  data.items.forEach(function(value){
    const li = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.target = "__blank";
    a.href = `https://github.com/${value.login}`
    a.innerText = "check profile"
    img.src = value.avatar_url;
    p.innerText = value.login;
    li.appendChild(img);
    li.appendChild(p);
    li.appendChild(a)
    list.appendChild(li);
  })
}



new Promise((resolve, reject) => {
  resolve('hello')
}).then(res => {
  setTimeout(() => {
    console.log(res)
  }, 0)
})

setTimeout(() => {
  console.log(3)
}, 0)

