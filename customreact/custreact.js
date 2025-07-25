
function customRender( reactelement,maincot){
    
}

const reactelement={
    type :a,
    props :{
        href:'https://google.com'
    },
    children :'click me to visit'
}
const cont=document.querySelector('#root')
customRender(reactelement,cont)
