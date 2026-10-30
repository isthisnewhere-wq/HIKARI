const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const SITE_ORIGIN = (process.env.SITE_ORIGIN || `http://localhost:${PORT}`).replace(/\/$/, '');
const CHECKED = '27 October 2026';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const link = (href, label, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${href}">${label}</a>`;

const pages = [
  {
    path: '/', slug: 'home', short: 'Home', title: 'Study Abroad Planning, Grounded in Your Goals | HIKARI Itahari',
    description: 'Explore study options in Japan, Australia and the USA with HIKARI Study Abroad Consultancy in Itahari, Nepal.',
    h1: 'Make your next study decision with more clarity.', eyebrow: 'A brighter place to begin', theme: 'home', index: true,
    intro: 'HIKARI Study Abroad Consultancy is based in Itahari, Nepal. If you are considering study in Japan, Australia or the USA, start by exploring the official information and asking what support HIKARI can confirm for your situation.',
    body: `<section class="section"><div class="section-heading"><p class="eyebrow">Choose a direction</p><h2>Three places to explore</h2><p>Each destination has its own institutions, costs and official processes. Start with the country that best matches what you want to study.</p></div><div class="card-grid three">${destinationCard('/study-in-japan/', 'Japan', 'Explore study pathways and official student information for Japan.', '01')} ${destinationCard('/study-in-australia/', 'Australia', 'Review study choices and current student visa information.', '02')} ${destinationCard('/study-in-usa/', 'United States', 'Begin with school research and official U.S. student visa guidance.', '03')}</div></section>
      <section class="section split"><div><p class="eyebrow">A useful first step</p><h2>Start with your goals, then check the details.</h2><p>Make a short list of the subjects you are interested in, the level of study you have in mind and the questions you want answered. HIKARI’s specific consultation and application services need confirmation from the business; official entry and admission requirements should always be checked with the institutions and authorities responsible for them.</p>${link('/study-abroad-consultancy-itahari/', 'See the Itahari consultancy page', 'text-link')}</div><aside class="note-card"><span class="note-index">Before you decide</span><h3>Use official sources for current rules</h3><p>Visa requirements and application procedures can change. Our destination pages link to official sources, checked on ${CHECKED}. Always recheck them before acting.</p>${link('/visa-admissions-disclaimer/', 'Read the admissions and visa disclaimer', 'text-link')}</aside></section>
      <section class="section band"><div><p class="eyebrow">Based in Itahari</p><h2>A local starting point, with clear details.</h2><p>The business address and phone number supplied to us are awaiting owner verification. We do not publish unverified hours or show an unconfirmed map pin.</p>${link('/office-location/', 'Review the supplied location details', 'button button-light')}</div><div class="band-mark" aria-hidden="true">光</div></section>
      <section class="section"><div class="section-heading"><p class="eyebrow">The next conversation</p><h2>Bring your questions, not sensitive documents.</h2><p>Before sharing personal records, confirm directly with HIKARI what it handles and how information is protected. This site does not offer document uploads or a submission form.</p>${link('/contact/', 'View contact information and review notes', 'button')}</div></section>`,
    faqs: [
      ['Which destinations does HIKARI say it handles?', 'The business brief names Japan, Australia and the USA. The exact support offered for each destination should be confirmed with HIKARI.'],
      ['Can HIKARI guarantee admission or a visa?', 'No. Admission decisions belong to schools and visa decisions belong to the responsible government authorities.'],
      ['Are the contact details ready to use?', 'The supplied phone and address are shown on the contact and location pages with owner-verification notes. The phone is not yet a call link.']
    ]
  },
  {
    path: '/study-abroad-consultancy-itahari/', slug: 'itahari', short: 'Itahari consultancy', title: 'Study Abroad Consultancy in Itahari | HIKARI',
    description: 'Learn about HIKARI Study Abroad Consultancy in Itahari and explore study options for Japan, Australia and the USA.',
    h1: 'Start your study abroad plans in Itahari with HIKARI', eyebrow: 'Local consultancy · Itahari, Nepal', theme: 'local', index: true,
    intro: 'HIKARI Study Abroad Consultancy Pvt. Ltd. is described by its owner as a study-abroad consultancy in Itahari, Sunsari, Koshi Province, Nepal. The name, address and contact number on this draft site still need owner confirmation.',
    body: `<section class="section split"><div><p class="eyebrow">Who this page is for</p><h2>Students beginning to compare options</h2><p>If you are considering study overseas from Nepal, begin with the subject and level you want to pursue. Then compare destination, course and institution details using sources that are current and official.</p><p>HIKARI says it handles Japan, Australia and the USA. Its specific counselling, admission or documentation services have not yet been confirmed, so ask the business to describe its scope before relying on it.</p></div><aside class="note-card"><span class="note-index">Candidate search topic</span><h3>“Study abroad consultancy in Itahari”</h3><p>This is a topic hypothesis for the page, not a validated keyword or demand claim.</p></aside></section>
      <section class="section"><div class="section-heading"><p class="eyebrow">A clear way to prepare</p><h2>Questions to take into a first conversation</h2></div><div class="card-grid three"><article class="plain-card"><span class="card-no">01</span><h3>What do I want to study?</h3><p>Note the subjects, qualification level and learning environment you are considering.</p></article><article class="plain-card"><span class="card-no">02</span><h3>What can HIKARI confirm?</h3><p>Ask which services it provides, what they cost, and what is outside its role.</p></article><article class="plain-card"><span class="card-no">03</span><h3>Which rules should I verify?</h3><p>Check admission and immigration information with the school and official authorities.</p></article></div></section>
      <section class="section band"><div><p class="eyebrow">Explore destinations</p><h2>Compare official information side by side.</h2><p>Choose a country page for a short orientation and direct links to the relevant official sources.</p>${link('/study-destinations/', 'Browse destinations and services', 'button button-light')}</div><div class="band-mark" aria-hidden="true">↗</div></section>`,
    faqs: [
      ['Where is HIKARI located?', 'The supplied location is Itahari, Sunsari, Koshi Province, Nepal. The street-level address and map pin are awaiting owner confirmation.'],
      ['What services does the consultancy provide?', 'Only the business category and destinations are supplied so far. Ask HIKARI to confirm its actual services, fees and terms.'],
      ['Does HIKARI decide admission or visas?', 'No. Institutions decide admissions and the relevant authorities decide visas.']
    ]
  },
  {
    path: '/study-in-japan/', slug: 'japan', short: 'Japan', title: 'Study in Japan from Nepal | Official Planning Links | HIKARI',
    description: 'A starting point for students in Nepal exploring study in Japan, with links to Japanese government and Embassy of Japan sources.',
    h1: 'Explore your study pathway to Japan from Nepal', eyebrow: 'Destination guide · Japan', theme: 'japan', index: true,
    intro: 'Japan may be one option to consider if you are planning to study overseas from Nepal. Compare institutions and courses for your goals, then use official Japanese sources for current education and visa information.',
    body: `<section class="section split"><div><p class="eyebrow">Study planning</p><h2>Choose a school and course that fit your aims.</h2><p>Start by identifying your intended level, subject, language of instruction and possible start date. Compare information directly from schools and the official Study in Japan portal. Requirements differ by programme and institution.</p><p>HIKARI lists Japan as a destination it handles. What support it offers with school selection or applications has not been confirmed; ask before assuming a service is included.</p></div><aside class="note-card"><span class="note-index">Keep sources in their lane</span><h3>Education and immigration are separate checks.</h3><p>Use the school’s official pages for admission. Use Japan’s official visa information and the Embassy of Japan in Nepal for visa procedures.</p></aside></section>
      <section class="section"><div class="section-heading"><p class="eyebrow">Official sources</p><h2>Check the latest information at its source</h2><p>Links checked ${CHECKED}. Requirements can change; confirm details directly before making plans.</p></div><div class="source-list"><a href="https://www.studyinjapan.go.jp/en/" target="_blank" rel="noopener noreferrer"><span>01</span><div><h3>Study in Japan — official website</h3><p>Explore information for prospective international students.</p></div><span class="external-mark" aria-hidden="true">↗</span></a><a href="https://www.np.emb-japan.go.jp/itpr_en/visa.html" target="_blank" rel="noopener noreferrer"><span>02</span><div><h3>Embassy of Japan in Nepal — visa information</h3><p>Check the Embassy’s current visa guidance and instructions for applicants in Nepal.</p></div><span class="external-mark" aria-hidden="true">↗</span></a></div></section>
      <section class="section band"><div><p class="eyebrow">Keep planning</p><h2>Write down what you still need to verify.</h2><p>Course entry criteria, language expectations, costs and current visa instructions should be checked against the school and official sources.</p>${link('/study-abroad-consultancy-itahari/', 'See HIKARI’s Itahari page', 'button button-light')}</div><div class="band-mark" aria-hidden="true">灯</div></section>`,
    faqs: [
      ['Where can I check Japanese study options?', 'Use the official Study in Japan website and the official pages of individual institutions.'],
      ['Where should I check visa information in Nepal?', 'Review the Embassy of Japan in Nepal’s visa information page and follow its current instructions.'],
      ['Can HIKARI promise a place or visa?', 'No. Schools make admission decisions and the relevant Japanese authorities make visa decisions.']
    ]
  },
  {
    path: '/study-in-australia/', slug: 'australia', short: 'Australia', title: 'Study in Australia from Nepal | Official Planning Links | HIKARI',
    description: 'Explore study planning in Australia from Nepal and check current student visa details with Australia’s Department of Home Affairs.',
    h1: 'Compare Australian study options with a clear plan', eyebrow: 'Destination guide · Australia', theme: 'australia', index: true,
    intro: 'If Australia is on your list, compare courses and education providers against your academic interests and budget. Use Australia’s Department of Home Affairs for current visa information; its requirements and processes may change.',
    body: `<section class="section split"><div><p class="eyebrow">Course research</p><h2>Look beyond the course title.</h2><p>Check the official course and provider pages for entry criteria, location, study format, fees and dates. Research living costs for the specific place you are considering rather than relying on a general estimate.</p><p>HIKARI says it handles Australia. Specific counselling, provider selection or application services are not confirmed on this site; ask the business to set out its role and any fees.</p></div><aside class="note-card"><span class="note-index">Two separate sources</span><h3>Provider information and visa rules</h3><p>Institutions publish their course and admission requirements. The Australian Government publishes immigration requirements.</p></aside></section>
      <section class="section"><div class="section-heading"><p class="eyebrow">Official source</p><h2>Use the live government guidance</h2><p>Link checked ${CHECKED}. Read the full current instructions directly before applying or making travel plans.</p></div><div class="source-list"><a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" target="_blank" rel="noopener noreferrer"><span>01</span><div><h3>Australian Department of Home Affairs — Student visa (subclass 500)</h3><p>Current government information about the Student visa, eligibility and application steps.</p></div><span class="external-mark" aria-hidden="true">↗</span></a></div><p class="source-note">This page does not summarize eligibility, costs or processing times. Consult the live official source for your circumstances.</p></section>
      <section class="section band"><div><p class="eyebrow">Compare thoughtfully</p><h2>Keep your course goals at the centre.</h2><p>Make a shortlist of providers, then confirm admissions information with each institution.</p>${link('/study-destinations/', 'Compare all listed destinations', 'button button-light')}</div><div class="band-mark" aria-hidden="true">↗</div></section>`,
    faqs: [
      ['Where do I find current Student visa information?', 'The Australian Department of Home Affairs page for the Student visa (subclass 500) is the official source linked above.'],
      ['Can an adviser determine whether I qualify?', 'No. Only the responsible authorities assess a visa application.'],
      ['Are HIKARI’s Australia services confirmed?', 'Australia is a supplied destination. Specific services and fees still need confirmation from HIKARI.']
    ]
  },
  {
    path: '/study-in-usa/', slug: 'usa', short: 'USA', title: 'Study in the USA from Nepal | Official Planning Links | HIKARI',
    description: 'A study planning starting point for students in Nepal considering the United States, with official U.S. student visa and EducationUSA links.',
    h1: 'Find a thoughtful starting point for study in the United States', eyebrow: 'Destination guide · United States', theme: 'usa', index: true,
    intro: 'If you are considering the United States, first explore schools and programmes that match your interests and academic preparation. For visa procedures, use the U.S. Department of State and the official EducationUSA advising network.',
    body: `<section class="section split"><div><p class="eyebrow">School research</p><h2>Build a shortlist around your own priorities.</h2><p>Compare institution pages for programme content, admissions criteria, application dates and published costs. The school is the source for its own admission requirements.</p><p>HIKARI lists the USA as a destination it handles. This site does not confirm a particular school-selection, application or interview-preparation service; ask the consultancy directly what it provides.</p></div><aside class="note-card"><span class="note-index">Official visa information</span><h3>Follow the U.S. government’s current instructions.</h3><p>Student visa categories and application instructions are set by U.S. authorities. Read the current State Department guidance for your case.</p></aside></section>
      <section class="section"><div class="section-heading"><p class="eyebrow">Official sources</p><h2>Start with these U.S. government resources</h2><p>Links checked ${CHECKED}. Verify current details directly before acting.</p></div><div class="source-list"><a href="https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html" target="_blank" rel="noopener noreferrer"><span>01</span><div><h3>U.S. Department of State — Student Visa</h3><p>Official information about U.S. student visa categories and application guidance.</p></div><span class="external-mark" aria-hidden="true">↗</span></a><a href="https://educationusa.state.gov/" target="_blank" rel="noopener noreferrer"><span>02</span><div><h3>EducationUSA</h3><p>U.S. Department of State network sharing information about studying in the United States.</p></div><span class="external-mark" aria-hidden="true">↗</span></a><a href="https://educationusa.state.gov/your-5-steps-us-study" target="_blank" rel="noopener noreferrer"><span>03</span><div><h3>EducationUSA — Your 5 Steps to U.S. Study</h3><p>Official overview for researching U.S. study options.</p></div><span class="external-mark" aria-hidden="true">↗</span></a></div></section>
      <section class="section band"><div><p class="eyebrow">Stay organized</p><h2>Keep school decisions and visa decisions distinct.</h2><p>Use institutional sources for admission and official U.S. government sources for immigration questions.</p>${link('/visa-admissions-disclaimer/', 'Read the visa and admissions disclaimer', 'button button-light')}</div><div class="band-mark" aria-hidden="true">光</div></section>`,
    faqs: [
      ['Where should I research U.S. programmes?', 'Begin with official school websites and EducationUSA’s study resources.'],
      ['Where is official student visa guidance?', 'The U.S. Department of State’s Student Visa page is linked above. Check the page for current instructions.'],
      ['Does HIKARI decide who receives a visa?', 'No. Visa determinations are made by U.S. authorities.']
    ]
  },
  {
    path: '/application-visa-guidance/', slug: 'application', short: 'Application guidance', title: 'Application and Visa Guidance | HIKARI — Draft for Owner Review',
    description: 'Draft service page awaiting confirmation of HIKARI’s application and visa guidance services.',
    h1: 'Application and visa guidance: a service awaiting confirmation', eyebrow: 'Draft · owner confirmation required', theme: 'draft', index: false,
    intro: 'This page is intentionally a draft. The owner has not confirmed that HIKARI provides application or visa guidance. It should remain noindex until the business confirms this service and its exact scope.',
    body: `<section class="section split"><div><p class="eyebrow">Not a confirmed offer</p><h2>Confirm the service before publishing it.</h2><p>Before making this page public, HIKARI should confirm whether it supports course applications, document preparation, visa form preparation or any other activity. The business should also describe exclusions, fees, privacy practices and who makes each decision.</p><p>Visa and admissions decisions always belong to the responsible authorities and institutions. No consultancy can promise an outcome.</p></div><aside class="note-card"><span class="note-index">Publishing status</span><h3>Draft — noindex</h3><p>This page is excluded from the sitemap and search indexing pending owner review.</p></aside></section><section class="section"><div class="section-heading"><h2>Official requirements still come from official sources.</h2><p>For current requirements, use the relevant government or institution website. See the destination pages for links.</p>${link('/study-destinations/', 'Review destination pages', 'button')}</div></section>`,
    faqs: [['Can visitors rely on this as a list of HIKARI services?', 'No. The page is a clearly marked draft until the owner confirms the services and scope.']]
  },
  {
    path: '/study-destinations/', slug: 'destinations', short: 'Destinations', title: 'Study Destinations and Services | HIKARI',
    description: 'Explore HIKARI’s stated study destinations: Japan, Australia and the USA. Service details are subject to owner confirmation.',
    h1: 'Three study destinations, one place to begin', eyebrow: 'Destinations and services', theme: 'destinations', index: true,
    intro: 'The business brief names Japan, Australia and the USA as HIKARI’s destinations. Each country page points to official information. The specific consultancy services available for each destination need confirmation.',
    body: `<section class="section"><div class="card-grid three">${destinationCard('/study-in-japan/', 'Japan', 'Official study and Embassy visa information for prospective students.', '01')} ${destinationCard('/study-in-australia/', 'Australia', 'Student visa information from the Australian Department of Home Affairs.', '02')} ${destinationCard('/study-in-usa/', 'United States', 'U.S. Department of State and EducationUSA resources.', '03')}</div></section>
      <section class="section split"><div><p class="eyebrow">HIKARI’s stated scope</p><h2>Destinations are confirmed; service details are not.</h2><p>HIKARI identifies itself as a study-abroad consultancy and says it handles these three destinations. No particular application, counselling, language training or visa service has been verified. Ask the business directly for a current written description of its services, fees and terms.</p></div><aside class="note-card"><span class="note-index">Draft service page</span><h3>Application and visa guidance</h3><p>This proposed cross-destination service is awaiting confirmation and is not presented as a current offer.</p>${link('/application-visa-guidance/', 'See the clearly marked draft', 'text-link')}</aside></section>`,
    faqs: [
      ['Which countries are listed?', 'Japan, Australia and the USA, based on the information supplied by the business.'],
      ['Which consultancy services are included?', 'No specific service scope has been verified. Confirm services and fees directly with HIKARI.'],
      ['Are official requirements linked?', 'Yes. Each destination page links to government or official education sources and gives the date the link was checked.']
    ]
  },
  {
    path: '/about/', slug: 'about', short: 'About', title: 'About HIKARI Study Abroad Consultancy | Itahari, Nepal',
    description: 'Learn what is currently confirmed about HIKARI Study Abroad Consultancy in Itahari, Nepal.',
    h1: 'A clear first conversation for students in Itahari', eyebrow: 'About HIKARI', theme: 'about', index: true,
    intro: 'HIKARI Study Abroad Consultancy Pvt. Ltd. is described in the supplied business information as a study-abroad consultancy in Itahari, Nepal, with Japan, Australia and the USA as destinations it handles.',
    body: `<section class="section split"><div><p class="eyebrow">What we can say</p><h2>Start with the facts supplied by the business.</h2><p>The business name, location area and destinations above come from owner-provided information. Its exact legal and display spelling, street address and telephone format are awaiting confirmation.</p><p>No team biographies, qualifications, partnerships, licences, years of experience, student stories or outcome statistics have been supplied, so this page does not claim them.</p></div><aside class="note-card"><span class="note-index">What to ask</span><h3>Make the scope clear before you proceed.</h3><p>Ask what support is offered, what it costs, what is handled by the student and which decisions remain with schools or authorities.</p></aside></section>
      <section class="section band"><div><p class="eyebrow">A practical starting point</p><h2>Compare destinations with reliable information.</h2><p>Read the official sources linked from each destination page, then bring your questions to HIKARI.</p>${link('/study-destinations/', 'Explore the three destinations', 'button button-light')}</div><div class="band-mark" aria-hidden="true">光</div></section>`,
    faqs: [['Is HIKARI affiliated with a university or embassy?', 'No partnership or affiliation has been supplied or claimed on this site.']]
  },
  {
    path: '/contact/', slug: 'contact', short: 'Contact', title: 'Contact HIKARI | Contact Details Awaiting Verification',
    description: 'Review the contact details supplied for HIKARI Study Abroad Consultancy; owner verification is required before use.',
    h1: 'Get in touch with HIKARI in Itahari', eyebrow: 'Contact · owner review required', theme: 'contact', index: false,
    intro: 'The phone and street address below were copied from the business brief exactly as supplied. HIKARI must confirm them before they are used for calls, directions or public contact.',
    body: `<section class="section"><div class="contact-sheet"><div><p class="eyebrow">Phone — verify before calling</p><h2>974-3845207</h2><p>Number copied as supplied. Its format and intended country code have not been confirmed, so it is shown as text and is not a click-to-call link.</p></div><div><p class="eyebrow">Address — verify spelling and pin</p><h2>“magic station, ithari-06, pachim laine, 56705”</h2><p>Address copied as supplied. Please confirm ward, street spelling, postal code and the exact map pin.</p></div><div><p class="eyebrow">Hours</p><h2>Not published</h2><p>Hours from the supplied listing were unverified and are not presented as business hours.</p></div></div></section><section class="section"><div class="section-heading"><h2>No inquiry form is available yet.</h2><p>This site does not collect inquiry details or allow uploads. Do not send passport, financial or other sensitive documents through an unverified channel. Contact methods will be added once HIKARI confirms a working destination for inquiries.</p>${link('/office-location/', 'Review location notes', 'text-link')}</div></section>`,
    faqs: [['Why is there no phone button or form?', 'The supplied phone format and a working inquiry destination have not been confirmed.']]
  },
  {
    path: '/office-location/', slug: 'location', short: 'Office location', title: 'HIKARI Office Location | Details Awaiting Pin Confirmation',
    description: 'Owner review page for the supplied HIKARI address and plus code in Itahari, Nepal.',
    h1: 'Find the proposed HIKARI office location', eyebrow: 'Directions · pin confirmation required', theme: 'location', index: false,
    intro: 'The address and plus code below were supplied for HIKARI in Itahari. They are not yet verified, so this page does not display an embedded map or give directions as confirmed.',
    body: `<section class="section split"><div><p class="eyebrow">Address as supplied</p><h2>“magic station, ithari-06, pachim laine, 56705”</h2><p>Please confirm each address element exactly, including the ward number, street name and postal code.</p><p><strong>Area supplied:</strong> Itahari, Sunsari, Koshi Province, Nepal.</p></div><aside class="note-card"><span class="note-index">Map plus code · unverified</span><h3>M77C+C8 Itahari, Koshi Province</h3><p>The business owner should confirm that this code resolves to the correct office entrance before a public map is added.</p></aside></section><section class="section"><div class="section-heading"><p class="eyebrow">Before visiting</p><h2>Confirm the location directly with HIKARI.</h2><p>The phone listing is also awaiting verification. No opening hours are published because the supplied listing could not be confirmed.</p>${link('/contact/', 'See contact verification notes', 'button')}</div></section>`,
    faqs: [['Can I use the plus code for directions?', 'Please wait until HIKARI confirms that the code points to its correct office location.']]
  },
  {
    path: '/faqs/', slug: 'faqs', short: 'FAQs', title: 'Study Abroad Questions and Answers | HIKARI',
    description: 'Answers to common first questions about study planning, HIKARI’s stated destinations and official admissions and visa decisions.',
    h1: 'Answers for your first study abroad questions', eyebrow: 'Frequently asked questions', theme: 'faq', index: true,
    intro: 'A starting point for students comparing study options from Nepal. Confirm HIKARI’s specific services directly and use official sources for current admission and visa requirements.',
    body: `<section class="section"><div class="faq-list">${faqItem('Which destinations does HIKARI list?', 'Japan, Australia and the USA are the destinations in the supplied business information.')} ${faqItem('What services can I ask HIKARI about?', 'Ask the consultancy to confirm its current services, fees, terms and limits. Specific application and visa guidance is still awaiting confirmation.')} ${faqItem('Who decides admission?', 'The school or institution makes admission decisions under its own current criteria.')} ${faqItem('Who decides a visa?', 'The responsible government authority decides visa applications. HIKARI cannot influence or guarantee that decision.')} ${faqItem('Where can I check current visa information?', 'Visit the official government source linked on the page for the destination you are considering. These links were checked ${CHECKED}; recheck the live source before acting.')} ${faqItem('Can I send personal documents through this website?', 'No. This site has no document upload or inquiry form. Do not send sensitive records through an unverified channel.')} ${faqItem('Are the contact details confirmed?', 'No. The address and phone are displayed as supplied and are awaiting owner verification. The listed hours are not published.')}</div></section>`,
    faqs: []
  },
  {
    path: '/privacy/', slug: 'privacy', short: 'Privacy', title: 'Privacy Information | HIKARI Website Draft',
    description: 'Draft privacy information for the HIKARI website, awaiting confirmation of hosting and business practices.',
    h1: 'Privacy information for HIKARI’s website', eyebrow: 'Policy draft · owner review required', theme: 'policy', index: false,
    intro: 'This draft describes the current local website implementation. HIKARI must verify its hosting, analytics, contact handling and retention practices before this notice is used publicly.',
    body: `<section class="section policy-copy"><h2>Information submitted through this site</h2><p>This version has no inquiry form, file upload, newsletter signup or analytics integration. Do not submit personal or sensitive information through this website.</p><h2>Technical data</h2><p>A production web host may process technical request data to deliver and secure the site. HIKARI must confirm its hosting provider, logs, retention period and any processors before publication.</p><h2>External links</h2><p>Destination pages link to government and education websites. Those sites have their own privacy practices and are outside HIKARI’s control.</p><h2>Questions or requests</h2><p>The published contact route has not yet been verified. HIKARI should add a confirmed contact method and review this notice before launch.</p><h2>Owner review required</h2><p>This is a working draft, not a verified statement of HIKARI’s complete privacy practices.</p></section>`,
    faqs: []
  },
  {
    path: '/terms/', slug: 'terms', short: 'Terms', title: 'Terms of Use | HIKARI Website Draft',
    description: 'Draft terms for using the HIKARI study abroad information website.',
    h1: 'Terms for using this website', eyebrow: 'Terms draft · owner review required', theme: 'policy', index: false,
    intro: 'These draft terms describe the intended informational nature of this website and need review by HIKARI before public use.',
    body: `<section class="section policy-copy"><h2>Informational material</h2><p>This website offers general starting points and links to official sources. It is not a substitute for current advice from a school, institution or government authority.</p><h2>No outcome promise</h2><p>Website content does not promise admission, a visa, scholarship, employment or any other result.</p><h2>External websites</h2><p>Links are provided to help visitors find original sources. HIKARI does not control third-party sites, their content or availability.</p><h2>Accuracy and updates</h2><p>Requirements and official procedures can change. Visitors should verify current details directly at the source before relying on them.</p><h2>Owner review required</h2><p>HIKARI should confirm applicable business terms, service descriptions, governing law and a contact method before publishing this page.</p></section>`,
    faqs: []
  },
  {
    path: '/accessibility/', slug: 'accessibility', short: 'Accessibility', title: 'Accessibility | HIKARI Website Draft',
    description: 'Accessibility information and contact details for the HIKARI website, pending owner review.',
    h1: 'An accessible experience, built for more students', eyebrow: 'Accessibility · review required', theme: 'policy', index: false,
    intro: 'The site is designed with semantic headings, keyboard-operable navigation, visible focus indicators and responsive layouts. It has not been independently audited against an accessibility standard.',
    body: `<section class="section policy-copy"><h2>Design approach</h2><p>The pages use landmarks, a skip link, readable contrast, descriptive link text and a mobile navigation control. Decorative graphics are hidden from assistive technology.</p><h2>Known limitations</h2><p>Some external websites linked from this site may not share the same accessibility features. A full assistive-technology review has not been completed.</p><h2>Report an access issue</h2><p>A verified contact route is not yet available. HIKARI should confirm a way for visitors to report an accessibility barrier before this page is published.</p><h2>Owner review required</h2><p>This draft describes the current implementation and is not a certification or conformance claim.</p></section>`,
    faqs: []
  },
  {
    path: '/visa-admissions-disclaimer/', slug: 'disclaimer', short: 'Visa disclaimer', title: 'Visa and Admissions Disclaimer | HIKARI',
    description: 'Understand the limits of HIKARI’s role and why schools and government authorities make admission and visa decisions.',
    h1: 'Visa and admissions decisions stay with official authorities', eyebrow: 'Important information', theme: 'disclaimer', index: false,
    intro: 'HIKARI is a consultancy, not a university, school, embassy, immigration department or government authority. Institutions and authorities make their own decisions.',
    body: `<section class="section policy-copy"><h2>Admission decisions</h2><p>Schools and other education providers set their own entry requirements and decide whether to admit an applicant. Confirm criteria and application outcomes directly with the institution.</p><h2>Visa decisions</h2><p>Only the responsible immigration and consular authorities decide visa applications. HIKARI cannot influence those decisions or guarantee approval.</p><h2>Check official information</h2><p>Immigration requirements and procedures can change. Follow current instructions from the relevant government, embassy, immigration authority and education provider. Destination pages include official-source links checked ${CHECKED}.</p><h2>Information on this website</h2><p>Website information is general and should not be treated as legal advice or as a substitute for official guidance on your circumstances.</p></section>`,
    faqs: []
  }
];

function destinationCard(href, name, text, number) {
  return `<a class="destination-card" href="${href}"><span class="card-no">${number}</span><span class="destination-glow" aria-hidden="true"></span><span class="card-kicker">Study destination</span><h3>${name}</h3><p>${text}</p><span class="card-arrow" aria-hidden="true">↗</span></a>`;
}
function faqItem(q, a) { return `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`; }
function faqBlock(items) {
  if (!items?.length) return '';
  return `<section class="section section-faq"><div class="section-heading"><p class="eyebrow">Quick answers</p><h2>Before you take the next step</h2></div><div class="faq-list">${items.map(([q, a]) => faqItem(q, a)).join('')}</div><p class="more-faq">${link('/faqs/', 'Browse all frequently asked questions', 'text-link')}</p></section>`;
}
function navLink(p, current) { return `<a href="${p.path}"${p.path === current ? ' aria-current="page"' : ''}>${p.nav || p.short || p.h1.replace(/[?.]/g, '')}</a>`; }
const primaryPaths = ['/', '/study-destinations/', '/about/', '/faqs/', '/contact/'];
function header(current) {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="HIKARI home"><span class="brand-symbol" aria-hidden="true">光</span><span class="brand-copy"><strong>HIKARI</strong><small>STUDY ABROAD CONSULTANCY</small></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span class="menu-icon" aria-hidden="true"></span><span class="sr-only">Open navigation</span></button><nav id="primary-nav" class="primary-nav" aria-label="Main navigation">${primaryPaths.map((route) => navLink(pages.find((p) => p.path === route), current)).join('')}</nav><a class="header-cta" href="/study-abroad-consultancy-itahari/">Plan your next step <span aria-hidden="true">↗</span></a></div></header>`;
}
function footer(current) {
  const grouped = [
    ['Explore', ['/study-abroad-consultancy-itahari/', '/study-destinations/', '/study-in-japan/', '/study-in-australia/', '/study-in-usa/', '/application-visa-guidance/']],
    ['HIKARI', ['/about/', '/contact/', '/office-location/', '/faqs/']],
    ['Information', ['/privacy/', '/terms/', '/accessibility/', '/visa-admissions-disclaimer/']]
  ];
  return `<footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a class="brand brand-inverse" href="/" aria-label="HIKARI home"><span class="brand-symbol" aria-hidden="true">光</span><span class="brand-copy"><strong>HIKARI</strong><small>STUDY ABROAD CONSULTANCY</small></span></a><p>Study planning begins with clear questions and reliable sources.</p><p class="footer-place">Itahari · Nepal</p></div>${grouped.map(([title, routes]) => `<div class="footer-group"><h2>${title}</h2>${routes.map((r) => { const p = pages.find((x) => x.path === r); return navLink({ ...p, short: p.short || p.h1.replace(/[?.]/g, '') }, current); }).join('')}</div>`).join('')}</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} HIKARI Study Abroad Consultancy</span><span>Official visa and admission sources control their own requirements and decisions.</span></div></footer>`;
}
function render(p, siteOrigin = SITE_ORIGIN) {
  const draft = p.index ? '' : '<div class="review-banner"><span class="review-dot" aria-hidden="true"></span><p><strong>Owner review:</strong> this page contains details or terms that need confirmation before public launch.</p></div>';
  const canonical = `${siteOrigin}${p.path}`;
  const breadcrumb = p.path === '/' ? '' : `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.short || p.h1.replace(/[?.]/g, ''))}</span></nav>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f6f3eb"><title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="HIKARI Study Abroad Consultancy">${p.index ? '' : '<meta name="robots" content="noindex,follow">'}<link rel="stylesheet" href="/styles.css"><script defer src="/site.js"></script></head><body class="theme-${p.theme}">${header(p.path)}${draft}<main id="main">${breadcrumb}<section class="hero"><div class="hero-copy"><p class="eyebrow">${p.eyebrow}</p><h1>${p.h1}</h1><p class="hero-intro">${p.intro}</p><div class="hero-actions">${link(p.path === '/' ? '/study-destinations/' : '/contact/', p.path === '/' ? 'Explore your options' : 'Contact details and next steps', 'button')} ${p.path !== '/' ? link('/study-destinations/', 'View destinations', 'text-link') : ''}</div></div><div class="hero-art" aria-hidden="true"><span class="art-label">Your next chapter</span><span class="art-stamp">光</span></div><div class="hero-index" aria-hidden="true"><span>H</span><span>01 / 03</span></div></section>${p.body}${faqBlock(p.faqs)}<section class="closing-cta"><p class="eyebrow">HIKARI · Itahari, Nepal</p><h2>Take the next step with verified information.</h2><p>Ask what HIKARI provides and verify current requirements with official sources.</p><div>${link('/study-abroad-consultancy-itahari/', 'About the Itahari consultancy', 'button button-light')} ${link('/contact/', 'Contact information', 'footer-cta-link')}</div></section></main>${footer(p.path)}</body></html>`;
}

