const letterSections = [
  {
    title: "Когда я чувствую твою любовь",
    paragraphs: [
      "Я сильнее всего чувствую твою любовь в моменты, когда ты смотришь на меня влюблёнными глазами — будто в этот момент тебе даже не так важно, что я говорю, потому что ты просто смотришь на меня с теплом.",
      "Я чувствую твою любовь, когда ты говоришь, что у меня всё получится. Когда ты веришь в меня, мне правда становится легче двигаться вперёд, даже если внутри есть усталость, страх или сомнения.",
      "Я чувствую её в твоей нежности: когда ты гладишь меня по голове, прижимаешься, кладёшь на меня ножку, хочешь быть ближе. Для меня это очень тёплые моменты, потому что через них я чувствую, что я тебе нужен.",
      "Конечно, я очень сильно чувствую твою любовь в моменты нашей близости — когда ты говоришь, что любишь меня, хочешь меня, что я у тебя самый лучший.",
      "Ещё я чувствую её, когда ты поддерживаешь меня в трудные моменты. Когда мне сложно, а ты остаёшься рядом, это для меня очень ценно.",
      "И, наверное, самое главное — я чувствую твою любовь, когда понимаю, что ты выбрала быть именно со мной. Не потому что должна, не потому что так надо, а потому что хочешь. Для меня это очень много значит."
    ]
  },
  {
    title: "Что помогает мне чувствовать себя любимым",
    paragraphs: [
      "Мне правда важно чаще слышать от тебя простые тёплые слова: “я люблю тебя”, “я скучаю”, “ты мне нужен”, “я верю в тебя”. Такие слова меня очень согревают, наполняют и дают силы двигаться дальше.",
      "Мне очень приятна твоя инициатива. Когда ты сама хочешь обнять, написать, увидеться, позвонить или прикоснуться ко мне, я чувствую, что я тебе действительно нужен, а не просто сам всё время тянусь к тебе.",
      "Для меня очень важна твоя нежность: твои прикосновения, объятия, то, как ты прижимаешься, гладишь меня, смотришь на меня мягко. Это один из самых сильных языков любви для меня.",
      "Ещё мне было бы очень приятно, если бы ты иногда сама говорила, что ценишь во мне. Это помогает мне меньше сомневаться в себе и лучше понимать, каким ты меня видишь."
    ]
  },
  {
    title: "Что мне бывает трудно понять",
    paragraphs: [
      "Иногда меня может задевать, когда мне кажется, что ты закрываешься и не говоришь прямо, что чувствуешь. Я понимаю, что ты можешь делать это не специально и что тебе самой в такие моменты тяжело. Просто у меня из-за этого иногда включается тревога, и я начинаю додумывать худшее.",
      "Ещё иногда, когда ты говоришь о красивой жизни, деньгах, богатстве и будущем, я могу воспринимать это слишком болезненно. Не потому что мне не нравится, что ты мечтаешь. Наоборот, мне нравится, что у тебя есть желания. Просто иногда во мне включается страх, что однажды я могу оказаться недостаточным для тебя. Я понимаю, что это мой страх, а не твоя вина, но хочу честно сказать, что такая тема иногда может меня задевать.",
      "Мне также бывает трудно, когда я хочу понять, что с тобой происходит, а ты отвечаешь очень коротко или отстраняешься. Я понимаю, что иногда тебе нужна пауза, и я хочу научиться уважать это спокойнее. Просто для меня важно, чтобы мы потом всё равно возвращались к разговору и не оставляли всё в тишине.",
      "И ещё мне бывает сложно, когда ты хочешь, чтобы я сам догадался, чего тебе хочется или что мне нужно сделать. Я правда хочу учиться лучше понимать тебя и замечать такие вещи. Просто иногда я очень боюсь ошибиться, потому что хочу сделать всё красиво и так, как тебе понравится. Поэтому мне было бы легче, если бы ты иногда могла мягко подсказать или направить меня. Не потому что я не хочу стараться, а потому что я правда хочу научиться делать для тебя правильно."
    ]
  }
];

const screens = document.querySelectorAll("[data-screen]");
const openButton = document.querySelector("[data-open-letter]");
const prevButton = document.querySelector("[data-prev]");
const nextButton = document.querySelector("[data-next]");
const finishButton = document.querySelector("[data-finish]");
const progressText = document.querySelector("#progressText");
const progressDots = document.querySelector("[data-progress-dots]");
const questionTitle = document.querySelector("#questionTitle");
const questionText = document.querySelector("#questionText");
const letterCard = document.querySelector("[data-letter-card]");
const portrait = document.querySelector("[data-portrait]");
const photo = document.querySelector("[data-photo]");

let currentIndex = 0;

function showScreen(screenName) {
  screens.forEach((screen) => {
    const isTarget = screen.dataset.screen === screenName;
    screen.hidden = !isTarget;
    screen.classList.toggle("is-active", isTarget);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildProgressDots(activeIndex) {
  progressDots.innerHTML = "";

  letterSections.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.toggle("is-active", index === activeIndex);
    progressDots.append(dot);
  });
}

function renderSection(index) {
  const section = letterSections[index];
  const paragraphMarkup = section.paragraphs
    // Each paragraph receives its own delay for the letter-opening cascade.
    .map((paragraph, paragraphIndex) => {
      const delay = 130 + paragraphIndex * 145;
      return `<p style="--delay: ${delay}ms">${paragraph}</p>`;
    })
    .join("");

  progressText.textContent = `${index + 1} из ${letterSections.length}`;
  questionTitle.textContent = section.title;
  questionText.innerHTML = paragraphMarkup;
  buildProgressDots(index);

  prevButton.textContent = "Назад";
  nextButton.textContent = "Дальше";

  letterCard.classList.remove("is-changing");
  void letterCard.offsetWidth;
  letterCard.classList.add("is-changing");
}

function openLetter() {
  currentIndex = 0;
  renderSection(currentIndex);
  showScreen("question");
}

function goBack() {
  if (currentIndex === 0) {
    showScreen("intro");
    return;
  }

  currentIndex -= 1;
  renderSection(currentIndex);
}

function goNext() {
  if (currentIndex === letterSections.length - 1) {
    showScreen("final");
    return;
  }

  currentIndex += 1;
  renderSection(currentIndex);
}

// The page stays elegant even before assets/her-photo.jpg is added.
function hideMissingPhoto() {
  if (!portrait) {
    return;
  }

  portrait.classList.add("is-hidden");
  document.body.classList.add("photo-missing");
}

openButton.addEventListener("click", openLetter);
prevButton.addEventListener("click", goBack);
nextButton.addEventListener("click", goNext);
finishButton.addEventListener("click", () => showScreen("afterword"));

photo.addEventListener("error", hideMissingPhoto);

if (photo.complete && photo.naturalWidth === 0) {
  hideMissingPhoto();
}

buildProgressDots(currentIndex);
