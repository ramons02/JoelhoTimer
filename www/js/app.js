let intervalo = null;
let tempo = 0;
let fase = "Execução";
let cicloAtual = 1;
let pausado = false;

// CAMINHOS RELATIVOS AO INDEX.HTML
const somExecucao = new Audio("assets/lets.mp3");
const somDescanso = new Audio("assets/stop.mp3");
const somFinalizado = new Audio("assets/success.mp3");

window.onload = () => {
    const cfg = JSON.parse(localStorage.getItem("config"));
    if (cfg) {
        document.getElementById("execucao").value = cfg.exec;
        document.getElementById("descanso").value = cfg.desc;
        document.getElementById("ciclos").value = cfg.ciclos;
    }

    document.getElementById("btn-iniciar").addEventListener("click", () => {
        // Desbloqueio de áudio para iPhone/iOS (Obrigatório)
        [somExecucao, somDescanso, somFinalizado].forEach(s => {
            s.play().then(() => { s.pause(); s.currentTime = 0; }).catch(() => {});
        });
        iniciar();
    });
};

function iniciar() {
    if (intervalo) return;
    salvarConfig();

    tempo = parseInt(document.getElementById("execucao").value) || 0;
    fase = "Execução";
    cicloAtual = 1;
    pausado = false;
    
    atualizarTela();
    tocarAviso();

    intervalo = setInterval(() => {
        if (!pausado) {
            tempo--;
            if (tempo < 0) {
                if (fase === "Execução") {
                    fase = "Descanso";
                    tempo = parseInt(document.getElementById("descanso").value) || 0;
                } else {
                    cicloAtual++;
                    if (cicloAtual > (parseInt(document.getElementById("ciclos").value) || 1)) {
                        return finalizar();
                    }
                    fase = "Execução";
                    tempo = parseInt(document.getElementById("execucao").value) || 0;
                }
                tocarAviso();
            }
            atualizarTela();
        }
    }, 1000);
}

function tocarAviso() {
    const s = (fase === "Execução") ? somExecucao : somDescanso;
    s.currentTime = 0;
    s.play().catch(e => console.log("Erro de som:", e));
}

function atualizarTela() {
    const min = Math.floor(tempo / 60);
    const seg = tempo % 60;
    document.getElementById("tempo").innerText = `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
    document.getElementById("fase").innerText = fase;
    document.getElementById("ciclo-info").innerText = `Ciclo ${cicloAtual} de ${document.getElementById("ciclos").value}`;
}

function pausar() { pausado = !pausado; }

function resetar() { location.reload(); }

function finalizar() {
    clearInterval(intervalo);
    intervalo = null;
    somFinalizado.play();
    document.getElementById("fase").innerText = "CONCLUÍDO!";
}

function salvarConfig() {
    localStorage.setItem("config", JSON.stringify({
        exec: document.getElementById("execucao").value,
        desc: document.getElementById("descanso").value,
        ciclos: document.getElementById("ciclos").value
    }));
}