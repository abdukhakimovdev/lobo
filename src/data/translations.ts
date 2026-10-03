import { Badge, LocalizedString } from '../types';

export const UI_TRANSLATIONS: Record<string, LocalizedString> = {
  appTitle: {
    uz: 'Lobo — Karrumpo Qiroli',
    ru: 'Лобо — Властелин Каррумпо',
    en: 'Lobo — King of Currumpaw',
  },
  appSubtitle: {
    uz: '7-sinf adabiyot darsi bo‘yicha interaktiv sayohat',
    ru: 'Интерактивное путешествие по уроку литературы 7 класса',
    en: 'Interactive literature journey for 7th grade',
  },
  stageMap: {
    uz: 'Dars bosqichlari xaritasi',
    ru: 'Карта этапов урока',
    en: 'Lesson Stages Map',
  },
  stage: {
    uz: 'bosqich',
    ru: 'этап',
    en: 'stage',
  },
  xp: {
    uz: 'XP (Tajriba)',
    ru: 'XP (Опыт)',
    en: 'XP (Experience)',
  },
  streakDays: {
    uz: 'kun ketma-ket',
    ru: 'дней подряд',
    en: 'day streak',
  },
  soundOn: {
    uz: 'Ovoz yoqilgan',
    ru: 'Звук включен',
    en: 'Sound on',
  },
  soundOff: {
    uz: 'Ovoz o‘chirilgan',
    ru: 'Звук выключен',
    en: 'Sound off',
  },
  teacherMode: {
    uz: 'O‘qituvchi xonasi',
    ru: 'Учительская',
    en: 'Teacher Mode',
  },
  projectorMode: {
    uz: 'Proyektor rejimi',
    ru: 'Режим проектора',
    en: 'Projector Mode',
  },
  nextStage: {
    uz: 'Keyingi bosqichga o‘tish',
    ru: 'Перейти к следующему этапу',
    en: 'Proceed to next stage',
  },
  completed: {
    uz: 'Bajarildi!',
    ru: 'Завершено!',
    en: 'Completed!',
  },
  restart: {
    uz: 'Qaytadan boshlash',
    ru: 'Начать заново',
    en: 'Restart',
  },
  checkAnswer: {
    uz: 'Tekshirish',
    ru: 'Проверить',
    en: 'Check answer',
  },
  correct: {
    uz: 'Barakalla! To‘g‘ri javob!',
    ru: 'Отлично! Правильный ответ!',
    en: 'Great job! Correct answer!',
  },
  incorrect: {
    uz: 'Xato bo‘ldi, daldani yo‘qotma!',
    ru: 'Неверно, не унывай!',
    en: 'Incorrect, keep your chin up!',
  },
  tryAgain: {
    uz: 'Qayta urinish',
    ru: 'Попробовать снова',
    en: 'Try again',
  },
  readAloud: {
    uz: 'Ovozli o‘qish',
    ru: 'Прочитать вслух',
    en: 'Read aloud',
  },
  stopReading: {
    uz: 'Ovozni to‘xtatish',
    ru: 'Остановить чтение',
    en: 'Stop speech',
  },
  badgesHeader: {
    uz: 'Mening nishonlarim',
    ru: 'Мои значки',
    en: 'My Badges',
  },
  locked: {
    uz: 'Qulflangan',
    ru: 'Заблокировано',
    en: 'Locked',
  },
  unlockRequirement: {
    uz: 'Ochish sharti:',
    ru: 'Условие открытия:',
    en: 'Unlock requirement:',
  },
  bonusTabs: {
    uz: 'Qo‘shimcha ijodiy bo‘limlar',
    ru: 'Дополнительные творческие разделы',
    en: 'Bonus Creative Sections',
  },
  thoughtWallTitle: {
    uz: 'Fikrlash devori',
    ru: 'Стена мыслей',
    en: 'Thought Wall',
  },
  creativePromptTitle: {
    uz: 'Agar men Lobo bo‘lsam...',
    ru: 'Если бы я был Лобо...',
    en: 'If I were Lobo...',
  },
  natureConservationTitle: {
    uz: 'Hayvonlar va biz (Tabiatni asrash)',
    ru: 'Животные и мы (Охрана природы)',
    en: 'Animals and Us (Conservation)',
  },
  crossCurricularTitle: {
    uz: 'Fanlararo bog‘lanish (Biologiya, Geografiya, Tarix)',
    ru: 'Межпредметные связи (Биология, География, История)',
    en: 'Cross-curricular (Biology, Geography, History)',
  },
  certificate: {
    uz: 'Faxriy Sertifikat',
    ru: 'Почетный Сертификат',
    en: 'Certificate of Honor',
  },
  print: {
    uz: 'Chop etish / PDF',
    ru: 'Печать / PDF',
    en: 'Print / PDF',
  },
  close: {
    uz: 'Yopish',
    ru: 'Закрыть',
    en: 'Close',
  },
  save: {
    uz: 'Saqlash',
    ru: 'Сохранить',
    en: 'Save',
  },
  copy: {
    uz: 'Nusxa olish',
    ru: 'Копировать',
    en: 'Copy',
  },
  copied: {
    uz: 'Nusxalandi!',
    ru: 'Скопировано!',
    en: 'Copied!',
  },
  accessibility: {
    uz: 'Qulaylik sozlamalari',
    ru: 'Специальные возможности',
    en: 'Accessibility',
  },
  fontSize: {
    uz: 'Shrift o‘lchami',
    ru: 'Размер шрифта',
    en: 'Font size',
  },
  normal: {
    uz: 'Oddiy',
    ru: 'Обычный',
    en: 'Normal',
  },
  large: {
    uz: 'Katta',
    ru: 'Крупный',
    en: 'Large',
  },
  xlarge: {
    uz: 'Juda katta',
    ru: 'Очень крупный',
    en: 'Extra Large',
  },
  highContrast: {
    uz: 'Yuqori kontrast',
    ru: 'Высокая контрастность',
    en: 'High contrast',
  },
};

