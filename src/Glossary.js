// ============================================
// AI & TECHNICAL GLOSSARY
// Definitions for complex terms used in questions
// ============================================

export const glossary = {
  'BIM': {
    term: 'BIM (Building Information Modeling)',
    explanation: 'Digital representation of a building\'s physical and functional characteristics. Integrates data from architecture, engineering, and construction. Used with AI for project management, cost optimization, and predictive maintenance in real estate and infrastructure.',
    category: 'Technology'
  },
  'ARIMA': {
    term: 'ARIMA',
    explanation: 'AutoRegressive Integrated Moving Average - a statistical method for time series forecasting that uses past data patterns to predict future values. Simpler and often more effective than ML for demand forecasting.',
    category: 'Statistics'
  },
  'Prophet': {
    term: 'Prophet',
    explanation: 'An open-source forecasting tool developed by Facebook (Meta). Uses time series decomposition to handle seasonal patterns and holidays. Doesn\'t require extensive data preprocessing.',
    category: 'Tools'
  },
  'Machine Learning': {
    term: 'Machine Learning',
    explanation: 'A subset of AI where systems learn patterns from data and improve performance without explicit programming. Requires clean, large datasets and more computational resources than statistical methods.',
    category: 'AI'
  },
  'Deep Learning': {
    term: 'Deep Learning',
    explanation: 'A subset of ML using neural networks with multiple layers. Excels at image recognition and complex pattern detection but requires massive datasets and is harder to interpret.',
    category: 'AI'
  },
  'POS (Point of Sale)': {
    term: 'POS Data',
    explanation: 'Transaction records from retail checkouts containing product, quantity, price, and timestamp. High-quality POS data is essential for accurate demand forecasting.',
    category: 'Data'
  },
  'Default Rate': {
    term: 'Default Rate',
    explanation: 'Percentage of loans where borrowers fail to make payments (90+ days overdue). A key credit risk metric that directly impacts profitability of lending businesses.',
    category: 'Finance'
  },
  'Accuracy': {
    term: 'Accuracy',
    explanation: 'Percentage of correct predictions out of total predictions. Example: 92% accuracy means 8% of predictions are wrong. Does NOT account for type of error (false positive vs false negative).',
    category: 'Metrics'
  },
  'Precision': {
    term: 'Precision',
    explanation: 'Of all items the model flagged as "positive", how many were actually correct. Example: 89% precision in fraud detection = 11% of flagged transactions are false alarms (legitimate transactions blocked).',
    category: 'Metrics'
  },
  'Recall': {
    term: 'Recall (Sensitivity)',
    explanation: 'Of all actual positive cases, how many did the model catch? Example: 85% recall in defect detection = 15% of real defects escape undetected. Also called Sensitivity.',
    category: 'Metrics'
  },
  'False Positive': {
    term: 'False Positive',
    explanation: 'When the model incorrectly flags something as positive. Examples: blocking a legitimate credit card transaction, rejecting a good product on inspection line, denying a qualified loan applicant.',
    category: 'Metrics'
  },
  'False Negative': {
    term: 'False Negative',
    explanation: 'When the model misses a positive case. Examples: allowing fraudulent transaction, shipping defective product to customer, approving a loan that will default.',
    category: 'Metrics'
  },
  'Confusion Matrix': {
    term: 'Confusion Matrix',
    explanation: 'A table showing True Positives, True Negatives, False Positives, and False Negatives. Reveals the cost distribution of different error types in real business terms.',
    category: 'Tools'
  },
  'ROI (Return on Investment)': {
    term: 'ROI',
    explanation: 'Percentage return on money invested. Formula: (Gain - Cost) / Cost × 100. Example: ₹2.5 Crore investment saving ₹3.78 Crore = 51% ROI in year 1.',
    category: 'Finance'
  },
  'LiDAR': {
    term: 'LiDAR',
    explanation: 'Light Detection and Ranging - uses laser pulses to measure distances and create 3D maps. High accuracy but expensive. Used for inventory scanning, autonomous vehicles, and terrain mapping.',
    category: 'Technology'
  },
  'Photogrammetry': {
    term: 'Photogrammetry',
    explanation: 'Creating 3D models from multiple photographs. Cheaper than LiDAR but sensitive to lighting, weather, and requires careful image collection. Good for initial assessments.',
    category: 'Technology'
  },
  'Geospatial': {
    term: 'Geospatial AI',
    explanation: 'AI applied to location-based data and satellite imagery. Used for supply chain tracking, urban planning, agriculture monitoring, and real estate analysis.',
    category: 'AI'
  },
  'Data Governance': {
    term: 'Data Governance',
    explanation: 'Policies, processes, and controls for managing data quality, security, and usage. Includes data cataloging, lineage tracking, and compliance with regulations.',
    category: 'Process'
  },
  'Data Catalog': {
    term: 'Data Catalog',
    explanation: 'An inventory of all data assets in an organization. Shows what data exists, where it\'s stored, who owns it, and how it\'s used. Critical before building data lakes.',
    category: 'Tools'
  },
  'Data Lake': {
    term: 'Data Lake',
    explanation: 'A centralized repository storing raw data in various formats (structured and unstructured). Without governance and cataloging, data lakes become "data swamps".',
    category: 'Architecture'
  },
  'ETL': {
    term: 'ETL',
    explanation: 'Extract, Transform, Load. Process of pulling data from sources, cleaning/transforming it, and loading into target systems. Critical for data quality.',
    category: 'Process'
  },
  'GenAI': {
    term: 'Generative AI',
    explanation: 'AI models that generate new content (text, images, code) based on patterns learned from training data. Examples: ChatGPT, DALL-E, GitHub Copilot. Can hallucinate (generate false information).',
    category: 'AI'
  },
  'LLM': {
    term: 'LLM (Large Language Model)',
    explanation: 'Neural networks with billions of parameters trained on massive text datasets. Powers ChatGPT, Claude, etc. Excellent at language tasks but can make mistakes and lacks real-time knowledge.',
    category: 'AI'
  },
  'RAG': {
    term: 'RAG',
    explanation: 'Retrieval-Augmented Generation - augments LLMs by retrieving relevant documents before answering. More accurate than generic LLMs for domain-specific tasks. Reduces hallucinations.',
    category: 'AI'
  },
  'Voice AI': {
    term: 'Voice AI',
    explanation: 'AI systems that understand and generate human speech. Used for customer service automation, medical transcription, and accessibility. Challenges: accents, background noise, multiple languages.',
    category: 'AI'
  },
  'NLP': {
    term: 'NLP (Natural Language Processing)',
    explanation: 'Technology enabling computers to understand and process human language. Powers chatbots, sentiment analysis, and contract review tools.',
    category: 'AI'
  },
  'Computer Vision': {
    term: 'Computer Vision',
    explanation: 'AI technology that enables machines to interpret visual information from images and videos. Used in quality inspection, autonomous vehicles, and medical imaging.',
    category: 'AI'
  },

  'Bias': {
    term: 'AI Bias',
    explanation: 'When AI models systematically discriminate against certain groups due to biased training data or flawed design. Example: hiring tool that penalizes "women\'s college" in resumes.',
    category: 'Ethics'
  },

  'Hybrid Model': {
    term: 'Hybrid AI Model',
    explanation: 'Combining human judgment with AI automation. Example: AI flags suspicious transactions → humans review → humans decide. Balances efficiency with accuracy and accountability.',
    category: 'Architecture'
  },

  'MVP': {
    term: 'MVP (Minimum Viable Product)',
    explanation: 'Smallest version of a product with core features to solve the primary problem. Focus on learning fast before building the complete solution.',
    category: 'Process'
  },
  'CoE': {
    term: 'CoE (Center of Excellence)',
    explanation: 'Centralized team sharing expertise, tools, and best practices across the organization. Helps prevent silos and accelerates AI adoption across business units.',
    category: 'Organization'
  },

  'FDA': {
    term: 'FDA (Food and Drug Administration)',
    explanation: 'US regulatory agency overseeing pharmaceuticals, medical devices, and food products. Requires evidence of safety and efficacy before approval.',
    category: 'Regulation'
  },
  'CDSCO': {
    term: 'CDSCO (Central Drugs Standard Control Organisation)',
    explanation: 'India\'s national regulatory authority for pharmaceuticals and medical devices. Issues approvals for drug manufacturing, clinical trials, and medical device marketing. Critical for healthcare AI and diagnostic tool deployment in India.',
    category: 'Regulation'
  },
  'Stochastic': {
    term: 'Stochastic',
    explanation: 'Involving random variables or processes. In forecasting, accounts for uncertainty and variability in predictions rather than assuming deterministic outcomes.',
    category: 'Statistics'
  },
  'Deployment': {
    term: 'Deployment',
    explanation: 'Moving a trained AI model from development into production for real-world use. Requires monitoring, maintenance, and retraining as data patterns change.',
    category: 'Process'
  },
  'Overfitting': {
    term: 'Overfitting',
    explanation: 'When an ML model learns noise in training data rather than true patterns. Works great on training data but fails on new data. Prevented by using test sets and validation.',
    category: 'ML'
  },
  'Backtesting': {
    term: 'Backtesting',
    explanation: 'Testing a model\'s performance on historical data before deployment. Example: testing a trading strategy or investment model on past 10 years of data to validate effectiveness.',
    category: 'Validation'
  },
  'Tokenization': {
    term: 'Tokenization',
    explanation: 'Breaking text into smaller units (words, subwords, characters) that AI models can process. Critical first step in NLP and language models.',
    category: 'NLP'
  },
  'Embedding': {
    term: 'Embedding',
    explanation: 'Representing words or concepts as vectors of numbers that capture meaning. Words with similar meanings have similar embeddings, enabling semantic search.',
    category: 'AI'
  },
  'Clustering': {
    term: 'Clustering',
    explanation: 'Unsupervised learning technique that groups similar data points together. Example: customer segmentation, identifying fraud rings, grouping similar defects.',
    category: 'ML'
  },
  'Classification': {
    term: 'Classification',
    explanation: 'Supervised learning that predicts categorical outcomes. Examples: spam/not spam, approved/rejected loan, defective/good product.',
    category: 'ML'
  },
  'Regression': {
    term: 'Regression',
    explanation: 'Supervised learning that predicts continuous numerical values. Examples: house price prediction, demand forecasting, customer lifetime value.',
    category: 'ML'
  },
  'Training Data': {
    term: 'Training Data',
    explanation: 'Data used to teach an AI model by showing it examples and their correct answers. Quality and quantity of training data directly impacts model performance.',
    category: 'Data'
  },
  'Validation Data': {
    term: 'Validation Data',
    explanation: 'Separate dataset used during development to tune model hyperparameters. Different from test data to avoid overfitting.',
    category: 'Data'
  },
  'Test Data': {
    term: 'Test Data',
    explanation: 'Completely independent dataset never seen during training, used to evaluate final model performance. Represents real-world accuracy.',
    category: 'Data'
  }
};

// Sorted alphabetically for reference
export const glossaryTerms = Object.keys(glossary).sort();

// Helper function to detect and parse terms in text
export const findTermsInText = (text) => {
  const termsFound = [];
  glossaryTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b|\\b${term.replace(/\\s+/g, '\\s+')}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      termsFound.push({
        term: term,
        index: match.index,
        length: match[0].length,
        key: term.toLowerCase().replace(/\\s+/g, '-')
      });
    }
  });
  // Sort by position in text and remove duplicates
  return termsFound.sort((a, b) => a.index - b.index);
};
