const div_data = document.getElementById("div_data")
const div_relogio = document.getElementById("div_relogio")
const btn_ativar = document.getElementById("btn_ativar")
const btn_parar = document.getElementById("btn_parar")
const tmp_alarme = document.getElementById("tmp_alarme")
const tmp_alarme_minutos = document.getElementById("tmp_alarme_minutos")
const tmp_alarme_horas = document.getElementById("tmp_alarme_horas")
const hora_alarme = document.getElementById("hora_alarme")
const hora_alarme_minutos = document.getElementById("hora_alarme_minutos")
const hora_alarme_horas = document.getElementById("hora_alarme_horas")
const def_segundos = document.getElementById("def_segundos")
const def_minutos = document.getElementById("def_minutos")

const timer = document.getElementById("timer")

const som_alarme = new Audio("alarme.mp3")
som_alarme.loop = -1

let ts_atual = null
let ts_alarme = null 
let alarme_ativado = false
let alarme_tocando = false 
let alarme_segundos = false 
let alarme_minutos = false 
let alarme_horas = false 

tmp_alarme.addEventListener("click",(evt)=>{
  alarme_segundos = true
  alarme_minutos = false 
  alarme_horas = false 
})

tmp_alarme_minutos.addEventListener("click",(evt)=>{
  alarme_segundos = false
  alarme_minutos = true 
  alarme_horas = false 
})

tmp_alarme_horas.addEventListener("click",(evt)=>{
  alarme_segundos = false
  alarme_minutos = false
  alarme_horas = true 
})


btn_ativar.addEventListener("click",(evt)=>{
 if(alarme_segundos){
  ts_atual = Date.now()
  ts_alarme = ts_atual+(tmp_alarme.value*1000)
  alarme_ativado = true 
  const dt_alarme = new Date(ts_alarme) 
  let horas = dt_alarme.getHours()
  horas = horas<10?"0"+horas:horas
  let minutos = dt_alarme.getMinutes()
  minutos = minutos<10?"0"+minutos:minutos
  let segundos = dt_alarme.getSeconds()
  segundos = segundos<10?"0"+segundos:segundos
  hora_alarme.innerHTML = "Hora do Alarme:"+horas+":"+minutos+":"+segundos
 }else if(alarme_minutos){
  ts_atual = Date.now()
  ts_alarme = ts_atual+((tmp_alarme_minutos.value*60)*1000)
  alarme_ativado = true 
  const dt_alarme = new Date(ts_alarme) 
  let horas = dt_alarme.getHours()
  horas = horas<10?"0"+horas:horas
  let minutos = dt_alarme.getMinutes()
  minutos = minutos<10?"0"+minutos:minutos
  let segundos = dt_alarme.getSeconds()
  segundos = segundos<10?"0"+segundos:segundos
  hora_alarme_minutos.innerHTML = "Hora do Alarme:"+horas+":"+minutos+":"+segundos
 }else{
  ts_atual = Date.now()
  ts_alarme = ts_atual+(((tmp_alarme_horas.value*60)*60)*1000)
  alarme_ativado = true 
  const dt_alarme = new Date(ts_alarme) 
  let horas = dt_alarme.getHours()
  horas = horas<10?"0"+horas:horas
  let minutos = dt_alarme.getMinutes()
  minutos = minutos<10?"0"+minutos:minutos
  let segundos = dt_alarme.getSeconds()
  segundos = segundos<10?"0"+segundos:segundos
  hora_alarme_horas.innerHTML = "Hora do Alarme:"+horas+":"+minutos+":"+segundos
 }
 
})

btn_parar.addEventListener("click",(evt)=>{
  alarme_ativado = false 
  alarme_tocando = false 
  alarme_segundos = false 
  alarme_minutos = false 
  alarme_horas = false 

  hora_alarme.innerHTML = "Hora do Alarme:"
  hora_alarme_minutos.innerHTML = "Hora do Alarme:"
  hora_alarme_horas.innerHTML = "Hora do Alarme:"
  tmp_alarme.value = 0
  tmp_alarme_minutos.value = 0
  tmp_alarme_horas.value = 0
  timer.classList.remove("alarme")
  div_relogio.classList.remove("alarme2")
  def_segundos.classList.remove("alarme3")
  def_minutos.classList.remove("alarme3")
  tmp_alarme.classList.remove("alarme4")
  tmp_alarme_minutos.classList.remove("alarme4")
  tmp_alarme_horas.classList.remove("alarme4")
  som_alarme.pause();
  som_alarme.currentTime = 0
})

const data = new Date()

let dia = data.getDate()
dia = dia<10?"0"+dia:dia
let mes = data.getMonth()+1
mes = mes<10?"0"+mes:mes
const dataCompleta = dia+"/"+mes+"/"+data.getFullYear()
div_data.innerHTML = dataCompleta

const relogio = ()=>{
  const data = new Date()
  let horas = data.getHours()
  horas = horas<10?"0"+horas:horas
  let minutos = data.getMinutes()
  minutos = minutos<10?"0"+minutos:minutos
  let segundos = data.getSeconds()
  segundos = segundos<10?"0"+segundos:segundos
  const horaCompleta = horas+":"+minutos+":"+segundos
  div_relogio.innerHTML = horaCompleta
  if(alarme_ativado && !alarme_tocando){
    if(data.getTime() >= ts_alarme){
      alarme_tocando = true
      som_alarme.play()
      timer.classList.add("alarme")
      div_relogio.classList.add("alarme2")
      def_segundos.classList.add("alarme3")
      def_minutos.classList.add("alarme3")
      tmp_alarme.classList.add("alarme4")
      tmp_alarme_minutos.classList.add("alarme4")
      tmp_alarme_horas.classList.add("alarme4")
    }
  }
}

setInterval(relogio,1000)








