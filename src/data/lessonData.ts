import { Scene, CharacterInfo, LiteraryDevice, VocabWord, CaseStep, CaseEnding, LocalizedString } from '../types';

// ===================== 1-BOSQICH: QIZIQISH UYG'OTISH =====================
export const STAGE_1_DATA = {
  hookQuestion: {
    uz: 'Tasavvur qil: bir jonivor sening qishlog‘ingga ziyon yetkazyapti, lekin uning aqli, mardligi va sadoqatini ko‘rib unga qoyil qolasan. Sen qanday yo‘l tutgan bo‘larding?',
    ru: 'Представь: дикий зверь наносит ущерб ферме, но его ум, благородство и верность вызывают восхищение. Как бы ты поступил?',
    en: 'Imagine: a wild animal causes harm to your ranch, yet its intelligence, courage, and loyalty astound you. What would you do?',
  },
  cluesGame: {
    prompt: {
      uz: 'Quyidagi 4 ta sirli belgini ochib, bugun qaysi afsonaviy asar haqida o‘rganishimizni top!',
      ru: 'Открой 4 тайных знака и угадай, о каком легендарном произведении пойдет речь!',
      en: 'Reveal the 4 mysterious clues and guess which legendary story we will explore today!',
    },
    clues: [
      {
        id: 1,
        icon: '🏜️',
        label: { uz: '1-ishora: Joy', ru: '1-я улика: Место', en: '1st Clue: Setting' },
        hint: {
          uz: 'Karrumpo nomli keng cho‘l va toshloq vodiy. Shimoliy Amerika dashtlari.',
          ru: 'Широкая пустынная долина Каррумпо среди степей Северной Америки.',
          en: 'A vast desert and rocky valley named Currumpaw in North America.',
        },
      },
      {
        id: 2,
        icon: '🐾',
        label: { uz: '2-ishora: Qahramon', ru: '2-я улика: Герой', en: '2nd Clue: Hero' },
        hint: {
          uz: 'Hech bir tuzoqqa tushmaydigan, odamlarning barcha hiylasini biladigan ulkan bo‘ri.',
          ru: 'Огромный волк-вожак, распознающий любые капканы и хитрости охотников.',
          en: 'A massive wolf pack leader who outsmarts every hunter trap and poison.',
        },
      },
      {
        id: 3,
        icon: '⚡',
        label: { uz: '3-ishora: To‘qnashuv', ru: '3-я улика: Конфликт', en: '3rd Clue: Conflict' },
        hint: {
          uz: 'Chorvadorlar va ovchilarning yillar davomida bu bo‘rini yenga olmagani.',
          ru: 'Многолетнее безуспешное противостояние фермеров и охотников с волком.',
          en: 'Years of futile attempts by ranchers and hunters to capture this wolf.',
        },
      },
      {
        id: 4,
        icon: '❤️',
        label: { uz: '4-ishora: Sirli kuch', ru: '4-я улика: Слабость и сила', en: '4th Clue: Secret' },
        hint: {
          uz: 'Kuchli qahramon faqat bir narsada zaif edi: o‘z sevikli juftiga bo‘lgan cheksiz sadoqat!',
          ru: 'Непобедимый зверь пал лишь из-за одного: беззаветной преданности своей подруге!',
          en: 'The invincible king had only one vulnerability: infinite love and loyalty for his mate!',
        },
      },
    ],
    guessOptions: [
      { id: 'lobo', text: { uz: 'Ernest Seton-Tompson — "Lobo"', ru: 'Э. Сетон-Томпсон — «Лобо»', en: 'Ernest Thompson Seton — "Lobo"' }, isCorrect: true },
      { id: 'maugli', text: { uz: 'Redyard Kipling — "Maugli"', ru: 'Р. Киплинг — «Маугли»', en: 'Rudyard Kipling — "The Jungle Book"' }, isCorrect: false },
      { id: 'oqsoyoq', text: { uz: 'Jek London — "Oq so‘yloq"', ru: 'Джек Лондон — «Белый Клык»', en: 'Jack London — "White Fang"' }, isCorrect: false },
    ],
  },
  didYouKnow: [
    {
      id: 'fact-1',
      title: { uz: 'Bo‘rilar — sadoqatli oila', ru: 'Волки — верные семьянины', en: 'Wolves Mate for Life' },
      icon: '🐺',
      text: {
        uz: 'Bo‘rilar butun umri davomida faqat bitta juft bilan yashaydilar. Agar jufti xavf ostida qolsa, o‘z hayotini fido qilishga tayyor bo‘ladi.',
        ru: 'Волки образуют пары на всю жизнь. Если спутнице грозит беда, волк пойдет на любой риск ради ее спасения.',
        en: 'Wolves typically pair for life. When their mate is in danger, they will risk everything without hesitation.',
      },
    },
    {
      id: 'fact-2',
      title: { uz: 'Jamoaviy aql va tartib', ru: 'Коллективный разум стаи', en: 'Pack Intellect & Discipline' },
      icon: '🌲',
      text: {
        uz: 'Bo‘rilar to‘dasi qat’iy intizomga ega. Lobo to‘dasi odamlarning zaharlangan go‘shtini zarracha tatib ko‘rmas, har bir xavfni oldindan sezar edi.',
        ru: 'Волчья стая действует как слаженный механизм. Стая Лобо никогда не трогала отравленное мясо, обходя ловушки.',
        en: 'A wolf pack has strict discipline. Lobo’s pack avoided every poisoned bait and detected hidden scent cues.',
      },
    },
    {
      id: 'fact-3',
      title: { uz: 'Seton-Tompsonning o‘zgarishi', ru: 'Перерождение Сетон-Томпсона', en: 'Seton’s Transformation' },
      icon: '🎨',
      text: {
        uz: 'Ushbu voqeadan so‘ng Ernest Seton-Tompson ovchilikdan voz kechdi va butun umrini yovvoyi tabiatni himoya qilishga bag‘ishladi.',
        ru: 'После встречи с Лобо Сетон-Томпсон навсегда оставил охоту и стал ярым защитником дикой природы.',
        en: 'After the Lobo encounter, Seton abandoned hunting forever and spent his life championing wildlife conservation.',
      },
    },
  ],
};

