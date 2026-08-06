const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const startBtn = document.getElementById('startBtn');
const homeBtn = document.getElementById('homeBtn');
const menuToggle = document.getElementById('menuToggle');
const languageToggle = document.getElementById('languageToggle');
const languageMenu = document.getElementById('languageMenu');
const langOptions = document.querySelectorAll('.lang-option');
const authTabs = document.querySelectorAll('.tab-btn');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const verifyForm = document.getElementById('verifyForm');
const displayPhoneCode = document.getElementById('displayPhoneCode');
const jobsList = document.getElementById('jobsList');
const filterJobsBtn = document.getElementById('filterJobsBtn');
const branchesList = document.getElementById('branchesList');
const branchSearch = document.getElementById('branchSearch');
const ratingsList = document.getElementById('ratingsList');
const holidaysList = document.getElementById('holidaysList');
const avgRating = document.getElementById('avgRating');
const topBranch = document.getElementById('topBranch');
const lowBranch = document.getElementById('lowBranch');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const contactAgent = document.getElementById('contactAgent');
const supportStatus = document.getElementById('supportStatus');
const testJobSelect = document.getElementById('testJobSelect');
const startTestBtn = document.getElementById('startTestBtn');
const testArea = document.getElementById('testArea');
const testForm = document.getElementById('testForm');
const testResult = document.getElementById('testResult');
const cvForm = document.getElementById('cvForm');
const cvFile = document.getElementById('cvFile');
const cvResult = document.getElementById('cvResult');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileQualification = document.getElementById('profileQualification');
const profileMajor = document.getElementById('profileMajor');
const profileExperience = document.getElementById('profileExperience');
const profileSkills = document.getElementById('profileSkills');
const profileCertificates = document.getElementById('profileCertificates');
const profileLanguages = document.getElementById('profileLanguages');
const statJobs = document.getElementById('statJobs');
const statTests = document.getElementById('statTests');
const statNotifications = document.getElementById('statNotifications');

let currentUser = null;
let currentPage = 'home';
let generatedPhoneCode = '';
let currentJobFilter = '';
const savedJobs = new Set();
const completedTests = [];

const jobsData = [
  {
    title: 'مطور واجهات أمامية',
    location: 'الرياض',
    match: 86,
    reason: 'لديك خبرة في تطوير الويب ومهارات في JavaScript.',
    missing: ['React', 'اختبار وحدات']
  },
  {
    title: 'أخصائي دعم فني',
    location: 'جدة',
    match: 92,
    reason: 'خبرتك في الدعم التقني والتواصل ممتازة.',
    missing: ['شهادة ITIL']
  },
  {
    title: 'مدير مشروع',
    location: 'الدمام',
    match: 74,
    reason: 'لديك خلفية إدارية قوية ومؤهل مناسب.',
    missing: ['شهادة PMP', 'خبرة أكبر في التخطيط']
  },
  {
    title: 'مسؤول خدمة العملاء',
    location: 'الخبر',
    match: 88,
    reason: 'مهاراتك التواصلية مناسبة جدًا لهذه الوظيفة.',
    missing: ['دورات في تجربة العميل']
  },
  {
    title: 'محلل بيانات',
    location: 'الرياض',
    match: 81,
    reason: 'مهارات التحليل لديك مناسبة لفهم بيانات العمل.',
    missing: ['Python', 'إحصاء']
  },
  {
    title: 'مهندس شبكات',
    location: 'جدة',
    match: 78,
    reason: 'لديك معرفة جيدة بالبنية التحتية وتقنيات الشبكات.',
    missing: ['CCNA', 'نظم تشغيل']
  },
  {
    title: 'مصمم تجربة المستخدم',
    location: 'الدمام',
    match: 85,
    reason: 'لديك قدرة على فهم المستخدم وتصميم واجهات سهلة.',
    missing: ['Figma', 'بحث المستخدم']
  },
  {
    title: 'مدير علاقات عملاء',
    location: 'مكة',
    match: 79,
    reason: 'خبرتك بالتواصل تدعم هذه الوظيفة بشكل جيد.',
    missing: ['إدارة علاقات', 'تسويق']
  },
  {
    title: 'كاتب محتوى',
    location: 'الرياض',
    match: 82,
    reason: 'تملك أسلوبًا كتابيًا مناسبًا للمحتوى الرقمي.',
    missing: ['SEO', 'كتابة تسويقية']
  },
  {
    title: 'أخصائي موارد بشرية',
    location: 'الخبر',
    match: 76,
    reason: 'لديك مؤهلات جيدة للتعامل مع شؤون الموظفين.',
    missing: ['CV تحليل', 'توظيف']
  }
];

