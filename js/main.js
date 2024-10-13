    document.addEventListener("DOMContentLoaded",()=>{

    //Declaramos los diferentes elementos del DOM que vayamos a usar en el codigo
    const buscador=document.querySelector("#busqueda");
    const btnSubmit=document.querySelector("#submit");

    const orientacion=document.querySelector("#orientacion");

    const contDescrip=document.querySelector("#coleccionCategorias");

    const galeria=document.querySelector("#galeria");
    const tituloGaleria=document.querySelector("#tituloGaleria")  

    const paginacion=document.querySelector("#paginacion");
    const pag1=document.querySelector("#op1");
    const pag2=document.querySelector("#op2");
    const pag3=document.querySelector("#op3");
    const pag4=document.querySelector("#op4");
    const pag5=document.querySelector("#op5");

    //Variables Globales de url base para hacer los endpoints de la web junto 3 url iniciales que usaremos al arrancar la pagina
    const urlBase="https://api.pexels.com/v1";
    const urlInicioMar="photos/189349";
    const urlInicioMontaña="photos/417173";
    const urlInicioCarretera="photos/56832";

    //Variables auxiliares que usaremos en galeria para irnos moviendo entre las imagenes mostradas en cada busqueda
    let pagina_inicio=1;
    let imagenes_totales=0; 

    //Expresion regular para la validacion de la entrada del usuario 
    const regExp ={
        input:/^[a-zA-Z]+$/}
    
    
    //Declaracion de los diferentes eventos que tendra la pagina web que dependiendo que sucede nos enviara a una u otra funcion con diferentes valores

    //Listener que se encarga del evento CLICK de las imagenes de descripcion (road,mountain,ocean) y hacer sus respectivas busquedas
    contDescrip.addEventListener("click",(ev)=>{
        if(ev.target.matches(`.fotosCategoria`)){
            let id=ev.target.dataset.categoria;
            pintarGaleriaDes(id,"");
        }
    })

    //Listener del boton del buscador que busca imagenes segun la palabra usada y comprobada(palabra debe estar en ingles)
    btnSubmit.addEventListener("click",(ev)=>{
        ev.preventDefault();
        let id = buscador.value;
        if(regExp.input.test(id)){
            pintarGaleriaDes(id,"");
        }else{
            alert("Busqueda no valida, debes buscar en inglés");
            buscador.value="";
        
        }
    })

    //Listener que se encarga del select que cambia la orientacion de las fotos en las busquedas
    orientacion.addEventListener("change",(ev)=>{
        console.log(ev.target.value);
        let direccion= ev.target.value;
        pintarGaleriaDes("",direccion);
    })

    //Listener que se encarga de moverse entre paginas de una misma busqueda, una vez hecha la busqueda
    paginacion.addEventListener("click",(ev)=>{
        if(ev.target.matches(`li`)){
            let pagina =ev.target.id;
            pintarGaleriaDes("","",pagina);
        }
    })

        //Conexion a la API, que llamara a la API con los diferentes endpoints que recibe y devolviendo una promesa, pero en formato JSON
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
                    throw(Error("Error en la llamada"));
                }
            }catch(error){
                throw(error.message);
            }
        }

        //funcion que pinta la tabla descripcion una vez que se entra a la pagina por primera vez
        const pintarTablaVacia=async (item,descripcion)=>{
            try{

                const res = await conexion(item);
                
                    const artDescripcion=document.createElement("ARTICLE");
                    artDescripcion.classList.add("categorias");

                    const tituloDesccripcion=document.createElement("h2");
                    tituloDesccripcion.classList.add("h2");
                    tituloDesccripcion.textContent=`${descripcion}`;
                    
                    const contenedorIMG=document.createElement("DIV");

                    const imagenDescripcion=document.createElement("IMG");

                    imagenDescripcion.classList.add("fotosCategoria");
                    imagenDescripcion.src=res.src.medium;
                    imagenDescripcion.alt=res.alt;
                    imagenDescripcion.dataset.categoria = descripcion;
                    
                    contenedorIMG.append(imagenDescripcion);
                    artDescripcion.append(contenedorIMG,tituloDesccripcion);
                    contDescrip.append(artDescripcion);
            
            }catch(error){
                alert(error.message);
            }
        }

        //funcion que pinta que la galeria de imagenes y manipula las busquedas en funcion de los valores que recibe, como orientacion de las imagenes, paginacion o busqueda
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

                switch(pagina){
                    case "op1":
                        pagina_inicio=pag1.textContent;
                        break;
                    case "op2":
                        pagina_inicio=pag2.textContent;
                        break;
                    case "op3":
                        pagina_inicio=pag3.textContent;
                        break;
                    case "op4":
                        pagina_inicio=pag4.textContent;
                        break;
                    case "op5":
                        pagina_inicio=pag5.textContent;
                        break;
                }

            }

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


    let palabra = `${galeria.dataset.categoria}`;
    tituloGaleria.innerHTML=`Imagenes de ${palabra.charAt(0).toUpperCase()}${palabra.slice(1)}`


            }catch(error){
                alert(error.message);
            }


        }

        pintarTablaVacia(urlInicioMar,"Ocean");
        pintarTablaVacia(urlInicioMontaña,"Mountain");
        pintarTablaVacia(urlInicioCarretera,"Road");
        })//LOAD