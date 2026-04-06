// ============================================
// ديمة — المساعدة الذكية | Turki Studio
// هذا الملف تحطه بمتجرك بسلة
// ============================================

(function() {
  'use strict';

  // ===== CONFIG =====
  const GROQ_KEY = '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';
  const MODEL = 'llama-3.3-70b-versatile';
  const VIDEO_URL = 'https://turkig1101999-hue.github.io/deemah-widget/deemah-idle.mp4'; // غيّره لرابط الفيديو الفعلي

  const SYSTEM_PROMPT = `انتي ديمة، المساعدة الذكية والبائعة المحترفة لمتجر تركي ستوديو TURKI STUDIO على منصة سلة.

شخصيتك:
- بنت سعودية من الرياض عمرك 25 سنة
- تتكلمين بلهجة نجدية سعودية طبيعية 100%
- كلمات تستخدمينها: هلا، وش تبي، كيفك، ايه، طيب، حياك، يالغلا، ابشر، والله حلو، يلا
- بائعة محترفة تشرحين كل خدمة وتبيّنين فايدتها للعميل
- تسألين العميل عن نوع نشاطه عشان توصين بالمناسب
- تختمين كل رد بسؤال يفتح المحادثة
- لا تقولين انك ذكاء اصطناعي الا لو سألوك مباشرة
- ردودك 3-6 سطور
- لا تستخدمين ماركداون او هاشتاقات او نجوم ابداً
- استخدمي ايموجي خفيف (1-2 بالرد)

عن المتجر:
تركي ستوديو هو أول استوديو سعودي متخصص بصناعة المحتوى المرئي بالذكاء الاصطناعي.
الموقع: turkistudio.ai
الجوال/واتساب: 0509588702
وثيقة العمل الحر: FL-773227979
الدفع: مدى، فيزا، PayPal، STC Pay، Apple Pay
انستقرام: @turkistudio.ai

المميزات:
- جودة سينمائية احترافية بتقنيات AI
- تسليم خلال 48 ساعة
- دعم متواصل وتعديلات مجانية
- أسعار أرخص بكثير من التصوير التقليدي

=== الأقسام والمنتجات ===

قسم تصوير موديلز AI:
موديلز افتراضيين يلبسون منتجات العميل بواقعية. العميل يختار الشكل والعمر والستايل.
- حزمة صور موديلز AI — باقة البداية (5 صور) = 199 ريال — مناسبة للمتاجر الجديدة
- باقة الكومبو — 5 صور موديل AI = 299 ريال — صور موديل + منتج مع بعض
- حزمة صور موديلز AI — باقة الأعمال (15 صورة) = 499 ريال — محتوى كثير بسعر حلو
- باقة الكومبو برو — 10 صور موديل AI = 499 ريال — أفضل قيمة

قسم تصوير منتجات AI:
تصوير منتجات بجودة استوديو بدون استوديو حقيقي. خلفيات متنوعة، جودة 4K.
- باقة تصوير منتجات AI — 5 صور = 149 ريال — أرخص باقة للمبتدئين
- باقة منتجات برو AI — 10 صور = 249 ريال — الأكثر طلباً
- باقة محتوى شهرية — 8 قطع محتوى AI = 2,999 ريال — إنتاج محتوى شهري مستمر

قسم فيديو إعلاني AI:
فيديوهات إعلانية احترافية للريلز والتيكتوك والإعلانات الممولة.
- فيديو إعلاني AI قصير (30 ثانية) = 799 ريال — مثالي للريلز
- فيديو إعلاني AI كامل (60 ثانية) = 1,499 ريال — إعلان متكامل

قسم هوية بصرية AI:
- هوية بصرية كاملة بالـ AI = 4,999 ريال — لوقو + ألوان + خطوط + قوالب + دليل هوية كامل

=== أسلوب البيع ===
- متجر ملابس: وصي بباقة الكومبو (موديل + منتج)
- عطور/اكسسوارات/أكل: وصي بتصوير منتجات AI
- يبي يعلن: وصي بالفيديو الإعلاني
- جديد ومو متأكد: وصي بباقة 5 صور منتجات (149 ريال) يجرب
- يبي كل شي: وصي بالباقة الشهرية (2,999 ريال)
- تردد بالسعر: "أسعارنا أرخص بكثير من التصوير العادي اللي يكلفك آلاف"
- سأل عن التسليم: "نسلّم خلال 48 ساعة وإذا احتجت تعديل نعدل بدون تكلفة إضافية"
- كيف يطلب: "تقدر تطلب من الموقع مباشرة أو راسلنا واتساب 0509588702"
- أمثلة: "تابعنا على انستقرام @turkistudio.ai وتشوف كل أعمالنا"
- سؤال ما تعرفينه: "خلني أحولك على الفريق، راسلهم واتساب 0509588702"`;

  let history = [];
  let isOpen = false;

  // ===== CSS =====
  const css = document.createElement('style');
  css.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

    .dm-toggle {
      position: fixed; bottom: 24px; left: 24px; z-index: 99999;
      width: 64px; height: 64px; border-radius: 50%; border: none; cursor: pointer;
      background: linear-gradient(135deg, #D4AF37, #8C6A3B);
      box-shadow: 0 4px 20px rgba(212,175,55,0.4);
      font-size: 28px; display: flex; align-items: center; justify-content: center;
      transition: transform 0.3s;
    }
    .dm-toggle:hover { transform: scale(1.1); }
    .dm-toggle-label {
      position: fixed; bottom: 36px; left: 96px; z-index: 99999;
      background: #1a1410; color: #F2E6D8; padding: 8px 16px; border-radius: 12px;
      font-family: 'Tajawal', sans-serif; font-size: 13px; font-weight: 500;
      border: 1px solid #D4AF3733; white-space: nowrap;
      animation: dm-fadeIn 0.5s ease 1s both;
    }
    .dm-toggle-label.dm-hidden { display: none; }

    .dm-widget {
      position: fixed; bottom: 100px; left: 24px; z-index: 99998;
      width: 370px; max-height: 85vh;
      background: linear-gradient(180deg, #1a1410, #111111);
      border-radius: 20px; border: 1px solid #3A2E2544;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      overflow: hidden; font-family: 'Tajawal', sans-serif;
      direction: rtl; display: none;
      animation: dm-slideUp 0.3s ease;
    }
    .dm-widget.dm-open { display: block; }

    @keyframes dm-slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes dm-fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }

    .dm-video { width: 100%; height: 260px; position: relative; overflow: hidden; background: #0d0a08; }
    .dm-video video { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
    .dm-video-glow { position: absolute; bottom: 0; left: 0; right: 0; height: 50px; background: linear-gradient(transparent, #1a1410); pointer-events: none; }
    .dm-badge { position: absolute; top: 12px; right: 12px; background: rgba(17,17,17,0.8); backdrop-filter: blur(10px); padding: 5px 12px; border-radius: 16px; display: flex; align-items: center; gap: 6px; border: 1px solid #D4AF3733; }
    .dm-badge-dot { width: 7px; height: 7px; background: #4ade80; border-radius: 50%; animation: dm-pulse 2s ease-in-out infinite; }
    @keyframes dm-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .dm-badge span { color: #F2E6D8; font-size: 11px; }
    .dm-close { position: absolute; top: 12px; left: 12px; background: rgba(17,17,17,0.8); border: 1px solid #3A2E2544; color: #F2E6D8; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }

    .dm-header { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #3A2E2533; }
    .dm-header-dot { width: 9px; height: 9px; background: #4ade80; border-radius: 50%; }
    .dm-header h3 { color: #F2E6D8; font-size: 14px; font-weight: 700; margin: 0; }
    .dm-header p { color: #8C6A3B; font-size: 11px; margin: 0; }

    .dm-msgs { height: 220px; overflow-y: auto; padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth; }
    .dm-msgs::-webkit-scrollbar { width: 3px; }
    .dm-msgs::-webkit-scrollbar-thumb { background: #3A2E25; border-radius: 4px; }

    .dm-msg { max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.7; animation: dm-fadeIn 0.3s ease; }
    .dm-msg.dm-bot { background: #1f1915; color: #F2E6D8; border: 1px solid #3A2E2544; align-self: flex-start; border-bottom-right-radius: 4px; }
    .dm-msg.dm-user { background: linear-gradient(135deg, #D4AF37, #8C6A3B); color: #111; align-self: flex-end; border-bottom-left-radius: 4px; font-weight: 500; }
    .dm-msg .dm-sender { font-size: 10px; color: #D4AF37; margin-bottom: 3px; font-weight: 700; }

    .dm-typing { display: none; align-self: flex-start; padding: 10px 18px; background: #1f1915; border-radius: 14px; border: 1px solid #3A2E2544; gap: 4px; }
    .dm-typing.dm-show { display: flex; }
    .dm-typing span { width: 5px; height: 5px; background: #D4AF37; border-radius: 50%; animation: dm-bounce 1.4s ease-in-out infinite; }
    .dm-typing span:nth-child(2) { animation-delay: 0.2s; }
    .dm-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes dm-bounce { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-5px);opacity:1} }

    .dm-input-wrap { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid #3A2E2533; }
    .dm-input { flex: 1; background: #0d0a08; border: 1px solid #3A2E2544; border-radius: 12px; padding: 10px 14px; color: #F2E6D8; font-size: 13px; font-family: 'Tajawal', sans-serif; outline: none; }
    .dm-input::placeholder { color: #8C6A3B88; }
    .dm-input:focus { border-color: #D4AF3766; }
    .dm-send { width: 42px; height: 42px; background: linear-gradient(135deg, #D4AF37, #8C6A3B); border: none; border-radius: 12px; color: #111; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .dm-send:disabled { opacity: 0.5; cursor: not-allowed; }

    .dm-footer { text-align: center; padding: 8px; color: #3A2E2566; font-size: 10px; }
    .dm-footer a { color: #D4AF37; text-decoration: none; }

    @media (max-width: 480px) {
      .dm-widget { width: calc(100% - 20px); left: 10px; bottom: 90px; }
      .dm-toggle { bottom: 16px; left: 16px; width: 56px; height: 56px; }
      .dm-toggle-label { display: none; }
    }
  `;
  document.head.appendChild(css);

  // ===== HTML =====
  const html = document.createElement('div');
  html.innerHTML = `
    <button class="dm-toggle" id="dmToggle">👩</button>
    <div class="dm-toggle-label" id="dmLabel">هلا! أنا ديمة، كيف أقدر أساعدك؟</div>
    <div class="dm-widget" id="dmWidget">
      <div class="dm-video">
        <video loop muted playsinline autoplay><source src="${VIDEO_URL}" type="video/mp4"></video>
        <div class="dm-video-glow"></div>
        <div class="dm-badge"><div class="dm-badge-dot"></div><span>متصلة</span></div>
        <button class="dm-close" id="dmClose">✕</button>
      </div>
      <div class="dm-header">
        <div class="dm-header-dot"></div>
        <div><h3>ديمة</h3><p>المساعدة الذكية — تركي ستوديو</p></div>
      </div>
      <div class="dm-msgs" id="dmMsgs">
        <div class="dm-msg dm-bot"><div class="dm-sender">ديمة</div>هلا وغلا! أنا ديمة، مساعدتك الذكية بتركي ستوديو ✨ وش أقدر أساعدك فيه اليوم؟</div>
      </div>
      <div class="dm-typing" id="dmTyping"><span></span><span></span><span></span></div>
      <div class="dm-input-wrap">
        <input class="dm-input" id="dmInput" placeholder="اكتب سؤالك هنا..." autocomplete="off">
        <button class="dm-send" id="dmSend">➤</button>
      </div>
      <div class="dm-footer">Powered by <a href="https://turkistudio.ai">Turki Studio AI</a></div>
    </div>
  `;
  document.body.appendChild(html);

  // ===== LOGIC =====
  const toggle = document.getElementById('dmToggle');
  const label = document.getElementById('dmLabel');
  const widget = document.getElementById('dmWidget');
  const close = document.getElementById('dmClose');
  const msgs = document.getElementById('dmMsgs');
  const input = document.getElementById('dmInput');
  const send = document.getElementById('dmSend');
  const typing = document.getElementById('dmTyping');

  toggle.onclick = () => {
    isOpen = !isOpen;
    widget.classList.toggle('dm-open', isOpen);
    toggle.textContent = isOpen ? '✕' : '👩';
    label.classList.add('dm-hidden');
  };

  close.onclick = () => {
    isOpen = false;
    widget.classList.remove('dm-open');
    toggle.textContent = '👩';
  };

  // Hide label after 5 seconds
  setTimeout(() => { label.classList.add('dm-hidden'); }, 5000);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  });
  send.onclick = sendMsg;

  async function sendMsg() {
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'dm-user');
    input.value = '';
    send.disabled = true;
    typing.classList.add('dm-show');
    msgs.scrollTop = msgs.scrollHeight;
    history.push({ role: 'user', content: text });

    try {
      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + GROQ_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT + '\n\nرد بلهجة نجدية سعودية. الرد يكون 3-5 سطور. لا تستخدمي ماركداون. اختمي بسؤال يفتح المحادثة.' },
            ...history.slice(-10),
          ],
          temperature: 0.7,
          max_tokens: 400
        })
      });
      const d = await r.json();
      const reply = d.choices[0].message.content.replace(/[#*`]/g, '');
      typing.classList.remove('dm-show');
      addMsg(reply, 'dm-bot');
      history.push({ role: 'assistant', content: reply });
    } catch(e) {
      typing.classList.remove('dm-show');
      addMsg('عذراً صار خطأ، جرب مرة ثانية 🙏', 'dm-bot');
    }
    send.disabled = false;
    input.focus();
  }

  function addMsg(text, cls) {
    const d = document.createElement('div');
    d.className = 'dm-msg ' + cls;
    if (cls === 'dm-bot') d.innerHTML = '<div class="dm-sender">ديمة</div>' + text;
    else d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }
})();