const branchesData = [
  { name: 'مكتب الرياض الرئيسي', city: 'الرياض', hours: '8 صباحًا - 4 مساءً', services: 'توظيف، دعم، استشارات', gender: 'للجميع', phone: '0112345678' },
  { name: 'فرع جدة', city: 'جدة', hours: '8 صباحًا - 4 مساءً', services: 'دعم فني، خدمات العملاء', gender: 'للجميع', phone: '0123456789' },
  { name: 'فرع مكة', city: 'مكة', hours: '8 صباحًا - 4 مساءً', services: 'توظيف، معالجة طلبات', gender: 'للجميع', phone: '0123456790' },
  { name: 'فرع الدمام', city: 'الدمام', hours: '8 صباحًا - 4 مساءً', services: 'دعم، إرشادات مهنية', gender: 'للجميع', phone: '0134567890' }
];

const ratingsData = [
  { branch: 'مكتب الرياض الرئيسي', rating: 4.8, reviews: 120, comment: 'خدمة سريعة وموظفون متعاونون.' },
  { branch: 'فرع جدة', rating: 4.4, reviews: 84, comment: 'تجربة جيدة وأجواء احترافية.' },
  { branch: 'فرع مكة', rating: 3.9, reviews: 53, comment: 'الانتظار طويل لكن الاستقبال محترم.' },
  { branch: 'فرع الدمام', rating: 4.2, reviews: 67, comment: 'خدمات مفيدة وسهولة في التوجيه.' }
];

const holidaysData = [
  { name: 'إجازة اليوم الوطني', start: '2026-09-23', end: '2026-09-23' },
  { name: 'إجازة عيد الفطر', start: '2026-04-10', end: '2026-04-15' },
  { name: 'إجازة عيد الأضحى', start: '2026-06-16', end: '2026-06-20' }
];

