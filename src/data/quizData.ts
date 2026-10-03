import { QuizQuestion } from '../types';

export const FINAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Single Choice (Bilish / Syujet)
  {
    id: 1,
    type: 'single',
    bloom: 'bilish',
    category: 'syujet',
    question: {
      uz: 'Hikoyadagi voqealar Shimoliy Amerikaning qaysi mashhur hududida sodir bo‘ladi?',
      ru: 'В какой известной местности Северной Америки разворачиваются события рассказа?',
      en: 'In which famous North American region do the story events take place?',
    },
    options: [
      { uz: 'Karrumpo vodiysi', ru: 'Долина Каррумпо', en: 'Currumpaw Valley' },
      { uz: 'Amazonka o‘rmonlari', ru: 'Леса Амазонки', en: 'Amazon Forests' },
      { uz: 'Saxroi Kabir cho‘li', ru: 'Пустыня Сахара', en: 'Sahara Desert' },
      { uz: 'Alyaska muzliklari', ru: 'Ледники Аляски', en: 'Glaciers of Alaska' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Hikoya Nyu-Meksiko shtatidagi Karrumpo chorvachilik yaylovlarida sodir bo‘ladi.',
      ru: 'События происходят на обширных скотоводческих пастбищах Каррумпо в Нью-Мексико.',
      en: 'The narrative unfolds in the ranching grasslands of Currumpaw, New Mexico.',
    },
  },

  // 2. Single Choice (Bilish / Qahramonlar)
  {
    id: 2,
    type: 'single',
    bloom: 'bilish',
    category: 'qahramonlar',
    question: {
      uz: 'Loboning sevikli jufti bo‘lgan oppoq bo‘rining ismi nima edi?',
      ru: 'Как звали белоснежную волчицу — верную спутницу Лобо?',
      en: 'What was the name of the snow-white she-wolf, Lobo’s beloved mate?',
    },
    options: [
      { uz: 'Blanka', ru: 'Бланка', en: 'Blanca' },
      { uz: 'Nayda', ru: 'Найда', en: 'Naida' },
      { uz: 'Diana', ru: 'Диана', en: 'Diana' },
      { uz: 'Belli', ru: 'Белла', en: 'Bella' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Blanka — ispancha "oq" degan ma’noni anglatadi va u Loboning suyukli jufti edi.',
      ru: 'Бланка (в переводе «Белая») была единственной избранницей и слабостью вожака.',
      en: 'Blanca (meaning "White" in Spanish) was Lobo’s cherished mate.',
    },
  },

  // 3. Single Choice (Tushunish / Syujet)
  {
    id: 3,
    type: 'single',
    bloom: 'tushunish',
    category: 'syujet',
    question: {
      uz: 'Lobo chorvadorlar qo‘ygan zaharli go‘shtlarni qanday fosh qilar edi?',
      ru: 'Каким образом Лобо разоблачал отравленные скотоводами приманки?',
      en: 'How did Lobo expose and neutralize the poisoned baits set by ranchers?',
    },
    options: [
      { uz: 'Inson hidini sezib, go‘shtlarni bitta joyga to‘plab, ustiga axlat tashlab ketardi', ru: 'Чул запах человека, сгребал мясо в кучу и оставлял нечистоты', en: 'Detected human scent, heaped the meat into a pile, and defiled it with dirt' },
      { uz: 'Go‘shtlarni daryoga oqizib yuborardi', ru: 'Сбрасывал мясо в бурную реку', en: 'Pushed the meat baits into the river' },
      { uz: 'O‘z iniga olib borib yerga ko‘mardi', ru: 'Закапывал глубоко в своем логове', en: 'Buried the baits deep in his den' },
      { uz: 'Qarg‘alarga cho‘qitib ko‘rardi', ru: 'Отдавал на пробу воронам', en: 'Allowed crows to test the food first' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Lobo sun’iy hidni tezda payqab, ovchilar ustidan kulgandek go‘shtlarni bir joyga to‘plagan.',
      ru: 'Лобо демонстрировал презрение к людям, собирая приманки и забрасывая их грязью.',
      en: 'Lobo showed supreme contempt by heaping all poisoned meats and defiling them.',
    },
  },

  // 4. Single Choice (Tushunish / Qahramonlar)
  {
    id: 4,
    type: 'single',
    bloom: 'tushunish',
    category: 'qahramonlar',
    question: {
      uz: 'Ernest Seton-Tompson nima sababdan Loboni tuzoqqa tushira oldi?',
      ru: 'Благодаря чему Эрнесту Сетону удалось перехитрить неуловимого Лобо?',
      en: 'What allowed Ernest Thompson Seton to finally trap the elusive Lobo?',
    },
    options: [
      { uz: 'Loboning Blankaga bo‘lgan sevgisi va ayriliqdagi ehtiyotsizligidan foydalandi', ru: 'Использовал слепую тоску волка по погибшей Бланке', en: 'He exploited Lobo’s desperate grief and love for Blanca' },
      { uz: 'Uni qurol kuchi bilan o‘rmonda o‘rab oldi', ru: 'Окружил его в лесу отрядом стрелков', en: 'He surrounded him with armed hunters in the forest' },
      { uz: 'Zamonaviy vertolyot va dronlardan foydalandi', ru: 'Применил вертолеты и оптические прицелы', en: 'He used modern aerial surveillance' },
      { uz: 'Lobo qarilikdan qocholmay qoldi', ru: 'Волк ослаб от глубокой старости', en: 'Lobo was weakened by extreme old age' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Loboning yagona zaif tomoni Blankaga bo‘lgan cheksiz sadoqati edi.',
      ru: 'Великий вожак потерял бдительность только тогда, когда шел по следу погибшей подруги.',
      en: 'Lobo lost his lifelong vigilance only when tracking his fallen mate.',
    },
  },

  // 5. Single Choice (Qollash / Lugat)
  {
    id: 5,
    type: 'single',
    bloom: 'qollash',
    category: 'lugat',
    question: {
      uz: '«Chorvador» so‘zining eng to‘g‘ri ma’nosi va sinonimini toping:',
      ru: 'Укажите верное значение и синоним к слову «Скотовод (ранчеро)»:',
      en: 'Identify the correct definition and synonym for "Rancher / Cattleman":',
    },
    options: [
      { uz: 'Dasht va fermalarda chorva mollarini boquvchi fermer', ru: 'Фермер, разводящий скот на просторах прерий', en: 'A farmer who raises livestock on grazing lands' },
      { uz: 'Tog‘larda qushlarni ovlovchi mergan', ru: 'Охотник на диких птиц в горах', en: 'A hunter who stalks wild game birds' },
      { uz: 'Daryoda baliq tutuvchi sayyoh', ru: 'Рыболов на бурных реках', en: 'A recreational river fisherman' },
      { uz: 'O‘rmon daraxtlarini kesuvchi usta', ru: 'Лесоруб в таежной чаще', en: 'A timber harvester in the woods' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Chorvador — qoramol, qo‘y va otlarni boqib ko‘paytiruvchi xo‘jalik egasi.',
      ru: 'Скотовод занимается разведением скота и защитой своего стада.',
      en: 'A rancher manages and grazes herds of cattle or sheep.',
    },
  },

  // 6. Single Choice (Tahlil / Goya)
  {
    id: 6,
    type: 'single',
    bloom: 'tahlil',
    category: 'goya',
    question: {
      uz: 'Lobo asirlikda ovqatdan bosh tortishi va jimgina o‘lim topishi orqali muallif nimani ifodalagan?',
      ru: 'Что выразил автор через отказ Лобо от пищи и его гордую смерть в оковах?',
      en: 'What did the author emphasize through Lobo’s refusal of food and proud demise in captivity?',
    },
    options: [
      { uz: 'Erkinlik va qadr-qimmat har qanday qullikdan, hatto jismoniy hayotdan ham azizligini', ru: 'Что свобода и достоинство выше рабского существования и дороже самой жизни', en: 'That liberty and dignity transcend mere physical existence in servitude' },
      { uz: 'Bo‘rining ochlikka dosh bera olmasligini', ru: 'Что волки физически не могут голодать', en: 'That wolves cannot survive short periods without eating' },
      { uz: 'Go‘shtning mazasi yoqmaganini', ru: 'Что ему просто не понравился вкус мяса', en: 'That he simply disliked the taste of the beef offered' },
      { uz: 'Chorvadorlarning uni zaharlaganini', ru: 'Что скотоводы подсыпали яд в чашу', en: 'That the ranchers poisoned his water' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Lobo o‘z ozodligisiz yashashni istamadi, u mag‘rurlik bilan vafot etishni tanladi.',
      ru: 'Свободолюбивый зверь предпочел гибель жизни в рабских оковах.',
      en: 'The free-spirited beast chose death over a life in bondage.',
    },
  },

  // 7. Single Choice (Tahlil / Goya)
  {
    id: 7,
    type: 'single',
    bloom: 'tahlil',
    category: 'goya',
    question: {
      uz: 'Nima sababdan Ernest Seton-Tompson Lobo bilan uchrashuvdan so‘ng ovchilikni to‘xtatdi?',
      ru: 'Почему встреча с Лобо заставила Сетон-Томпсона навсегда зачехлить охотничье ружье?',
      en: 'Why did the encounter with Lobo prompt Seton-Thompson to lay down his hunting rifle forever?',
    },
    options: [
      { uz: 'U hayvonda insoniylik, mardlik va sadoqatni ko‘rib, tabiatga nisbatan shafqatsizlikdan uyaldi', ru: 'Увидев величие и верность зверя, он осознал жестокость и несправедливость охоты', en: 'Witnessing nobility and devotion in a beast, he felt deep remorse over human cruelty' },
      { uz: 'Chunki uning o‘qlari tugab qolgan edi', ru: 'Потому что у него закончились патроны', en: 'Because he simply ran out of ammunition' },
      { uz: 'Chunki hukumat ov qilishni qonun bilan taqiqladi', ru: 'Власти запретили охоту законом', en: 'Because authorities instituted an outright hunting ban' },
      { uz: 'U dashtda adashib qolgan edi', ru: 'Он заблудился в бескрайней степи', en: 'Because he became lost in the wilderness' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Bo‘rining xatti-harakati muallif qalbida chuqur hurmat va pushaymonlik uyg‘otdi.',
      ru: 'Поступок волка перевернул сознание писателя и пробудил в нем защитника фауны.',
      en: 'Lobo’s nobility awakened Seton’s conscience and inspired modern conservation.',
    },
  },

  // 8. Single Choice (Bilish / Syujet)
  {
    id: 8,
    type: 'single',
    bloom: 'bilish',
    category: 'syujet',
    question: {
      uz: 'Lobo to‘dasi necha nafardan iborat edi va ular qanday ozuqani afzal ko‘rishardi?',
      ru: 'Сколько волков насчитывала стая Лобо и какую добычу они предпочитали?',
      en: 'How many wolves were in Lobo’s pack and what prey did they favor?',
    },
    options: [
      { uz: 'Faqat 5–6 ta sara bo‘ri; eng yaxshi, sara novvoslar', ru: 'Всего 5–6 отборных волков; самый отборный молодой скот', en: 'Only 5–6 prime wolves; prime steers and heifers' },
      { uz: '50 dan ortiq bo‘ri; o‘rmondagi quyonlar', ru: 'Более 50 волков; лесных зайцев', en: 'Over 50 wolves; wild hares and birds' },
      { uz: 'Lobo yolg‘iz yashardi; baliq ovlardi', ru: 'Лобо жил в одиночку и ловил рыбу', en: 'Lobo was completely solitary; caught fish' },
      { uz: '20 ta bo‘ri; faqat qurigan suyaklar', ru: '20 волков; сухие кости и падаль', en: '20 wolves; discarded carrion' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Lobo to‘dasi kichik bo‘lsa-da, juda uyushqoq va faqat toza, sara go‘sht bilan oziqlanardi.',
      ru: 'Стая состояла из нескольких проверенных зверей и никогда не прикасалась к падали.',
      en: 'The pack was small but elite, hunting exclusively fresh and prime beef.',
    },
  },

  // 9. Single Choice (Tushunish / Qahramonlar)
  {
    id: 9,
    type: 'single',
    bloom: 'tushunish',
    category: 'qahramonlar',
    question: {
      uz: 'Blankaning fe’l-atvori Lobonnikidan qaysi jihat bilan farq qilardi?',
      ru: 'Чем характер Бланки отличался от повадок осторожного Лобо?',
      en: 'In what way did Blanca’s temperament differ from the watchful Lobo?',
    },
    options: [
      { uz: 'U yosh, qiziquvchan va Lobodek haddan tashqari ehtiyotkor emas edi', ru: 'Она была молода, любопытна и менее подозрительна к ловушкам', en: 'She was youthful, curious, and far less suspicious of traps' },
      { uz: 'U odamlardan qo‘rqib doim g‘orda berkinardi', ru: 'Она была труслива и пряталась в пещере', en: 'She was cowardly and hid in caves' },
      { uz: 'U Loboni umuman yoqtirmasdi', ru: 'Она враждовала с вожаком', en: 'She resented the pack leader' },
      { uz: 'U faqat kechalari ov qilardi', ru: 'Она охотилась только в полнолуние', en: 'She only hunted under a full moon' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Aynan Blankaning qiziquvchanligi va tajribasizligi uni tuzoqqa olib keldi.',
      ru: 'Именно неопытность и беспечность Бланки погубили ее возле приманки.',
      en: 'It was Blanca’s innocent curiosity that led her to the hidden snare.',
    },
  },

  // 10. Single Choice (Tahlil / Qahramonlar)
  {
    id: 10,
    type: 'single',
    bloom: 'tahlil',
    category: 'qahramonlar',
    question: {
      uz: 'Chorvadorlar bilan bo‘rilar o‘rtasidagi ziddiyat mohiyati nima edi?',
      ru: 'В чем заключалась глубинная суть конфликта между фермерами и стаей Лобо?',
      en: 'What was the fundamental clash between the ranchers and Lobo’s pack?',
    },
    options: [
      { uz: 'Insonning moddiy mulki (chorvasi) bilan yovvoyi tabiatning yashash huquqi to‘qnashuvi', ru: 'Столкновение имущественных интересов человека с естественным правом дикой природы на жизнь', en: 'Clash between human property interests and nature’s primal right to survive' },
      { uz: 'Bo‘rilarning odamlar uyini yoqib yuborishi', ru: 'Стремление волков разрушить человеческие дома', en: 'Wolves seeking to demolish ranch houses' },
      { uz: 'Chorvadorlarning o‘rmonda ruxsatsiz yashashi', ru: 'Незаконная вырубка заповедных лесов', en: 'Illegal logging in mountain forests' },
      { uz: 'Oddiy itlar va bo‘rilar janjali', ru: 'Обычная ссора домашних собак с волками', en: 'A routine squabble between dogs and wild beasts' },
    ],
    correctAnswer: 0,
    explanation: {
      uz: 'Inson tabiat hududlarini o‘zlashtirgan sari yovvoyi hayvonlar bilan hayot-mamot kurashiga kirishadi.',
      ru: 'Расширяя пастбища, человек вторгается в исконные владения диких зверей.',
      en: 'As human pastures expand, civilization intrudes upon the ancient wilderness.',
    },
  },

  // 11. Multiple Choice (Tushunish / Qahramonlar)
  {
    id: 11,
    type: 'multiple',
    bloom: 'tushunish',
    category: 'qahramonlar',
    question: {
      uz: 'Lobo xarakteriga xos bo‘lgan 3 ta to‘g‘ri xususiyatni tanlang (3 ta javob):',
      ru: 'Выберите 3 верные черты характера, присущие Лобо (3 ответа):',
      en: 'Select 3 correct traits that define Lobo’s character (3 answers):',
    },
    options: [
      { uz: 'O‘ta yuqori aql va ehtiyotkorlik', ru: 'Выдающийся ум и осторожность', en: 'Exceptional intellect and vigilance' },
      { uz: 'Juftiga cheksiz sadoqat va mehr', ru: 'Безграничная верность и любовь к паре', en: 'Boundless loyalty and love for his mate' },
      { uz: 'O‘limdan ham erkinlikni ustun ko‘rish', ru: 'Непокоренная гордость и любовь к свободе', en: 'Indomitable pride and valuing freedom above life' },
      { uz: 'Odamlar oldida yalinish va qo‘rqoqlik', ru: 'Трусость и заискивание перед людьми', en: 'Cowardice and groveling before humans' },
      { uz: 'O‘z to‘dasiga xiyonat qilish', ru: 'Предательство сородичей', en: 'Betraying members of his pack' },
    ],
    correctAnswer: [0, 1, 2],
    explanation: {
      uz: 'Lobo — aqli, sadoqati va ozodlikka intilishi bilan ajralib turuvchi buyuk obraz.',
      ru: 'Лобо — символ мудрости, верности и несокрушимой воли.',
      en: 'Lobo embodies intelligence, devotion, and unconquerable freedom.',
    },
  },

  // 12. Multiple Choice (Bilish / Syujet)
  {
    id: 12,
    type: 'multiple',
    bloom: 'bilish',
    category: 'syujet',
    question: {
      uz: 'Chorvadorlar va ovchilar Loboni yo‘q qilish uchun qaysi vositalarni qo‘llashgan? (2 ta javob):',
      ru: 'Какие методы использовали скотоводы для борьбы со стаей Лобо? (2 ответа):',
      en: 'Which methods did ranchers and hunters employ against Lobo? (2 answers):',
    },
    options: [
      { uz: 'Zaharlangan go‘shtli yemxo‘raklar', ru: 'Отравленные мясные приманки', en: 'Poisoned meat baits' },
      { uz: 'Og‘ir po‘lat qopqonlar va tuzoqlar', ru: 'Тяжелые стальные капканы', en: 'Heavy concealed steel traps' },
      { uz: 'Dronlar va kosmik sun’iy yo‘ldoshlar', ru: 'Спутники и лазерные датчики', en: 'Satellites and thermal scanners' },
      { uz: 'Dashtga katta devor qurish', ru: 'Строительство каменной крепостной стены', en: 'Building a massive stone wall across the valley' },
    ],
    correctAnswer: [0, 1],
    explanation: {
      uz: 'O‘sha davrda ovchilar zahar va og‘ir temir qopqonlardan keng foydalangan.',
      ru: 'В XIX веке главными орудиями борьбы были яды и механические капканы.',
      en: 'In the late 19th century, ranchers relied on strychnine poison and heavy steel traps.',
    },
  },

  // 13. Multiple Choice (Qollash / Goya)
  {
    id: 13,
    type: 'multiple',
    bloom: 'qollash',
    category: 'goya',
    question: {
      uz: 'Ushbu hikoya bugungi insoniyatga qanday muhim saboqlarni beradi? (2 ta javob):',
      ru: 'Каким важным урокам учит этот рассказ современного человека? (2 ответа):',
      en: 'What vital lessons does this story convey to modern humanity? (2 answers):',
    },
    options: [
      { uz: 'Yovvoyi hayvonlar ham his-tuyg‘u, sevgi va azobni his qiladi', ru: 'Дикие животные способны любить, чувствовать боль и горевать', en: 'Wild animals possess feelings, love, and capacity for grief' },
      { uz: 'Inson tabiatni shunchaki xo‘rlash emas, uni tushunishi va asrashi zarur', ru: 'Человек должен быть хранителем природы, а не ее безжалостным палачом', en: 'Humans must steward and understand nature rather than annihilate it' },
      { uz: 'Barcha yirtqichlarni tabiatdan butunlay qirib tashlash kerak', ru: 'Нужно полностью истребить всех хищников на планете', en: 'All apex predators should be completely eradicated' },
      { uz: 'Faqat pul va boylik dunyodagi eng oliy qadriyatdir', ru: 'Только материальная выгода имеет значение в мире', en: 'Only monetary profit matters in the modern world' },
    ],
    correctAnswer: [0, 1],
    explanation: {
      uz: 'Hikoya insonni tabiat bilan uyg‘un yashashga va uning tirik jonzotlariga mehr bilan qarashga chaqiradi.',
      ru: 'Произведение призывает к экологической гуманности и защите дикой фауны.',
      en: 'The story calls for ecological compassion and mutual harmony with the living world.',
    },
  },

  // 14. Boolean / True-False (Bilish / Syujet)
  {
    id: 14,
    type: 'boolean',
    bloom: 'bilish',
    category: 'syujet',
    question: {
      uz: 'Haqiqatmi yoki yolg‘on: Lobo o‘z ixtiyori bilan fermaga kelib, odamlarga taslim bo‘lgan.',
      ru: 'Правда или ложь: Лобо добровольно сдался людям и пришел на ферму просить пощады.',
      en: 'True or False: Lobo voluntarily surrendered to humans and begged for mercy.',
    },
    correctAnswer: false,
    explanation: {
      uz: 'Yolg‘on! Lobo hech qachon taslim bo‘lmagan, u sevgilisining izidan borib tuzoqqa tushgan.',
      ru: 'Ложь! Волк попал в засаду, идя по следу убитой подруги, и боролся до конца.',
      en: 'False! Lobo never surrendered; he was ensnared while desperately tracking Blanca.',
    },
  },

  // 15. Boolean / True-False (Tushunish / Qahramonlar)
  {
    id: 15,
    type: 'boolean',
    bloom: 'tushunish',
    category: 'qahramonlar',
    question: {
      uz: 'Haqiqatmi yoki yolg‘on: Ernest Seton-Tompson hayvonlar haqida hikoyalar yozish bilan birga, ularning suratlarini ham o‘zi chizgan mohir rassom bo‘lgan.',
      ru: 'Правда или ложь: Сетон-Томпсон не только писал рассказы, но и сам создавал великолепные иллюстрации животных.',
      en: 'True or False: Seton-Thompson not only authored stories but was also a skilled wildlife artist illustrating his own works.',
    },
    correctAnswer: true,
    explanation: {
      uz: 'Haqiqat! U professional rassom-animalist bo‘lib, kitoblarini o‘z rasmlari bilan bezagan.',
      ru: 'Правда! Он был признанным художником-анималистом.',
      en: 'True! He was an accomplished wildlife painter who illustrated his publications.',
    },
  },

  // 16. Boolean / True-False (Tahlil / Goya)
  {
    id: 16,
    type: 'boolean',
    bloom: 'tahlil',
    category: 'goya',
    question: {
      uz: 'Haqiqatmi yoki yolg‘on: Adabiyotda "obraz" tushunchasi faqat insonlarga tegishli bo‘lib, hayvonlar aslo adabiy obraz bo‘la olmaydi.',
      ru: 'Правда или ложь: В литературе художественным образом может быть только человек, но никак не животное.',
      en: 'True or False: In literature, an artistic character can only be a human being, never an animal.',
    },
    correctAnswer: false,
    explanation: {
      uz: 'Yolg‘on! Yozuvchi mahorati tufayli hayvonlar (masalan, Lobo, Blanka) ham to‘laqonli, teran badiiy obraz hisoblanadi.',
      ru: 'Ложь! Животные в реалистической литературе часто выступают глубокими художественными образами.',
      en: 'False! Animals in literature often serve as profound and multi-dimensional characters.',
    },
  },

  // 17. Fill in the blank (Bilish / Lugat)
  {
    id: 17,
    type: 'fill',
    bloom: 'bilish',
    category: 'lugat',
    question: {
      uz: 'Tog‘lar oralig‘idagi chuqur pasttekislik, soylik va daryo bo‘yi joylar adabiyotda va geografiyada ________ deb ataladi.',
      ru: 'Протяженная низменность между горами или холмами в географии и литературе называется ________.',
      en: 'A low depression between mountains or hills is called a ________.',
    },
    correctAnswer: 'VODIY',
    options: [
      { uz: 'VODIY', ru: 'ДОЛИНА', en: 'VALLEY' },
      { uz: 'CHO‘L', ru: 'ПУСТЫНЯ', en: 'DESERT' },
      { uz: 'MUZLIK', ru: 'ЛЕДНИК', en: 'GLACIER' },
    ],
    explanation: {
      uz: 'Karrumpo vodiysi — daryo oqib o‘tuvchi tog‘lararo qulay makondir.',
      ru: 'Каррумпо — живописная долина между холмами.',
      en: 'Currumpaw is an expansive river valley framed by bluffs.',
    },
  },

  // 18. Fill in the blank (Tushunish / Goya)
  {
    id: 18,
    type: 'fill',
    bloom: 'tushunish',
    category: 'goya',
    question: {
      uz: 'Insoniy his-tuyg‘ularni va jonli holatlarni jonsiz narsalarga yoki hayvonlarga ko‘chirish san’ati adabiyotda ________ (tashxis) deyiladi.',
      ru: 'Перенос человеческих черт и чувств на животных и явления природы называется ________ (персонификацией).',
      en: 'Attributing human traits and emotions to animals or nature is termed ________ (personification).',
    },
    correctAnswer: 'JONLANTIRISH',
    options: [
      { uz: 'JONLANTIRISH', ru: 'ОЛИЦЕТВОРЕНИЕ', en: 'PERSONIFICATION' },
      { uz: 'KO‘CHIRMA', ru: 'ЦИТИРОВАНИЕ', en: 'QUOTATION' },
      { uz: 'QOFIYA', ru: 'РИФМА', en: 'RHYME' },
    ],
    explanation: {
      uz: 'Jonlantirish (tashxis) orqali hayvonning ichki kechinmalari kitobxonga yaqqol yetkaziladi.',
      ru: 'Олицетворение позволяет читателю проникнуться чувствами зверя.',
      en: 'Personification conveys the deep emotional experiences of the wild creature.',
    },
  },

  // 19. Matching Pairs (Qollash / Syujet)
  {
    id: 19,
    type: 'matching',
    bloom: 'qollash',
    category: 'syujet',
    question: {
      uz: 'Hikoyadagi kompozitsiya qismlarini voqealarga to‘g‘ri moslashtiring:',
      ru: 'Сопоставьте элементы композиции с событиями рассказа:',
      en: 'Match the narrative composition stages to their respective events:',
    },
    matchingPairs: [
      {
        left: { uz: '1. Ekspozitsiya (Boshlanish)', ru: '1. Экспозиция', en: '1. Exposition' },
        right: { uz: 'Karrumpoda Lobo to‘dasining erkin hukmronligi', ru: 'Свободная жизнь стаи Лобо в Каррумпо', en: 'Lobo pack’s sovereign reign in Currumpaw' },
      },
      {
        left: { uz: '2. Tugun (Boshlanish nuqtasi)', ru: '2. Завязка', en: '2. Inciting Incident' },
        right: { uz: 'Ernest Seton-Tompsonning vodiyga kelishi', ru: 'Прибытие охотника Сетона в долину', en: 'Arrival of hunter Seton in the valley' },
      },
      {
        left: { uz: '3. Kulminatsiya (Eng yuqori nuqta)', ru: '3. Кульминация', en: '3. Climax' },
        right: { uz: 'Loboning barcha oyoqlari bilan tuzoqqa tushishi', ru: 'Попадание Лобо в четыре стальных капкана', en: 'Lobo ensnared by all four paws in steel traps' },
      },
      {
        left: { uz: '4. Yechim (Yakun)', ru: '4. Развязка', en: '4. Resolution' },
        right: { uz: 'Mag‘rur o‘lim va muallif qalbining o‘zgarishi', ru: 'Гибель волка и пробуждение совести автора', en: 'Proud death and the author’s spiritual awakening' },
      },
    ],
    explanation: {
      uz: 'Har bir adabiy asar ma’lum kompozitsion qoliplar (ekspozitsiya, tugun, kulminatsiya, yechim) asosida quriladi.',
      ru: 'Классическая композиция выстраивает драматургию от завязки до финала.',
      en: 'Classical composition structures dramatic tension from exposition to resolution.',
    },
  },

  // 20. Open Question with Sample Answer (Tahlil / Goya)
  {
    id: 20,
    type: 'open',
    bloom: 'tahlil',
    category: 'goya',
    question: {
      uz: 'Sizningcha, nima uchun insoniyat yovvoyi tabiat va yirtqich hayvonlarni shunchaki yo‘q qilmasdan, ularni asrashi va hurmat qilishi shart? O‘z fikringizni 2–3 gapda bayon qiling.',
      ru: 'Как вы считаете, почему человечество должно беречь диких хищников, а не бездумно уничтожать их? Выразите мысль в 2–3 предложениях.',
      en: 'In your view, why must humanity conserve and respect apex predators rather than eradicate them? State your perspective in 2–3 sentences.',
    },
    sampleAnswer: {
      uz: 'Namunaviy javob: Yirtqichlar tabiatdagi biologik muvozanatni saqlaydi va kasalliklar tarqalishining oldini oladi. Bundan tashqari, har bir jonivor xuddi inson kabi bu Yer sayyorasida yashash va erkin nafas olish huquqiga ega. Tabiatni yo‘q qilish — insonning o‘z kelajagiga bolta urishidir.',
      ru: 'Примерный ответ: Хищники регулируют экосистему и поддерживают природный баланс. Каждое живое существо имеет священное право на жизнь. Уничтожая дикую природу, человек лишает гармонии и будущего самого себя.',
      en: 'Sample answer: Predators maintain vital ecological balance and regulate healthy wildlife populations. Furthermore, wild creatures possess an intrinsic right to exist freely on this planet. Destroying nature ultimately undermines humanity’s own future.',
    },
    explanation: {
      uz: 'O‘z fikringizni namunaviy javob bilan solishtiring va mustaqil xulosa chiqaring!',
      ru: 'Сравните ваше суждение с эталонным ответом и сделайте вывод!',
      en: 'Compare your reasoning with the sample response to self-assess your reflection!',
    },
  },
];
