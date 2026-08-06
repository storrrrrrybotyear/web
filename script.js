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
  { pattern: /كيفية|كيف(?: أ)?قدم|طريقة التقديم|التقديم/i, answer: 'لتقديم طلب وظيفة، اختر الوظيفة المناسبة ثم اضغط "التقديم الآن" واتبع التعليمات. تأكد من تحديث سيرتك الذاتية ومؤهلاتك قبل التقديم.' },
  { pattern: /شروط|قبول|المؤهل|خبرة|مهارات/i, answer: 'شروط القبول تعتمد على الوظيفة والجهة. عادةً تحتاج إلى مؤهل مناسب، خبرة ذات صلة، ومهارات متعلقة بالمجال. راجع تفاصيل الوظيفة داخل صفحة الوظائف.' },
  { pattern: /الموقع الرسمي|hrsd|وزارة الموارد البشرية|موقع الوزارة|الموقع/i, answer: 'يمكنك زيارة الموقع الرسمي لوزارة الموارد البشرية والتنمية الاجتماعية للاطلاع على الخدمات الالكترونية والأخبار والتحديثات الرسمية.' },
  { pattern: /خدمات إلكترونية|خدمات الوزارة|الخدمات المتاحة|خدمات متاحة/i, answer: 'يوفر الموقع الرسمي خدمات إلكترونية مثل التوظيف، الإجازات، السيرة الذاتية، وخدمة العملاء. يمكنك الاطلاع على الخدمات المتاحة من خلال الموقع.' },
  { pattern: /الفروع|فرع|موقع الفرع|أين الفرع|فرع الوزارة/i, answer: 'صفحة الفروع تعرض جميع الفروع، مع إمكانية البحث حسب المدينة أو المنطقة وأوقات الدوام والخدمات المتاحة لكل فرع.' },
  { pattern: /مواعيد|دوام|ساعات العمل|الدوام الرسمي/i, answer: 'عادةً تعمل فروع الوزارة من 8 صباحًا حتى 4 مساءً في أيام الأسبوع. يمكنك التأكد من مواعيد الفرع المحدد من صفحة الفروع.' },
  { pattern: /الإجازات|العطلة|طلب إجازة|حالة الإجازة/i, answer: 'صفحة الإجازات تتيح لك متابعة الطلبات الرسمية والشخصية ومعرفة المدة المتبقية لكل إجازة.' },
  { pattern: /السيرة الذاتية|تحليل السيرة|cv|resume/i, answer: 'يمكنك رفع السيرة الذاتية لتحليلها والحصول على توصيات لتحسينها وزيادة فرص قبولك عند التقديم.' },
  { pattern: /خدمة العملاء|الدعم|الاتصال|التواصل/i, answer: 'إذا احتجت مساعدة إضافية، يمكنك التواصل مع خدمة العملاء عبر صفحة الدعم أو استخدام خيارات الاتصال المتاحة في الموقع الرسمي.' },
  { pattern: /إنشاء حساب|تسجيل|تسجيل دخول|فتح حساب/i, answer: 'لإنشاء حساب، املأ بيانات التسجيل وتابع الخطوات. بعد التسجيل ستتمكن من الوصول إلى الخدمات والتقديم على الوظائف بسهولة.' },
  { pattern: /الوظائف|البحث عن وظائف|فرص العمل|الفرص/i, answer: 'صفحة الوظائف تعرض الفرص الملائمة بناءً على مؤهلاتك ومهاراتك. يمكنك تصفح الوظائف والتقديم مباشرة عبر الموقع.' },
  { pattern: /هل يوجد|أين يمكن|كيف أصل|أرغب في|أريد/i, answer: 'هذا المساعد يجيب عن الأسئلة الشائعة المتعلقة بخدمات الوزارة. إذا كان لديك استفسار محدد، يمكنك زيارة الموقع الرسمي لمزيد من التفاصيل.' }
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

function renderJobs() {
  jobsList.innerHTML = '';
  jobsData.forEach((job, index) => {
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
        <button class="secondary-btn" data-action="save" data-index="${index}">${savedJobs.has(index) ? 'محفوظ' : 'حفظ الوظيفة'}</button>
        <button class="primary-btn" data-action="apply" data-index="${index}">التقديم الآن</button>
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
