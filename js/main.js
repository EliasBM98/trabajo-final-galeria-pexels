document.addEventListener("DOMContentLoaded",()=>{

const buscador=document.querySelector("#busqueda");
const btnSubmit=document.querySelector("#submit");

const orientacion=document.querySelector("#orientacion");

const contDescrip=document.querySelector("#coleccionCategorias");

const fotoCat1=document.querySelector("#front1");//montaña
const fotoCat2=document.querySelector("#front2");//mar
const fotoCat3=document.querySelector("#front3");//carretera

const galeria=document.querySelector("#galeria");

const paginacion=document.querySelector("#paginacion");
const pag1=document.querySelector("#op1");
const pag2=document.querySelector("#op2");
const pag3=document.querySelector("#op3");
const pag4=document.querySelector("#op4");
const pag5=document.querySelector("#op5");

const urlBase="https://api.pexels.com/v1";
const urlInicioMar="photos/189349";
const urlInicioMontaña="photos/417173";
const urlInicioCarretera="photos/56832";

let pagina_inicio=1;
let imagenes_totales=0;    

contDescrip.addEventListener("click",(ev)=>{
    if(ev.target.matches(`img`)){
        let id=ev.target.dataset.categoria;
        pintarGaleriaDes(id,"");
    }
})

btnSubmit.addEventListener("click",(ev)=>{
    ev.preventDefault();
    let id = buscador.value;
    pintarGaleriaDes(id,"");
})

orientacion.addEventListener("change",(ev)=>{
    console.log(ev.target.value);
    let direccion= ev.target.value;
    pintarGaleriaDes("",direccion);
})

paginacion.addEventListener("click",(ev)=>{
    if(ev.target.matches(`li`)){
        let pagina =ev.target.id;
        pintarGaleriaDes("","",pagina);
    }
})

    //Conexion a la API, recibiendo las diferentes urls
    const conexion=async(url,method='GET')=>{
        try{
            const respuesta=await fetch(`${urlBase}/${url}`,{
                method:method,
                headers:{
                    Authorization:"5GpfihdKfeSMosPoFNyEMnrJu1Zq9mAMRnSSkqSaSdnigbKshpahrnqK"
                }  
            })
            if(respuesta.ok){
                const data =await respuesta.json();
                return data;
            }else{
                throw(Error("Explosion en la llamada"));
            }
        }catch(error){
            throw(error.message);
        }
    }

    //funcion para 
    const pintarTablaVacia=async (item)=>{
        try{

            const res = await conexion(item);

            if(res.id==417173){
                fotoCat1.src=res.src.medium;
            }else if(res.id==189349){
                fotoCat2.src=res.src.medium;
            }else if(res.id==56832){
                fotoCat3.src=res.src.medium;
            }
        }catch(error){
            console.log(error.message);
        }
    }

    const pintarGaleriaDes=async (id,direccion,pagina)=>{

        galeria.dataset.direccion=direccion;

        if(id!=""){
            galeria.dataset.categoria=id;
        }else if(id=="" && direccion==""){  
            if(pagina==="anterior" || pagina==="siguiente"){
                if(pagina=="siguiente" && imagenes_totales/25>pagina_inicio){
                    pag1.textContent++;
                    pag2.textContent++;
                    pag3.textContent++;
                    pag4.textContent++;
                    pag5.textContent++;
                    ++pagina_inicio;
                }else if(pagina=="anterior" && pagina_inicio>1){
                    pag1.textContent--;
                    pag2.textContent--;
                    pag3.textContent--;
                    pag4.textContent--;
                    pag5.textContent--;
                    --pagina_inicio;
                } 
            }
        }

        console.log(pagina_inicio);

        let urlBusqueda=`search/?page=${pagina_inicio}&per_page=25&query=${galeria.dataset.categoria}&orientation=${galeria.dataset.direccion}`;

        try{
          
            const res=await conexion(urlBusqueda);
            imagenes_totales=res.total_results;
            const{photos}=res

            galeria.innerHTML=``;

            photos.forEach((photo)=>{
                galeria.innerHTML+=`
                <img src="${photo.src.small}">`
            })

        }catch(error){
            console.log(error.message);
        }

    }

    pintarTablaVacia(urlInicioMar);
    pintarTablaVacia(urlInicioMontaña);
    pintarTablaVacia(urlInicioCarretera);
    })//LOAD