// ===================== 2-BOSQICH: MUALLIF BILAN TANISHUV =====================
export const STAGE_2_DATA = {
  authorInfo: {
    name: { uz: 'Ernest Seton-Tompson (1860–1946)', ru: 'Эрнест Сетон-Томпсон (1860–1946)', en: 'Ernest Thompson Seton (1860–1946)' },
    bio: {
      uz: 'Kanadalik mashhur yozuvchi, rassom-animalist va tabiatshunos olim. U dunyoda birinchi bo‘lib hayvonlar hayotini ularning o‘z nigohi bilan, mehr va hurmat ila tasvirlab bergan.',
      ru: 'Канадский писатель, художник-анималист и ученый-натуралист. Он первым показал жизнь зверей изнутри, с глубоким уважением к их чувствам и разуму.',
      en: 'Renowned Canadian author, wildlife artist, and naturalist. He was among the first to depict wild animals from their own perspective, with profound dignity.',
    },
  },
  timeline: [
    {
      year: '1860',
      title: { uz: 'Tug‘ilishi va bolalik', ru: 'Рождение и детство', en: 'Birth and Childhood' },
      desc: {
        uz: 'Angliyada tug‘ilib, Kanadaning yovvoyi o‘rmonlarida o‘sdi. Bolaligidanoq qushlar va jonivorlarni chizishni yaxshi ko‘rgan.',
        ru: 'Родился в Англии, вырос в лесах Канады. С юных лет рисовал птиц и зверей с натуры.',
        en: 'Born in England, grew up exploring Canadian forests and sketching wild creatures.',
      },
    },
    {
      year: '1893',
      title: { uz: 'Karrumpo ekspeditsiyasi', ru: 'Экспедиция в Каррумпо', en: 'Currumpaw Expedition' },
      desc: {
        uz: 'Nyu-Meksiko dashtlarida chorvadorlar taklifi bilan afsonaviy Lobo bilan to‘qnash keldi va bu uning qarashlarini tubdan o‘zgartirdi.',
        ru: 'По приглашению фермеров прибыл в Нью-Мексико, где столкнулся с непокорным Лобо.',
        en: 'Arrived in New Mexico upon ranchers’ call, encountering Lobo — an event that forever changed his worldview.',
      },
    },
    {
      year: '1898',
      title: { uz: '"Men bilgan yovvoyi hayvonlar"', ru: 'Книга «Дикие животные, как я их знаю»', en: '"Wild Animals I Have Known"' },
      desc: {
        uz: 'Uning eng mashhur kitobi nashr etildi. Undagi "Lobo" hikoyasi butun dunyo bo‘ylab millionlab kitobxonlar qalbini zabt etdi.',
        ru: 'Вышла всемирно известная книга, где рассказ о Лобо вызвал сочувствие читателей по всему миру.',
        en: 'Published his groundbreaking book; "Lobo" captivated millions worldwide and redefined animal literature.',
      },
    },
    {
      year: '1902–1946',
      title: { uz: 'Skautlar harakati va tabiat muhofazasi', ru: 'Движение скаутов и защита природы', en: 'Woodcraft & Conservation' },
      desc: {
        uz: 'Yoshlar uchun "Yog‘och hunarmandlik" harakatiga asos soldi, bolalarga tabiatni sevish va asrashni o‘rgatdi.',
        ru: 'Основал экологическое движение «Лесных индейцев», учил молодежь беречь живую природу.',
        en: 'Founded the Woodcraft League, teaching youth to revere wild nature without destroying it.',
      },
    },
  ],
  authorQuiz: [
    {
      id: 1,
      question: {
        uz: 'Seton-Tompson faqat yozuvchi bo‘libgina qolmay, yana qaysi kasb egasi bo‘lgan?',
        ru: 'Кем еще был Сетон-Томпсон, помимо литературной деятельности?',
        en: 'Besides being a writer, what else was Seton-Thompson renowned for?',
      },
      options: [
        { uz: 'Rassom-animalist va tabiatshunos', ru: 'Художником-анималистом и натуралистом', en: 'Wildlife artist and naturalist' },
        { uz: 'Dengizchi va kema kapitani', ru: 'Моряком и капитаном корабля', en: 'Sailor and ship captain' },
        { uz: 'Shahardagi bank boshqaruvchisi', ru: 'Управляющим городским банком', en: 'City bank manager' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'U kitoblaridagi hayvonlar rasmini o‘zi jonli chizgan rassom va tabiatshunos edi.',
        ru: 'Он сам иллюстрировал свои книги точными и выразительными рисунками животных.',
        en: 'He personally illustrated his animal books with scientific precision and artistic grace.',
      },
    },
    {
      id: 2,
      question: {
        uz: 'Muallif dastlab Nyu-Meksiko dashtlariga qanday maqsadda kelgan edi?',
        ru: 'С какой первоначальной целью автор прибыл в прерии Нью-Мексико?',
        en: 'What was the author’s initial mission in the prairies of New Mexico?',
      },
      options: [
        { uz: 'Bo‘ri to‘dasini tutish uchun ovchi sifatida', ru: 'Как опытный охотник для поимки волчьей стаи', en: 'As an experienced hunter to capture the wolf pack' },
        { uz: 'Yangi shahar qurish uchun yer o‘lchashga', ru: 'Для замера земель под новый город', en: 'To survey land for building a new town' },
        { uz: 'Fermada qo‘y boqish uchun', ru: 'Чтобы разводить овец на ферме', en: 'To herd sheep on a ranch' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Chorvadorlar uni aqlli bo‘rini tutib berish uchun chaqirishgan edi.',
        ru: 'Ранчеро пригласили его как знатока повадок хищников, чтобы справиться с Лобо.',
        en: 'Ranchers hired him as a predator specialist to capture the elusive wolf.',
      },
    },
    {
      id: 3,
      question: {
        uz: 'Lobo bilan yuz bergan voqea Seton-Tompsonning hayotiga qanday ta’sir ko‘rsatdi?',
        ru: 'Как встреча с Лобо повлияла на дальнейшую жизнь писателя?',
        en: 'How did the encounter with Lobo influence Seton-Thompson’s later life?',
      },
      options: [
        { uz: 'U ovchilikni to‘xtatib, tabiat himoyachisiga aylandi', ru: 'Он навсегда бросил охоту и стал защитником природы', en: 'He gave up hunting and became an ardent wildlife protector' },
        { uz: 'U yozuvchilikni butunlay tashlab ketdi', ru: 'Он навсегда бросил писать книги', en: 'He completely gave up writing books' },
        { uz: 'U boshqa o‘lkalarda yanada ko‘proq ov qildi', ru: 'Он стал охотиться еще активнее в других странах', en: 'He hunted even more aggressively in other lands' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Bo‘rining olijanobligi yozuvchi qalbida tabiatga cheksiz mehr va pushaymonlik uyg‘otdi.',
        ru: 'Благородство и верность волка перевернули душу автора, пробудив глубокое раскаяние.',
        en: 'The wolf’s nobility and grief awakened profound remorse and respect in Seton’s heart.',
      },
    },
  ],
};

// ===================== 3-BOSQICH: HIKOYA MAZMUNI (6 SAHNA) =====================
export const STORY_SCENES: Scene[] = [
  {
    id: 1,
    title: {
      uz: '1-sahna: Karrumpo qiroli va uning to‘dasi',
      ru: 'Сцена 1: Властелин Каррумпо и его свита',
      en: 'Scene 1: The King of Currumpaw and His Pack',
    },
    summary: {
      uz: 'Karrumpo vodiysida ulkan, kuchli va favqulodda aqlli bo‘ri — Lobo hukmronlik qilardi. Uning besh nafar sara a’zodan iborat kichik to‘dasi bo‘lib, ular faqat eng sara novvoslarni ovlar, odamlarning chorvasiga katta talofat yetkazar edi. Chorvadorlar ularni yillab tuta olmasdi.',
      ru: 'В долине Каррумпо правил могучий и необычайно умный волк Лобо. В его небольшой отборной стае было всего пять волков, но они наносили огромный урон стадам, выбирая только лучший скот. Ни один фермер не мог справиться с ними.',
      en: 'In Currumpaw valley ruled Lobo, a gigantic and exceptionally shrewd wolf. His small elite pack of five wolves hunted only prime cattle and defied all local ranchers for years without ever being cornered.',
    },
    quotePrompt: {
      uz: 'Lobo to‘dasi shunchaki yirtqich emas, o‘ziga xos intizomli jamoa edi.',
      ru: 'Стая Лобо была не просто хищниками, а сплоченной и осторожной командой.',
      en: 'Lobo’s pack was not merely a band of predators, but a disciplined unit.',
    },
    svgType: 'pack',
    checkQuestion: {
      question: {
        uz: 'Lobo to‘dasi boshqa bo‘rilardan nimasi bilan ajralib turardi?',
        ru: 'Чем стая Лобо отличалась от обычных волчьих стай?',
        en: 'What distinguished Lobo’s pack from ordinary wolf packs?',
      },
      options: [
        { uz: 'Kichik sonli, juda ehtiyotkor va faqat sara ozuqani tanlashi bilan', ru: 'Малочисленностью, крайней осторожностью и выбором лучшей добычи', en: 'Small number, supreme caution, and selecting only prime prey' },
        { uz: 'Yuzlab bo‘rilardan iborat katta qo‘shinligi bilan', ru: 'Огромной численностью в сотни волков', en: 'Having hundreds of wolves marching together' },
        { uz: 'Odamlarning qishlog‘iga kunduzi hujum qilishi bilan', ru: 'Дневными нападениями на центр поселка', en: 'Attacking town centers in broad daylight' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Lobo to‘dasi faqat 5-6 ta bo‘ridan iborat bo‘lib, ortiqcha son emas, yuqori aql va tartib ustun edi.',
        ru: 'Стая состояла всего из нескольких отборных зверей, где ценилась выучка и осторожность.',
        en: 'The pack consisted of only five or six elite wolves where caution and intellect reigned.',
      },
    },
  },
  {
    id: 2,
    title: {
      uz: '2-sahna: Bekor ketgan hiylalar va zaharlar',
      ru: 'Сцена 2: Тщетные уловки и яды',
      en: 'Scene 2: Futile Baits and Useless Poisons',
    },
    summary: {
      uz: 'Chorvadorlar bo‘rilarni yo‘qotish uchun go‘shtlarga maxsus xushbo‘y zahar solishdi, ulkan qopqonlarni yer ostiga berkitishdi. Biroq Lobo inson hidini uzoqdanoq sezar, zaharlangan go‘shtlarni bitta joyga to‘plab, ustiga axlat tashlab ketar, tuzoqlarni esa xavfsiz tomondan kovlab ishdan chiqarardi.',
      ru: 'Скотоводы подкладывали отравленные приманки без запаха человека и маскировали тяжелые стальные капканы. Но Лобо с легким презрением находил каждую ловушку, сгребал отравленное мясо в кучу и переворачивал капканы с безопасной стороны.',
      en: 'Ranchers prepared undetectable poisoned baits and hidden steel traps. Yet Lobo detected human scent with uncanny skill, piled the tainted meat together in disdain, and dug up the traps safely from behind to spring them.',
    },
    quotePrompt: {
      uz: 'Lobo tuzoqlarning tuzilishini xuddi muhandisdek tushunardi.',
      ru: 'Лобо понимал устройство капканов словно опытный инженер.',
      en: 'Lobo understood the mechanism of traps as though he designed them himself.',
    },
    svgType: 'traps',
    checkQuestion: {
      question: {
        uz: 'Lobo ovchilar qo‘ygan zaharlangan go‘shtlarga qanday munosabatda bo‘ldi?',
        ru: 'Как Лобо поступил с подложенным охотниками отравленным мясом?',
        en: 'How did Lobo react to the poisoned meat baits set by hunters?',
      },
      options: [
        { uz: 'Ularni to‘plab, ustiga tuproq va axlat sochib, mensimay ketdi', ru: 'Собрал в кучу, забросал нечистотами и насмешливо ушел', en: 'Piled them together, defiled them with dirt, and walked away in contempt' },
        { uz: 'Ochlikdan hammasini yeb qo‘ydi', ru: 'От голода съел все приманки', en: 'Ate them all up due to hunger' },
        { uz: 'O‘z iniga olib borib yashirdi', ru: 'Унес и спрятал в свое логово', en: 'Carried them back to his den' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Lobo bu hiylani darhol fahmlagan va ovchilar ustidan kulgandek ularni qorishtirib tashlagan.',
        ru: 'Лобо мгновенно распознавал обман и демонстрировал свое превосходство над охотниками.',
        en: 'Lobo recognized the poison instantly and left the pile defiled as a sign of disdain.',
      },
    },
  },
  {
    id: 3,
    title: {
      uz: '3-sahna: Setonning kelishi va yangi reja',
      ru: 'Сцена 3: Прибытие Сетона и новый план',
      en: 'Scene 3: Seton’s Arrival and New Strategy',
    },
    summary: {
      uz: 'Mahalliy ovchilar ojiz qolgach, dashtga Ernest Seton-Tompson taklif qilindi. U tajribali ovchi va hayvonlar tabiatini yaxshi bilardi. Seton kunlab bo‘rining izlarini kuzatdi va hayratda qoldi: Lobo har qanday yangi hidni tekshirar, to‘dani biror marta ham xavfli joyga boshlamas edi. Ammo Seton Loboning yagona nozik joyini payqadi.',
      ru: 'После неудач местных охотников на ранчо прибыл ученый и знаток дикой природы Эрнест Сетон. Он днями исследовал следы волка и поражался его мудрости. Однако вскоре Сетон заметил одну важнейшую деталь: впереди вожака иногда бежала белая волчица.',
      en: 'With local hunters defeated, Ernest Thompson Seton arrived. Days of tracking revealed Lobo’s sheer genius. But Seton observed one unique flaw: occasionally, ahead of the cautious leader ran a beautiful white female wolf.',
    },
    quotePrompt: {
      uz: 'Eng qudratli qahramonning ham yuragida nozik bir ip bo‘ladi.',
      ru: 'Даже у самого грозного вожака есть уязвимая струна души.',
      en: 'Even the most invincible sovereign possesses an emotional vulnerability.',
    },
    svgType: 'author',
    checkQuestion: {
      question: {
        uz: 'Seton bo‘rini o‘rganish jarayonida nimani payqab qoldi?',
        ru: 'Что подметил Сетон во время наблюдения за волчьими следами?',
        en: 'What did Seton observe while closely examining the pack’s tracks?',
      },
      options: [
        { uz: 'To‘dada Lobodan ham oldinda yurishga jur’at etadigan oq bo‘ri borligini', ru: 'Что впереди вожака дерзко бежит красивая белая волчица', en: 'That a beautiful white wolf dared to run ahead of Lobo' },
        { uz: 'Lobo juda qari va ko‘zi ojiz ekanligini', ru: 'Что волк уже стар и плохо видит', en: 'That Lobo was old and nearly blind' },
        { uz: 'Bo‘rilar tun emas, kunduzi uxlamasligini', ru: 'Что волки никогда не спят днем', en: 'That wolves never sleep during daytime' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Lobo faqat o‘z jufti Blankagagina o‘zidan oldinga o‘tishga va erkin harakatlanishga ruxsat berardi.',
        ru: 'Только своей подруге Бланке грозный вожак позволял бежать впереди себя.',
        en: 'Only to his beloved Blanca did Lobo permit running ahead of him on the trail.',
      },
    },
  },
  {
    id: 4,
    title: {
      uz: '4-sahna: Blanka va uning fojiasi',
      ru: 'Сцена 4: Бланка и роковая оплошность',
      en: 'Scene 4: Blanca and the Fatal Mistake',
    },
    summary: {
      uz: 'Oq rangli go‘zal bo‘ri — Blanka Loboning suyukli jufti edi. U Lobodek o‘ta ehtiyotkor emas, balki qiziquvchan va yosh edi. Seton bu zaiflikdan foydalanib, tor tog‘ yo‘lagiga tuzoqlar qo‘ydi va yangi so‘yilgan mol boshini ilib qo‘ydi. Blanka qiziqib yaqinlashdi va tuzoqqa tushdi. Uning halok bo‘lishi butun vodiyga dahshatli nolani olib keldi.',
      ru: 'Белоснежная красавица Бланка была преданной спутницей Лобо. Будучи молодой и игривой, она не обладала железной выдержкой вожака. Сетон расставил капканы в узком ущелье. Бланка попала в западню и погибла. Ее гибель потрясла вожака.',
      en: 'The snow-white she-wolf Blanca was Lobo’s cherished mate. Lacking his seasoned suspicion, she grew curious near an enticing bait in a narrow canyon. Blanca was caught in the heavy traps, leading to her tragic death.',
    },
    quotePrompt: {
      uz: 'Lobo tun bo‘yi tog‘lar aro o‘z juftini chaqirib, yurakni ezuvchi ovozda uvilladi.',
      ru: 'Всю ночь по ущельям разносился душераздирающий вой вожака, звавшего свою подругу.',
      en: 'All night long, a heartbreaking mournful howl echoed through the canyons as Lobo sought his lost mate.',
    },
    svgType: 'blanca',
    checkQuestion: {
      question: {
        uz: 'Nima uchun Blanka tuzoqqa tushib qoldi?',
        ru: 'Почему Бланка оказалась в ловушке охотников?',
        en: 'Why did Blanca fall into the hunters’ trap?',
      },
      options: [
        { uz: 'U Lobodek o‘ta shubhali emas, balki qiziquvchan va beg‘amroq edi', ru: 'Она была молода, любопытна и менее подозрительна, чем Лобо', en: 'She was younger, curious, and far less suspicious than Lobo' },
        { uz: 'Lobo uni ataylab tashlab ketgani uchun', ru: 'Потому что Лобо намеренно оставил ее', en: 'Because Lobo deliberately abandoned her' },
        { uz: 'U qishlog‘dagi itlar bilan urushib qolgani uchun', ru: 'Она подралась с поселковыми псами', en: 'She was cornered by ranch dogs' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Blankaning yoshligi va beparvoligi ovchilarning hiylasiga duchor bo‘lishiga sabab bo‘ldi.',
        ru: 'Молодость и легкомыслие Бланки привели к попаданию в замаскированные капканы.',
        en: 'Blanca’s youthful curiosity and lack of fear made her vulnerable to the concealed traps.',
      },
    },
  },
  {
    id: 5,
    title: {
      uz: '5-sahna: Muhabbat tufayli tutilgan qirol',
      ru: 'Сцена 5: Король, побежденный любовью',
      en: 'Scene 5: The King Captured by Love',
    },
    summary: {
      uz: 'O‘z juftini yo‘qotgan Lobo o‘zining temir ehtiyotkorligini unutdi. U qayg‘udan aqlini yo‘qotgandek, kechayu-kunduz Blankani qidirdi, har bir izni hidlab, qishloq atrofiga yaqinlashdi. Seton aynan Blankaning hidini va uning jonsiz tanasining izlarini ishlatib, to‘rt tomondan qopqonlar qurgandi. Lobo faqat sevgisi sababli barcha oyoqlari bilan tuzoqqa tushdi.',
      ru: 'Потеряв любимую, Лобо забыл про всю осторожность. Обезумев от тоски, он метался в поисках ее следов возле усадьбы охотников. Сетон расставил сотни капканов по следу Бланки. Ослепленный горем волк бросился вперед и попал в ловушку всеми четырьмя лапами.',
      en: 'Grief-stricken, Lobo abandoned his lifelong vigilance. Searching desperately for Blanca near the ranch, he followed her scent trail where Seton had set a matrix of massive traps. Blinded by devotion, the great king was ensnared.',
    },
    quotePrompt: {
      uz: 'U dushmanlarining hiylasiga emas, o‘z yuragidagi sadoqatga mag‘lub bo‘ldi.',
      ru: 'Его сломила не хитрость врагов, а безграничная преданность собственному сердцу.',
      en: 'He was defeated not by mortal cunning, but by the relentless devotion of his loyal heart.',
    },
    svgType: 'capture',
    checkQuestion: {
      question: {
        uz: 'Qanday omil o‘ta ehtiyotkor Loboning tuzoqqa tushishiga sabab bo‘ldi?',
        ru: 'Что заставило сверхосторожного Лобо потерять бдительность?',
        en: 'What caused the extraordinarily cautious Lobo to lose his vigilance?',
      },
      options: [
        { uz: 'Jufti Blankaga bo‘lgan cheksiz muhabbati va ayriliq dardi', ru: 'Безмерная любовь к Бланке и отчаянное горе утраты', en: 'His boundless love for Blanca and overwhelming heartbreak' },
        { uz: 'Kuchli qor bo‘roni tufayli yo‘lni yo‘qotgani', ru: 'Потеря тропы из-за сильной метели', en: 'Losing the path during a raging blizzard' },
        { uz: 'Ovchilarning to‘pponchadan o‘q uzgani', ru: 'Внезапный выстрел из ружья', en: 'A sudden gunshot wound from an ambush' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Lobo har doim hiylalarni payqardi, ammo sevgilisi izidan borayotganda hech qanday xavfni o‘ylamadi.',
        ru: 'Слепая преданность и тоска заставили великого волка шагнуть прямо в ловушки.',
        en: 'Devotion and grief overwhelmed his defensive instincts, leading him straight into the trap line.',
      },
    },
  },
  {
    id: 6,
    title: {
      uz: '6-sahna: Mag‘rur o‘lim va qalb uyg‘onishi',
      ru: 'Сцена 6: Гордый финал и пробуждение души',
      en: 'Scene 6: An Indomitable Spirit and Awakening',
    },
    summary: {
      uz: 'Qopqonga tushgan Loboni ovchilar fermaga olib kelishdi va zanjirband qilishdi. Ammo Lobo bo‘ysunmadi: u insonlarga termulmadi, berilgan go‘sht va suvga hatto qaramadi. U faqat o‘zining sevimli cho‘llariga qarab yotdi. Ertalab u ozod ruhini saqlab, jimgina vafot etdi. Bu mag‘rurlik Seton qalbida abadiy iz qoldirdi va uning dunyoqarashini o‘zgartirdi.',
      ru: 'Связанного волка привезли на ферму и посадили на цепь. Но Лобо не сдался: он не рычал, не просил пощады и наотрез отказался от еды и воды. Он лишь молча смотрел вдаль на свои родные прерии. Утром его нашли бездыханным — его гордое сердце не вынесло неволи. Сетон был потрясен до глубины души.',
      en: 'Bound and chained at the ranch, Lobo remained unbroken. He did not beg, snarl, or touch the meat and water offered. He merely gazed toward the vast open prairie. By dawn, his indomitable heart gave out in proud captivity. Seton was profoundly moved and transformed.',
    },
    quotePrompt: {
      uz: 'Sherni qafasda saqlash mumkin, lekin uning erkinlikka bo‘lgan ruhini yengib bo‘lmaydi.',
      ru: 'Можно заковать тело зверя в цепи, но невозможно отнять у него величие духа.',
      en: 'You may bind a wild king in chains, but you cannot enslave an indomitable soul.',
    },
    svgType: 'farewell',
    checkQuestion: {
      question: {
        uz: 'Lobo asirlikda o‘zini qanday tutdi?',
        ru: 'Как вел себя Лобо, оказавшись в цепях у людей?',
        en: 'How did Lobo conduct himself while held in captivity?',
      },
      options: [
        { uz: 'Ovqat va suvdan bosh tortib, mag‘rur holda dashtga termulib yotdi', ru: 'Отказался от пищи и воды, с непокорной гордостью глядя в степь', en: 'Refused food and water, gazing proudly toward the prairie' },
        { uz: 'Odamlarga yoqish uchun erkalana boshladi', ru: 'Стал ластиться к охотникам, выпрашивая свободу', en: 'Began fawning over hunters begging for mercy' },
        { uz: 'Zanjirni uzib, shaharga qochib ketdi', ru: 'Разорвал цепи и убежал в город', en: 'Snapped the iron chains and escaped into town' },
      ],
      correctIndex: 0,
      explanation: {
        uz: 'Lobo ozodliksiz yashashni istamadi, u qullikdan ko‘ra mag‘rur o‘limni afzal bildi.',
        ru: 'Волк предпочел смерть жизни в рабстве, сохранив достоинство короля.',
        en: 'Lobo chose proud death over a life in bondage, never relinquishing his royal dignity.',
      },
    },
  },
];

// ===================== 4-BOSQICH: QAHRAMONLAR VA G'OYA =====================
export const CHARACTERS_DATA: CharacterInfo[] = [
  {
    id: 'lobo',
    name: { uz: 'Lobo', ru: 'Лобо', en: 'Lobo' },
    role: { uz: 'Karrumpo to‘dasi yetakchisi, "qirol"', ru: 'Вожак волчьей стаи, «Властелин»', en: 'Wolf Pack Alpha, "The King"' },
    traits: [
      { uz: 'O‘ta aqlli va ziyrak', ru: 'Невероятно умен и проницателен', en: 'Remarkably intelligent' },
      { uz: 'Ehtiyotkor va mag‘rur', ru: 'Осторожен и исполнен гордости', en: 'Cautious and dignified' },
      { uz: 'Juftiga cheksiz sadoqatli', ru: 'Безгранично предан своей паре', en: 'Fiercely devoted to his mate' },
      { uz: 'Erkinlikni hayotdan ustun biluvchi', ru: 'Свобода для него дороже жизни', en: 'Values freedom above life' },
    ],
    description: {
      uz: 'U yirtqich bo‘lsa-da, insonlardan ko‘ra vafodor va mard qahramon sifatida gavdalanadi. Uning fojiasi — zaifligida emas, balki buyuk sevgisidadir.',
      ru: 'Хотя он хищник, автор наделяет его рыцарским благородством. Его трагедия кроется не в слабости, а в силе его верного сердца.',
      en: 'Though a predator, he displays chivalric courage and loyalty that surpasses human cruelty.',
    },
    quote: {
      uz: '«U dushmanlari qo‘lida o‘lmadi, u qullikda yashashni xohlamaganidan vafot etdi.»',
      ru: '«Он погиб не от ран врагов, а потому что не мог жить в оковах неволи.»',
      en: '"He did not perish from hunter wounds, but because his spirit refused to breathe in chains."',
    },
    symbolism: {
      uz: 'Erkin tabiat, yengilmas ruh va sof vafodorlik ramzi.',
      ru: 'Символ дикой свободы, непокоренного духа и абсолютной верности.',
      en: 'Symbol of wild liberty, unconquered spirit, and true devotion.',
    },
  },
  {
    id: 'blanca',
    name: { uz: 'Blanka', ru: 'Бланка', en: 'Blanca' },
    role: { uz: 'Loboning sevikli jufti, oq bo‘ri', ru: 'Верная подруга Лобо, белая волчица', en: 'Lobo’s Beloved Mate, White Wolf' },
    traits: [
      { uz: 'Go‘zal va oq rangli', ru: 'Белоснежная и грациозная', en: 'Snow-white and graceful' },
      { uz: 'Qiziquvchan va sho‘x', ru: 'Любопытная и игривая', en: 'Curious and playful' },
      { uz: 'Beparvo va beg‘am', ru: 'Менее осторожная, чем вожак', en: 'Carefree and daring' },
    ],
    description: {
      uz: 'Loboning hayotidagi yagona shodlik va uning qalb kaliti. Uning qiziquvchanligi o‘zining halokatiga, bu esa o‘z navbatida Loboning qulashiga olib keldi.',
      ru: 'Единственная радость сурового вожака. Ее юношеское легкомыслие привело к гибели ее самой и предопределило участь Лобо.',
      en: 'The light of Lobo’s world. Her youthful curiosity brought her own downfall and sealed the fate of her king.',
    },
    quote: {
      uz: '«U Loboning temir qalbini eritgan yagona mehr quyoshi edi.»',
      ru: '«Она была единственным лучом, способным растопить суровое сердце короля прерий.»',
      en: '"She was the only gentle star capable of warming the iron heart of Currumpaw’s king."',
    },
    symbolism: {
      uz: 'Go‘zallik, beg‘uborlik va sevgi ramzi.',
      ru: 'Символ красоты, чистоты и искренней любви.',
      en: 'Symbol of beauty, grace, and heartfelt affection.',
    },
  },
  {
    id: 'seton',
    name: { uz: 'Ernest Seton (Muallif)', ru: 'Эрнест Сетон (Автор)', en: 'Ernest Seton (Author)' },
    role: { uz: 'Yozuvchi, ovchi va tabiatshunos', ru: 'Охотник, естествоиспытатель и автор', en: 'Hunter, Naturalist, and Chronicler' },
    traits: [
      { uz: 'Kuzatuvchan va sabrli', ru: 'Наблюдателен и терпелив', en: 'Observant and methodical' },
      { uz: 'Tabiat qonunlarini biluvchi', ru: 'Глубоко знает повадки зверей', en: 'Knowledgeable in wildlife lore' },
      { uz: 'Vijdoni uyg‘ongan inson', ru: 'Человек с пробудившейся совестью', en: 'Possesses an awakening conscience' },
    ],
    description: {
      uz: 'Avvaliga dushman sifatida keladi, ammo voqealar rivojida Loboning mardligini ko‘rib unga qoyil qoladi va chuqur pushaymon bo‘ladi.',
      ru: 'Приехав как безжалостный охотник, к финалу он проникается безграничным почтением к зверю и навсегда меняет свою жизнь.',
      en: 'Arriving as a mercenary tracker, he comes to revere the magnificent creature and undergoes moral transformation.',
    },
    quote: {
      uz: '«Men o‘z qo‘llarim bilan o‘sha ulkan mard qalbni so‘ndirganimdan chuqur afsusdaman.»',
      ru: '«Я чувствовал тяжелое раскаяние за то, что помог оборвать жизнь этого благородного создания.»',
      en: '"I felt a deep gnawing sorrow that my hand had aided in extinguishing so noble a life."',
    },
    symbolism: {
      uz: 'Insoniyatning tabiat bilan to‘qnashuvi va inson vijdonining uyg‘onishi.',
      ru: 'Символ конфликта цивилизации с природой и пробуждения нравственности.',
      en: 'Symbol of mankind’s clash with wilderness and moral awakening.',
    },
  },
  {
    id: 'ranchers',
    name: { uz: 'Chorvadorlar (Fermerlar)', ru: 'Скотоводы (Фермеры)', en: 'The Cattle Ranchers' },
    role: { uz: 'Karrumpo vodiysidagi mol egalari', ru: 'Хозяева ранчо в долине Каррумпо', en: 'Livestock Owners of the Valley' },
    traits: [
      { uz: 'Faqat moddiy foydani o‘ylovchi', ru: 'Заботятся лишь о материальной выгоде', en: 'Focused primarily on material gain' },
      { uz: 'G‘azabnok va murosasiz', ru: 'Разгневаны и беспощадны', en: 'Bitter and unforgiving' },
      { uz: 'Tabiat qadrini anglamaydigan', ru: 'Не ценят красоту живой природы', en: 'Blind to the intrinsic worth of wildlife' },
    ],
    description: {
      uz: 'Ular uchun Lobo faqat mol kushandasi va dushman edi. Ular hayvonning qalbini emas, faqat o‘z hamyonlarini o‘ylaydilar.',
      ru: 'Для них волк был лишь грабителем и опасным вредителем. Они видят в мире только выгоду и убытки.',
      en: 'For them, Lobo was solely a pest who diminished their profits. They measured nature in dollars and cents.',
    },
    quote: {
      uz: '«U bizning eng yaxshi mollarimizni nobud qildi, u yo‘q qilinishi shart!»',
      ru: '«Он режет наш лучший скот, он должен быть уничтожен любой ценой!»',
      en: '"He slaughters our finest steers; he must be destroyed at all costs!"',
    },
    symbolism: {
      uz: 'Tabiatga nisbatan iste’molchilik va shafqatsizlik munosabati.',
      ru: 'Символ потребительского и прагматичного отношения к миру.',
      en: 'Symbol of ruthless utilitarianism toward the natural world.',
    },
  },
];

export const LITERARY_DEVICES: LiteraryDevice[] = [
  {
    id: 'syujet',
    term: { uz: 'Syujet (Voqealar zanjiri)', ru: 'Сюжет (Цепь событий)', en: 'Plot (Narrative Arc)' },
    definition: {
      uz: 'Adabiy asarda qahramonlar o‘rtasidagi to‘qnashuv va voqealarning ma’lum mantiqiy ketma-ketlikda rivojlanishi.',
      ru: 'Система событий в произведении, раскрывающая характеры героев и основной конфликт.',
      en: 'The sequence of interconnected events tracing the central conflict and resolution.',
    },
    exampleFromStory: {
      uz: 'Lobo to‘dasining dashtdagi hukmronligi → Blankaning tutilishi → Loboning izlab kelishi va tutilishi → Mag‘rur o‘lim.',
      ru: 'Господство стаи Лобо → поимка Бланки → поиски волка и его пленение → гибель во имя свободы.',
      en: 'Lobo’s reign in the valley → Blanca’s capture → Lobo’s desperate search & trapping → Proud demise.',
    },
    analysis: {
      uz: 'Syujet har bir sahnada taranglashib boradi va kitobxonni hayvon taqdiriga chuqur hamdardlik bildirishga undaydi.',
      ru: 'Напряжение нарастает шаг за шагом, заставляя читателя всем сердцем сопереживать дикому зверю.',
      en: 'Tension escalates step-by-step, evoking empathy for the tragic wolf leader.',
    },
  },
  {
    id: 'kompozitsiya',
    term: { uz: 'Kompozitsiya (Qurilishi)', ru: 'Композиция (Структура)', en: 'Composition (Structure)' },
    definition: {
      uz: 'Asar qismlarining (ekspozitsiya, tugun, rivojlanish, kulminatsiya, yechim) o‘zaro uyg‘un joylashuvi.',
      ru: 'Построение произведения: экспозиция, завязка, развитие действия, кульминация, развязка.',
      en: 'The architectural framework: exposition, inciting incident, rising action, climax, and falling action.',
    },
    exampleFromStory: {
      uz: 'Tugun: Setonning Karrumpoga kelishi; Kulminatsiya: Loboning tuzoqqa tushishi; Yechim: Loboning o‘limi va Setonning vijdon azobi.',
      ru: 'Завязка: приезд Сетона; Кульминация: поимка Лобо четырьмя капканами; Развязка: смерть волка и раскаяние охотника.',
      en: 'Inciting incident: Seton’s arrival; Climax: Lobo ensnared in traps; Resolution: Lobo’s death & Seton’s remorse.',
    },
    analysis: {
      uz: 'Kulminatsiya nuqtasida kitobxon qudratli bo‘rining sevgisi tufayli dushmanga taslim bo‘lishini ko‘radi.',
      ru: 'В кульминации раскрывается главная мысль: великого зверя сгубила не хитрость врага, а сила любви.',
      en: 'At the climax, we witness that true love—not enemy trickery—caused the sovereign’s downfall.',
    },
  },
  {
    id: 'obraz',
    term: { uz: 'Badiiy Obraz', ru: 'Художественный Образ', en: 'Literary Characterization' },
    definition: {
      uz: 'Yozuvchi tasavvuri va so‘z san’ati yordamida yaratilgan, o‘ziga xos xarakterga ega jonli siymo.',
      ru: 'Обобщенное и эмоциональное отражение действительности через конкретный персонаж.',
      en: 'The artistic depiction of human or animal personas with distinct moral and psychological depth.',
    },
    exampleFromStory: {
      uz: 'Lobo — oddiy yirtqich emas, balki shon-sharaf, aql, sadoqat va erkinlik timsolidir.',
      ru: 'Лобо — не просто волк-хищник, а олицетворение чести, ума, верности и несокрушимой воли.',
      en: 'Lobo is not merely a predatory beast, but an embodiment of honor, fidelity, and dignity.',
    },
    analysis: {
      uz: 'Yozuvchi hayvon obrazini insoniylashtirmasdan, balki hayvonning o‘z tabiiy olijanobligini ko‘rsatib beradi.',
      ru: 'Автор не наделяет зверя сказочными чертами, а показывает подлинное величие дикой природы.',
      en: 'Seton avoids fairytale tropes, highlighting nature’s genuine innate majesty.',
    },
  },
  {
    id: 'jonlantirish',
    term: { uz: 'Jonlantirish (Tashxis / Personifikatsiya)', ru: 'Олицетворение (Персонификация)', en: 'Personification' },
    definition: {
      uz: 'Insoniy his-tuyg‘u, so‘zlash yoki niyatlarni tabiat hodisalari va hayvonlarga ko‘chirish san’ati.',
      ru: 'Наделение неодушевленных предметов или животных человеческими чувствами и мыслями.',
      en: 'Attributing emotional depth, remorse, and deliberate purpose to animals and nature.',
    },
    exampleFromStory: {
      uz: '«Lobo o‘zining singan qalbini hech kimga ko‘rsatmadi, uning ko‘zlarida cheksiz g‘am va mag‘rurlik porlardi.»',
      ru: '«В его взгляде читалось немое презрение к пленителям и бездонная печаль разбитого сердца.»',
      en: '"In his steady gaze lay quiet contempt for his captors and the fathomless sorrow of a broken heart."',
    },
    analysis: {
      uz: 'Jonlantirish orqali o‘quvchi bo‘rini shunchaki jonsiz obyekt emas, dardi bor tirik jon ekanini his qiladi.',
      ru: 'Благодаря этому приему читатель начинает воспринимать волка как личность с богатым внутренним миром.',
      en: 'Personification bridges the gap between species, enabling readers to feel the beast’s soul.',
    },
  },
  {
    id: 'oxshatish',
    term: { uz: 'O‘xshatish (Tashbeh)', ru: 'Сравнение', en: 'Simile & Metaphor' },
    definition: {
      uz: 'Ikki narsa yoki hodisaning umumiy belgisiga ko‘ra bir-biriga qiyoslanishi.',
      ru: 'Сопоставление одного предмета или явления с другим для усиления выразительности.',
      en: 'Comparing two different entities to illuminate hidden qualities and emotional resonance.',
    },
    exampleFromStory: {
      uz: '«Lobo o‘z to‘dasi ustida shohdek viqor bilan turardi; uning uvillashi tog‘lardagi momaqaldiroqdek jaranglardi.»',
      ru: '«Лобо держался как истинный монарх, а его грозный призыв звучал подобно раскату грома.»',
      en: '"Lobo stood amid his pack like an anointed king; his mighty call echoed like mountain thunder."',
    },
    analysis: {
      uz: 'Bu o‘xshatishlar qahramonning qudrati va dashtdagi o‘rnini yuksak darajaga ko‘taradi.',
      ru: 'Сравнение подчеркивает мощь и царственное положение волка в дикой природе.',
      en: 'Such figurative language magnifies Lobo’s power and his supreme standing in the wild.',
    },
  },
];

// ===================== 5-BOSQICH: O'YIN MAYDONI =====================
export const SEQUENCING_EVENTS = [
  {
    id: 'seq-1',
    order: 1,
    text: {
      uz: 'Lobo to‘dasi Karrumpo chorvadorlarining hiylalari va zaharlarini osonlikcha yengib o‘tadi.',
      ru: 'Стая Лобо с легкостью обходит яды и ловушки фермеров долины Каррумпо.',
      en: 'Lobo’s pack outwits the poisons and traps laid by the ranchers of Currumpaw.',
    },
  },
  {
    id: 'seq-2',
    order: 2,
    text: {
      uz: 'Tajribali tabiatshunos va ovchi Ernest Seton-Tompson bo‘rini tutish uchun vodiyga keladi.',
      ru: 'Опытный натуралист и охотник Эрнест Сетон-Томпсон прибывает в долину для поимки волка.',
      en: 'Naturalist and hunter Ernest Thompson Seton arrives in the valley to capture the wolf.',
    },
  },
  {
    id: 'seq-3',
    order: 3,
    text: {
      uz: 'Seton qopqonlar yordamida Loboning sevikli jufti Blankani tutib oladi.',
      ru: 'Сетон с помощью хитроумных капканов ловит любимую подругу вожака — Бланку.',
      en: 'Seton captures Lobo’s cherished mate Blanca using concealed gorge traps.',
    },
  },
  {
    id: 'seq-4',
    order: 4,
    text: {
      uz: 'Juftidan ayrilgan Lobo butun ehtiyotkorligini unutib, uni qidirib fermaga yaqinlashadi.',
      ru: 'Обезумевший от горя Лобо забывает об осторожности и идет по следам Бланки к ферме.',
      en: 'Grief-stricken Lobo abandons all caution and tracks Blanca’s scent right to the ranch.',
    },
  },
  {
    id: 'seq-5',
    order: 5,
    text: {
      uz: 'Lobo to‘rt tomonlama qo‘yilgan po‘lat qopqonlarga tushib, asir olinadi.',
      ru: 'Лобо попадает всеми четырьмя лапами в тяжелые стальные капканы и оказывается в плену.',
      en: 'Lobo steps into the matrix of heavy steel traps and is taken captive.',
    },
  },
  {
    id: 'seq-6',
    order: 6,
    text: {
      uz: 'Asirlikda ovqat va suvdan bosh tortgan mag‘rur bo‘ri ozodlikka boqib jimgina vafot etadi.',
      ru: 'Гордый волк отказывается от пищи в цепях и молча умирает, глядя на родную степь.',
      en: 'Chained, the proud wolf refuses food and water, quietly dying while gazing at his wild prairie.',
    },
  },
];

export const VOCAB_WORDS: VocabWord[] = [
  {
    id: 'v1',
    word: { uz: 'Chorvador', ru: 'Скотовод (ранчеро)', en: 'Rancher' },
    definition: {
      uz: 'Dasht va yaylovlarda yirik qoramol yoki qo‘y-qo‘zilarni boqib ko‘paytiruvchi kishi.',
      ru: 'Владелец ранчо, занимающийся разведением скота на просторах прерий.',
      en: 'A person who owns or manages an expansive livestock farm.',
    },
    synonym: { uz: 'Fermer, cho‘pon, chorva egasi', ru: 'Фермер, скотопромышленник', en: 'Cattleman, farmer, herder' },
    exampleSentence: {
      uz: 'Karrumpo chorvadorlari har yili minglab mollari nobud bo‘lishidan xavotirda edilar.',
      ru: 'Скотоводы Каррумпо несли огромные убытки от набегов волчьей стаи.',
      en: 'The ranchers of Currumpaw suffered tremendous financial losses each season.',
    },
  },
  {
    id: 'v2',
    word: { uz: 'Tuzoq (Qopqon)', ru: 'Капкан (ловушка)', en: 'Trap / Snare' },
    definition: {
      uz: 'Yirtqich hayvonlarni tutish uchun yerga berkitib qo‘yiladigan temir prujinali asbob.',
      ru: 'Механическое приспособление со стальными пружинами для захвата зверя.',
      en: 'A mechanical device with spring-loaded jaws designed to catch game.',
    },
    synonym: { uz: 'Qopqon, dom, hiyla quroli', ru: 'Западня, силок, ловушка', en: 'Snare, springe, pitfall' },
    exampleSentence: {
      uz: 'Seton Loboni tutish uchun eng og‘ir po‘lat tuzoqlarni qo‘lladi.',
      ru: 'Сетон использовал самые тяжелые стальные капканы, чтобы удержать вожака.',
      en: 'Seton employed the heaviest steel traps to restrain the colossal wolf.',
    },
  },
  {
    id: 'v3',
    word: { uz: 'Hiyla', ru: 'Хитрость (уловка)', en: 'Stratagem / Cunning' },
    definition: {
      uz: 'Birovni aldash, maqsadga yashirin yo‘l bilan erishish uchun ishlatiladigan tadbir.',
      ru: 'Изощренный прием или уловка для обмана соперника.',
      en: 'A clever trick or scheme devised to deceive an opponent.',
    },
    synonym: { uz: 'Makr, tadbir, aldov', ru: 'Уловка, маневр, обман', en: 'Ruse, artifice, trick' },
    exampleSentence: {
      uz: 'Lobo ovchilarning har qanday hiylasini oldindan payqab o‘tirardi.',
      ru: 'Лобо разгадывал любую хитрость человека задолго до опасности.',
      en: 'Lobo detected human stratagems well before they could pose a threat.',
    },
  },
  {
    id: 'v4',
    word: { uz: 'Sadoqat', ru: 'Преданность (верность)', en: 'Fidelity / Loyalty' },
    definition: {
      uz: 'Do‘stga, juftga yoki o‘z ahdiga bir umr sodiq va vafodor bo‘lish fazilati.',
      ru: 'Глубокая, непоколебимая верность и любовь к близкому существу.',
      en: 'Unwavering faithfulness, devotion, and attachment to another.',
    },
    synonym: { uz: 'Vafodorlik, sadoqatmandlik', ru: 'Верность, преданность', en: 'Devotion, allegiance, constancy' },
    exampleSentence: {
      uz: 'Loboning Blankaga bo‘lgan sadoqati uni dushman tuzog‘iga yetakladi.',
      ru: 'Беззаветная верность Бланке привела великого волка к роковому плену.',
      en: 'Lobo’s supreme fidelity to Blanca led him directly into the hunter’s snare.',
    },
  },
  {
    id: 'v5',
    word: { uz: 'Mard', ru: 'Благородный (храбрый)', en: 'Valiant / Noble' },
    definition: {
      uz: 'Qo‘rqmas, or-nomusli, o‘z so‘zida va harakatida olijanob bo‘lgan shaxs yoki jonzot.',
      ru: 'Исполненный мужества, чести и величия духа.',
      en: 'Possessing courage, honor, and generous magnanimity.',
    },
    synonym: { uz: 'Jasur, botir, olijanob', ru: 'Мужественный, гордый, храбрый', en: 'Brave, gallant, dignified' },
    exampleSentence: {
      uz: 'Lobo asirlikda yalinmadi, u mardlarga xos tarzda jimgina taqdirini qarshi oldi.',
      ru: 'В плену Лобо держался истинно благородно, не прося пощады у врага.',
      en: 'In captivity, Lobo acted with noble defiance, never groveling before his captors.',
    },
  },
  {
    id: 'v6',
    word: { uz: 'Vodiy', ru: 'Долина (ущелье)', en: 'Canyon / Valley' },
    definition: {
      uz: 'Tog‘lar yoki qirlar oralig‘idagi cho‘ziq pasttekislik, dara.',
      ru: 'Протяженная впадина между холмами или горами, часто с рекой.',
      en: 'A low area of land between hills or mountains, often with a river.',
    },
    synonym: { uz: 'Dara, soy bo‘yi, o‘zan', ru: 'Лощина, ущелье, дол', en: 'Gorge, dale, basin' },
    exampleSentence: {
      uz: 'Karrumpo vodiysi o‘zining baland qoyalari va yaylovlari bilan mashhur edi.',
      ru: 'Долина Каррумпо славилась своими дикими пастбищами и крутыми каньонами.',
      en: 'Currumpaw valley was famed for its sheer bluffs and rugged grazing lands.',
    },
  },
  {
    id: 'v7',
    word: { uz: 'Qamoq (Asirlik)', ru: 'Неволя (плен)', en: 'Captivity / Bondage' },
    definition: {
      uz: 'Erkinlikdan mahrum qilingan, zanjirband yoki qafasda saqlanadigan holat.',
      ru: 'Состояние лишения свободы, жизнь в оковах или клетке.',
      en: 'The state of being imprisoned, restrained, or confined.',
    },
    synonym: { uz: 'Asorat, tutqunlik, zanjir', ru: 'Плен, рабство, оковы', en: 'Confinement, chains, servitude' },
    exampleSentence: {
      uz: 'Bo‘ri qamoqda yashay olmadi; erkinliksiz hayot unga o‘limdan battar edi.',
      ru: 'Волк не вынес неволи: жизнь в цепях была для него горше смерти.',
      en: 'The wolf could not endure captivity; life in chains was worse than death.',
    },
  },
  {
    id: 'v8',
    word: { uz: 'Iz', ru: 'След', en: 'Track / Spoor' },
    definition: {
      uz: 'Odam yoki hayvonning yurganida tuproqda yoki qorda qoldirgan belgisi.',
      ru: 'Отпечаток лап или ног на земле, снегу или песке.',
      en: 'A mark or series of impressions left on the ground by an animal or person.',
    },
    synonym: { uz: 'Nishon, qadam izi', ru: 'Отпечаток, тропа', en: 'Footprint, scent trail, spoor' },
    exampleSentence: {
      uz: 'Seton qum ustidagi ulkan panja izlariga qarab Loboning yo‘lini aniqladi.',
      ru: 'По огромным отпечаткам лап на песке Сетон безошибочно выслеживал волка.',
      en: 'By the gigantic paw prints in the dust, Seton mapped out Lobo’s movements.',
    },
  },
];

export const MEMORY_PAIRS = [
  { id: 'm1', label: { uz: 'Lobo', ru: 'Лобо', en: 'Lobo' }, match: { uz: 'Karrumpo qiroli', ru: 'Властелин Каррумпо', en: 'King of Currumpaw' } },
  { id: 'm2', label: { uz: 'Blanka', ru: 'Бланка', en: 'Blanca' }, match: { uz: 'Go‘zal oq bo‘ri', ru: 'Белоснежная волчица', en: 'Beautiful white wolf' } },
  { id: 'm3', label: { uz: 'Seton', ru: 'Сетон', en: 'Seton' }, match: { uz: 'Tabiatshunos olim', ru: 'Ученый-натуралист', en: 'Wildlife naturalist' } },
  { id: 'm4', label: { uz: 'Sadoqat', ru: 'Верность', en: 'Loyalty' }, match: { uz: 'Juftiga cheksiz mehr', ru: 'Любовь до последнего вздоха', en: 'Devotion unto death' } },
  { id: 'm5', label: { uz: 'Tuzoq', ru: 'Капкан', en: 'Trap' }, match: { uz: 'Po‘lat hiyla quroli', ru: 'Стальная западня', en: 'Steel hunter snare' } },
  { id: 'm6', label: { uz: 'Erkinlik', ru: 'Свобода', en: 'Freedom' }, match: { uz: 'Hayotdan aziz ne’mat', ru: 'Высшая ценность жизни', en: 'Priceless gift of life' } },
];

export const WHO_SAID_PROMPTS = [
  {
    id: 'ws-1',
    quote: {
      uz: '«U bizning eng yaxshi novvoslarimizni nobud qilyapti, uni to‘xtatish uchun har qancha pul to‘lashga tayyorman!»',
      ru: '«Он режет наш лучший скот, я заплачу любую награду тому, кто его уничтожит!»',
      en: '"He slaughters our prime cattle; I’ll pay any bounty to whoever puts an end to him!"',
    },
    characterId: 'ranchers',
    characterName: { uz: 'Chorvadorlar (Fermer)', ru: 'Скотоводы', en: 'Ranchers' },
  },
  {
    id: 'ws-2',
    quote: {
      uz: '«Men ilgari ko‘plab hayvonlarni ovlaganman, lekin bu bo‘rining aqli va sadoqatini ko‘rib vujudim titrab ketdi.»',
      ru: '«Я добывал много диких зверей, но мудрость и верность этого волка потрясли меня до слез.»',
      en: '"I had hunted many wild beasts, but the intelligence and loyalty of this wolf shook my very soul."',
    },
    characterId: 'seton',
    characterName: { uz: 'Ernest Seton (Muallif)', ru: 'Эрнест Сетон', en: 'Ernest Seton' },
  },
  {
    id: 'ws-3',
    quote: {
      uz: '«Mening jismimni kishanlashingiz mumkin, ammo mening erkin ruhim hech qachon sizga tiz cho‘kmaydi.»',
      ru: '«Вы можете заковать мое тело в цепи, но мой свободный дух никогда не склонится перед вами.»',
      en: '"You may chain my flesh, but my free spirit will never bow before your dominion."',
    },
    characterId: 'lobo',
    characterName: { uz: 'Lobo (Karrumpo qiroli)', ru: 'Лобо', en: 'Lobo' },
  },
  {
    id: 'ws-4',
    quote: {
      uz: '«Lobo orqada ekan, men oldinda quvnoq sakrab chopishdan qo‘rqmayman, chunki u meni himoya qiladi.»',
      ru: '«Пока вожак рядом, я могу беспечно мчаться вперед, ведь он бережет меня от всех бед.»',
      en: '"With Lobo behind me, I can run ahead playfully without fear, knowing he watches over me."',
    },
    characterId: 'blanca',
    characterName: { uz: 'Blanka (Oq bo‘ri)', ru: 'Бланка', en: 'Blanca' },
  },
];

export const WORD_SEARCH_WORDS: Array<{ word: string; clue: LocalizedString }> = [
  { word: 'LOBO', clue: { uz: 'Karrumpo vodiysi qiroli', ru: 'Грозный вожак стаи', en: 'King of Currumpaw' } },
  { word: 'BLANKA', clue: { uz: 'Loboning oq rangli sevikli jufti', ru: 'Белоснежная волчица', en: 'Snow-white mate of Lobo' } },
  { word: 'SETON', clue: { uz: 'Hikoya muallifi va tabiatshunos', ru: 'Автор и натуралист', en: 'Author and naturalist' }, },
  { word: 'TUZOQ', clue: { uz: 'Bo‘rini tutish uchun qo‘yilgan asbob', ru: 'Стальной капкан', en: 'Concealed steel trap' }, },
  { word: 'VODIY', clue: { uz: 'Voqealar sodir bo‘lgan Karrumpo hududi', ru: 'Долина Каррумпо', en: 'Currumpaw valley' }, },
  { word: 'SADOQAT', clue: { uz: 'Loboning Blankaga bo‘lgan cheksiz tuyg‘usi', ru: 'Беззаветная верность', en: 'Supreme fidelity' }, },
  { word: 'CHORVA', clue: { uz: 'Fermerlar boqqan sigir va buqalar', ru: 'Домашний скот фермеров', en: 'Ranch livestock' }, },
  { word: 'ERKINLIK', clue: { uz: 'Bo‘ri hayotidan ustun qo‘ygan ne’mat', ru: 'Свобода дикой природы', en: 'Wild prairie freedom' }, },
];

export const BLITZ_QUESTIONS = [
  {
    id: 1,
    statement: {
      uz: 'Lobo to‘dasi yuzlab bo‘rilardan iborat katta qo‘shin edi.',
      ru: 'Стая Лобо состояла из сотен волков.',
      en: 'Lobo’s pack was a massive army consisting of hundreds of wolves.',
    },
    isTrue: false,
    explanation: {
      uz: 'Noto‘g‘ri! To‘dada atigi 5-6 ta sara bo‘ri bo‘lgan.',
      ru: 'Ложь! В отборной стае было всего пять или шесть волков.',
      en: 'False! The pack consisted of only five or six elite wolves.',
    },
  },
  {
    id: 2,
    statement: {
      uz: 'Lobo inson hidini sezib, zaharlangan go‘shtlarni yemagan.',
      ru: 'Лобо чувствовал запах человека и никогда не ел отраву.',
      en: 'Lobo detected human scent and never ate poisoned meat.',
    },
    isTrue: true,
    explanation: {
      uz: 'To‘g‘ri! U har qanday sun’iy zahar va hidni uzoqdanoq payqagan.',
      ru: 'Правда! Вожак безошибочно выявлял все ловушки скотоводов.',
      en: 'True! The wolf sensed artificial odors and avoided contaminated baits.',
    },
  },
  {
    id: 3,
    statement: {
      uz: 'Blanka — to‘dadagi qora rangli qari bo‘ri edi.',
      ru: 'Бланка была старой черной волчицей.',
      en: 'Blanca was an elderly black wolf in the pack.',
    },
    isTrue: false,
    explanation: {
      uz: 'Noto‘g‘ri! Blanka yosh, go‘zal va oppoq bo‘ri edi.',
      ru: 'Ложь! Бланка была молодой и белоснежной волчицей.',
      en: 'False! Blanca was a young, snow-white female wolf.',
    },
  },
  {
    id: 4,
    statement: {
      uz: 'Lobo o‘z jufti Blankaga bo‘lgan muhabbati tufayli tuzoqqa tushdi.',
      ru: 'Лобо попал в капкан из-за тоски и любви к Бланке.',
      en: 'Lobo was ensnared because of his devotion and grief over Blanca.',
    },
    isTrue: true,
    explanation: {
      uz: 'To‘g‘ri! U ayriliq dardi sababli ehtiyotkorlikni yo‘qotgan edi.',
      ru: 'Правда! Слепое горе привело волка прямо к расставленным капканам.',
      en: 'True! His grief eclipsed his cautious instincts.',
    },
  },
  {
    id: 5,
    statement: {
      uz: 'Lobo asirlikda ovchilarga yalinib, ularning qo‘lidan ovqat yedi.',
      ru: 'В плену Лобо вилял хвостом и ел мясо из рук охотников.',
      en: 'In captivity, Lobo begged for mercy and ate out of hunters’ hands.',
    },
    isTrue: false,
    explanation: {
      uz: 'Noto‘g‘ri! Lobo hech qachon yalinmadi va ovqatdan butunlay bosh tortdi.',
      ru: 'Ложь! Волк проявил царственную гордость и отказался от пищи.',
      en: 'False! Lobo demonstrated royal dignity and refused all nourishment.',
    },
  },
  {
    id: 6,
    statement: {
      uz: 'Ushbu voqeadan so‘ng Ernest Seton-Tompson ovchilikni tashladi.',
      ru: 'После встречи с Лобо Сетон-Томпсон навсегда оставил охоту.',
      en: 'Following the Lobo encounter, Seton abandoned hunting forever.',
    },
    isTrue: true,
    explanation: {
      uz: 'To‘g‘ri! U butun umrini tabiatni asrashga va kitob yozishga bag‘ishladi.',
      ru: 'Правда! Он посвятил жизнь защите дикой природы и книгам.',
      en: 'True! He dedicated the rest of his life to conservation and writing.',
    },
  },
];

// ===================== 6-BOSQICH: KEYS TADQIQOTI =====================
export const CASE_STEPS: CaseStep[] = [
  {
    id: 1,
    prompt: {
      uz: '1-qadam: Sen Ernest Seton o‘rnidasan. Karrumpo chorvadorlari senga katta pul taklif qilib, Loboni har qanday yo‘l bilan yo‘q qilishni so‘ramoqda. Ammo sen uning mislsiz aqlini ko‘rib hayratdasan. Qanday harakat qilasiz?',
      ru: 'Шаг 1: Ты на месте Сетона. Скотоводы сулят огромные деньги за уничтожение Лобо. Но ты потрясен умом и статью зверя. Твое первое решение?',
      en: 'Step 1: You stand in Seton’s shoes. Ranchers offer a massive reward to destroy Lobo. Yet you marvel at the wolf’s genius. What is your choice?',
    },
    choices: [
      {
        id: 'c1-a',
        text: {
          uz: 'Chorvadorlar taklifini qabul qilib, o‘ta ayyorona usul (Blankani nishonga olish) orqali ovni davom ettirish.',
          ru: 'Принять заказ скотоводов и разработать план поимки через Бланку.',
          en: 'Accept the contract and plan a capture by targeting Blanca’s trail.',
        },
        consequence: {
          uz: 'Sen ovchi burchingni bajaryapsan, ammo bu yo‘l katta ma’naviy fojia sari yetaklaydi.',
          ru: 'Ты остаешься верен охотничьему долгу, но ступаешь на путь нравственной трагедии.',
          en: 'You fulfill the hunter’s contract, but step onto a path of moral heartbreak.',
        },
        nextStepId: 2,
      },
      {
        id: 'c1-b',
        text: {
          uz: 'Chorvadorlarga bo‘rilar bilan qo‘shni yashash, mollarini qo‘riqchi itlar va mustahkam to‘siqlar bilan asrashni tavsiya qilish.',
          ru: 'Предложить фермерам укрепить загоны и завести обученных пастушьих псов вместо истребления волка.',
          en: 'Advise ranchers to reinforce fences and train shepherd dogs rather than annihilate the pack.',
        },
        consequence: {
          uz: 'Chorvadorlar g‘azablandi, ammo ba’zilari o‘ylanib qoldi. Tabiat muvozanatini saqlash imkoni tug‘ildi.',
          ru: 'Фермеры недовольны тратами, но часть задумалась. Появился шанс на диалог с природой.',
          en: 'Ranchers grumbled, but some reconsidered. A chance for coexistence emerged.',
        },
        nextStepId: 3,
      },
      {
        id: 'c1-c',
        text: {
          uz: 'Loboni o‘ldirish o‘rniga, uni tiriklayin tutib, uzoqdagi milliy qo‘riqxonaga ko‘chirish rejasini tuzish.',
          ru: 'Вместо отстрела предложить план отлова стаи для переселения в заповедный национальный парк.',
          en: 'Instead of killing Lobo, propose capturing him alive for relocation to a wild reserve.',
        },
        consequence: {
          uz: 'Bu qiyin va xavfli reja, biroq ham chorvani, ham noyob jonivorni asrab qolishi mumkin.',
          ru: 'Сложный замысел, но он дает надежду спасти жизнь зверю и защитить скот.',
          en: 'A challenging plan, yet it offers hope to protect cattle and preserve a majestic life.',
        },
        nextStepId: 4,
      },
    ],
  },
  {
    id: 2,
    prompt: {
      uz: '2-qadam: Lobo tuzoqqa tushdi! U to‘rtta oyog‘idan yaralangan, lekin ko‘zlarida qo‘rquv yo‘q. Qishloqdagilar uni darhol otib tashlashni talab qilyapti. Sen nima qilasan?',
      ru: 'Шаг 2: Лобо в капканах! Он ранен, но во взгляде нет страха. Толпа требует немедленной расправы. Твой поступок?',
      en: 'Step 2: Lobo is ensnared! Wounded in the traps, his eyes hold no fear. The crowd demands summary execution. What do you do?',
    },
    choices: [
      {
        id: 'c2-a',
        text: {
          uz: 'Chorvadorlar talabiga rozi bo‘lib, bo‘rining azobiga chek qo‘yish uchun otib tashlash.',
          ru: 'Уступить толпе и застрелить волка, избавив его от дальнейших мучений.',
          en: 'Yield to the crowd and shoot the wolf to end his physical torment.',
        },
        consequence: {
          uz: 'Chorvadorlar xursand, ammo sening yuragingda o‘chmas dog‘ qoldi.',
          ru: 'Фермеры ликуют, но твое сердце наполняется тяжелой скорбью.',
          en: 'The ranchers rejoice, but a persistent shadow settles over your conscience.',
        },
        endingId: 'end-tragedy',
      },
      {
        id: 'c2-b',
        text: {
          uz: 'Hech kimga tegishga yo‘l qo‘ymaslik! Uni fermaga olib kelib, yarasini davolash va o‘ziga keltirishga urinish.',
          ru: 'Остановить толпу, привезти волка на ранчо, промыть раны и попытаться спасти его.',
          en: 'Hold off the crowd, bring the wolf to the ranch, treat his wounds, and try to nurse him.',
        },
        consequence: {
          uz: 'Tarixiy voqea takrorlanadi: bo‘ri asirlikdagi ovqatdan bosh tortadi...',
          ru: 'Повторяется исторический финал: гордый вожак отвергает пищу в неволе...',
          en: 'The historical moment echoes: the proud king spurns food in captivity...',
        },
        endingId: 'end-historical',
      },
      {
        id: 'c2-c',
        text: {
          uz: 'Lobo va Blankaning sevgisini ko‘rib vijdoni uyg‘ongan holda, uni tun yarmida xufyona ozod qilib yuborish!',
          ru: 'Потрясенный величием зверя, ночью тайно освободить его от цепей и выпустить в степь!',
          en: 'Moved by the wolf’s sublime spirit, secretly unbind the king under midnight moonlight!',
        },
        consequence: {
          uz: 'Lobo oqsoqlanib bo‘lsa-da, qorong‘ulik sari ketadi. Sen qon to‘kishdan xalos bo‘lding.',
          ru: 'Волк уходит в ночную мглу. Ты нарушил договор, но спас свою человеческую душу.',
          en: 'Lobo limps into the desert dusk. You broke the contract, but saved your soul.',
        },
        endingId: 'end-liberation',
      },
    ],
  },
  {
    id: 3,
    prompt: {
      uz: '3-qadam: Chorvadorlar to‘siqlarni mustahkamladi, ammo Lobo ba’zida dasht chetidan boqadi. Senga qishloq bolalari tabiat va bo‘rilar haqida savollar beryapti. Ularga qanday dars berasan?',
      ru: 'Шаг 3: Фермеры укрепили ограды. Лобо издали наблюдает за долиной. Местные дети просят рассказать о волках. Что ты им поведаешь?',
      en: 'Step 3: Ranchers fortified their fences. Lobo watches from distant ridges. Village children ask about wolves. What do you teach them?',
    },
    choices: [
      {
        id: 'c3-a',
        text: {
          uz: 'Bo‘rilar faqat yovuz yirtqich ekanligini, ularni ko‘rganda yo‘q qilish kerakligini uqtirish.',
          ru: 'Сказать, что волки — лишь кровожадные враги, которых нужно истреблять.',
          en: 'Tell them wolves are ruthless pests who deserve eradication.',
        },
        consequence: {
          uz: 'Eski stereotiplar saqlanib qoladi va tabiat qirilib ketaveradi.',
          ru: 'Старые предрассудки живут, а дикая природа продолжает гибнуть.',
          en: 'Ancient prejudices endure, and the wilderness continues to shrink.',
        },
        endingId: 'end-tragedy',
      },
      {
        id: 'c3-b',
        text: {
          uz: 'Bo‘rilarning sadoqati, to‘da tartibi va tabiatdagi zarur muvozanat ekanligini rasmlar bilan tushuntirish.',
          ru: 'Показать свои рисунки и объяснить детям, как важна верность и гармония в природе.',
          en: 'Show your wildlife sketches and explain wolves’ ecological role and pack fidelity.',
        },
        consequence: {
          uz: 'Bolalar tabiatga do‘stona ruhda ulg‘ayadi. Tabiatshunoslik to‘garagi paydo bo‘ladi.',
          ru: 'Дети растут с уважением ко всему живому. Зарождается юннатское движение.',
          en: 'Children grow up revering living creatures, sparking a nature conservation club.',
        },
        endingId: 'end-sanctuary',
      },
      {
        id: 'c3-c',
        text: {
          uz: 'Hamma narsani tashlab, shaharga qaytib ketish va voqealarga aralashmaslik.',
          ru: 'Собрать чемодан и уехать в город, предоставив событиям идти своим чередом.',
          en: 'Pack your bags and return to the city, washing your hands of the situation.',
        },
        consequence: {
          uz: 'Muammo hal bo‘lmadi, sen esa o‘z mas’uliyatingdan qochding.',
          ru: 'Конфликт остался нерешенным, а ты уклонился от ответственности.',
          en: 'The conflict remains unresolved, and you avoided your moral duty.',
        },
        endingId: 'end-historical',
      },
    ],
  },
  {
    id: 4,
    prompt: {
      uz: '4-qadam: Loboni ehtiyotkorlik bilan tutib, ilmiy qo‘riqxonaga olib borish rejasidasiz. Ammo bo‘ri qafasga tushgach, ko‘zlarida chuqur g‘am bilan yegulikdan bosh tortmoqda. Qanday yo‘l tutasan?',
      ru: 'Шаг 4: Лобо пойман гуманным способом для перевозки в заповедник. Но в просторном вольере он тоскует и не притрагивается к еде. Твое решение?',
      en: 'Step 4: Lobo was humanely captured for transfer to a national preserve. But in the refuge, he longs for the open range and refuses food. What will you do?',
    },
    choices: [
      {
        id: 'c4-a',
        text: {
          uz: 'Uni majburlab boqish, chunki tirik qolishi eng muhim maqsad.',
          ru: 'Кормить насильно через зонд, главное — сохранить жизнь редкого зверя.',
          en: 'Force-feed him by medical means, prioritizing physical survival above all.',
        },
        consequence: {
          uz: 'Bo‘ri jismonan yashaydi, ammo uning qirollik ruhi butunlay so‘nadi.',
          ru: 'Волк выживает физически, но его величественный дух безвозвратно угасает.',
          en: 'The wolf physically survives, yet his regal wild spirit is extinguished.',
        },
        endingId: 'end-historical',
      },
      {
        id: 'c4-b',
        text: {
          uz: 'Uni keng va odamsiz yovvoyi tog‘likka olib borib, erkinlikka qo‘yib yuborish.',
          ru: 'Вывезти его в бескрайние безлюдные горы и подарить полную свободу.',
          en: 'Transport him into boundless uninhabited mountain ranges and grant full liberty.',
        },
        consequence: {
          uz: 'Lobo tog‘ cho‘qqisiga chiqib, erkin osmonga qarab uvillaydi. Erkinlik g‘alaba qildi!',
          ru: 'Лобо поднимается на скалистый утес и воет в ночное небо. Свобода восторжествовала!',
          en: 'Lobo climbs the high ridge and howls into the open starlit sky. Freedom triumphs!',
        },
        endingId: 'end-liberation',
      },
      {
        id: 'c4-c',
        text: {
          uz: 'Uning atrofida bo‘rilar to‘dasi uchun maxsus himoyalangan katta hudud tashkil etish.',
          ru: 'Создать вокруг долины первый в истории охраняемый заказник дикой природы.',
          en: 'Establish around the valley history’s first protected wilderness sanctuary.',
        },
        consequence: {
          uz: 'Bu qadam butun dunyoda tabiatni muhofaza qilish qonunlariga turtki beradi.',
          ru: 'Этот шаг дает толчок созданию всемирной сети заповедников и национальных парков.',
          en: 'This action catalyzes the modern movement for national parks and wildlife sanctuaries.',
        },
        endingId: 'end-sanctuary',
      },
    ],
  },
];

export const CASE_ENDINGS: Record<string, CaseEnding> = {
  'end-liberation': {
    id: 'end-liberation',
    title: {
      uz: 'Ozodlik sari: Yengilmas Ruh',
      ru: 'К свободе: Непокоренный дух',
      en: 'Path of Liberty: The Unvanquished Spirit',
    },
    outcome: {
      uz: 'Sening qaroring tufayli Lobo erkinlikka erishdi. U insonlarning shafqatsizligidan uzoqda, baland qoyalarda o‘z afsonasini davom ettirdi. Sen esa insoniylik va rahm-shafqat imtihonidan a’lo o‘tding!',
      ru: 'Благодаря твоему милосердию Лобо обрел волю. Высоко на скалах он продолжил свою песню свободы. Ты с честью прошел главное испытание человечности!',
      en: 'Through your compassion, Lobo regained his freedom. Far from cruel snares, on distant crags, his legend lives on. You passed the supreme test of empathy!',
    },
    moralLesson: {
      uz: 'Haqiqiy kuch — yirtqichni o‘ldirishda emas, balki uning erkin yashash huquqini hurmat qilishdadir.',
      ru: 'Подлинная сила — не в уничтожении дикого зверя, а в уважении его священного права на жизнь.',
      en: 'True strength lies not in conquering the wild, but in honoring its sovereign right to exist.',
    },
    badgeId: 'kind_heart',
  },
  'end-historical': {
    id: 'end-historical',
    title: {
      uz: 'Tarixiy haqiqat: Mag‘rur sukunat',
      ru: 'Историческая правда: Гордое молчание',
      en: 'Historical Reality: Proud Silence',
    },
    outcome: {
      uz: 'Seton-Tompsonning haqiqiy hikoyasidagi kabi yakun. Lobo kishanlarda ham o‘z qadr-qimmatini saqlab qoldi. Uning o‘limi butun dunyo insoniyatini tabiat oldidagi xatolarini anglashga chorladi.',
      ru: 'Финал, повторивший реальную историю. Лобо сохранил царственное достоинство даже в оковах. Его гибель потрясла миллионы сердец и заставила человечество задуматься.',
      en: 'The genuine historical conclusion. Lobo kept his royal composure even in heavy chains. His passing awakened human consciousness across the globe.',
    },
    moralLesson: {
      uz: 'Ba’zan bitta jonivorning fojiali taqdiri millionlab insonlarning qalbini uyg‘otish uchun saboq bo‘ladi.',
      ru: 'Порой трагическая гибель одного благородного существа открывает глаза целому миру.',
      en: 'Sometimes the poignant tragedy of one noble life serves to awaken the conscience of millions.',
    },
  },
  'end-sanctuary': {
    id: 'end-sanctuary',
    title: {
      uz: 'Kelajak uyg‘unligi: Tabiat maskani',
      ru: 'Гармония будущего: Заповедный край',
      en: 'Future Harmony: The Wild Sanctuary',
    },
    outcome: {
      uz: 'Sen ziddiyatni tinch yo‘l bilan hal qilding! Insonlar va yovvoyi tabiat bir-biriga zarar bermasdan yashashi mumkin bo‘lgan qo‘riqxona yaratildi. Bo‘rilar ham, fermerlar mollari ham omon qoldi.',
      ru: 'Ты нашел мудрый компромисс! Создан заповедник, где человек и дикая природа сосуществуют в согласии. Сохранены и стада фермеров, и жизнь волков.',
      en: 'You forged a wise resolution! A protected refuge was born where humans and wildlife coexist in balance. Both livestock and wolves were spared.',
    },
    moralLesson: {
      uz: 'Aql va bilim vositasida eng qiyin to‘qnashuvlarni ham qon to‘kmasdan hal qilish mumkin.',
      ru: 'Разум и сострадание способны разрешить любой конфликт без жестокости и кровопролития.',
      en: 'Knowledge and empathy can resolve even the fiercest clashes without bloodshed.',
    },
  },
  'end-tragedy': {
    id: 'end-tragedy',
    title: {
      uz: 'Shafqatsiz yakun: Bo‘shliq va pushaymonlik',
      ru: 'Жестокий финал: Пустота и раскаяние',
      en: 'Grim Outcome: Emptiness & Regret',
    },
    outcome: {
      uz: 'Bo‘ri yo‘q qilindi. Dasht sukunatga cho‘mdi, ammo g‘olib bo‘lgan odamlar o‘zlarida hech qanday quvonch sezishmadi. Karrumpo cho‘li o‘zining haqiqiy qiroli va go‘zalligidan ayrildi.',
      ru: 'Волк уничтожен. Прерия погрузилась в тишину, но победители не ощутили радости. Долина Каррумпо навсегда потеряла своего гордого хранителя.',
      en: 'The wolf was eradicated. The prairie fell silent, yet the victors felt no triumph. Currumpaw valley lost its wild sovereign forever.',
    },
    moralLesson: {
      uz: 'Tabiatni o‘ldirish bilan inson o‘z qalbining bir qismini ham halok qiladi.',
      ru: 'Истребляя дикую природу, человек опустошает собственную душу.',
      en: 'In extinguishing the wild, humanity inevitably impoverishes its own soul.',
    },
  },
};
