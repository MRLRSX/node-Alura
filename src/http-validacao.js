
function extraiLinks(arrLinks){
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

export default async function listaValidada(listaLinks){
    const links =  extraiLinks(listaLinks);
    const status = await checaStatus(links);
    return status;
}

async function checaStatus(listaUrls){
   const arrStatus = await Promise.all
   (listaUrls.map(async (url) => {
     const response = await fetch(url);
     return response.status;
    }));
   return arrStatus;
}