const assistantResponses = [
  { pattern: /^(?:مرحبا|مرحباا|أه?لاً|أهلين|اهلين|أه?لا وسهلا|السلام عليكم(?: ورحمة الله وبركاته)?|هلا(?: والله)?)/i, answer: 'مرحبًا! كيف يمكنني مساعدتك اليوم في خدمات وزارة الموارد البشرية والتنمية الاجتماعية؟' },
  { pattern: /^(?:كيف الحال|كيفك|كيف الوضع|كيف أنت|شنو الاخبار|شو الأخبار)/i, answer: 'أنا بخير الحمد لله. كيف أستطيع مساعدتك في الاستفسار عن الخدمات أو الوظائف؟' },
  { pattern: /^(?:مع السلامة|باي|إلى اللقاء|أراك لاحقًا|تصبح على خير|هلا والسلام)/i, answer: 'مع السلامة! إذا احتجت أي شيء مرة ثانية، أنا هنا لمساعدتك.' },
  { pattern: /^(?:شكرًا|شكرا|مشكور|يعطيك العافية|تسلم)/i, answer: 'على الرحب والسعة! إذا عندك أي سؤال آخر، أنا موجود للمساعدة.' },
  { pattern: /(?:كيف|شلون|كفو|كيـف)(?: أ)?(?:أسوي|أقوم|أعمل|أنشئ|أفتح|أدخل|أسجل)?(?: حساب| تسجيل| تسجيل دخول|اك?ا?ونت|account)?/i, answer: 'لإنشاء حساب، املأ بيانات التسجيل وتابع الخطوات في صفحة التسجيل. بعد التسجيل ستتمكن من الوصول إلى الخدمات والتقديم على الوظائف بسهولة.' },
  { pattern: /(?:تسجيل دخول|تسجيل الدخول|نسيت كلمة المرور|نسيت كلمة السر|كلمة المرور|كلمة السر)/i, answer: 'إذا نسيت كلمة المرور، استخدم خيار "نسيت كلمة المرور" في صفحة الدخول. ستحصل على رمز لاستعادة الحساب عبر الهاتف أو البريد.' },
  { pattern: /(?:ليش|لماذا|لما|ما السبب|مهو|موش)(?:.*)(?:لا|ما).*(?:يفتح|يعمل|يشتغل|يظهر|ينفتح|يتحمل)/i, answer: 'إذا كان هناك حقل أو زر لا يفتح، جرب تحديث الصفحة أو فتح الموقع في متصفح آخر. وإذا استمرت المشكلة، تواصل مع خدمة العملاء من صفحة الدعم.' },
  { pattern: /(?:مم?ى|وين|أين|مكان|فين|في أي مكان)/i, answer: 'إذا كنت تبحث عن عنوان فرع أو خدمة، افتح صفحة الفروع لمعرفة جميع المكاتب والمواقع وأوقات العمل.' },
  { pattern: /(?:متى|متى يبدأ|متى ينتهي|موعد|مواعيد|في أي وقت)/i, answer: 'عادةً مواعيد العمل في الفروع تكون من 8 صباحًا حتى 4 مساءً أيام الأسبوع. يمكن التحقق من الفرع المحدد داخل صفحة الفروع.' },
  { pattern: /(?:وظائف|فرص عمل|البحث عن وظائف|وظيفة|فرصة عمل|الوظائف الملائمة)/i, answer: 'في صفحة الوظائف يمكنك مشاهدة الفرص المتاحة والمقترحة حسب مؤهلاتك ومهاراتك. اضغط "التقديم الآن" لكل وظيفة ترغب بالتقدم لها.' },
  { pattern: /(?:سيرة ذاتية|السيرة الذاتية|cv|resume|تحليل السيرة)/i, answer: 'يمكنك رفع سيرتك الذاتية لتحليلها والحصول على نصائح لتحسينها وزيادة فرص قبولك في الوظائف.' },
  { pattern: /(?:خدمات الوزارة|خدمات إلكترونية|خدمة إلكترونية|خدمات متاحة)/i, answer: 'الموقع يوفر خدمات مثل التوظيف، الإجازات، تحليل السيرة الذاتية، وحجز المواعيد في الفروع. تصفح خدمات الوزارة لمعرفة كل خيار.' },
  { pattern: /(?:فروع|إدارة فرع|فرع الوزارة|معلومات فروع|الموقع الرسمي|مكان الفرع)/i, answer: 'صفحة الفروع تحتوي على معلومات عن جميع فروع الوزارة، مثل المدينة، أوقات الدوام، والخدمات المتاحة في كل فرع.' },
  { pattern: /(?:إجازات|عطلة|طلب إجازة|متى الإجازة|الإجازة الرسمية)/i, answer: 'صفحة الإجازات تتيح متابعة الطلبات الرسمية والشخصية ومعرفة المدة المتبقية وأيام العطلات الرسمية.' },
  { pattern: /(?:خدمة العملاء|دعم العملاء|الدعم الفني|التواصل مع الدعم)/i, answer: 'إذا كنت تحتاج مساعدة إضافية فلاستفسار أو شكوى، تواصل مع خدمة العملاء عبر صفحة الدعم أو أضغط زر خدمة العملاء.' },
  { pattern: /(?:كيف أقدم طلب|كيفية التقديم|طريقة التسجيل|كيفية التسجيل)/i, answer: 'لتقديم طلب أو التسجيل، ابدأ من صفحة الوظائف أو صفحة التسجيل ثم اتبع التعليمات خطوة بخطوة.' },
  { pattern: /(?:شروط القبول|شروط التوظيف|شروط الوظيفة|هل أقبل)/i, answer: 'شروط القبول تختلف حسب الوظيفة. عادةً تأخذ في الاعتبار المؤهل، الخبرة، والمهارات المطلوبة. تفقد وصف الوظيفة لكل تفاصيل.' },
  { pattern: /(?:كم عدد|كم|عدد|كم فترة|فترة الإجازة|الفترة)/i, answer: 'يمكنك معرفة تفاصيل الفترات مثل الإجازات أو المواعيد من صفحات الخدمات المخصصة داخل الموقع.' },
  { pattern: /(?:موقع|موقع الوزارة|hrsd.gov.sa|hrsd|رابط الموقع)/i, answer: 'يمكنك زيارة الموقع الرسمي لوزارة الموارد البشرية والتنمية الاجتماعية للاطلاع على آخر الأخبار والخدمات الرسمية.' },
  { pattern: /(?:جميع|كل شيء|ما يخطر|ما يخطر على بالك|أي سؤال)/i, answer: 'هذا المساعد صمم للإجابة عن الأسئلة الشائعة حول خدمات الوزارة والتوظيف. إذا كان لديك سؤال معين، اطرحه وسأرد عليك بما يتوافق مع محتوى الموقع.' },
  { pattern: /(?:أبغى|أريد|أرغب|أحتاج|كيف أقدر)/i, answer: 'اخبرني بما تحتاجه بالتحديد، مثل "كيف أفتح حساب" أو "أين أجد الفروع"، وسأوجهك للمكان الصحيح.' },
  { pattern: /(?:شكوى|مشكلة|بلاغ|عيد بلاغ|ما يشتغل|ما يفتح)/i, answer: 'إذا واجهت مشكلة تقنية أو خدمة لا تعمل، حاول تحديث الصفحة أو استخدم متصفح آخر. وإذا استمرت المشكلة، تواصل مع خدمة العملاء عبر صفحة الدعم.' },
  { pattern: /(?:السلامة|مرحبًا|مرحباً|هلا)/i, answer: 'أهلًا وسهلًا! كيف أقدر أخدمك اليوم؟' }
];