const routeMap = new Map(pages.map((p) => [p.path, p]));
const mimeTypes = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/robots.txt') {
    res.writeHead(200, { 'Content-Type': mimeTypes['.txt'] });
    return res.end('User-agent: *\nAllow: /\nSitemap: ' + SITE_ORIGIN + '/sitemap.xml\n');
  }
  if (url.pathname === '/sitemap.xml') {
    const xml = pages.filter((p) => p.index).map((p) => `<url><loc>${SITE_ORIGIN}${p.path}</loc></url>`).join('');
    res.writeHead(200, { 'Content-Type': mimeTypes['.xml'] });
    return res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xml}</urlset>`);
  }
  if (url.pathname.startsWith('/images/')) return sendStatic(path.join('public', url.pathname.slice(1)), res);
  if (url.pathname.startsWith('/assets/')) return sendStatic(url.pathname.slice(1), res);
  if (url.pathname === '/styles.css' || url.pathname === '/site.js') return sendStatic(path.join('public', path.basename(url.pathname)), res);
  const normalized = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
  const page = routeMap.get(normalized);
  if (page) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
    return res.end(render(page));
  }
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  return res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found | HIKARI</title><link rel="stylesheet" href="/styles.css"><body><main class="not-found"><p class="eyebrow">404 · Not found</p><h1>This page is still off the map.</h1><p>Try a destination page or return to the homepage.</p><a class="button" href="/">Back to HIKARI</a></main></body></html>`);
});
function sendStatic(rel, res) {
  const full = path.resolve(ROOT, rel);
  if (!full.startsWith(path.resolve(ROOT, 'public') + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(full, (error, data) => {
    if (error) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(full)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  });
}
if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => console.log(`HIKARI site ready at http://localhost:${PORT}`));
}
module.exports = { pages, render, routeMap, server };
