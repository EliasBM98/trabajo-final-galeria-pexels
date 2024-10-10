document.addEventListener("DOMContentLoaded",()=>{
    const urlBase="https://api.pexels.com/v1";
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
    const pintarTabla=async (busqueda)=>{
        try{
            const recibido=`search?query=${busqueda}`;
            const res = await conexion(recibido);
            console.log({res});
        }catch(error){
            console.log(error.message);
        }
    }
    pintarTabla("Ocean");
    })//LOAD