function normalizeQuestion(question) {
  return question
    .toLowerCase()
    .replace(/[؟?.,!؛]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAssistantAnswer(question) {
  const text = normalizeQuestion(question);
  const found = assistantResponses.find((item) => item.pattern.test(text));
  return found ? found.answer : 'هذا المساعد يجيب عن الأسئلة الشائعة حول خدمات الوزارة فقط. يمكنك زيارة الموقع الرسمي لوزارة الموارد البشرية والتنمية الاجتماعية للمزيد من التفاصيل.';
}

const interviewTests = {
  'مطور ويب': [
    { question: 'ما معنى HTML؟', options: ['لغة ترميز النصوص', 'قاعدة بيانات', 'نظام تشغيل'], answer: 'لغة ترميز النصوص' },
    { question: 'أي تقنية تستخدم لتحديث صفحات الويب دون إعادة تحميل؟', options: ['CSS', 'JavaScript', 'Photoshop'], answer: 'JavaScript' }
  ],
  'دعم فني': [
    { question: 'ما هو أول شيء تقوم به عند مواجهة مشكلة تقنية؟', options: ['إعادة التشغيل', 'حذف الملفات', 'تجاهل المشكلة'], answer: 'إعادة التشغيل' },
    { question: 'كيف تتعامل مع عميل غاضب؟', options: ['الاستماع بهدوء', 'المواجهة', 'قطع الاتصال'], answer: 'الاستماع بهدوء' }
  ],
  'مدير مشروع': [
    { question: 'ما هي الخطوة الأولى في إدارة المشروع؟', options: ['التخطيط', 'التسويق', 'التوظيف'], answer: 'التخطيط' },
    { question: 'ما هو الهدف من إدارة المخاطر؟', options: ['التقليل من المشاكل', 'زيادة التكاليف', 'التأخير'], answer: 'التقليل من المشاكل' }
  ],
  'خدمة العملاء': [
    { question: 'ما أهم مهارة لخدمة العميل؟', options: ['الاستماع', 'السرعة فقط', 'التجاهل'], answer: 'الاستماع' },
    { question: 'كيف تتعامل مع استفسار بسيط؟', options: ['الإجابة بوضوح', 'التهرب', 'إرسال العميل إلى آخر'], answer: 'الإجابة بوضوح' }
  ]
};

function showPage(pageId) {
  currentPage = pageId;
  pages.forEach((page) => page.classList.toggle('active', page.id === pageId));
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.page === pageId));
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetPage = button.dataset.page;
    if (targetPage === 'dashboard' && !currentUser) {
      showPage('auth');
      return;
    }

    const card = document.querySelector(`.service-card[data-section="${targetPage}"]`);
    if (card) {
      showPage('home');
      scrollToHomeSection(targetPage);
      return;
    }

    showPage(targetPage);
  });
});

