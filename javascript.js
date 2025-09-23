const userInfoForm = document.getElementById("userInfoForm");
const sectionQuestion = document.getElementById("sectionQuestion");
const sectionBien = document.getElementById("Bienvenue");
const btnSuivant = document.getElementById("suivant");
const feedback = document.getElementById("feedback");

let questionPosition = 0;
let score = 0;

const question = document.getElementById("question");
const options = document.getElementById("options");

const questionResponce = [
  {
    question: "html ?",
    options: ["language", "jeu", "art"],
    answer: "language",
  },
  {
    question: "css ?",
    options: ["style", "jeu", "art"],
    answer: "style",
  },
  {
    question: "maquettage ?",
    options: ["jeu", "designe", "Yangtsé"],
    answer: "designe",
  },
  {
    question: "Combien de jours y a-t-il en une année bissextile ?",
    options: ["365", "366", "364"],
    answer: "366",
  },
  {
    question: "css ?",
    options: ["style", "art", "jeu"],
    answer: "style",
  },
  {
    question: "Quel est l’auteur de 'Les Misérables' ?",
    options: ["Victor Hugo", "Émile Zola", "Gustave Flaubert"],
    answer: "Victor Hugo",
  },
  {
    question: "developpement ?",
    options: ["codage", "jeu", "art"],
    answer: "codage",
  },
  {
    question: "informatique ?",
    options: ["Rome", "code", "Naples"],
    answer: "code",
  },
  {
    question: "referent digital ?",
    options: ["numerique", "Lion", "Antilope"],
    answer: "numerique",
  },
  {
    question: "javascript",
    options: ["Qatar", "js", "css"],
    answer: "js",
  },
  {
    question: "pc ?",
    options: ["Tomate", "ordinateur", "Poivron"],
    answer: "ordinateur",
  },
  {
    question: "langue plus utiliser en informatique ?",
    options: ["Anglais", "Chinois mandarin", "Espagnol"],
    answer: "Anglais",
  },
  {
    question: "Quel est l’océan qui borde la côte ouest des États-Unis ?",
    options: ["Atlantique", "Pacifique", "Arctique"],
    answer: "Pacifique",
  },
  {
    question: "prototype ?",
    options: ["Yuan", "prototypage", "Yen"],
    answer: "prototypage",
  },
  {
    question: " base de donne?",
    options: ["Fe", "sql", "Fr"],
    answer: "sql",
  },
  {
    question: "infinityfree ?",
    options: ["art", "jeu", "serveur"],
    answer: "serveur",
  },
  {
    question: "python ?",
    options: ["Tennis", "pt", "Rugby"],
    answer: "pt",
  },
  {
    question: "cybersecurite ?",
    options: ["cybersecurite", "html", "Gobi"],
    answer: "cybersecurite",
  },
  {
    question: "developpement ?",
    options: ["Vrai", "developpement", "Mars"],
    answer: "developpement",
  },
  {
    question: "java ?",
    options: ["Cuisine", "Allemagne", "java"],
    answer: "java",
  },
];

let timerInterval;
let timeLeft = 20 * 60; // 20 minutes en secondes

function startTimer() {
  const timerDisplay = document.getElementById("timerDisplay");
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      afficherResultat();
      alert("Temps écoulé ! Le quiz est terminé.");
    }
  }, 1000 );
}

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let timerDisplay = document.getElementById("timerDisplay");
  if (timerDisplay) {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
}

userInfoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(userInfoForm);
  const username = formData.get("username");
  const mail = formData.get("mail");
  const age = formData.get("age");
  if(age<15 || age>25){
    alert(" vous devez avoir au moins 16 ans pour participer à ce quiz.");
    return;
    
  }
  console.log(mail);
  console.log(username);
  localStorage.setItem("userKey", username);
  localStorage.setItem("mailKey", mail);
  sectionBien.style.display = "none";
  sectionQuestion.style.display = "block";
  btnSuivant.style.display = "none";
  timeLeft = 20 * 60;
  startTimer();
  afficherQuestion();
});

function afficherQuestion() {
  const qr = questionResponce[questionPosition];
  question.innerText = qr.question;
  options.innerHTML = ""; // Nettoyer les anciennes options
  qr.options.forEach((op) => {
    const optionBtn = document.createElement("button");
    optionBtn.textContent = op;
    optionBtn.classList.add("answerBtn");
    optionBtn.onclick = () => {
      selectAnswer(op);
    };
    options.appendChild(optionBtn);
  });
}

function selectAnswer(answer) {
  const correctAnswer = questionResponce[questionPosition].answer;
  if (correctAnswer === answer) {
    feedback.innerText = "FELICITATION 😊 Bonne reponse";
    score++;
  } else {
    feedback.innerText = `INCORRECTE😪 !!! La bonne réponse était : ${correctAnswer}`;
  }
  document.querySelectorAll(".answerBtn").forEach((btn) => {
    btn.disabled = true;
  });
  btnSuivant.style.display = "block";
}

btnSuivant.addEventListener("click", function () {
  questionPosition++;
  if (questionPosition < questionResponce.length) {
    options.innerHTML = "";
    feedback.innerText = "";
    btnSuivant.style.display = "none";
    afficherQuestion();
  } else {
    afficherResultat();
  }
});
function afficherResultat() {
  sectionQuestion.style.display = "none";
  clearInterval(timerInterval);
  const resultSection = document.getElementById("resultSection");
  resultSection.style.display = "block";
  const resultText = document.getElementById("resultText");
  resultText.innerText = `Votre score est de ${score} sur ${questionResponce.length}`;
  const userName = localStorage.getItem("userKey");
  const userMail = localStorage.getItem("mailKey");
  const userInfoDisplay = document.getElementById("userInfoDisplay");
  userInfoDisplay.innerText = `Nom: ${userName}, Email: ${userMail}`;
}











