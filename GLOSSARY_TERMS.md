# Available Glossary Terms

## Complete List of 60+ Defined Terms

### AI & Machine Learning (10 terms)
- **Machine Learning** - Systems that learn patterns and improve without explicit programming
- **Deep Learning** - Neural networks with multiple layers for image recognition
- **GenAI** - Generative AI that creates new content (text, images, code)
- **LLM** - Large Language Models like ChatGPT, Claude
- **RAG** - Retrieval-Augmented Generation to reduce hallucinations
- **Computer Vision** - AI that interprets visual information
- **NLP** - Natural Language Processing for understanding text
- **Explainability** - Ability to understand why AI made a decision
- **Bias** - When AI discriminates against groups due to biased training data
- **Automation** - Using technology to execute tasks without humans

### Statistical & Forecasting Methods (3 terms)
- **ARIMA** - Statistical forecasting using past data patterns
- **Prophet** - Open-source forecasting tool by Meta
- **Stochastic** - Involving random variables and uncertainty

### Key Metrics (6 terms)
- **Accuracy** - Percentage of correct predictions
- **Precision** - Of flagged items, how many were actually correct
- **Recall (Sensitivity)** - Of actual cases, how many were caught
- **False Positive** - Incorrectly flagging something as positive
- **False Negative** - Missing an actual positive case
- **Confusion Matrix** - Table showing TP, TN, FP, FN breakdown

### Machine Learning Concepts (5 terms)
- **Classification** - Predicting categorical outcomes
- **Regression** - Predicting continuous numerical values
- **Clustering** - Grouping similar data points
- **Overfitting** - Learning noise instead of true patterns
- **Training Data** - Data used to teach the model

### Data Management (5 terms)
- **Data Governance** - Policies for managing data quality & security
- **Data Catalog** - Inventory of all data assets
- **Data Lake** - Centralized repository of raw data
- **ETL** - Extract, Transform, Load process
- **Validation Data** - Separate dataset for tuning parameters
- **Test Data** - Independent dataset for final evaluation

### Geospatial & Location Tech (2 terms)
- **LiDAR** - Laser-based 3D mapping (expensive but accurate)
- **Photogrammetry** - 3D models from photographs (cheaper)
- **Geospatial** - AI applied to location-based data

### Process & Methodology (6 terms)
- **Pilot** - Small-scale test before full deployment
- **MVP** - Minimum Viable Product with core features
- **Deployment** - Moving trained models to production
- **Backtesting** - Testing on historical data before deployment
- **Hybrid Model** - Combining human judgment with AI
- **Voice AI** - AI systems that understand speech

### Finance & Economics (2 terms)
- **ROI** - Return on Investment percentage
- **Default Rate** - Percentage of loans with missed payments

### Data Infrastructure (1 term)
- **Point of Sale (POS)** - Transaction records from retail checkouts

### Organization (1 term)
- **CoE** - Center of Excellence for sharing expertise

### Regulation (2 terms)
- **RBI** - Reserve Bank of India (financial regulator)
- **FDA** - Food and Drug Administration (product regulator)

### Embedding & Vector (1 term)
- **Embedding** - Representing words as vectors capturing meaning

### Tokenization (1 term)
- **Tokenization** - Breaking text into units AI models can process

---

## How Terms Appear in Questions

### Example 1: Problem Framing
"We need to implement **ARIMA** and **Prophet** as baseline before considering **Machine Learning** approaches for demand forecasting."

✓ Click **ARIMA** → See how it's used for forecasting
✓ Click **Machine Learning** → Understand when it's worth the complexity

### Example 2: Data Strategy
"**Data Governance** must come before building a **Data Lake**, or you'll create a data swamp. Use a **Data Catalog** to track all assets."

✓ Click **Data Governance** → Understand governance framework
✓ Click **Data Lake** → Learn architecture pattern

### Example 3: Metrics & ROI
"You achieved 92% **Accuracy** with 89% **Precision**, but with 8% **False Positives**, you're blocking ₹5.5Cr of legitimate transactions daily."

✓ Click **Precision** → See why it matters more than accuracy
✓ Click **False Positives** → Understand the cost

### Example 4: AI Strategy
"**GenAI** and **LLMs** are powerful but can hallucinate. Use **RAG** to ground them in your documents for accuracy."

✓ Click **GenAI** → Understand capabilities
✓ Click **RAG** → Learn how to improve accuracy
✓ Click **hallucinate** → See why it happens

---

## Glossary Statistics

- **Total Terms**: 60+
- **Categories**: 13 major categories
- **Words Linked**: Automatically detected in all questions
- **Case-Insensitive**: "ARIMA", "arima", "Arima" all work
- **Whole-Word Match**: "Cluster" ≠ "Clustering" (won't match)

## Viewing the Full Glossary

In your code, you can view all terms:

```javascript
import { glossary, glossaryTerms } from './Glossary';

// All terms (60+)
console.log(glossaryTerms);

// Specific term definition
console.log(glossary['Machine Learning']);
// Output:
// {
//   term: 'Machine Learning',
//   explanation: 'A subset of AI where systems learn patterns...',
//   category: 'AI'
// }
```

---

**Last Updated**: January 30, 2026
