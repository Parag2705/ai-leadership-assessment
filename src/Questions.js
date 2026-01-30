// ============================================
// VERBOSE QUESTION BANK - 25 DETAILED SCENARIOS
// Save this as: src/questions.js
// Import in App.js: import { questionBank } from './questions';
// ============================================

export const questionBank = [
  // ========== PROBLEM FRAMING (3) ==========
  {
    id: 'PF1',
    domainCode: 'PF',
    scenario: `You are the Chief Digital Officer of a retail chain with 200 stores across North and West India. During a board meeting, the CEO shares competitive intelligence: "BigBasket and Reliance Retail are using AI for demand forecasting. We're falling behind."

The Supply Chain VP immediately requests budget approval for a ₹50 Lakh AI-powered demand forecasting tool from a leading vendor who promises "30% reduction in stockouts."

Your team's assessment reveals:

CURRENT STATE:
• Store managers place orders based on intuition and last year's sales
• Inventory data is updated with a 2-day lag from stores to central ERP
• You have 18 months of reasonably clean POS (Point of Sale) data
• Current stockout rate: 12% | Overstock wastage: 8%

The vendor's AI solution requires real-time data feeds and costs ₹50 Lakh upfront plus ₹12 Lakh annual maintenance.

As CDO, what should be your recommended first move?`,
    options: [
      { id: 'A', text: "Approve the AI tool immediately – we cannot afford to fall behind competitors, and the vendor has proven case studies", points: 0 },
      { id: 'B', text: "Implement statistical forecasting (ARIMA/Prophet) as a baseline first, measure improvement, then evaluate whether ML adds incremental value", points: 10 },
      { id: 'C', text: "Reject the vendor and build an in-house ML team – we need proprietary capabilities for long-term advantage", points: 0 },
      { id: 'D', text: "Fix the 2-day data delay problem first before any forecasting investment – garbage in, garbage out", points: 5 }
    ],
    insight: {
      company: "Walmart",
      story: "In their forecasting journey, Walmart discovered that simple statistical models (ARIMA, exponential smoothing) captured 80% of the achievable accuracy improvement. Their analysis showed ARIMA actually outperformed complex ML models in 60% of SKU categories. The lesson: always establish what 'good enough' looks like with proven methods before investing in complexity.",
      keyTakeaway: "Always establish a statistical baseline before ML investment – you might find 80% of the value at 20% of the cost"
    }
  },
  {
    id: 'PF2',
    domainCode: 'PF',
    scenario: `You're the Chief Risk Officer at a mid-sized NBFC with a ₹4,000 Crore loan book. The Credit Head proposes an AI underwriting solution.

CURRENT PERFORMANCE:
• Rule-based credit scoring system (8 years old)
• Approval rate: 72% of applications
• Default rate (90+ DPD): 4.2%
• Average ticket size: ₹50,000
• Annual applications: 5,00,000
• Current annual loss from defaults: ₹12.6 Crore

THE VENDOR'S PITCH:
"Our AI model, trained on 50 million loan records across India, can reduce your default rate by 30% while maintaining regulatory compliance. We guarantee explainable decisions for RBI audit requirements."

Cost: ₹2.5 Crore implementation + ₹60 Lakh/year

The Credit Head's calculation: "30% reduction in defaults = ₹3.78 Crore saved annually. Clear ROI!"

What's the critical question you should ask before evaluating this opportunity?`,
    options: [
      { id: 'A', text: "The ROI math is compelling – 30% default reduction saves ₹3.78 Crore against ₹3.1 Crore cost. Recommend proceeding with pilot.", points: 3 },
      { id: 'B', text: "Ask: At 30% lower defaults, what happens to the approval rate? If it drops from 72% to 50%, we lose far more in foregone good loans than we save in prevented bad loans.", points: 10 },
      { id: 'C', text: "The regulatory and explainability risks are too high – stick with the rule-based system until RBI provides clearer AI guidelines", points: 0 },
      { id: 'D', text: "Run a 6-month pilot on personal loans segment before committing to full rollout", points: 5 }
    ],
    insight: {
      company: "A large NBFC (name withheld)",
      story: "Deployed an AI underwriting system achieving the promised 35% default reduction. The catch? Approval rate dropped from 72% to 48%. On 5 lakh applications at ₹50K average, the 24% reduction in approvals meant ₹600 Crore less disbursement. At 15% interest margin, that's ₹90 Crore in lost revenue – versus ₹4 Crore saved in defaults.",
      keyTakeaway: "AI metrics must include BOTH precision (defaults avoided) AND recall (good customers approved) – expressed in business rupees, not percentages"
    }
  },
  {
    id: 'PF3',
    domainCode: 'PF',
    scenario: `You're the Plant Head of a consumer electronics facility producing 10,000 units daily. The Quality Head proposes "AI-powered visual inspection."

CURRENT STATE:
• 15% of units have defects at various stages
• Human inspectors catch 88% of defects (12% escape to customers)
• Escaped defects cost ₹25,000 each in warranty claims, returns, brand damage
• Daily defects: 1,500 units | Escaped daily: 180 units
• Annual cost of escaped defects: ₹16.4 Crore

VENDOR PROPOSAL:
• AI visual inspection system: ₹1.2 Crore + ₹20 Lakh/year
• Claimed accuracy: 99% defect detection
• "Our deep learning model is trained on 10 million defect images"

The Quality Head's calculation: "99% vs 88% = 11% improvement. We'll catch 165 more defects daily, saving ₹15 Crore annually!"

What's the right way to analyze this proposal?`,
    options: [
      { id: 'A', text: "The math checks out – 99% detection vs 88% is clearly superior. At ₹15 Crore annual savings vs ₹1.4 Crore cost, approve the investment.", points: 3 },
      { id: 'B', text: "Ask the critical question: What is the FALSE POSITIVE rate? If AI incorrectly rejects good units, the cost of scrapping or reworking perfectly fine products could exceed the savings.", points: 10 },
      { id: 'C', text: "99% accuracy on the vendor's test dataset doesn't mean 99% on our production line. Demand a paid pilot on our actual units first.", points: 7 },
      { id: 'D', text: "Implement a Human + AI hybrid model: AI flags potential defects, human inspectors make final call.", points: 5 }
    ],
    insight: {
      company: "Bosch India",
      story: "Implemented AI visual inspection with 99.2% defect detection. However, the system had an 8% false positive rate, flagging good units as defective. On 8,500 good units daily, 680 were incorrectly rejected. At ₹3,000 rework cost per unit, that's ₹2.04 Crore monthly in unnecessary rework. After 6 months of tuning, they achieved 97% detection with only 1.5% false positives – a better economic outcome.",
      keyTakeaway: "In quality control, false positive cost (rejecting good products) often exceeds false negative cost (missing defects) – optimize for total economic impact"
    }
  },

  // ========== DATA STRATEGY (3) ==========
  {
    id: 'DS1',
    domainCode: 'DS',
    scenario: `The CEO has given you a mandate: "I want AI-powered demand forecasting live in 6 months."

Your data audit reveals sobering findings:

PRODUCT MASTER DATA:
• 15,000 SKUs across 3 business units
• 25% of products have duplicate entries with different codes
• 3 different naming conventions used historically

SALES DATA:
• 4 regional ERPs (North, South, East, West) with incompatible schemas
• North uses SAP, South uses Oracle, East/West use legacy systems
• 15% of transactions have missing store codes

PROMOTIONS DATA:
• Marketing maintains promotions in Excel spreadsheets
• Some promotions recorded in emails, never digitized

CURRENT FORECASTING:
• Done in Excel by category managers
• Accuracy: 65% (measured as MAPE)

The CEO is firm on the 6-month timeline. What's your recommendation?`,
    options: [
      { id: 'A', text: "Proceed with AI implementation – modern ML algorithms are designed to handle messy, inconsistent data", points: 0 },
      { id: 'B', text: "Propose a phased approach: 3 months to build data foundation (clean product master, unify schemas), then 3 months for AI pilot on one region", points: 10 },
      { id: 'C', text: "Hire a premium AI vendor who can guarantee 85% accuracy regardless of data quality", points: 0 },
      { id: 'D', text: "Push back on the timeline – request 18 months for proper data transformation", points: 5 }
    ],
    insight: {
      company: "A ₹5,000 Crore FMCG company",
      story: "Invested ₹10 Crore in AI-powered demand forecasting with a top-tier vendor. After 18 months, the AI achieved 62% accuracy – actually WORSE than their Excel-based forecasting. Root cause: the AI learned the noise in their data perfectly. Duplicate products created phantom demand signals, inconsistent regional data led to conflicting patterns.",
      keyTakeaway: "Data quality determines AI ceiling – no algorithm can fix garbage data. A simple model on clean data will always beat a sophisticated model on messy data."
    }
  },
  {
    id: 'DS2',
    domainCode: 'DS',
    scenario: `As Chief Data Officer of a large retail bank, you're building a "Customer 360" platform.

DATA SOURCES AVAILABLE:
• CRM System: 2 million customers, 80% have email on file
• Core Banking: 50 million transactions/month, uses Customer ID
• Website Analytics: 10 million sessions/month, only 30% logged-in
• Mobile App: 500,000 active users, phone number is identifier
• Call Center: 200,000 calls/month, notes in free text

THE CHALLENGE:
Same customer might be:
• "Rajesh Kumar" in CRM (email: rajesh.k@gmail.com)
• Customer ID 4847291 in core banking
• Phone 9876543210 in mobile app
• An anonymous session on website

You need to unify these identities. What's your strategy?`,
    options: [
      { id: 'A', text: "Use email as the universal key – it has the highest coverage and is unique per person", points: 0 },
      { id: 'B', text: "Implement probabilistic identity resolution using ML – match on fuzzy combinations of name + phone + address with confidence scores", points: 10 },
      { id: 'C', text: "Stick to deterministic matching only (exact matches) – probabilistic matching risks linking wrong customers in banking", points: 5 },
      { id: 'D', text: "Force customers to log in everywhere – clean future data collection is better than messy historical matching", points: 3 }
    ],
    insight: {
      company: "Flipkart",
      story: "Built a probabilistic identity graph combining 15+ signals: name variants, phone numbers, email patterns, delivery addresses, device fingerprints. Their ML model assigns confidence scores (0-100%) to each identity linkage. Result: 92% customer match accuracy vs 60% with email-only matching.",
      keyTakeaway: "Identity resolution is a spectrum of confidence, not binary match/no-match. Design systems to work with uncertainty, using different thresholds for different use cases."
    }
  },
  {
    id: 'DS3',
    domainCode: 'DS',
    scenario: `You've joined as Chief Data Officer of a ₹30,000 Crore conglomerate with 6 business units.

CURRENT STATE:
• Data Volume: 500 GB generated daily across 20+ source systems
• No enterprise data catalog – people don't know what data exists
• 5 different BI tools across departments
• Data scientists spend 70% time finding/cleaning data
• Recent compliance audit found PII in analytics tables – DPDP Act violation
• Each BU has different definition of "active customer"

BUDGET: ₹15 Crore for "data transformation"

The CTO wants a central Data Lake. Business Heads want better dashboards. A competitor just announced their "AI-first" strategy.

What should be your priority investment?`,
    options: [
      { id: 'A', text: "Build a centralized Data Lake – consolidate everything first, then worry about governance", points: 3 },
      { id: 'B', text: "Invest in Data Catalog + Governance first – know what data exists, who owns it, what's sensitive before centralizing", points: 10 },
      { id: 'C', text: "Standardize on one BI tool across all BUs – fragmented visualization is the visible problem", points: 0 },
      { id: 'D', text: "Hire 10 more data engineers to build pipelines faster", points: 0 }
    ],
    insight: {
      company: "Uber",
      story: "Built their internal data catalog (Databook) BEFORE scaling their data lake. The catalog discovery phase revealed that 40% of their datasets were duplicates. By identifying and consolidating these before migration, they saved $10 million annually in storage and compute costs.",
      keyTakeaway: "Catalog before you lake – know what data exists, who owns it, and what it means before you centralize. A well-governed small dataset beats an ungoverned data swamp."
    }
  },

  // ========== GEOSPATIAL AI (5) ==========
  {
    id: 'GEO1',
    domainCode: 'GEO',
    scenario: `You're the Chief Digital Officer of a major airport operator managing a terminal with 45 million annual passengers. Post-COVID, passenger complaints about navigation have tripled.

CURRENT SITUATION:
• Terminal size: 800,000 sq ft across 3 levels
• Complex layout: 150+ retail outlets, 80 F&B options, 4 security checkpoints
• 40% of complaints are about "couldn't find gate/lounge/shop"
• Retail revenue per passenger: ₹850 (30% below benchmark)

ASSETS AVAILABLE:
• Detailed BIM (Building Information Model) with 3D geometry
• No indoor positioning infrastructure currently
• Strong WiFi coverage throughout terminal

VENDOR PROPOSAL:
₹3 Crore "AI Indoor Navigation" solution:
• Deploy 500 Bluetooth beacons for positioning
• Integrate with BIM for 3D wayfinding
• Voice AI assistant for hands-free navigation
• Analytics dashboard for passenger flow patterns

Implementation: 8 months | Annual maintenance: ₹40 Lakh

What's your recommended approach?`,
    options: [
      { id: 'A', text: "Accept the full vendor solution – indoor navigation is specialized expertise we don't have", points: 5 },
      { id: 'B', text: "Use Google Maps Indoor – it's free and passengers know the interface", points: 0 },
      { id: 'C', text: "Pilot in one terminal section first: Deploy beacons in Departure Level only, measure positioning accuracy and adoption before full rollout", points: 10 },
      { id: 'D', text: "Build in-house – we have BIM data and IT team", points: 0 }
    ],
    insight: {
      company: "Singapore Changi Airport",
      story: "Piloted indoor navigation in Terminal 4 before expanding. Key discoveries: (1) Beacon density needed was 3x vendor estimates due to metal structure interference, (2) BIM data required 6 weeks of cleanup – doors were in wrong places, (3) 40% of value came from passenger flow analytics for retail optimization, not navigation itself.",
      keyTakeaway: "Geospatial AI in physical environments needs pilot-first validation – beacon signals, BIM accuracy, and user behavior vary dramatically from vendor test labs"
    }
  },
  {
    id: 'GEO2',
    domainCode: 'GEO',
    scenario: `You're the Head of Digital Transformation at a 2,000 MW thermal power plant. Coal yard management has become a major headache.

CURRENT SITUATION:
• Coal stockpile: 500,000 MT spread across 15 acres (worth ₹800 Crore)
• 4 different coal grades from different mines, must be segregated
• Manual inventory by surveyors: Takes 5 days, done monthly
• Inventory variance: 15-20% between book stock and physical
• Grade mixing causing 2-3% boiler efficiency loss (₹15-20 Crore annual)
• Quarterly disputes with coal suppliers over quantities

VENDOR PROPOSAL:
"LiDAR-based Digital Twin" at ₹1.2 Crore:
• Drone-mounted LiDAR scanning twice weekly
• AI-based volume calculation with 99% claimed accuracy
• Grade boundary detection using multispectral imaging

The vendor shows impressive demos from Australian mining operations.

How do you evaluate this proposal?`,
    options: [
      { id: 'A', text: "The business case is clear – 15-20% variance on ₹800 Crore justifies any reasonable investment. Approve.", points: 3 },
      { id: 'B', text: "Pilot on one stockpile zone first: Deploy LiDAR on a 3-acre section, validate accuracy against physical survey for Indian coal types", points: 10 },
      { id: 'C', text: "Consider drone photogrammetry instead of LiDAR – 50% cheaper", points: 5 },
      { id: 'D', text: "Defer until ERP upgrade to integrate digital twin data", points: 0 }
    ],
    insight: {
      company: "NTPC vs Tata Power",
      story: "NTPC deployed LiDAR across 5 plants simultaneously. At one plant, the system was 12% off – Indonesian coal's surface crusting fooled volume calculations. Tata Power piloted first, spent 8 weeks calibrating for different coal types, achieved 98.5% accuracy. NTPC required 6 months of recalibration.",
      keyTakeaway: "Physical environment calibration is critical for geospatial accuracy – coal types, moisture, settling patterns vary dramatically. Vendor accuracy from Australian mines doesn't transfer to Indian conditions."
    }
  },
  {
    id: 'GEO3',
    domainCode: 'GEO',
    scenario: `You're the Chief Strategy Officer of a real estate developer with 50 projects across 10 cities.

THE INCIDENT:
"We evaluated a 5-acre plot in Pune's Hinjewadi last year. Our land team said location wasn't premium. We passed. A competitor bought it and the value tripled in 18 months after metro announcement and IT parks."

CURRENT PROCESS:
• Land team visits sites, talks to local brokers
• Basic checklist: FSI, zoning, approach road
• Decisions based on broker relationships and intuition
• Success rate: 60% of projects meet IRR targets

PROPTECH STARTUP PITCH:
₹50 Lakh annual subscription for "AI Site Intelligence":
• Satellite imagery for development pattern analysis
• Mobile location data for foot traffic and commuter patterns
• Predictive models for infrastructure announcements
• "40% improvement in site selection accuracy"

How should you evaluate this?`,
    options: [
      { id: 'A', text: "₹50 Lakh is negligible compared to missed opportunity cost. Subscribe immediately.", points: 5 },
      { id: 'B', text: "Backtest first: Give them 10 past sites (5 successes, 5 failures) without outcomes. Can their AI predict which succeeded?", points: 10 },
      { id: 'C', text: "Build internal capability – hire 2 data scientists, develop proprietary models", points: 0 },
      { id: 'D', text: "Reject – real estate is relationship-driven. No algorithm replaces broker intelligence.", points: 0 }
    ],
    insight: {
      company: "Piramal Realty",
      story: "Evaluated two proptech vendors. Ran a blind backtest: shared 10 historical land parcels and asked each to predict appreciation. Vendor A correctly ranked 8/10. Vendor B got only 5/10 (no better than random). The 2-week validation saved ₹50 Lakh annually.",
      keyTakeaway: "Validate AI predictions against known historical outcomes before procurement. A backtest on YOUR data is worth more than 100 vendor case studies."
    }
  },
  {
    id: 'GEO4',
    domainCode: 'GEO',
    scenario: `You're an advisor to NHAI managing 2,000 km of national highways including 450 bridges.

RECENT AUDIT FINDINGS:
• Annual bridge inspections: ₹3 Crore/year
• Each bridge inspected once every 12 months
• Disturbing finding: 40% of bridges rated "satisfactory" showed visible deterioration within 6 months
• Root cause: Surveyor fatigue, subjective visual assessment, annual frequency too low

RECENT INCIDENT:
A bridge in Gujarat showed no issues in March. In August (post-monsoon), a support beam cracked, requiring 3-week highway closure. Economic impact: ₹200 Crore in logistics disruption.

VENDOR PROPOSAL:
"AI-Powered Bridge Monitoring" at ₹8 Crore/year:
• Drone-based monthly inspection
• AI analysis for crack detection, spalling, corrosion
• Predictive deterioration models

The Minister asks: "Current system costs ₹3 Crore. This costs ₹8 Crore. Is 2.5x justified?"

How do you frame your response?`,
    options: [
      { id: 'A', text: "Yes – safety is paramount. One prevented bridge failure justifies it.", points: 5 },
      { id: 'B', text: "No – fix contractor quality and surveyor accountability first", points: 0 },
      { id: 'C', text: "Reframe: What's the cost of undetected deterioration? Model failure probability, emergency repairs, and disruption. If expected annual loss exceeds ₹5 Crore, investment pays for itself.", points: 10 },
      { id: 'D', text: "Pilot on 50 most critical bridges first before committing ₹8 Crore", points: 5 }
    ],
    insight: {
      company: "UK Highways England",
      story: "Faced same ROI question. Reframed: Annual inspection was £20M, but undetected deterioration caused £200M/year in emergency repairs and traffic management. AI monitoring increased early detection 60%, reducing emergency interventions 45%. Net savings: £100M annually.",
      keyTakeaway: "Reframe AI ROI from 'cost comparison with current process' to 'risk reduction and downstream cost avoidance.' Inspection cost is 10% of the problem; emergency repairs are 90%."
    }
  },
  {
    id: 'GEO5',
    domainCode: 'GEO',
    scenario: `You're the CTO of a telecom company with 50,000 cell towers across India.

CURRENT CHALLENGES:
• Site visits for maintenance: ₹8,000 per visit
• Scheduling delays: 2 days from issue detection to site visit
• Vegetation encroachment: Trees blocking signal, discovered only when customers complain
• Structural audits: Manual, once every 2 years, inconsistent
• Theft/vandalism: Battery theft, copper wire theft – discovered after the fact

ANNUAL COST OF ISSUES:
• Unplanned site visits: ₹50 Crore
• Signal degradation (vegetation): ₹30 Crore in customer churn
• Theft and vandalism: ₹20 Crore
• Structural issues discovered late: ₹25 Crore in emergency repairs

VENDOR PROPOSAL:
"Satellite + Drone AI Monitoring" at ₹200/tower/month:
• Monthly satellite imagery for vegetation analysis
• Quarterly drone inspection for structural assessment
• AI-based change detection and anomaly alerts

CFO asks: "₹200 × 50,000 × 12 = ₹12 Crore/year. What's the ROI?"

How do you analyze this?`,
    options: [
      { id: 'A', text: "₹12 Crore for 'nice to have' monitoring is too expensive for preventive maintenance", points: 0 },
      { id: 'B', text: "Build the business case: Quantify saved site visits, prevented outages, early theft detection. If savings > ₹12 Crore, proceed.", points: 10 },
      { id: 'C', text: "Start with 5,000 high-value urban towers at ₹1.2 Crore/year first", points: 7 },
      { id: 'D', text: "Negotiate to ₹100/tower before considering", points: 3 }
    ],
    insight: {
      company: "Bharti Infratel (Indus Towers)",
      story: "Piloted satellite monitoring on 10,000 towers. Found that remote monitoring saved ₹2,400/tower/year in reduced site visits (3 fewer per tower). Add prevented outages (₹800), early vegetation clearance (₹400), theft prevention (₹300) – total ₹3,900/tower against ₹2,400 cost. ROI: 3.5x.",
      keyTakeaway: "For distributed assets, monitoring ROI = saved site visits + prevented incidents + optimized maintenance. Savings from NOT doing unnecessary work often exceed savings from catching problems early."
    }
  },

  // ========== GENAI STRATEGY (4) ==========
  {
    id: 'GEN1',
    domainCode: 'GEN',
    scenario: `Your Board has issued a directive: "Develop a comprehensive GenAI strategy."

COMPANY CONTEXT:
• 2,000 employees across 8 locations
• Industry: B2B Manufacturing
• Revenue: ₹1,500 Crore
• No formal AI policy currently

CURRENT STATE OF GENAI:
• Employees using personal ChatGPT for work
• Legal discovered confidential pricing data in a ChatGPT screenshot
• IT has no visibility into what's being shared externally
• Teams experimenting: HR for job descriptions, Marketing for content

STAKEHOLDER WISH LIST:
• IT: "We need our own internal LLM"
• HR: "AI-powered recruiting"
• Sales: "AI for proposals and RFPs"
• Legal: "Contract review automation"

BUDGET: ₹1 Crore for first 6 months

CEO: "Show me tangible results in 6 months."

What should be your first move?`,
    options: [
      { id: 'A', text: "Deploy Microsoft 365 Copilot to all 2,000 employees – enterprise security built in, addresses shadow AI risk", points: 5 },
      { id: 'B', text: "Create governance framework first, then structured pilot with 100 employees across 3 use cases, measure productivity before scaling", points: 10 },
      { id: 'C', text: "Build an internal LLM on private cloud using open-source models", points: 3 },
      { id: 'D', text: "Issue company-wide ban on GenAI until comprehensive risk assessment complete", points: 0 }
    ],
    insight: {
      company: "Mahindra & Mahindra",
      story: "Initially tried mass Copilot rollout to 5,000 employees. After 3 months, only 23% used it more than twice. Pivoted: identified 200 'AI Champions' with structured training and weekly check-ins. This cohort achieved 78% active usage.",
      keyTakeaway: "GenAI adoption is a change management problem, not a technology procurement problem. Start with governance + focused pilots with measurable outcomes."
    }
  },
  {
    id: 'GEN2',
    domainCode: 'GEN',
    scenario: `You're the CTO of an engineering services company with 5,000 employees. The CEO wants to "become an AI-first engineering firm."

COPILOT PILOT RESULTS (3 months with 500 users):

USE CASE RESULTS:
• Proposal Writing: Saved 2 hours/week for BD team. Users happy.
• Technical Document Search: 60% accuracy finding relevant docs. Users frustrated.
• Code Generation (CAD macros): 40% of code had errors. Engineers lost trust.
• Meeting Summarization: Works well, but low usage.

USAGE DATA:
• Week 1: 78% active (curiosity)
• Week 12: 15% active (only proposal writers)

COST ANALYSIS:
• Copilot: $30/user/month
• Full rollout to 5,000: $1.8M/year
• Measured productivity gain: ~$400K/year (mostly proposal writing)

CEO asks: "Roll out company-wide or cancel?"`,
    options: [
      { id: 'A', text: "Roll out – adoption will improve with training as users discover more use cases", points: 0 },
      { id: 'B', text: "Cancel Copilot. Build custom RAG on your 50,000 past project documents for technical Q&A, and specialized tools for other use cases.", points: 10 },
      { id: 'C', text: "Reduce to 500 power users who showed ROI. Monitor 6 more months.", points: 5 },
      { id: 'D', text: "Pause GenAI – technology isn't mature for engineering", points: 0 }
    ],
    insight: {
      company: "Arup (Global Engineering Firm)",
      story: "Found horizontal tools like Copilot achieved only 15-20% adoption in engineering teams. They built custom RAG on 50 years of project archives – 50,000 documents. Result: 92% accuracy for technical questions vs 60% with generic tools. Engineers now use it 3-4 times daily.",
      keyTakeaway: "For specialized knowledge work, vertical AI beats horizontal AI. Custom RAG on domain documents often outperforms generic models significantly."
    }
  },
  {
    id: 'GEN3',
    domainCode: 'GEN',
    scenario: `You're the General Counsel of a conglomerate. Your team reviews 500 contracts monthly (50 pages average).

CURRENT PROCESS:
• Junior lawyers: 4 hours/contract
• Senior lawyers review flags: 1 hour/contract
• Cost: ~₹25,000/contract
• Monthly legal cost: ₹1.25 Crore
• Human accuracy: 85% risk clause detection
• Average contract value: ₹5 Crore
• Cost of missed clause: ~₹10 Lakh in disputes

AI OPTIONS:

OPTION A - Harvey AI (Legal-specific):
• $50,000/month (₹42 Lakh)
• 92% accuracy
• Specialized for legal documents

OPTION B - Custom RAG on GPT-4:
• ₹1 Crore setup + ₹10 Lakh/month
• 78% accuracy (based on POC)

OPTION C - Microsoft Copilot:
• ₹5 Lakh/month (existing license)
• 65% accuracy on legal documents

Which do you recommend?`,
    options: [
      { id: 'A', text: "Harvey AI – highest accuracy (92% vs 85% human) justifies premium. In legal, accuracy is everything.", points: 5 },
      { id: 'B', text: "Custom RAG – cheaper long-term, 78% is 'good enough' for first-pass", points: 0 },
      { id: 'C', text: "Build a cost-benefit model: (Accuracy improvement × Contract value × Risk probability × Volume) vs Total cost. The math might surprise you.", points: 10 },
      { id: 'D', text: "Copilot – essentially free, 65% still helps junior lawyers", points: 0 }
    ],
    insight: {
      company: "A Big 4 Consulting Firm",
      story: "Built detailed ROI model. Harvey at 92%: 7% improvement over humans = 35 more clauses caught monthly = ₹3.5 Crore risk avoided. Cost: ₹5 Crore/year. NEGATIVE ROI at their volume. Custom RAG at 78%: WORSE than humans (85%)! Final choice: Copilot for first-pass + human review. Result: 30% cost reduction maintaining 85% accuracy.",
      keyTakeaway: "AI accuracy improvements must translate to financial impact at YOUR scale. A 92% accurate tool might have negative ROI if your volume doesn't justify the premium."
    }
  },
  {
    id: 'GEN4',
    domainCode: 'GEN',
    scenario: `Your HR Head proposes GenAI for recruitment. You receive 10,000 applications monthly.

PROPOSED USE CASES:

1. RESUME SCREENING
• Current: 2 min/resume = 333 hours/month
• AI: Screens and shortlists top 20%
• Time savings: 250 hours/month

2. INTERVIEW QUESTION GENERATION
• AI generates role-specific, competency-based questions
• Expected: Consistency and reduced bias

3. CANDIDATE COMMUNICATION
• AI drafts personalized responses, status updates
• Better candidate experience, faster response

4. OFFER LETTER CREATION
• AI generates compliant offer letters from templates
• 80% time savings

HR wants to start with highest-volume use case for maximum impact.

Which use case should you explicitly AVOID starting with?`,
    options: [
      { id: 'A', text: "Resume Screening – highest volume, biggest time savings, most obvious ROI. This should be first.", points: 10 },
      { id: 'B', text: "Interview Question Generation – creative task, plays to GenAI strengths", points: 0 },
      { id: 'C', text: "Candidate Communication – template-based, clear guidelines", points: 0 },
      { id: 'D', text: "Offer Letter Creation – structured documents, compliance rules clear", points: 0 }
    ],
    insight: {
      company: "Amazon",
      story: "Built AI recruiting trained on 10 years of resumes. The system learned to penalize 'women's' (as in 'women's chess club'), downgraded all-women's college graduates, favored male language patterns. Why? Historical hiring data reflected historical biases. Amazon scrapped the tool entirely.",
      keyTakeaway: "High-stakes people decisions (hiring, firing, promotions) should be LAST for GenAI, not first. Start with low-bias use cases like communications. Build trust before touching careers."
    }
  },

  // ========== VOICE AI (2) ==========
  {
    id: 'VAI1',
    domainCode: 'VAI',
    scenario: `You're the Head of Customer Service for a large private bank. Your contact center handles 10,000 calls daily.

CURRENT PERFORMANCE:
• Call types:
  - 60% Routine (balance, status, card activation) – 3 minutes
  - 25% Judgment Required (complaints, fee waivers) – 8 minutes
  - 15% Complex (fraud, loan restructuring) – 15 minutes

• Wait time: 12 minutes
• Agent utilization: 94% (burnout risk – recommended max: 85%)
• Agent attrition: 45% annually (industry: 30%)
• NPS dropped 15 points this quarter

CONSTRAINT: Budget for ONE major initiative.

OPTIONS:
A) Hire 50 agents (₹4 Crore annual, 6-week onboarding)
B) Voice AI for routine calls (₹2 Crore + ₹50 Lakh/year)
C) Build in-house IVR chatbot (₹80 Lakh, 8-month development)
D) Implement callback system (₹30 Lakh)

Your priority recommendation?`,
    options: [
      { id: 'A', text: "Hire 50 agents – direct solution, operational in 6 weeks, reduces workload", points: 3 },
      { id: 'B', text: "Deploy Voice AI for the 60% routine calls – automate balance/status queries, free humans for judgment calls", points: 10 },
      { id: 'C', text: "Build in-house IVR – more control, lower long-term cost", points: 0 },
      { id: 'D', text: "Callback system – doesn't reduce volume but improves experience", points: 5 }
    ],
    insight: {
      company: "HDFC Bank and Axis Bank",
      story: "Both deployed Voice AI targeting routine queries (60% of volume). Results: 40-60% of routine calls automated, wait times under 90 seconds, agent utilization down to healthy 78%, attrition reduced 35%. Key: They didn't automate judgment calls – AI was designed to escalate anything requiring human discretion.",
      keyTakeaway: "Segment calls by complexity first. Automate routine with AI, route judgment to humans. Strategic automation of 'boring' 60% transforms entire operation."
    }
  },
  {
    id: 'VAI2',
    domainCode: 'VAI',
    scenario: `You're the CIO of a large hospital chain (15 hospitals, 5,000 beds). Operations wants Voice AI for appointments.

CURRENT SITUATION:
• Appointment calls: 2,000/day
• 40% are scheduling (book, reschedule, cancel)
• No-show rate: 15% (₹30 Lakh/month in unused slots)
• Call center: 25 people, ₹80 Lakh annual
• Patient demographics: 60% above 55 years old
• Languages: Hindi, English, Tamil, Telugu, Kannada

VENDOR PROPOSAL:
"Healthcare Voice AI" – ₹1.5 Crore + ₹25 Lakh/year
• Natural language appointment booking
• Automated reminders
• HIS integration
• Claimed: 80% automation rate

The vendor demo was impressive – smooth conversation, appointment in 90 seconds.

What should be your primary evaluation criteria?`,
    options: [
      { id: 'A', text: "Test on actual call recordings (anonymized) – vendor demos use ideal scenarios", points: 5 },
      { id: 'B', text: "Evaluate speech recognition accuracy by age group AND language. If it fails for elderly Tamil speakers, you alienate 60% of patients.", points: 10 },
      { id: 'C', text: "Focus on no-show reduction – that's the real ROI", points: 3 },
      { id: 'D', text: "Start with youngest segment and English-only. Expand later.", points: 5 }
    ],
    insight: {
      company: "Apollo Hospitals",
      story: "Piloted Voice AI for scheduling. Initial: 75% automation. Deeper analysis: 92% accuracy for under-45, but only 68% for over-60. Elderly patients speak slower, use colloquialisms ('sugar problem' not 'diabetes'), repeat themselves. Solution: age-adaptive routing – AI for younger, priority human for elderly. Regional language accuracy lagged Hindi by 20 points.",
      keyTakeaway: "Voice AI accuracy varies dramatically by demographics – age, accent, language. Test on YOUR patient population. A system that frustrates 60% of users is worse than no system."
    }
  },

  // ========== AI ECONOMICS (3) ==========
  {
    id: 'ROI1',
    domainCode: 'ROI',
    scenario: `You're Chief Risk Officer of a mid-sized bank. The Fraud team proposes AI transaction monitoring.

CURRENT STATE:
• Rule-based fraud detection (10 years old)
• Daily transactions: 5,00,000
• Current catch rate: 70%
• Annual fraud loss: ₹4 Crore (the 30% that escapes)
• False alert rate: 2% (10,000 legitimate transactions flagged daily)

VENDOR PITCH:
"Next-Gen AI Fraud Detection"
• "92% overall accuracy"
• "89% precision" (when it says fraud, it's right 89%)
• "85% recall" (catches 85% of actual frauds)
• Cost: ₹60 Lakh/year

Fraud Head: "We catch 70%, they catch 85%. That's 15% more = ₹60 Lakh saved annually. System pays for itself!"

How should you evaluate?`,
    options: [
      { id: 'A', text: "92% > 70%. 85% recall vs 70% means ₹60 Lakh more fraud caught. Approve.", points: 0 },
      { id: 'B', text: "Demand confusion matrix on YOUR data. Calculate false positive cost: 89% precision = 11% false positives. How many legitimate customers blocked? That might exceed fraud savings.", points: 10 },
      { id: 'C', text: "Counter-propose pay-per-caught-fraud model – align incentives", points: 7 },
      { id: 'D', text: "Request 95% before considering – 92% isn't enough improvement", points: 3 }
    ],
    insight: {
      company: "A Top-5 Private Bank",
      story: "Deployed AI with 89% precision (as advertised). 89% precision = 11% false positives. On 5 lakh daily transactions, if 1% flagged suspicious (5,000), 11% false positives = 550 legitimate blocked DAILY. At ₹10,000 average transaction: ₹55 Lakh blocked daily – ₹5.5 Crore monthly. Fraud savings? ₹60 Lakh/year. They turned it off in 3 months.",
      keyTakeaway: "In fraud detection, false positive cost (blocking legitimate customers) often dramatically exceeds false negative cost. Lower 'accuracy' with fewer false positives might be economically superior."
    }
  },
  {
    id: 'ROI2',
    domainCode: 'ROI',
    scenario: `You're VP of Supply Chain for a large e-commerce company. 50,000 packages daily across 15 cities.

CURRENT PERFORMANCE:
• Last-mile cost: ₹85/package (benchmark: ₹70)
• Failed first delivery: 18% (customer not home, wrong address)
• Re-delivery cost: ₹150/attempt
• Daily failed delivery cost: ₹13.5 Lakh
• Annual cost: ₹49 Crore

CONTEXT:
• You use third-party delivery partners (Delhivery, Ecom Express)
• You don't control their routes or drivers
• Partners bill per successful delivery

VENDOR PROPOSAL:
"AI Route Optimization" at ₹65/package:
• Dynamic route optimization
• "30% reduction in last-mile cost"

Operations Head: "₹20 savings × 50,000 = ₹10 Lakh daily!"

Where should AI investment actually focus?`,
    options: [
      { id: 'A', text: "Route optimization – ₹10 Lakh daily, ₹36 Crore annually. Clear winner.", points: 0 },
      { id: 'B', text: "Delivery slot prediction – AI predicts when customers are home, offers preferred slots. Reduce failed first deliveries from 18% to 8%. Bigger savings.", points: 10 },
      { id: 'C', text: "Address correction AI – 30% of failures are wrong addresses. Fix before dispatch.", points: 5 },
      { id: 'D', text: "Build own fleet first – can't optimize routes you don't control", points: 0 }
    ],
    insight: {
      company: "Amazon India",
      story: "Analyzed delivery economics. Route optimization had limited value (they don't control 3PL routes). Instead, invested in delivery prediction: using customer history (when they're usually home), they offer 'recommended slots.' Result: first-attempt failures 20%→8%. Savings: ₹9 Lakh/day – almost as much as route optimization promise, and they controlled the lever.",
      keyTakeaway: "Before optimizing any process, identify the highest-cost failure mode. Preventing failures often has higher ROI than optimizing the successful path."
    }
  },
  {
    id: 'ROI3',
    domainCode: 'ROI',
    scenario: `You're Chief Actuary at a general insurance company. The Claims Head proposes satellite + AI for crop insurance.

CURRENT PROCESS (PMFBY):
• Farmer files claim after damage
• Field agent visits (₹2,000 per visit)
• Visual assessment + soil sampling
• Turnaround: 15-20 days
• Suspected fraud: 30% show discrepancies
• Annual payout: ₹500 Crore

PROPOSED AI SOLUTION:
• Satellite imagery before/after damage event
• AI compares images for damage percentage
• No field visit for 70% of claims
• Cost: ₹200 per assessment (vs ₹2,000)
• Turnaround: 2 days

Claims Head: "10x cost reduction, 7x faster. Satellite images don't lie."

Actuarial concerns: "How do we validate accuracy? Error rate? Liability for under-assessment?"

What framework do you recommend?`,
    options: [
      { id: 'A', text: "Reject – crop insurance too sensitive for AI. Under-assessment causes farmer distress.", points: 0 },
      { id: 'B', text: "Adopt fully – 10x savings is compelling. Satellite data is objective.", points: 0 },
      { id: 'C', text: "Tiered approach: AI classifies into Green (auto-approve), Yellow (human audit), Red (field visit mandatory). Different confidence levels, different treatments.", points: 10 },
      { id: 'D', text: "Wait for IRDAI guidelines on AI-based claims", points: 5 }
    ],
    insight: {
      company: "HDFC Ergo and ICICI Lombard",
      story: "Piloted satellite assessment for 2 monsoon seasons. Key innovation: confidence-tiered processing. High confidence (>90%) → auto-processed. Medium (70-90%) → random 10% audit. Low (<70%) → mandatory field visit. Results: 87% without field visit, fraud detection up 40%, farmer satisfaction improved (2 days vs 15), cost down 65%. Critical: never auto-rejecting low-confidence – always escalating.",
      keyTakeaway: "For high-stakes AI decisions, implement confidence tiers. Auto-approve high confidence, human oversight for medium, never auto-reject. Captures efficiency while managing risk."
    }
  },

  // ========== AI GOVERNANCE (2) ==========
  {
    id: 'GOV1',
    domainCode: 'GOV',
    scenario: `You're the CHRO of a fast-growing tech company. Six months ago, HR deployed an AI hiring tool for 5,000 monthly applications.

REPORTED SUCCESS:
• Time to shortlist: Reduced 45%
• Recruiter productivity: Up 60%
• Hiring manager satisfaction: 4.2/5
• Cost per hire: Down 30%

Then HR Analytics runs a diversity audit:

DIVERSITY ANALYSIS:
• Women: 41% applied → 34% shortlisted (Gap: -7%)
• Tier-2/3 colleges: 45% applied → 22% shortlisted (Gap: -23%)
• Age 40+: 18% applied → 12% shortlisted (Gap: -6%)

Vendor response: "The AI learned from your 5 years of hiring data. It predicts who YOU historically hired. If there's bias, it's in your decisions, not our algorithm."

What is the appropriate response?`,
    options: [
      { id: 'A', text: "Vendor has a point – AI reflects our patterns. Fix job descriptions and sourcing first, then retrain.", points: 3 },
      { id: 'B', text: "Immediately pause. Conduct thorough bias audit with external experts. Require explainability for every rejection before reactivation.", points: 10 },
      { id: 'C', text: "Add human diversity review as second stage – AI shortlists, diversity team balances", points: 5 },
      { id: 'D', text: "Ask vendor to retrain on balanced dataset – oversample women, Tier-2/3, experienced", points: 5 }
    ],
    insight: {
      company: "Amazon and HCL Tech",
      story: "Amazon scrapped their AI recruiting after it penalized 'women's' (women's college, women's chess club). AI learned from 10 years of male-dominated hiring. HCL found their model favored certain 'feeder colleges' – creating self-fulfilling loop excluding talented graduates from newer institutions. Both cases: 'learned from your data' was technically true and ethically damning.",
      keyTakeaway: "'The AI learned from your data' is an INDICTMENT, not a defense. Historical data contains historical biases. AI that amplifies bias at scale is worse than human bias – it's systematic and invisible."
    }
  },
  {
    id: 'GOV2',
    domainCode: 'GOV',
    scenario: `You're Head of QA at a pharmaceutical company manufacturing 100,000 injectable vials daily. FDA and CDSCO require documented inspection for every batch.

CURRENT PROCESS:
• Human visual inspection: 100% of vials
• Detection rate: 94% (6% defective escape to packaging)
• Defect types: Particulate matter, cracks, fill level, seal integrity
• Escaped defects occasionally lead to batch recalls (₹5-10 Crore each)

AI VENDOR PROPOSAL:
₹2 Crore + ₹30 Lakh/year:
• Camera-based inspection at production speed
• Deep learning on 10 million vial images
• Claimed detection: 99.5%
• "Used by Pfizer and J&J in Europe"

QA Head caution: "Our product goes into human bodies. FDA requires human oversight. What if AI misses something and a patient is harmed?"

Plant Head eager: "99.5% vs 94% is massive. We'd catch 5,500 more defects daily."

What's the right deployment model?`,
    options: [
      { id: 'A', text: "AI as primary: All vials through AI, humans only review AI-flagged defects. Maximum efficiency.", points: 5 },
      { id: 'B', text: "AI as secondary: Humans do primary inspection. AI re-inspects what humans passed. Flag disagreements for senior QA.", points: 10 },
      { id: 'C', text: "Reject – regulatory risk too high until FDA explicitly approves AI for injectables", points: 0 },
      { id: 'D', text: "Wait for FDA guidance on AI in pharmaceutical QC", points: 0 }
    ],
    insight: {
      company: "Amgen and Roche",
      story: "Both use AI visual inspection as 'second pair of eyes.' Humans inspect first (regulatory compliance). AI reviews what humans passed. When AI and human disagree, vial goes to senior QC. Results at Roche: AI caught additional 2% that humans missed, full regulatory compliance maintained. FDA approved this 'AI-augmented' model but not 'AI-primary' for high-risk products.",
      keyTakeaway: "In regulated industries (pharma, medical devices, aviation), AI should AUGMENT human judgment, not replace it. 'Human decides, AI assists' maintains compliance while capturing AI capabilities."
    }
  },

  // ========== AI ORGANIZATION (2) ==========
  {
    id: 'ORG1',
    domainCode: 'ORG',
    scenario: `You're the new Chief AI Officer of a ₹20,000 Crore conglomerate with 8 business units.

CURRENT STATE:
• Each BU has 2-3 data scientists, hired independently, reporting to BU CTO
• Total AI spend: ₹15 Crore/year
• Models in production: 3 (Auto, FinServ, IT)
• Pilots abandoned: 20+
• Duplicate work: 3 BUs built separate customer churn models
• Data scientist attrition: 40% annually ("no career path")
• Tool chaos: 4 ML platforms, 3 clouds, 5 BI tools

BU HEADS:
• "Central IT doesn't understand our business"
• "We piloted AI but couldn't get IT to deploy"
• "Our data scientists keep leaving"

CEO: "I've spent ₹15 Crore over 2 years with nothing to show. Fix this."

What organizational model do you recommend?`,
    options: [
      { id: 'A', text: "Centralize: Group AI CoE. All data scientists report to you. Standardize tools. BUs submit use cases.", points: 5 },
      { id: 'B', text: "Decentralize further: More budget and autonomy to BUs. Let successes emerge organically.", points: 0 },
      { id: 'C', text: "Federated: Central team owns data platform, MLOps, governance. BU teams own domain expertise and use cases. Projects need both.", points: 10 },
      { id: 'D', text: "Outsource to TCS/Infosys: Internal isn't working. External expertise builds and maintains.", points: 0 }
    ],
    insight: {
      company: "Mahindra Group",
      story: "Faced exact situation. Created 'Mahindra AI' as shared services. Central: cloud infrastructure, ML platforms, MLOps, governance, career paths. BUs: domain data, problem definition, validation. Key: 'Embedded pods' – central data scientists sit with BU teams for 6-month rotations. Result: deployment time 9 months → 6 weeks. Attrition dropped to 15%. Three new production models in year one.",
      keyTakeaway: "Winning AI model is federated: centralize boring stuff (infrastructure, platforms, career paths) and distribute exciting stuff (domain problems, business impact). Neither pure central nor distributed works."
    }
  },
  {
    id: 'ORG2',
    domainCode: 'ORG',
    scenario: `Your company successfully piloted AI demand forecasting. CEO wants to scale to 5 more use cases: pricing, churn, supply chain, quality, sales territories.

CURRENT TEAM:
• 1 Data Scientist (contractor, 18 months experience)
• Uses vendor APIs (SageMaker, DataRobot)
• Built forecasting model in 6 months
• No MLOps – model runs on scheduled scripts

BUDGET: ₹1.2 Crore for Year 1

OPTIONS:

A) Build Internal Team
• 5 Data Scientists at ₹25 Lakh = ₹1.25 Crore
• Long-term capability, IP ownership
• 4-6 month hiring, management overhead, flight risk

B) Outsource to Consulting
• TCS/Infosys: ₹80 Lakh per project
• Experienced teams, faster delivery
• No IP, dependency, ₹4 Crore for all 5

C) Hybrid Model
• 1 AI/ML Head (₹50 Lakh) + 2 Engineers (₹20 Lakh each) = ₹90 Lakh
• Remaining ₹30 Lakh for vendor tools
• AI Head evaluates, vendors execute, team learns

D) Upskill IT
• Send 5 IT staff for AI certification
• Use AutoML platforms
• Cost: ₹30 Lakh
• Cheapest, quick start, depth concerns

Recommendation?`,
    options: [
      { id: 'A', text: "Hire 5 data scientists – build serious in-house capability. AI is strategic.", points: 3 },
      { id: 'B', text: "Outsource all 5 – let experts handle it. We're not an AI company.", points: 0 },
      { id: 'C', text: "1 senior AI/ML Head + 2 engineers for ownership. Vendors execute. Internal team learns by overseeing.", points: 10 },
      { id: 'D', text: "Upskill IT + AutoML – cheapest path to start", points: 0 }
    ],
    insight: {
      company: "Razorpay and Zerodha",
      story: "Both started AI scaling with 1-2 senior hires who didn't code initially. Their job: evaluate vendors, define architecture, create roadmap, upskill team. At Razorpay, first AI Head spent 6 months evaluating 8 fraud vendors, 6 months learning from implementation. By month 18, internal team could build similar models. Value wasn't coding – it was knowing what good looks like.",
      keyTakeaway: "Your first AI hire should evaluate and direct, not necessarily code all day. A senior leader who knows 'good AI' is more valuable than five junior data scientists without direction."
    }
  },

  // ========== STRATEGIC PRIORITIZATION (1) ==========
  {
    id: 'STR1',
    domainCode: 'STR',
    scenario: `As the new Chief Digital Officer, you have ₹10 Crore annual AI budget. Company is diversified: retail, manufacturing, financial services.

DATA MATURITY: "Level 2" (Basic Analytics) – good transactional data but limited engineering and no MLOps.

SIX PROPOSED INITIATIVES:

A) CUSTOMER CHURN PREDICTION (Marketing)
• Value: High (5% churn reduction = ₹50 Cr retention)
• Data: Good (3 years CRM)
• Complexity: Medium

B) DEMAND FORECASTING (Supply Chain)
• Value: High (₹40 Cr inventory reduction)
• Data: Poor (4 ERPs scattered)
• Complexity: High

C) DOCUMENT INTELLIGENCE (Legal)
• Value: Medium (₹2 Cr savings)
• Data: Good (digitized contracts)
• Complexity: Low (proven solutions)

D) PREDICTIVE MAINTENANCE (Manufacturing)
• Value: Very High (₹80 Cr if successful)
• Data: None (no IoT sensors)
• Complexity: Very High (needs IoT first)

E) GENAI CHATBOT (CEO's Project)
• Value: Low-Medium
• Data: Poor (no knowledge base)
• Complexity: Medium
• Political importance: HIGH

F) GEOSPATIAL ANALYTICS (Strategy)
• Value: High
• Data: Low (need external data)
• Complexity: High (specialized skills)

You can fund 2-3 in Year 1. How do you prioritize?`,
    options: [
      { id: 'A', text: "E, A, B – Start with CEO's chatbot (political capital), then churn (good data), then forecasting", points: 0 },
      { id: 'B', text: "C, A – Document Intelligence (quick win, builds credibility), then Churn (good data). Defer complex projects until capability matures.", points: 10 },
      { id: 'C', text: "D, F – Highest strategic value. Build transformative capabilities even if longer.", points: 0 },
      { id: 'D', text: "Invest ₹4 Crore in data platform first. None will succeed without better infrastructure.", points: 5 }
    ],
    insight: {
      company: "Titan Company (Tata Group)",
      story: "Faced similar prioritization. Chose legal document processing first – low value (₹1.5 Cr) but 3-month implementation with guaranteed success. Quick win built Board credibility. Phase 2: Customer analytics using strong retail data. Only Year 2, with proven capability and trust, tackled complex supply chain. Critically, they deprioritized CEO's 'AI personal shopper' chatbot, diplomatically explaining it needed a knowledge base that didn't exist. CEO accepted because team had delivered visible wins.",
      keyTakeaway: "Sequence AI investments to build credibility before complexity. Start with low-complexity, high-data-readiness projects. Tackle political/complex initiatives after proving you can deliver. A failed high-profile project damages AI credibility for years."
    }
  }
];