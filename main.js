// --------- EINSTELLUNGEN ---------
const questions = [
    "*Aufgabe 1:*
Ein Fast-Food-Laden und eine Insel haben den selben Namen. Wie viele Kilometer liegen zwischen der Insel und Oslo aufgerundet (Es gibt ein Google-Maps-Tool dafür). Bilde dann die Quersumme.
_Bsp. (18637km ~ 19000km = QrS. 10)_",
    "*Aufgabe 2:*
Lea möchte sich den 3. Teil ihrer Buch-Reihe kaufen, sie hat 20€ dabei. Der 1. Teil hat 7.50€ gekostet und der 2 Teil 10.75€.

_Wahr oder Falsch:_
- Lea kann sich das Buch leisten
- Lea hat am Ende noch mehr 10€
- Lea fehlt 1€ um sich das Buch zu leisten
- Lea muss für alle Bücher insgesamt mehr als 33€ bezahlen

Wahr = Zahl 5
Falsch = Zahl 3

Rechne am Ende allen Zahlen zusammen bzw. bilde die Quersumme soweit wie möglich.",
    "*Aufgabe 3:*
Vor laNger zeit lebte Ein mann in einem schloss voll mit kammern, die mit gold Und diamanten überfüllt waren. der mann hat davon Nie etwas ausgegeben. bis es dann gestohlen wurde ...",
    "*Aufgabe 4:*
Lyon, Paris = ?
Manchester, London = ?
Barcelona, Madrid = ?

= welche Länder? = welche Sprachen?

Übersetze folgendes Wort in allen 3 Sprachen, zähle die Buchstaben und bilde die Quersumme so weit wie möglich = Lösung

 - Essen -",
    "*Aufgabe 5:* 
_BinroäedC_
NENNNENE
NEENENNE
NEENEEEN
NEEENNEE",
    "*Aufgabe 6:*
1961 [Europa] --> Ereignis
Ereignis --> Ort
Ort --> Land
Land --> Kennzeichen [Eurofeld]
Buchstabe [Kennzeichen] --> Zahl
Zahl --> Lösung",
    "*Aufgabe 7:*
Bilde aus allen 6 Lösungszahlen Buchstaben.

Bilde daraus dann eine Abkürzung mit 2 Buchstaben, die oft im Alltag genutzt wird.
Von jung und alt.

Abkürzung --> Beliebteste 
--> letzten 3 Buchstaben
--> Daraus Zahlen
--> Alle 3 Zahlen addieren
--> Quersumme",
    "*Lösungsweg 8:*
Astrid Lindgren
*1907 --> 2024 = 118 Jahre alt

Qrs. = 10

_Lösung:_ 10",
    "*Aufgabe 9:*
Wie lautete der allererste Gewinner vom 'Jugendwort des Jahres'?

Aus wie viel Wörtern wurde das Jugendwort zusammengesetzt = Lösung",
    "*Aufgabe 10:*

*F* ood *I* sle *N* ew *T* reasure",
    "*Aufgabe 11:*

Ich mach nie wieder Fanpost auf (vor 1 Jahr)

Welche beide Buchstaben stehen auf dem schwarzem Schild?

Beide Buchstaben in Zahlen umwandeln und addieren.",
    "*Aufgabe 12:*
Rätsel 7 + 8 + 9 + 10 + 11",
    "*Aufgabe 13:*
Die Buslinie [Aufgabe 12] fährt vom ... Tor bis zum Tierpark (Alemannenstraße)

An welchen Koordinaten liegt das ... Tor [Ort]?

Bilde aus den Koordinaten die Quersumme."
];

const startDate = new Date("2025-07-28");
const intervalDays = 3; // Abstand zwischen Fragen
// ---------------------------------

const calendarEl = document.getElementById("calendar");
const questionModal = document.getElementById("questionModal");
const solutionModal = document.getElementById("solutionModal");
const questionTitle = document.getElementById("questionTitle");
const answerInput = document.getElementById("answerInput");
const saveAnswerBtn = document.getElementById("saveAnswer");
const finalAnswerInput = document.getElementById("finalAnswer");
const shareButton = document.getElementById("shareButton");
const closeModal = document.getElementById("closeModal");

let currentQuestionIndex = null;

// LocalStorage Keys
const LS_ANSWERS = "quizAnswers";

// Antworten laden
let answers = JSON.parse(localStorage.getItem(LS_ANSWERS)) || {};

// Kalender erstellen
function createCalendar() {
    calendarEl.innerHTML = "";
    const today = new Date();

    questions.forEach((q, index) => {
        const dayEl = document.createElement("div");
        dayEl.classList.add("day");
        dayEl.textContent = index + 1;

        const unlockDate = new Date(startDate);
        unlockDate.setDate(startDate.getDate() + index * intervalDays);

        if (today < unlockDate) {
            dayEl.classList.add("locked");
        } else {
            dayEl.addEventListener("click", () => openQuestion(index));
        }

        if (answers[index]) {
            dayEl.style.background = "#2196F3"; // bereits beantwortet
        }

        calendarEl.appendChild(dayEl);
    });
}

// Frage Modal öffnen
function openQuestion(index) {
    currentQuestionIndex = index;
    questionTitle.textContent = questions[index];
    answerInput.value = answers[index] || "";
    questionModal.style.display = "block";
}

// Antwort speichern
saveAnswerBtn.addEventListener("click", () => {
    const answer = answerInput.value.trim();
    if (answer) {
        answers[currentQuestionIndex] = answer;
        localStorage.setItem(LS_ANSWERS, JSON.stringify(answers));
        questionModal.style.display = "none";
        createCalendar();

        // Letzte Frage? Lösung-Menü anzeigen
        if (currentQuestionIndex === questions.length - 1) {
            solutionModal.style.display = "block";
        }
    }
});

// Modal schließen
closeModal.addEventListener("click", () => {
    questionModal.style.display = "none";
});

// Teilen auf WhatsApp
shareButton.addEventListener("click", () => {
    const answer = finalAnswerInput.value.trim();
    if (!answer) return;
    const text = `Hab gewonnen, LOL, Lösung: ${answer} [+1 haha]`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
});

// Initialisierung
createCalendar();
