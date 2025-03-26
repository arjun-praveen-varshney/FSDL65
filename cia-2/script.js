const para = document.getElementById("para")
const button = document.getElementById("button")
const input = document.getElementById("input")

const handleClick = ()=>{
    const text = input.value
    para.textContent = text
}