function scrollToHomeSection(section) {
  const card = document.querySelector(`.service-card[data-section="${section}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('highlight-card');
  setTimeout(() => card.classList.remove('highlight-card'), 1500);
}

startBtn?.addEventListener('click', () => showPage('auth'));
homeBtn?.addEventListener('click', () => showPage('home'));
menuToggle?.addEventListener('click', () => document.querySelector('.topbar')?.classList.toggle('nav-open'));

languageToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  languageMenu?.classList.toggle('hidden');
});

langOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const lang = option.dataset.lang;
    const doc = document.documentElement;
    doc.lang = lang;
    doc.dir = lang === 'ar' ? 'rtl' : 'ltr';
    languageMenu?.classList.add('hidden');
  });
});

document.addEventListener('click', (event) => {
  if (languageMenu && !languageMenu.contains(event.target) && event.target !== languageToggle) {
    languageMenu.classList.add('hidden');
  }
});

authTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    authTabs.forEach((btn) => btn.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.auth-form').forEach((form) => form.classList.remove('active'));
    document.getElementById(tab.dataset.auth + 'Form').classList.add('active');
  });
});

function formatSkills(value) {
  return value.split(',').map((item) => item.trim()).filter(Boolean).join('، ');
}

function updateDashboard() {
  if (!currentUser) return;
  profileName.textContent = currentUser.name;
  profileEmail.textContent = currentUser.email;
  profileQualification.textContent = `المؤهل: ${currentUser.qualification}`;
  profileMajor.textContent = `التخصص: ${currentUser.major}`;
  profileExperience.textContent = currentUser.experience;
  profileSkills.textContent = currentUser.skills;
  profileCertificates.textContent = currentUser.certificates || 'لا يوجد';
  profileLanguages.textContent = currentUser.languages;
  statJobs.textContent = jobsData.length;
  statTests.textContent = completedTests.length;
  statNotifications.textContent = 3;
}

function getJobsForMajor(major) {
  if (!major) return jobsData;
  const normalized = major.toLowerCase();
  const matches = (job, terms) => terms.some((term) => job.title.toLowerCase().includes(term) || job.reason.toLowerCase().includes(term));

  if (/(تقنية|معلومات|IT|برمج|تطوير)/i.test(normalized)) {
    return jobsData.filter((job) => matches(job, ['مطور واجهات أمامية', 'مطور', 'برمج']));
  }
  if (/(دعم|فني|support)/i.test(normalized)) {
    return jobsData.filter((job) => matches(job, ['أخصائي دعم فني', 'دعم', 'فني']));
  }
  if (/(إدارة مشروع|مدير مشروع|مشروع)/i.test(normalized)) {
    return jobsData.filter((job) => matches(job, ['مدير مشروع', 'مشروع']));
  }
  if (/(خدمة العملاء|خدمة عميل|المراسلة|customer)/i.test(normalized)) {
    return jobsData.filter((job) => matches(job, ['مسؤول خدمة العملاء', 'خدمة العملاء']));
  }
  if (/(سيرة ذاتية|cv|resume|تحليل)/i.test(normalized)) {
    return jobsData.filter((job) => matches(job, ['تحليل السيرة الذاتية']));
  }

  return jobsData;
}

function renderJobs(filter = '') {
  jobsList.innerHTML = '';
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredJobs = normalizedFilter
    ? jobsData.filter((job) => job.title.toLowerCase().includes(normalizedFilter) || job.reason.toLowerCase().includes(normalizedFilter))
    : jobsData;

  const note = document.createElement('p');
  note.style.marginBottom = '1rem';
  note.style.fontWeight = '700';
  note.textContent = normalizedFilter
    ? `عرض الوظائف التي تطابق التخصص: ${filter}`
    : 'عرض أفضل 10 وظائف متاحة.';
  jobsList.appendChild(note);

  if (filteredJobs.length === 0) {
    const emptyNotice = document.createElement('p');
    emptyNotice.textContent = 'لم يتم العثور على وظائف بهذا التخصص. حاول اسم تخصص آخر.';
    emptyNotice.style.fontWeight = '600';
    jobsList.appendChild(emptyNotice);
    return;
  }

  const jobsToShow = filteredJobs.slice(0, 10);
  jobsToShow.forEach((job) => {
    const actualIndex = jobsData.indexOf(job);
    const card = document.createElement('article');
    card.className = 'job-card';
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.location}</p>
      <div class="badge"><span>${job.match}%</span> نسبة التوافق</div>
      <div class="progress-bar"><div class="progress-fill" style="width: ${job.match}%;"></div></div>
      <p><strong>سبب الترشيح:</strong> ${job.reason}</p>
      <p><strong>المهارات الناقصة:</strong> ${job.missing.join('، ')}</p>
      <div class="job-actions">
        <button class="secondary-btn" data-action="save" data-index="${actualIndex}">${savedJobs.has(actualIndex) ? 'محفوظ' : 'حفظ الوظيفة'}</button>
        <button class="primary-btn" data-action="apply" data-index="${actualIndex}">التقديم الآن</button>
      </div>
    `;
    jobsList.appendChild(card);
  });
}