export const STAGE_TITLES: Record<number, { title: LocalizedString; subtitle: LocalizedString; icon: string }> = {
  1: {
    title: { uz: 'Qiziqish uyg‘otish', ru: 'Пробуждение интереса', en: 'Spark of Curiosity' },
    subtitle: { uz: 'Kirish, jumboq va bo‘rilar siri', ru: 'Введение, загадка и тайна волков', en: 'Introduction, riddle & wolf secrets' },
    icon: '💡',
  },
  2: {
    title: { uz: 'Muallif bilan tanishuv', ru: 'Знакомство с автором', en: 'Meet the Author' },
    subtitle: { uz: 'Ernest Seton-Tompson hayoti va ijodi', ru: 'Жизнь и творчество Э. Сетон-Томпсона', en: 'Life and legacy of E. Seton-Thompson' },
    icon: '📖',
  },
  3: {
    title: { uz: 'Hikoya mazmuni', ru: 'Сюжет рассказа', en: 'Story Narrative' },
    subtitle: { uz: '6 ta interaktiv sahna va audio mutolaa', ru: '6 интерактивных сцен и аудиочтение', en: '6 interactive scenes & audio reading' },
    icon: '🎭',
  },
  4: {
    title: { uz: 'Qahramonlar va g‘oya', ru: 'Герои и идея', en: 'Characters & Themes' },
    subtitle: { uz: 'Qahramonlar tahlili va adabiy tushunchalar', ru: 'Анализ персонажей и литературоведение', en: 'Character analysis & literary terms' },
    icon: '⚖️',
  },
  5: {
    title: { uz: 'O‘yin maydoni', ru: 'Игровая площадка', en: 'Games Arena' },
    subtitle: { uz: '6 ta interaktiv bellashuv va mashqlar', ru: '6 интерактивных состязаний и упражнений', en: '6 interactive mini-games & drills' },
    icon: '🎮',
  },
  6: {
    title: { uz: 'KEYS: Karrumpo qarori', ru: 'КЕЙС: Решение в Каррумпо', en: 'CASE: Currumpaw Dilemma' },
    subtitle: { uz: 'Tarmoqlanuvchi axloqiy tanlov va mulohaza', ru: 'Ветвящийся моральный выбор и размышление', en: 'Branching moral choice & essay reflection' },
    icon: '🧭',
  },
  7: {
    title: { uz: 'Bilimni sinash', ru: 'Проверка знаний', en: 'Final Exam & Grade' },
    subtitle: { uz: '20 ta savol, Blum taksonomiyasi va sertifikat', ru: '20 вопросов, таксономия Блума и сертификат', en: '20 test questions, analysis & certificate' },
    icon: '🏆',
  },
};

