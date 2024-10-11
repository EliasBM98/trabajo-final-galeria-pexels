document.addEventListener("DOMContentLoaded",()=>{

const contenedorCategorias=document.querySelector("#coleccionCategorias");

const urlBase="https://api.pexels.com/v1";
const urlInicio="curated?page=1&per_page=3";

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
    const pintarTabla=async (item)=>{
        try{
            //const recibido=`search?query=${busqueda}`;
            //pintarTabla("Ocean")
            //const res = await conexion(recibido);

            const res = await conexion(item);

            //res.photos[0].src.large
            const aux= res.photos;
            console.log(aux[0].src.landscape);
            console.log(aux[1].src.landscape);
            console.log(aux[2].src.landscape);
            //console.log({res});

            
           
        }catch(error){
            console.log(error.message);
        }
    }

    pintarTabla(urlInicio);

    })//LOAD