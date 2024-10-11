document.addEventListener("DOMContentLoaded",()=>{

const buscador=document.querySelector("#busqueda");
const btnSubmit=document.querySelector("#submit");

const orientacion=document.querySelector("#orientacion");

const contDescrip=document.querySelector("#coleccionCategorias");

const fotoCat1=document.querySelector("#front1");//montaña
const fotoCat2=document.querySelector("#front2");//mar
const fotoCat3=document.querySelector("#front3");//carretera

const galeria=document.querySelector("#galeria");

const urlBase="https://api.pexels.com/v1";
const urlInicioMar="photos/189349";
const urlInicioMontaña="photos/417173";
const urlInicioCarretera="photos/56832";

contDescrip.addEventListener("click",(ev)=>{
    if(ev.target.matches(`img`)){
        let id=ev.target.dataset.categoria;
        console.log({id});
        pintarGaleriaDes(id,"descripcion");
    }
})

btnSubmit.addEventListener("click",(ev)=>{
    ev.preventDefault();
    let id = buscador.value;
    pintarGaleriaDes(id,"buscador");
})

orientacion.addEventListener("change",(ev)=>{
    console.log(ev.target.value);
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
            //const recibido=`search?query=${busqueda}`;

            const res = await conexion(item);
           
           // console.log(res.id+" prueba")
            //console.log(res.src.medium);
            //res.photos[0].src.large
            //const aux= res.photos;
            //console.log(aux[0].src.landscape);
            //console.log(aux[1].src.landscape);
            //console.log(aux[2].src.landscape);
            //console.log({res});

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

    const pintarGaleriaDes=async (id,lugar)=>{
    
        let urlBusqueda=`search/?page=4&per_page=25&query=${id}`;
       /* if(id==fotoCat1.id){
            urlBusqueda="search/?page=4&per_page=25&query=Mountain";
        }else if(id==fotoCat2.id){
            urlBusqueda="search/?page=4&per_page=25&query=Ocean";
        }else if(id==fotoCat3.id){
            urlBusqueda="search/?page=4&per_page=25&query=Road";
        }else if(lugar=="buscador"){
            urlBusqueda=`search/?page=4&per_page=25&query=${id}`;
        }*/
        

        try{
          
            const res=await conexion(urlBusqueda);
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