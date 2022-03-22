# HCG P-Seminar Oper 2021-23 🎭
## API Backend
![](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![](https://badgen.net/github/last-commit/CarossaOper/hcgoper)
![](https://badgen.net/github/release/CarossaOper/hcgoper)
---

## Installation
Clone the repo and download the latest packages
```
git clone https://github.com/CarossaOper/oper-backend
cd oper-backend
```

## 💻 Without Docker
### 📓 Development

### Backend API-Routes (`server/api/api.js`)

#### Retrieve all blog entries from the server (as an RSS Feed)

```GET /api/blog```

#### Retrieve a certain blog post
```GET /api/post/:postid```

#### Add a new email to the newsletter

```POST /api/newsletter```

#### Remove email from newsletter

```DELETE /api/newsletter```

### ✔️ TODO

- [x] Base structure and page system
- [x] Backend server and database
- [x] Dynamically load blogs (frontend with axios https requests)
- [x] Newsletter insert/delete new email
- [ ] Newsletter SMTP Mailer
- [x] Scrolling to element support on main page
- [x] Back to top button on long pages (bottom right corner)
- [ ] *OPTIONAL* Blog management system (admin page or client control panel)
