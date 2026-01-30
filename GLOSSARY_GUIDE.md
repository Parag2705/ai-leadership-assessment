# Glossary Feature - Quick Guide

## What Was Added

A **contextual glossary system** that helps users understand technical and AI-related keywords by clicking on them in question scenarios.

## How It Works

### 1. **New Files Created**
- **`src/Glossary.js`** - Contains 60+ AI and technical term definitions organized by category

### 2. **Features**

#### For Users:
- **Linked Keywords**: Technical terms in questions appear as **cyan underlined links**
- **Click to Learn**: Clicking any linked term opens a modal with the definition
- **Instant Definitions**: Clear, contextual explanations without leaving the quiz
- **Categorized**: Each term shows its category (AI, Statistics, Finance, Tools, etc.)

#### Categories Covered:
- **AI Terms**: Machine Learning, Deep Learning, GenAI, LLM, RAG, Computer Vision, NLP
- **Statistics**: ARIMA, Prophet, Stochastic, Clustering, Classification, Regression
- **Metrics**: Accuracy, Precision, Recall, False Positive, False Negative, Confusion Matrix
- **Finance**: ROI, Default Rate
- **Technology**: LiDAR, Photogrammetry, Voice AI
- **Data**: Data Lake, Data Catalog, Data Governance, ETL, Training Data
- **Process**: Pilot, MVP, Deployment, Backtesting, Automation
- **Regulation**: RBI, FDA
- **And more...**

### 3. **Technical Implementation**

#### Components Added:

**GlossaryTermRenderer** - Scans text for glossary terms and renders them as clickable links
```javascript
<GlossaryTermRenderer 
  text={scenarioText} 
  onTermClick={setSelectedTerm}
/>
```

**GlossaryModal** - Beautiful modal showing term definition when clicked
- Term name
- Category badge
- Clear explanation
- "Got it" button to close

### 4. **Integrated Locations**

The glossary is active in:
- ✅ **Quiz Screen** - Main question scenarios
- ✅ **Review Screen** - When reviewing answers
- ✅ All question text automatically scanned for terms

### 5. **Example Terms in Glossary**

Here are some of the 60+ terms defined:

| Term | Category | Sample Definition |
|------|----------|-------------------|
| ARIMA | Statistics | AutoRegressive Integrated Moving Average - forecasting method using past patterns |
| Precision | Metrics | Of all items flagged positive, how many were actually correct (FP cost in fraud) |
| False Positive | Metrics | Model incorrectly flags something as positive (e.g., blocking legit transaction) |
| GenAI | AI | AI that generates new content. Can hallucinate (generate false info) |
| RAG | AI | Retrieval-Augmented Generation - augments LLMs with relevant docs for accuracy |
| Data Governance | Process | Policies for managing data quality, security, usage - critical before data lakes |
| Pilot | Process | Small-scale test before full deployment - reduces risk of large-scale failures |

## How Users Experience It

### Step 1: Reading a Question
User sees scenario with **highlighted cyan terms** like:
- "We need **ARIMA** and **Prophet** for forecasting"
- "Check **precision** and **recall** metrics"

### Step 2: Click a Term
Clicking any highlighted term opens a modal with:
- Term definition
- Category label
- Contextual explanation

### Step 3: Continue Quiz
User clicks "Got it" and continues with the assessment

## Adding New Terms

To add more terms to the glossary, edit `src/Glossary.js`:

```javascript
export const glossary = {
  'YourTerm': {
    term: 'YourTerm',
    explanation: 'Clear, business-context explanation of the term...',
    category: 'YourCategory'
  },
  // ... more terms
};
```

The system automatically detects and links them in all question text.

## Customization Options

### Change Link Color
In `GlossaryTermRenderer`, modify the className:
```javascript
className="text-cyan-400 hover:text-cyan-300 underline decoration-dashed"
```

### Change Modal Style
In `GlossaryModal`, modify the Tailwind classes for different colors/sizes

### Disable for Specific Terms
Modify `glossaryTerms` array in `Glossary.js` to exclude terms if needed

## Benefits

✅ **Better Understanding**: Users learn technical terms in context  
✅ **Reduced Friction**: Quick definitions without leaving the assessment  
✅ **Improved Learning**: Clear explanations with business relevance  
✅ **Professional**: Looks polished with modal UI and categorization  
✅ **Scalable**: Easy to add 100+ terms as needed  

---

**Created**: January 30, 2026
**Status**: Fully integrated and working