function renderBranches(filter = '') {
  branchesList.innerHTML = '';
  const term = filter.trim().toLowerCase();
  branchesData.filter((branch) => !term || branch.name.toLowerCase().includes(term) || branch.city.toLowerCase().includes(term))
    .forEach((branch) => {
      const card = document.createElement('article');
      card.className = 'branch-card';
      card.innerHTML = `
        <h3>${branch.name}</h3>
        <p><strong>المدينة:</strong> ${branch.city}</p>
        <p><strong>أوقات الدوام:</strong> ${branch.hours}</p>
        <p><strong>الخدمات:</strong> ${branch.services}</p>
        <p><strong>الخدمة:</strong> ${branch.gender}</p>
        <p><strong>الهاتف:</strong> ${branch.phone}</p>
      `;
      branchesList.appendChild(card);
    });
}

function initServiceCardFlips() {
  document.querySelectorAll('.summary-card.service-card').forEach((card) => {
    if (card.dataset.flipInitialized) return;
    const detailsText = card.querySelector('p')?.textContent || '';
    const titleText = card.querySelector('h3')?.textContent || '';
    const title = card.querySelector('h3')?.outerHTML || '';
    const icon = card.querySelector('.service-icon')?.outerHTML || '';
    const actions = card.querySelector('.card-actions')?.outerHTML || '';
    const frontContent = document.createElement('div');
    frontContent.className = 'flip-card-front';
    frontContent.innerHTML = `${icon}${title}<p>${detailsText}</p>${actions}`;
    const backContent = document.createElement('div');
    backContent.className = 'flip-card-back';
    backContent.innerHTML = `
      <div class="back-header">تفاصيل الخدمة</div>
      <h4 class="back-title">${titleText}</h4>
      <p class="back-copy">${detailsText}</p>
      <button type="button" class="secondary-btn close-card-btn">رجوع</button>
    `;
    const inner = document.createElement('div');
    inner.className = 'flip-card-inner';
    inner.appendChild(frontContent);
    inner.appendChild(backContent);
    const flipWrapper = document.createElement('div');
    flipWrapper.className = 'flip-card';
    flipWrapper.appendChild(inner);
    card.innerHTML = '';
    card.appendChild(flipWrapper);
    card.dataset.flipInitialized = 'true';
  });
}

function renderRatings() {
  ratingsList.innerHTML = '';
  ratingsData.forEach((rating) => {
    const card = document.createElement('article');
    card.className = 'branch-card';
    card.innerHTML = `
      <h3>${rating.branch}</h3>
      <div class="star-row">${'★'.repeat(Math.round(rating.rating))}${'☆'.repeat(5 - Math.round(rating.rating))}</div>
      <p><strong>التقييم:</strong> ${rating.rating} من 5</p>
      <p><strong>عدد التقييمات:</strong> ${rating.reviews}</p>
      <p>${rating.comment}</p>
    `;
    ratingsList.appendChild(card);
  });
  const sorted = [...ratingsData].sort((a, b) => b.rating - a.rating);
  avgRating.textContent = (ratingsData.reduce((sum, item) => sum + item.rating, 0) / ratingsData.length).toFixed(1);
  topBranch.textContent = sorted[0].branch;
  lowBranch.textContent = sorted[sorted.length - 1].branch;
}

