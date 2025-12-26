const resources = [
  { id: 1, title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "JavaScript", year: 2018 },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson", category: "JavaScript", year: 2020 },
  { id: 3, title: "MDN Web Docs: HTML", author: "Mozilla", category: "HTML", year: 2024 },
  { id: 4, title: "CSS Secrets", author: "Lea Verou", category: "CSS", year: 2017 },
  { id: 5, title: "Frontend Handbook", author: "C. Dub", category: "Frontend", year: 2019 },
  { id: 6, title: "Node.js Essentials", author: "Sam Green", category: "Backend", year: 2021 }
]

let current = [...resources]

function renderList(data) {
  const listEl = document.getElementById("list")
  if (data.length === 0) {
    listEl.innerHTML = `<div class="empty">No resources found</div>`
    return
  }
  listEl.innerHTML = data.map(item => `
    <div class="card">
      <h3>${item.title}</h3>
      <p>Author: ${item.author}</p>
      <p>Year: ${item.year}</p>
      <span class="category">${item.category}</span>
    </div>
  `).join("")
}

function renderStats(data) {
  const statsEl = document.getElementById("stats")
  const categoryCounts = {}
  data.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
  })
  statsEl.innerHTML = "Total: " + data.length + " | " +
    Object.entries(categoryCounts).map(([cat, count]) => `${cat}: ${count}`).join(" | ")
}

function applyFilter() {
  const sel = document.getElementById("categorySelect").value
  current = sel === "all" ? [...resources] : resources.filter(r => r.category === sel)
  renderList(current)
  renderStats(current)
}

function applyFind() {
  const term = document.getElementById("searchInput").value.trim().toLowerCase()
  const found = resources.find(r => r.title.toLowerCase() === term)
  current = found ? [found] : []
  renderList(current)
  renderStats(current)
}

function logWithForEach() {
  console.clear()
  resources.forEach((r, i) => {
    console.log(`#${i + 1}`, r)
  })
  alert("Check console for logs!")
}

function resetAll() {
  current = [...resources]
  document.getElementById("categorySelect").value = "all"
  document.getElementById("searchInput").value = ""
  renderList(current)
  renderStats(current)
}

document.getElementById("filterBtn").addEventListener("click", applyFilter)
document.getElementById("findBtn").addEventListener("click", applyFind)
document.getElementById("logBtn").addEventListener("click", logWithForEach)
document.getElementById("resetBtn").addEventListener("click", resetAll)

renderList(current)
renderStats(current)
