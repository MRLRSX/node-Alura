import chalk from "chalk";

function extraiLinks(arrLinks){
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

export default async function listaValidada(listaLinks){
    const links =  extraiLinks(listaLinks);
    const status = await checaStatus(links);
    return listaLinks.map((objeto, indice) => ({
        ...objeto, 
        status: status[indice]
    }));
}

async function checaStatus(listaUrls){
        const arrStatus = await Promise.all
        (listaUrls.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            }catch(erro){
                return manejaErro(erro);
            }
        }));
        return arrStatus;
}

function manejaErro(erro){
    if (erro.cause.code === 'ENOTFOUND'){
        return 'link não encontrada';
    } else {
        return 'ocorreu algum erro';
    }
}
