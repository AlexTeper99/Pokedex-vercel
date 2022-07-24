import type { NextPage, GetStaticProps } from 'next'
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import {  Grid, Card, Row, Text} from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  
  return(
    <Layout title='Listado de Pokémons'>

      <Grid.Container gap={2} justify='flex-start'>
        {
           pokemons.map( ( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon= {pokemon}  />
          ))
        }

      </Grid.Container>


  </Layout>
)
  
}



//esto se ejecuta del lado del servidor en buildtime. Solo se puede usar en las pages!
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log('hola mundo') //se imprime del lado del servidor, se ve en la terminal donde esta corriendo el puerto del proyecto. 

  const {data} = await pokeApi.get<PokemonListResponse>('pokemon?limit=151') 


  //devuelvo un array de objetos pokemones, devuelve toda la info del poke (name, url), el id (le sume 1 pq empieza en 0) y el img.
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
  }) )

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default Home