function renderHolidays() {
  holidaysList.innerHTML = '';
  const today = new Date();
  holidaysData.forEach((holiday) => {
    const start = new Date(holiday.start);
    const end = new Date(holiday.end);
    const remaining = Math.max(0, Math.ceil((start - today) / (1000 * 60 * 60 * 24)));
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const card = document.createElement('article');
    card.className = 'holiday-card';
    card.innerHTML = `
      <h3>${holiday.name}</h3>
      <p><strong>بداية:</strong> ${holiday.start}</p>
      <p><strong>نهاية:</strong> ${holiday.end}</p>
      <p><strong>عدد الأيام:</strong> ${days}</p>
      <p><strong>المدة المتبقية:</strong> ${remaining} يومًا</p>
    `;
    holidaysList.appendChild(card);
  });
}

function appendChat(message, sender = 'bot') {
  const bubble = document.createElement('div');
  bubble.className = `chat-message ${sender}`;
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAssistantAnswer(question) {
  const text = question.toLowerCase();
  const found = assistantResponses.find((item) => item.pattern.test(text));
  return found ? found.answer : 'أعتذر، سأحولك إلى موظف خدمة العملاء لمساعدتك.';
}

function renderTestQuestions(jobName) {
  const questions = interviewTests[jobName] || [];
  testForm.innerHTML = '';
  questions.forEach((item, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'test-question';
    wrapper.innerHTML = `<p><strong>${idx + 1}.</strong> ${item.question}</p>`;
    item.options.forEach((option) => {
      const id = `q${idx}-${option}`;
      wrapper.innerHTML += `
        <label><input type="radio" name="question-${idx}" value="${option}" required /> ${option}</label>
      `;
    });
    testForm.appendChild(wrapper);
  });
  testForm.innerHTML += '<button type="submit" class="primary-btn">تقديم الاختبار</button>';
}

function showCvResult() {
  cvResult.classList.remove('hidden');
  document.getElementById('cvQuality').textContent = 'جيدة';
  document.getElementById('cvAts').textContent = 'متوافقة';
  document.getElementById('cvStrengths').textContent = 'تنظيم جيد، خبرة واضحة، معلومات اتصال واضحة.';
  document.getElementById('cvWeaknesses').textContent = 'قد تحتاج إلى مزيد من التفاصيل في قسم المهارات.';
  document.getElementById('cvSkills').textContent = currentUser ? currentUser.skills : 'JavaScript، إدارة مشاريع';
  document.getElementById('cvMissing').textContent = 'شهادة احترافية، خبرة عملية أكثر.';
  document.getElementById('cvAdvice').textContent = 'أضف ملخصًا احترافيًا في بداية السيرة الذاتية، وركّز على المهارات العملية والمشاريع السابقة.';
}

function setActiveAuthForm(formId) {
  authTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.auth === formId));
  document.querySelectorAll('.auth-form').forEach((form) => form.classList.remove('active'));
  document.getElementById(`${formId}Form`).classList.add('active');
}

function init() {
  renderJobs();
  renderBranches();
  renderRatings();
  renderHolidays();
  initServiceCardFlips();
  setActiveAuthForm('register');
  showPage('home');
}

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const qualification = document.getElementById('regQualification').value.trim();
  const major = document.getElementById('regMajor').value.trim();
  const experience = document.getElementById('regExperience').value.trim();
  const skills = formatSkills(document.getElementById('regSkills').value);
  const certificates = document.getElementById('regCertificates').value.trim();
  const languages = document.getElementById('regLanguages').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!name || !email || !qualification || !major || !experience || !skills || !languages || !phone || password.length < 6) {
    alert('الرجاء إكمال جميع الحقول المطلوبة بشكل صحيح.');
    return;
  }

  if (!/^05\d{8}$/.test(phone)) {
    alert('رقم الهاتف السعودي يجب أن يكون 10 أرقام ويبدأ بـ 05.');
    return;
  }

  currentUser = { name, email, qualification, major, experience, skills, certificates, languages, phone, password };
  generatedPhoneCode = Math.floor(1000 + Math.random() * 9000).toString();
  displayPhoneCode.textContent = generatedPhoneCode;
  showPage('verify');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const phone = document.getElementById('loginPhone').value.trim();

  if (!currentUser || phone !== currentUser.phone) {
    alert('رقم الهاتف غير مسجل أو لم يتم إنشاء حساب بعد.');
    return;
  }

  generatedPhoneCode = Math.floor(1000 + Math.random() * 9000).toString();
  displayPhoneCode.textContent = generatedPhoneCode;
  showPage('verify');
});

verifyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const phoneCode = document.getElementById('verifyPhoneCode').value.trim();

  if (phoneCode !== generatedPhoneCode) {
    alert('رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
    return;
  }

  updateDashboard();
  showPage('dashboard');
});

branchSearch.addEventListener('input', () => renderBranches(branchSearch.value));

jobsList.addEventListener('click', (event) => {
  const action = event.target.dataset.action;
  const index = Number(event.target.dataset.index);
  if (action === 'save') {
    if (savedJobs.has(index)) {
      savedJobs.delete(index);
    } else {
      savedJobs.add(index);
    }
    renderJobs();
  }
  if (action === 'apply') {
    alert(`تم تقديم طلبك على وظيفة ${jobsData[index].title} بنجاح.`);
  }
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  appendChat(text, 'user');
  chatInput.value = '';
  const answer = getAssistantAnswer(text);
  setTimeout(() => appendChat(answer, answer.includes('تحويل') ? 'bot' : 'bot'), 500);
});

document.addEventListener('click', (event) => {
  if (event.target.matches('.details-btn')) {
    const card = event.target.closest('.service-card');
    card?.classList.add('is-flipped');
  }
  if (event.target.matches('.close-card-btn')) {
    const card = event.target.closest('.service-card');
    card?.classList.remove('is-flipped');
  }
});

contactAgent.addEventListener('click', () => {
  supportStatus.classList.remove('hidden');
  supportStatus.textContent = 'تم تحويلك إلى موظف خدمة العملاء، سيتم الرد عليك قريبًا.';
});

document.addEventListener('click', (event) => {
  if (event.target.matches('.primary-btn[data-target]')) {
    const target = event.target.dataset.target;
    if (target === 'dashboard' && !currentUser) {
      showPage('auth');
      return;
    }

    showPage(target);
  }
});

startTestBtn.addEventListener('click', () => {
  renderTestQuestions(testJobSelect.value);
  testArea.classList.remove('hidden');
  testResult.classList.add('hidden');
});

filterJobsBtn?.addEventListener('click', () => {
  const filter = prompt('الرجاء إدخال اسم التخصص للبحث عن الوظائف المناسبة:');
  currentJobFilter = filter ? filter.trim() : '';
  renderJobs(currentJobFilter);
});

testForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const questions = interviewTests[testJobSelect.value];
  let score = 0;
  const answers = [];
  questions.forEach((item, index) => {
    const userAnswer = testForm.querySelector(`input[name="question-${index}"]:checked`).value;
    if (userAnswer === item.answer) score += 1;
    answers.push({ question: item.question, correct: item.answer, selected: userAnswer });
  });
  const percentage = Math.round((score / questions.length) * 100);
  completedTests.push({ job: testJobSelect.value, score: percentage });
  statTests.textContent = completedTests.length;
  testResult.classList.remove('hidden');
  testResult.innerHTML = `
    <h3>نتيجة الاختبار لـ ${testJobSelect.value}</h3>
    <p><strong>الدرجة النهائية:</strong> ${percentage}%</p>
    <p><strong>التقييم:</strong> ${percentage >= 75 ? 'ممتاز' : percentage >= 50 ? 'جيد' : 'بحاجة لتحسين'}</p>
    <div class="analysis-grid">
      <div><strong>الإجابات الصحيحة:</strong> ${score} من ${questions.length}</div>
      <div><strong>ملاحظات:</strong> حاول التركيز على التعريفات الأساسية والمهارات التواصلية.</div>
      <div><strong>نصيحة:</strong> راجع الأمثلة العملية والأسئلة المتكررة قبل المقابلة.</div>
    </div>
  `;
});

cvForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!cvFile.files.length) {
    alert('الرجاء اختيار ملف السيرة الذاتية أولاً.');
    return;
  }
  showCvResult();
});

init();
