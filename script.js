// CONFIGURAÇÃO: coloque aqui o WhatsApp que receberá as confirmações.
// Formato: código do país + DDD + número, sem espaços, parênteses ou sinais.
// Exemplo Brasil: 5515999999999
const WHATSAPP = "5515981334100";

const target = new Date("2026-11-07T10:40:00-03:00").getTime();

function updateCountdown(){
  const diff = target - Date.now();
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  document.querySelector("#days").textContent = String(d).padStart(2,"0");
  document.querySelector("#hours").textContent = String(h).padStart(2,"0");
  document.querySelector("#minutes").textContent = String(m).padStart(2,"0");
  document.querySelector("#seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const attendance = document.querySelector("#attendance");
const guestsBox = document.querySelector("#guestsBox");

document.querySelectorAll("[data-choice]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-choice]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    attendance.value = btn.dataset.choice;
    guestsBox.classList.toggle("hidden", btn.dataset.choice !== "sim");
  });
});


const copyPixButton = document.querySelector("#copyPix");
if (copyPixButton) {
  copyPixButton.addEventListener("click", async () => {
    const key = document.querySelector("#pixKey").textContent.trim();
    const status = document.querySelector("#copyStatus");
    try {
      await navigator.clipboard.writeText(key);
      status.textContent = "Chave Pix copiada.";
    } catch {
      status.textContent = "Copie a chave manualmente.";
    }
  });
}

document.querySelector("#rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const choice = attendance.value;
  const guests = document.querySelector("#guests").value;
  const message = document.querySelector("#message").value.trim();

  if (!choice) {
    alert("Selecione se você estará presente.");
    return;
  }

  const text = [
    "CONFIRMAÇÃO — LETÍCIA & GUSTAVO",
    "",
    `Nome: ${name}`,
    `Presença: ${choice === "sim" ? "Sim, estarei presente" : "Não poderei comparecer"}`,
    choice === "sim" ? `Pessoas: ${guests}` : "",
    message ? `Mensagem: ${message}` : ""
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const success = document.querySelector("#success");
  success.style.display = "block";
  success.innerHTML = `Sua confirmação foi preparada. <a href="${url}" target="_blank" rel="noopener"><strong>Clique aqui para enviar pelo WhatsApp.</strong></a>`;
  success.scrollIntoView({behavior:"smooth", block:"center"});
});
