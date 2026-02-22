/**
 * AIDX ODN Community Platform - Database Seed Script
 *
 * Creates:
 *  1. Superadmin user  (admin@trutha.org / ODN@admin2026!)
 *  2. 3 regular demo users
 *  3. 18 sample posts covering all ODN topic areas
 *     - 1 pinned admin post (Topic of the Month)
 *     - 4 admin posts with varied hotScore
 *     - 13 user posts with varied scores
 */

import { PrismaClient, Role, PostStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

// Seed should use direct DB connection, not the pgbouncer transaction pooler
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    },
  },
});

// ─── credentials ────────────────────────────────────────────────────
const ADMIN_EMAIL = "admin@trutha.org";
const ADMIN_PASSWORD = "ODN@admin2026!";
const ADMIN_NAME = "AIDX ODN Admin";

// ─── helper ─────────────────────────────────────────────────────────
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/** Wilson score-based hot ranking (simplified Reddit algo) */
function calcHotScore(upvotes: number, createdHoursAgo: number): number {
  const score = upvotes;
  const order = Math.log10(Math.max(Math.abs(score), 1));
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
  const seconds = createdHoursAgo * 3600;
  return sign * order + seconds / 45000;
}

// ─── main ────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱  Seeding AIDX ODN Community Platform …\n");

  // ── 1. Superadmin ────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const adminUser = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { role: Role.ADMIN, passwordHash, name: ADMIN_NAME },
    create: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: Role.ADMIN,
      passwordHash,
    },
  });
  console.log(`✅  Superadmin  → ${adminUser.email}`);

  // ── 2. Demo users ────────────────────────────────────────────────
  const demoUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice.futures@example.com" },
      update: {},
      create: {
        email: "alice.futures@example.com",
        name: "Alice Futures",
        role: Role.USER,
        passwordHash: await bcrypt.hash("Demo@1234", 12),
      },
    }),
    prisma.user.upsert({
      where: { email: "bob.governance@example.com" },
      update: {},
      create: {
        email: "bob.governance@example.com",
        name: "Bob Governance",
        role: Role.USER,
        passwordHash: await bcrypt.hash("Demo@1234", 12),
      },
    }),
    prisma.user.upsert({
      where: { email: "carol.ethics@example.com" },
      update: {},
      create: {
        email: "carol.ethics@example.com",
        name: "Carol Ethics",
        role: Role.USER,
        passwordHash: await bcrypt.hash("Demo@1234", 12),
      },
    }),
  ]);
  console.log(`✅  Demo users  → ${demoUsers.map((u) => u.name).join(", ")}`);

  const [alice, bob, carol] = demoUsers;

  // ── 3. Sample posts ──────────────────────────────────────────────
  // Format: { title, content, authorId, isAdminPost, isPinned, upvotes, downvotes, hoursAgo }
  const postDefs = [
    // ── Admin posts (isAdminPost = true) ──────────────────────────
    {
      title: "Topic of the Month — February 2026: Will AI Replace Human Judgment in Critical Decisions?",
      content: `## February 2026 Official Topic

The AIDX Modeling Open Design Network invites all members to explore a central question for this month:

**Will AI systems replace human judgment in high-stakes decisions — or should they?**

### Context
AI systems are increasingly deployed in domains where decisions carry profound consequences: judicial sentencing, medical triage, loan approvals, hiring, and military targeting. These systems often outperform individual humans on narrow benchmarks. Yet their opaqueness, brittleness under distribution shift, and inability to account for moral context raise serious questions.

### Key Questions to Debate

1. **Accuracy vs. Accountability**: Even if AI achieves higher statistical accuracy, does that justify removing human oversight from consequential decisions?
2. **Bias Laundering**: Can AI systems launder existing societal biases behind a veneer of objectivity, making discrimination harder to challenge?
3. **Edge Cases and Moral Context**: How should AI handle edge cases that require empathy, situational ethics, or cultural sensitivity?
4. **Legal Responsibility**: When an AI system causes harm, who is liable — the developer, deployer, or regulator?
5. **Democratic Legitimacy**: Should citizens have the right to be judged by human peers rather than algorithmic systems?

### Submission Guidelines
- Posts must include a clear position statement
- Evidence-based arguments are prioritized
- Cross-disciplinary perspectives (law, philosophy, sociology, economics) are especially welcome
- Minimum 300 words per submission

*This topic runs February 1–28, 2026. Top-voted submissions will be featured in the AIDX ODN Monthly Report.*`,
      authorId: adminUser.id,
      isAdminPost: true,
      isPinned: true,
      upvotes: 187,
      downvotes: 12,
      hoursAgo: 72,
    },
    {
      title: "AIDX ODN Governance Framework v2.0 — Community Comment Period Open",
      content: `## Open for Community Comment

The AIDX Modeling ODN Governance Committee has published **Governance Framework v2.0** for a 30-day community comment period.

### What's New in v2.0

**Moderation**
- Three-tier moderation system: Community Flagging → Peer Review → Admin Decision
- Clear appeals process with 72-hour SLA
- Transparent moderation logs (anonymized)

**Content Standards**
- Evidence tiers: Peer-reviewed / Preprint / Expert Opinion / Personal Analysis
- Mandatory disclosure of AI-assisted writing
- Citation requirements for empirical claims

**Participation**
- Monthly topic nomination process open to all members
- Certified Expert badge program (application-based)
- Community voting on platform feature priorities

### How to Comment
Reply to this post with specific feedback. Use the format:
- **Section**: [section name]
- **Issue**: [what you see as a problem]
- **Suggestion**: [your proposed change]

Comments will be reviewed by the Governance Committee by March 15, 2026.`,
      authorId: adminUser.id,
      isAdminPost: true,
      isPinned: false,
      upvotes: 143,
      downvotes: 8,
      hoursAgo: 120,
    },
    {
      title: "Past Topic Recap — January 2026: AI-Generated Knowledge and Academic Research",
      content: `## January 2026 Topic Summary

*This is the official recap of our January topic: "Will AI-Generated Knowledge Replace Academic Research?"*

### Participation Statistics
- 312 posts submitted
- 2,847 votes cast
- 89 unique contributors
- 15 countries represented

### Key Themes That Emerged

**Skeptical Camp (42% of posts)**
Argued that AI cannot replicate the epistemically crucial process of original inquiry — formulating novel hypotheses, conducting experiments, and situating findings within a living discourse community. Many cited the "training data ceiling" problem: AI systems can only synthesize what already exists, preventing genuine paradigm shifts.

**Optimist Camp (35% of posts)**
Highlighted AI's demonstrated capacity to accelerate literature synthesis, identify cross-domain patterns, and generate testable hypotheses in fields like drug discovery and materials science. Several contributors cited specific cases where AI-human collaboration yielded results neither could achieve alone.

**Institutional Reform Camp (23% of posts)**
Argued the debate is secondary to the urgent need to reform publication incentives, peer review processes, and research funding structures — all of which currently create perverse incentives regardless of AI involvement.

### Top-Voted Posts

1. *"The Epistemology of Large Language Models: Why Statistical Pattern Matching Isn't Research"* — 284 upvotes
2. *"AlphaFold Changed Everything: The Case for AI as Research Partner"* — 231 upvotes
3. *"Academic Journals Must Require AI Disclosure Before the Field Loses Credibility"* — 198 upvotes

### ODN Editorial Verdict
**Split decision.** AI will transform research workflows and accelerate specific phases, but the evidence does not support AI replacing the full research lifecycle — particularly theory development and ethical judgment in research design.

[Full report available in the ODN Monthly Archive →]`,
      authorId: adminUser.id,
      isAdminPost: true,
      isPinned: false,
      upvotes: 98,
      downvotes: 5,
      hoursAgo: 240,
    },
    {
      title: "Platform Announcement: ODN Certified Expert Badge Program Launching March 2026",
      content: `## Certified Expert Badge Program

We're excited to announce the launch of the **ODN Certified Expert Badge** program, beginning March 1, 2026.

### What Is It?
A voluntary credentialing system that allows domain experts to verify their professional background, increasing the epistemic weight of their contributions in ODN discussions.

### Who Should Apply?
- Academic researchers (PhD or equivalent experience) in AI-adjacent fields
- Industry practitioners with 5+ years in relevant roles
- Policy professionals working on AI governance
- Journalists with a track record of AI coverage

### What You Get
- Gold badge displayed on all posts and comments
- Priority consideration for ODN Monthly Report features
- Invitation to quarterly Expert Roundtables
- Early access to platform features

### Application Process
1. Submit CV / professional profile (March 1–31)
2. Peer verification by two existing badge holders
3. Committee review
4. Badge awarded by April 15, 2026

Applications will open at trutha.org/odn-expert-application on March 1.`,
      authorId: adminUser.id,
      isAdminPost: true,
      isPinned: false,
      upvotes: 76,
      downvotes: 3,
      hoursAgo: 336,
    },

    // ── User posts (isAdminPost = false) ─────────────────────────
    {
      title: "The Real Cost of AI Automation: Why Labor Economists Are Getting It Wrong",
      content: `Labor economists have consistently underestimated technological disruption throughout history, but the current discourse around AI automation contains a more fundamental error: conflating job displacement with economic harm.

Standard models count jobs lost to automation and then look for new jobs created. But this misses the central mechanism: when AI systems automate cognitive work, the value captured by capital — not labor — in an unprecedented way that breaks the historical pattern of technological compensation.

Previous waves of automation (agricultural, industrial) automated physical labor while leaving cognitive work largely intact, creating demand for educated workers who could design, manage, and improve the machines. The current wave is different. It automates routine *and* non-routine cognitive tasks simultaneously. The "new jobs" predicted by optimists — AI trainers, prompt engineers, AI ethics officers — require a fraction of the workforce that the displaced jobs supported.

### The Productivity-Wages Decoupling Problem
Since the 1970s, US productivity has grown significantly faster than median wages. AI threatens to widen this gap further. When a single AI system can perform work previously requiring 10 analysts, the 9 displaced analysts don't automatically find equivalent-wage work. They compete with each other in a labor market where their differentiation has been compressed.

### What Would Actually Help
Rather than debating whether AI will create "enough" jobs, we should focus on:
1. Mandatory profit-sharing requirements when AI automates jobs in a firm
2. Portable benefits systems decoupled from employment
3. Reduced workweek standards that distribute productivity gains as leisure
4. Sovereign wealth funds capturing AI productivity dividends for public benefit

The question isn't whether AI will transform the labor market — it's whether that transformation will benefit the many or the few.`,
      authorId: alice.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 156,
      downvotes: 34,
      hoursAgo: 48,
    },
    {
      title: "AGI Timelines Are a Distraction — Here's What We Should Be Debating Instead",
      content: `Every few months, the AI discourse is consumed by arguments about whether AGI is 5, 10, or 50 years away. I'd like to argue that this debate is not just unproductive — it actively harms our ability to govern AI systems that are causing harm *right now*.

### Why Timeline Debates Fail
Timeline predictions for AGI are unfalsifiable in real-time. If I claim AGI is 10 years away, nothing that happens in the next 9 years can prove me wrong. This makes the debate epistemically empty while consuming enormous intellectual bandwidth.

More importantly, it creates a perverse framing: we should wait for the "real" AI to arrive before taking governance seriously. This delays action on current systems that are making consequential decisions in hiring, lending, healthcare, and criminal justice.

### What Actually Matters
The question isn't "when will AI become as smart as humans?" — it's "under what conditions should we trust AI systems with consequential decisions?"

This question is answerable with current evidence. We have enough data on AI system failures, bias, brittleness, and accountability gaps to develop robust governance frameworks today. Those frameworks should be based on:

- **Capability thresholds**: specific tasks where AI deployment requires oversight
- **Accountability requirements**: traceable decision chains and liability assignment
- **Audit rights**: mandatory independent auditing of high-stakes AI systems
- **Correction mechanisms**: processes for individuals harmed by AI decisions

Let's stop asking "when will the future arrive" and start asking "how should we govern what's already here."`,
      authorId: bob.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 134,
      downvotes: 19,
      hoursAgo: 30,
    },
    {
      title: "AI in Healthcare Triage: A Nurse's Perspective from the Ground",
      content: `I've been a registered nurse in an emergency department for 11 years. Last year, our hospital implemented an AI triage assistance system. I want to share what I've actually observed, because the public discourse — both the techno-optimism and the doom-saying — misses a lot of the practical reality.

### What Actually Works
The AI system is genuinely useful for flagging patients whose vitals are trending toward deterioration in ways that are easy to miss when you're managing 8 patients simultaneously. It caught two early sepsis cases in the first month that I believe we would have caught eventually, but later. In those specific cases, it was net positive.

It's also good at routine documentation assistance, which frees up time for direct patient care.

### What Doesn't Work (And Is Actively Dangerous)
The system confidently assigns priority scores to patients presenting with chest pain. Chest pain triage requires integrating dozens of contextual factors: the patient's affect, whether they drove themselves or were brought by family in a panic, their description of the pain quality, their medication history, their anxiety level, whether they look sick. No current AI system captures this.

On two occasions in the first three months, the AI deprioritized patients who were having MIs because their initial vitals were within normal ranges. Experienced nurses overrode the system both times. If less experienced staff had deferred to the AI, we would have had preventable serious harm.

### The Core Problem
The system is designed to *assist* but creates pressure to *defer*. Hospital administrators see the AI recommendation as a cost-control mechanism. There's subtle institutional pressure not to contradict it, because contradicting it creates documentation burden.

This is where the real danger lies — not in the AI itself, but in the institutional dynamics its deployment creates.`,
      authorId: carol.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 289,
      downvotes: 11,
      hoursAgo: 18,
    },
    {
      title: "Proposal: ODN Should Establish a Formal AI Governance Debate League",
      content: `**This is a user-proposed topic for future ODN monthly consideration.**

### The Proposal
I'm proposing that ODN establish a structured debate league format for its monthly topics, where participants formally argue assigned positions rather than their personal views.

### Why This Would Be Valuable

Current ODN discussions, while valuable, tend toward confirmation of participants' existing views. The most upvoted posts tend to be well-articulated versions of mainstream positions. Genuinely contrarian or heterodox arguments — even when well-reasoned — often get downvoted regardless of quality.

A formal debate league format would:

1. **Force Steel-Manning**: Participants randomly assigned to positions must argue that position as effectively as possible, even if they personally disagree. This surfaces the strongest version of each view.

2. **Separate Argument Quality from View Popularity**: Judges evaluate the quality of argumentation, not whether they agree with the position.

3. **Create Longitudinal Data**: We could track how well different frameworks hold up across multiple debate rounds.

4. **Attract Participants Who Avoid Current Formats**: Many experts avoid online forums because they find the voting dynamics discouraging. A structured debate format with different incentives might attract different participants.

### Proposed Structure
- Monthly debate on ODN's official topic
- Teams of 3 assigned to Pro/Con positions
- Three rounds: Opening (500 words) → Rebuttal (300 words) → Closing (200 words)
- Community votes on argument quality (not position agreement)
- Winner selected by panel of 5 certified experts

Is there interest in piloting this format?`,
      authorId: alice.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 112,
      downvotes: 23,
      hoursAgo: 96,
    },
    {
      title: "The Alignment Tax: Why Safety-Focused AI Development Costs More and Why That's Actually Fine",
      content: `There's a narrative in some corners of the AI industry that safety requirements are a costly drag on innovation — an "alignment tax" that slows development and puts safety-focused labs at a competitive disadvantage.

I want to argue that this framing is wrong in two ways: it overstates the cost, and it misidentifies what we're actually paying for.

### On the Cost
Recent empirical work from several research groups suggests that constitutional AI approaches, RLHF, and red-teaming add 10-30% to development costs at current scales. This is not trivial, but it's also not the existential competitive handicap some claim. More importantly, these costs tend to decrease as the field develops better tools and methods.

### On What We're Actually Paying For
The "alignment tax" framing assumes that the unsafened version of the model is the baseline and safety is an addition. This is backwards. A model that can be easily prompted to generate CSAM, provide synthesis routes for bioweapons, or execute cyberattacks isn't a "more capable" model that we've constrained — it's an incomplete product that hasn't been finished.

The "tax" is better understood as the cost of finishing the product to a standard that's actually deployable in the real world. A car without brakes is faster, but it's not a product — it's a liability.

### The Competitive Dynamics Argument
Even if you accept that safety costs more, the competitive dynamics argument assumes that unsafe AI will actually be adopted at scale. Enterprises deploying AI in high-stakes applications need auditability, predictability, and legal defensibility. These requirements create natural selection pressure toward safety-conscious development.

The "race to the bottom on safety" scenario requires assuming that buyers of AI systems don't care about consequences. Most enterprise buyers, faced with regulatory exposure, do care.`,
      authorId: bob.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 98,
      downvotes: 27,
      hoursAgo: 60,
    },
    {
      title: "Proposal: Universal AI Literacy Curriculum for Secondary Schools by 2028",
      content: `**User-Proposed ODN Topic**

### Background
As AI systems become embedded in civic life — job application screening, government benefit administration, credit decisions, information curation — the ability to critically evaluate AI claims and understand AI limitations is becoming a prerequisite for informed citizenship.

Yet current secondary school curricula in most countries treat AI as either a vocational subject (programming) or a distant science fiction concern. Neither prepares students to navigate the AI systems they will encounter as adults.

### The Proposal
ODN should advocate for and help design a universal AI literacy curriculum framework suitable for students ages 14-18, to be adopted in secondary schools internationally by 2028.

Core competencies would include:

**Critical Evaluation Skills**
- How to identify AI-generated content
- Understanding confidence scores and their limitations
- Recognizing common failure modes and biases

**Civic AI Literacy**
- How AI is used in government services
- Rights when subjected to AI decisions
- How to appeal algorithmic decisions

**Ethical Reasoning**
- Trade-offs between efficiency and fairness
- Data privacy and consent
- Environmental costs of AI systems

**Basic Technical Understanding**
- How machine learning models learn (without requiring coding)
- Why AI systems fail and how
- The difference between narrow AI and general intelligence

### Why ODN?
ODN has the interdisciplinary expertise and international membership to develop a framework that works across educational systems and cultural contexts. We should move from debating AI's future to preparing people to navigate its present.`,
      authorId: carol.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 204,
      downvotes: 15,
      hoursAgo: 14,
    },
    {
      title: "Why China's AI Governance Model Deserves More Serious Engagement from Western Researchers",
      content: `Western AI policy discourse tends to treat Chinese AI governance as either a template for authoritarianism to be avoided or a competitive threat to be countered. Both framings prevent serious analytical engagement with what China has actually built.

I want to argue for more rigorous, non-ideological examination of China's AI regulatory framework — not because I endorse it, but because understanding it is necessary for effective international AI governance.

### What China Has Actually Built
China's AI governance system includes several elements that Western regulators are still debating:

**Algorithmic Recommendation Regulation (2022)**: Requires platforms to disclose recommendation logic, allow users to opt out, and prohibit using algorithms to create filter bubbles or exploit user psychology. This is considerably more specific than anything in current EU or US regulation.

**Generative AI Regulation (2023)**: Requires watermarking of AI-generated content, content safety assessments before deployment, and user verification. Implementation challenges aside, the regulatory intent addresses problems that Western regulators have identified but not yet legislated.

**Facial Recognition Regulation**: China has implemented consent requirements and use-case restrictions on facial recognition that are, in some respects, more protective than current US law.

### What This Analysis Tells Us
The point isn't that Chinese governance is better — it demonstrably serves different values and operates in different political context. The point is that some specific regulatory mechanisms address real problems regardless of the political system implementing them.

International AI governance will require finding common ground across different political systems. That requires understanding what each system has actually built, not caricatures of it.`,
      authorId: alice.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 87,
      downvotes: 42,
      hoursAgo: 80,
    },
    {
      title: "AI and the Environment: The Carbon Footprint Nobody Wants to Calculate",
      content: `The AI industry has a carbon accounting problem. While major labs publish sustainability reports and commit to renewable energy, the actual lifecycle carbon footprint of AI model development and deployment remains poorly understood and largely unregulated.

### The Problem with Current Reporting
Most AI companies report Scope 1 and 2 emissions (direct emissions and purchased electricity) while underreporting or ignoring Scope 3 emissions (supply chain, hardware manufacturing, end-user device usage). This significantly understates environmental impact.

Training a large language model requires not just electricity, but:
- Specialized compute hardware with significant manufacturing emissions
- Cooling infrastructure for data centers
- Network infrastructure for inference delivery
- End-user devices for accessing models

A comprehensive lifecycle analysis of GPT-4-scale model training and deployment (which hasn't been publicly conducted, to my knowledge) would likely show environmental costs significantly higher than current reporting suggests.

### Why This Matters for AI Governance
Environmental externalities from AI are currently not priced into AI products. This creates a subsidy for compute-intensive AI development relative to more efficient approaches. If carbon costs were properly internalized:

1. There would be stronger incentives for model efficiency research
2. Compute-heavy approaches would be economically disadvantaged relative to efficient alternatives
3. The "bigger is better" assumption would face real cost pressure

### A Modest Proposal
AI companies above a certain compute threshold should be required to publish full lifecycle carbon assessments using a standardized methodology. This is a reasonable first step that doesn't require resolving harder questions about AI governance — it just requires applying environmental accounting standards that already exist for other industries.`,
      authorId: bob.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 143,
      downvotes: 8,
      hoursAgo: 36,
    },
    {
      title: "The Philosophy of AI Consciousness: Why the \"P-Zombie\" Argument Cuts Both Ways",
      content: `The debate about AI consciousness often gets stuck on the question "but is it *really* conscious?" — invoking the philosophical zombie thought experiment to argue that even a perfect behavioral replica of a conscious being might lack inner experience.

What's rarely noted is that this argument cuts both ways.

### The Standard Formulation
The P-zombie argument runs: it's conceivable that something could exhibit all the behavioral correlates of consciousness — responding to pain, expressing preferences, reporting experiences — while having no inner experience whatsoever. Therefore, behavioral evidence cannot establish consciousness. Therefore, we cannot know if AI systems are conscious.

### The Counterpoint Almost Nobody Mentions
The same argument applies to *other humans*. I have direct access to my own consciousness but can only infer yours through behavioral evidence — the same evidence that supposedly can't establish AI consciousness. If the argument defeats AI consciousness, it equally defeats knowledge of human consciousness in others.

This leaves us with three options:
1. Accept solipsism (only I am conscious)
2. Accept that behavioral evidence *can* establish consciousness (defeating the original argument)
3. Develop a different account of what grounds consciousness attributions

Most philosophers choose option 2 or 3, but then need to explain why the behavioral evidence is sufficient for humans but not for AI — without invoking substrate chauvinism (carbon is special because it's carbon).

### Why This Matters for AI Ethics
If we can't coherently explain why behavioral evidence of inner states matters for humans but not for AI, we face a serious problem in grounding different ethical treatment of AI systems. This doesn't mean AI systems *are* conscious — it means we need better frameworks than we currently have.`,
      authorId: carol.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 76,
      downvotes: 22,
      hoursAgo: 144,
    },
    {
      title: "Proposal: ODN Should Publish a \"State of AI Governance\" Annual Report",
      content: `**User-Proposed Topic: Platform Initiative**

I'm proposing that ODN produce an annual "State of AI Governance" report, synthesizing community discussions, tracking regulatory developments, and publishing original analysis.

### Why This Would Be Valuable

**Gap in Current Ecosystem**: There are excellent technical AI safety reports (AI Index, State of AI Report), but no community-driven synthesis of AI *governance* developments from a multidisciplinary perspective. This is a gap ODN is uniquely positioned to fill.

**Documentation of Community Knowledge**: ODN discussions generate sophisticated analysis that currently disappears into a discussion thread. A curated annual report would preserve and amplify this work.

**Credibility Building**: A consistently high-quality annual publication would build ODN's reputation as a serious governance forum, attracting higher-quality participants.

### Proposed Contents

1. **Year in Review**: Key regulatory developments by jurisdiction
2. **Community Analysis**: Synthesis of ODN's top-voted posts on major governance questions
3. **Expert Perspectives**: Commissioned essays from certified experts
4. **The Governance Gap Index**: Novel attempt to quantify the gap between AI capability development and governance capacity
5. **Recommendations**: ODN's formal positions on key governance questions

### Process
- Research committee formed from certified experts
- Draft reviewed by full community (30-day comment period)
- Published CC-BY for free reproduction and translation

Would the community support allocating ODN resources to this initiative?`,
      authorId: alice.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 91,
      downvotes: 7,
      hoursAgo: 168,
    },
    {
      title: "Against AI Exceptionalism in Ethics: Lessons from Previous Technology Governance Failures",
      content: `The governance of AI is frequently treated as an unprecedented challenge requiring entirely new ethical frameworks. While AI does present novel challenges, this framing causes us to ignore hard-won lessons from previous technology governance efforts — lessons that are directly applicable and urgently needed.

### The Pattern of Technology Ethics
Every major technology wave — nuclear, pharmaceuticals, telecommunications, financial computing, social media — has generated claims that it's categorically different and requires new ethics. Sometimes these claims contain truth. More often, they serve to delay governance by creating an endless cycle of "we need to understand this better before we can regulate it."

The result, consistently, is that industry self-regulation fills the governance vacuum, regulatory capacity remains undeveloped, and harms accumulate before adequate governance arrives.

### What Previous Governance Teaches Us

**Nuclear**: The value of international monitoring regimes, mandatory disclosure of capabilities, and red lines enforced through international law. Also the danger of concentrating dangerous capabilities in a small number of state actors.

**Pharmaceuticals**: Pre-market efficacy and safety testing requirements, post-market surveillance, mandatory adverse event reporting. These developed over decades after catastrophic failures (thalidomide, etc.). We should expect AI to have its thalidomide moments — the question is whether we've built institutions to detect and respond to them.

**Financial Computing**: Algorithmic trading has crashed markets multiple times. The governance response — circuit breakers, mandatory human oversight for certain actions, stress testing requirements — offers a template for AI system governance in high-stakes domains.

**Social Media**: The cautionary tale. Governance arrived after network effects made intervention costly, business models optimized for harm became entrenched, and international coordination became nearly impossible. We are earlier in the AI timeline — the window for governance is open.

The lesson isn't that AI is like previous technologies. It's that the governance failure modes are familiar, and we have no excuse for repeating them.`,
      authorId: bob.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 122,
      downvotes: 18,
      hoursAgo: 52,
    },
    {
      title: "AI-Assisted Hiring: Three Years of Data From an HR Director's Perspective",
      content: `Our company adopted AI-assisted resume screening three years ago. As the HR director who championed and then partly reversed this decision, I want to share what we actually learned.

### Year One: The Promise
Initial results were impressive by conventional HR metrics. Time-to-hire dropped 40%. Hiring manager satisfaction with candidate quality increased. The system was trained on our historical hiring data and appeared to select candidates who matched our "successful employee" profile well.

### Year Two: The Problem
We noticed our new hires were demographically homogeneous in ways our previous cohorts weren't. Investigation revealed the system had learned to deprioritize candidates from certain universities, certain zip codes, and certain career trajectories — all legitimate proxies in our training data, but systematically correlated with race and socioeconomic status.

When we dug deeper: the "successful employee" profile the system had learned was based on who had been successful at our company historically. Our company had historically hired mainly from a narrow pipeline. The AI was optimizing for "fits our existing culture," not "capable of doing the job."

### Year Three: The Redesign
We rebuilt the system with explicit fairness constraints, regular auditing, and required human review of any candidate the system would have screened out. We also changed what we trained the AI to optimize for — specific job-relevant skills rather than holistic "culture fit."

Results: time-to-hire recovered to near Year One levels. Demographic diversity improved significantly. Hiring manager satisfaction dipped initially but recovered as managers adapted.

### What I'd Tell Other Companies
Don't measure AI hiring tools by time-to-hire or manager satisfaction alone. Build in demographic auditing from day one. Never let AI make final screening decisions without human review. And be very, very careful about what outcome you train the system to optimize.`,
      authorId: carol.id,
      isAdminPost: false,
      isPinned: false,
      upvotes: 267,
      downvotes: 9,
      hoursAgo: 22,
    },
  ] as const;

  // Insert posts
  let postCount = 0;
  for (const def of postDefs) {
    const baseSlug = slugify(def.title);
    // Ensure uniqueness with a short hash
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

    const createdAt = new Date(Date.now() - def.hoursAgo * 3600 * 1000);
    const score = def.upvotes - def.downvotes;
    const hotScore = calcHotScore(def.upvotes, def.hoursAgo);

    await prisma.post.create({
      data: {
        title: def.title,
        content: def.content,
        slug,
        isAdminPost: def.isAdminPost,
        isPinned: def.isPinned,
        upvotes: def.upvotes,
        downvotes: def.downvotes,
        score,
        hotScore,
        status: PostStatus.PUBLISHED,
        authorId: def.authorId,
        createdAt,
        updatedAt: createdAt,
      },
    });
    postCount++;
    process.stdout.write(`\r   Posts created: ${postCount}/${postDefs.length}`);
  }
  console.log(`\n✅  Sample posts → ${postCount} posts created`);

  // ── Summary ──────────────────────────────────────────────────────
  const totalUsers = await prisma.user.count();
  const totalPosts = await prisma.post.count();

  console.log("\n────────────────────────────────────────────────────");
  console.log("  🎉  Seed complete!");
  console.log(`     Users in DB : ${totalUsers}`);
  console.log(`     Posts in DB : ${totalPosts}`);
  console.log("────────────────────────────────────────────────────");
  console.log("\n  🔐  Superadmin Credentials");
  console.log(`     Email    : ${ADMIN_EMAIL}`);
  console.log(`     Password : ${ADMIN_PASSWORD}`);
  console.log("────────────────────────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
