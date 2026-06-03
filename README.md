# 🇿🇦 Grade 6 Maths Explorer — South Africa CAPS

An interactive Grade 6 Mathematics app aligned with the South African CAPS curriculum.

## Topics Covered

| Topic | CAPS Strand | Activities |
|-------|-------------|------------|
| Numbers & Operations | Numbers, Operations & Relationships | Place value quiz, factor grid, long division |
| Fractions & Percentages | Numbers, Operations & Relationships | Fraction quiz, percentage calculator |
| Geometry | Space & Shape | Shape identification, area & perimeter |
| Measurement | Measurement | Unit conversion quiz |
| Data Handling | Data Handling | Mean/median/mode quiz, bar chart reading |

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/grade6-maths-sa.git
cd grade6-maths-sa

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

Output goes to the `build/` folder — ready to deploy to GitHub Pages, Netlify, or Vercel.

## Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
# And add: "homepage": "https://YOUR_USERNAME.github.io/grade6-maths-sa"

npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Hero banner + progress bar
│   ├── TabNav.jsx          # Topic navigation tabs
│   ├── QuizEngine.jsx      # Reusable MCQ component
│   ├── FactorGrid.jsx      # Interactive factor finder
│   ├── LongDivision.jsx    # Division practice
│   ├── Percentages.jsx     # Percentage calculator
│   ├── GeometryShapes.jsx  # SVG shape viewer + quiz
│   ├── AreaPerimeter.jsx   # Area/perimeter calculator
│   ├── DataHandling.jsx    # Stats quiz
│   └── BarChart.jsx        # Random bar chart reader
├── data/
│   └── questions.js        # All quiz questions (CAPS aligned)
├── App.jsx                 # Main app + tab routing
└── index.js                # Entry point
```

## Curriculum Alignment

All questions and topics are aligned to the **CAPS (Curriculum and Assessment Policy Statement)** for Grade 6 Mathematics in South Africa, as specified by the **Department of Basic Education (DBE)**.

## Contributing

Pull requests welcome! To add questions, edit `src/data/questions.js`.

## Licence

MIT
