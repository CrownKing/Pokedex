//CODED BY: Jonathan Lopes Justino de Souza UFV-Florestal
function captilizefirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
async function resposta() {
    let pesquisa = document.getElementById('pokedex').value
    var url = "https://pokeapi.co/api/v2/pokemon/"+pesquisa.toLowerCase();

    fetch(url)
    .then(response => response.json())
    .then(data => {

        //atributos e nomes
        document.getElementById("basePokemon").style.visibility="visible";
        document.getElementById("types").style.visibility="visible";
        const tela = document.getElementById('basePokemon')
        const sprites = document.getElementById('sprite')
        const spritesBack = document.getElementById('spriteBack')
        const spritesShiny = document.getElementById('spriteShiny')
        const spritesBackShiny = document.getElementById('spriteBackShiny')
        sprites.src= data.sprites.front_default //exibindo as sprites do pokemon
        spritesBack.src= data.sprites.back_default
        spritesShiny.src = data.sprites.front_shiny //sprites do pokemon shiny
        spritesBackShiny . src = data.sprites.back_shiny
        let nome = data.name //nome do pokemon
        const container = document.createElement('div');
        container.setAttribute('class','container'); //atributos bases do pokemon
        document.getElementById('namePokemon').innerHTML ='#' + data.id + '- Nome: ' + captilizefirst(nome)
        document.getElementById('hp').innerHTML = 'HP: '+ data.stats[0].base_stat;
        document.getElementById('atk').innerHTML = 'Atk: '+ data.stats[1].base_stat;
        document.getElementById('def').innerHTML = 'Def: '+ data.stats[2].base_stat;
        document.getElementById('spatk').innerHTML = 'SPAtk: '+ data.stats[3].base_stat;
        document.getElementById('spdef').innerHTML = 'SPDef: '+ data.stats[4].base_stat;
        document.getElementById('spd').innerHTML = 'Speed: '+ data.stats[5].base_stat;
        typeUm = data.types[0].type.name||'' 
    let imgType = document.getElementById('typesUm') //exibir os tipos do pokemon utilizando a pasta types
    let imgType2 = document.getElementById('typesDois')

    //tipos
    if((data.types[1]!= undefined)){
        typeDois = data.types[1].type.name //tratamento para pokemons com apenas 1 tipo
    }
    else{
        typeDois=''
    }
    imgType.src = `/types/${typeUm}.png`
    if(typeDois== ''){
        imgType2.src = `/types/under.png`
    }
    else{
    imgType2.src = `/types/${typeDois}.png`
    }

    //Habilidades
    document.getElementById('ability1').innerHTML = captilizefirst(data.abilities[0].ability.name);
    document.getElementById('ability2').innerHTML ='' //removendo habilidades caso a pesquise retorne um pokemon com menos habilidades que o pokemon pesquisado anteriormente
    document.getElementById('ability3').innerHTML =''
    if(data.abilities[1]!= undefined){
        if(data.abilities[1].is_hidden){
            document.getElementById('ability2').innerHTML = captilizefirst(data.abilities[1].ability.name) +" (Hidden)";
            document.getElementById('ability2').style.fontWeight = 'bold'
            document.getElementById('ability2').style.color = 'red' //destaque para habilidade Hidden
        }
        else
            document.getElementById('ability2').innerHTML = captilizefirst(data.abilities[1].ability.name);
    }
    if(data.abilities[2]!= undefined){
        if(data.abilities[2].is_hidden){
            document.getElementById('ability3').innerHTML = captilizefirst(data.abilities[2].ability.name) +" (Hidden)";
            document.getElementById('ability3').style.fontWeight = 'bold'
            document.getElementById('ability3').style.color = 'red'
        }
        else
            document.getElementById('ability3').innerHTML = captilizefirst(data.abilities[2].ability.name);
    }
   document.getElementById('namePokemon').value = data.name;


   const main = document.querySelector('main');
   let htmlString="";

   for(let i = 0;i < data.moves.length; i++){ //exibindo todos os atacks do pokemon
        if(data.moves[i].version_group_details[0].move_learn_method.name == "machine"){ //atacks com machine sao obtidos apenas por TM/HM, queria exibir os niveis mas como todos estavam zerados optei por nao exibir
            htmlString += `<div>${captilizefirst(data.moves[i].move.name)+ '\xa0\xa0\xa0\xa0'+ " TM/HM"}</div>`
        }
        else {
            htmlString += `<div>${captilizefirst(data.moves[i].move.name)}</div>` //atacks que nao são machines

        }
    }
   main.innerHTML = htmlString

  }).catch(err => {
    //Fazer algo com os erros aqui
    console.log(err)
  });


}