export const BADGES_LIST: Badge[] = [
  {
    id: 'first_step',
    title: { uz: 'Birinchi qadam', ru: 'Первый шаг', en: 'First Step' },
    description: {
      uz: 'Hikoyaga kirish qismidagi barcha jumboqlarni topdingiz!',
      ru: 'Разгадали все вводные загадки рассказа!',
      en: 'Solved all introductory riddles of the story!',
    },
    icon: '🌟',
  },
  {
    id: 'author_scholar',
    title: { uz: 'Muallif bilimdoni', ru: 'Знаток автора', en: 'Author Scholar' },
    description: {
      uz: 'Ernest Seton-Tompson hayotiga oid mini-quizdan 3/3 to‘pladingiz!',
      ru: 'Набрали 3/3 в мини-квизе о жизни Э. Сетон-Томпсона!',
      en: 'Scored 3/3 on the Ernest Seton-Thompson mini-quiz!',
    },
    icon: '📜',
  },
  {
    id: 'attentive_reader',
    title: { uz: 'Sinchkov kitobxon', ru: 'Внимательный читатель', en: 'Attentive Reader' },
    description: {
      uz: 'Hikoyaning 6 ta sahnasini to‘liq o‘rganib, savollariga to‘g‘ri javob berdingiz.',
      ru: 'Изучили все 6 сцен рассказа и ответили на проверочные вопросы.',
      en: 'Explored all 6 story scenes and answered the comprehension checks.',
    },
    icon: '👁️',
  },
  {
    id: 'literary_critic',
    title: { uz: 'Adabiyot tahlilchisi', ru: 'Литературный критик', en: 'Literary Analyst' },
    description: {
      uz: 'Qahramonlar va badiiy vositalar (syujet, o‘xshatish, jonlantirish)ni tushundingiz.',
      ru: 'Разобрались в характерах героев и художественных тропах.',
      en: 'Mastered character depth and literary devices.',
    },
    icon: '⚖️',
  },
  {
    id: 'vocab_master',
    title: { uz: 'Lug‘at ustasi', ru: 'Мастер словаря', en: 'Vocab Master' },
    description: {
      uz: 'Hikoyadagi barcha yangi so‘zlar ma’nosini aniqladingiz.',
      ru: 'Освоили все новые литературные термины и слова рассказа.',
      en: 'Learned and matched all vocabulary terms accurately.',
    },
    icon: '📚',
  },
  {
    id: 'detective',
    title: { uz: 'Dasht detektivi', ru: 'Степной детектив', en: 'Prairie Detective' },
    description: {
      uz: 'Voqealar ketma-ketligi va xotira o‘yinini muvaffaqiyatli yakunladingiz.',
      ru: 'Успешно восстановили хронологию событий и прошли игру на память.',
      en: 'Restored the story sequence and solved the memory match.',
    },
    icon: '🔍',
  },
  {
    id: 'speed_mind',
    title: { uz: 'Chaqqon aql', ru: 'Быстрый ум', en: 'Lightning Mind' },
    description: {
      uz: '30 soniyalik tezkor Haqiqat/Yolg‘on sinovida 5 balldan yuqori to‘pladingiz.',
      ru: 'Набрали высокий балл в 30-секундном блице Правда/Ложь.',
      en: 'Scored high in the 30-second True/False blitz round.',
    },
    icon: '⚡',
  },
  {
    id: 'kind_heart',
    title: { uz: 'Mehribon qalb', ru: 'Доброе сердце', en: 'Kind Heart' },
    description: {
      uz: 'Keys tadqiqotida tabiat va bo‘riga hamdardlik yo‘lini tanladingiz.',
      ru: 'В кейсе выбрали путь милосердия и уважения к волку.',
      en: 'Chose empathy and compassion for Lobo in the case study.',
    },
    icon: '❤️',
  },
  {
    id: 'perfect_score',
    title: { uz: 'A’lochi o‘quvchi (5 baho)', ru: 'Отличник (Оценка 5)', en: 'Honor Student (Grade 5)' },
    description: {
      uz: 'Yakuniy testda 90% dan yuqori natija ko‘rsatib, 5 baho oldingiz!',
      ru: 'Набрали более 90% в итоговом тесте и заслужили оценку «5»!',
      en: 'Scored over 90% in the final exam and earned the top grade!',
    },
    icon: '👑',
  },
];
