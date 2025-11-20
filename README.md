# 🎭 Playwright Test Framework

This project was developed as part of the **Test Automation Warm-Up with Playwright** course at **Mindera School**.  

---

# 🚀 Project Overview

This project guides through full-stack test automation using **Playwright**, covering:

* UI automation (desktop and mobile)
* Form handling and dynamic tables
* Advanced locators
* Page Object Model (POM)
* Mobile testing
* Drag & drop & CRUD scenarios
* API testing using `APIRequestContext`

Everything is automated against a practice application and sample APIs for testing purposes.

---

# 🌐 Application Areas Covered

| Area              | Description                                      |
| ----------------- | ---------------------------------------------    |
| 🏠 Home           | Navigation & basic validation                    |
| 🔐 Login          | Login scenarios, correct & incorrect inputs      |
| 🧾 Forms          | Inputs, selects, checkboxes                      |
| 🧱 POM            | Page Object Model implementation                 |
| 📊 Dynamic Tables | Sorting, filtering, and validations              |
| 🧪 API            | API endpoints testing & response validation      |
| 🗂️ Tasks          | CRUD operations, reorder tasks, desktop & mobile |
| 🏪 Store          | E-commerce flows, checkout & validation          |

---

# 🧩 Tools & Technologies

| Tool                | Purpose                          |
| ------------------- | -------------------------------- |
| **Playwright**      | Main automation framework        |
| **Node.js**         | Runtime for JavaScript execution |
| **VS Code**         | Recommended IDE                 |
| **Git/GitHub**      | Version control                 |
| **Prettier / ESLint** | Code formatting & linting      |

---

## 🔹 Project Structure

tests/
├── data/                         # Test data
│   ├── Json/                     # JSON data
├── pages/                        # Page Objects
├── specs/                        # Test specs
│   ├── api/                      # API tests
│   ├── desktop/                  # Desktop UI tests
│   │   ├── ddt/                  # Data-driven tests
│   │   ├── pom/                  # POM-based tests
│   └── mobile/                   # Mobile UI tests
playwright.config.js              # Playwright configuration
package.json                      
README.md                         

---

# ⚙️ Running Tests

### Run some of tests

```bash
npx playwright test
```

### Run desktop-chromium

```bash
npx playwright test --project="chromium"
```

### Run desktop-firefox

```bash
npx playwright test --project="firefox"
```

### Run API tests

```bash
npx playwright test --project="Backend"
```

---

# 🧑‍💻 Contributing

1. Fork this repository  
2. Create a branch (`git checkout -b feature/my-feature`)  
3. Commit changes  
4. Open a Pull Request  

---

# 📜 License

MIT License — free to use for personal or learning purposes.

---

*Inspired by [Bruno Machadors – Playground Automation](https://github.com/brunomachadors/playgroundautomation)*

