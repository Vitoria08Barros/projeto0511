// ===== Efeito digitação =====
const titulo = document.getElementById("titulo");
const textoOriginal = titulo.textContent;
titulo.textContent = "";
let i = 0;
function digitar() {
    if (i < textoOriginal.length) {
        titulo.textContent += textoOriginal.charAt(i);
        i++;
        setTimeout(digitar, 80);
    }
}
window.addEventListener("load", digitar);

// ===== Formulário =====
document.getElementById("form-contato").addEventListener("submit", function(event){
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    if(nome && email && mensagem){
        alert(`Obrigada, ${nome}! Sua mensagem foi enviada com sucesso.`);
        this.reset();
    } else {
        alert("Por favor, preencha todos os campos antes de enviar.");
    }
});

// ===== Fade-in =====
const elementos = document.querySelectorAll(".fade-in");
function mostrarAoRolar(){
    const trigger = window.innerHeight * 0.85;
    elementos.forEach(el=>{
        const top = el.getBoundingClientRect().top;
        if(top < trigger) el.classList.add("show");
    });
}
window.addEventListener("scroll", mostrarAoRolar);
mostrarAoRolar();

// ===== Alternar tema =====
const botaoTema = document.getElementById("tema-toggle");
const body = document.body;

if(localStorage.getItem("tema") === "dark"){
    body.classList.add("dark");
    botaoTema.textContent = "☀️";
} else {
    body.classList.remove("dark");
    botaoTema.textContent = "🌙";
}

botaoTema.addEventListener("click", ()=>{
    body.classList.toggle("dark");
    const temaAtivo = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("tema", temaAtivo);
    botaoTema.textContent = temaAtivo === "dark" ? "☀️" : "🌙";
});

// ===== FUNDO PARTICULADO =====
const canvas = document.getElementById('fundo');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

const particulas = [];
for(let i=0;i<100;i++){
    particulas.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*2+1,
        dx: (Math.random()-0.5)*1.5,
        dy: (Math.random()-0.5)*1.5
    });
}

function animar(){
    ctx.clearRect(0,0,w,h);
    particulas.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = "#00f0ff";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if(p.x<0 || p.x>w) p.dx*=-1;
        if(p.y<0 || p.y>h) p.dy*=-1;
    });
    requestAnimationFrame(animar);
}
animar();

window.addEventListener('resize',()=>{
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
});
