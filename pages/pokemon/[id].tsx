import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { useEffect, useState } from 'react';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';


interface Props {
  pokemon: Pokemon;
}


const PokemonPage: NextPage<Props> = ({ pokemon }) => {
   
  const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ) );

  // toggle esta en on-off
    const onToggleFavorite = () => {
      localFavorites.toggleFavorite(pokemon.id)
      setIsInFavorites(!isInFavorites);

      if(isInFavorites) return;

      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        }
      })
      
    }

    useEffect(() => {
      console.log('use effect')
    }, [])
    
    return (
        <Layout title={pokemon.name}>
           
           <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
              <Grid xs={ 12 } sm={ 4 } >
                <Card hoverable css={{ padding: '30px' }}>
                    <Card.Body>
                      <Card.Image 
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                        alt={ pokemon.name }
                        width="100%"
                        height={ 200 }
                      />
                    </Card.Body>
                </Card>
              </Grid>

              <Grid xs={ 12 } sm={ 8 }>
                <Card>
                  <Card.Header css={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Text h1 transform='capitalize'>{ pokemon.name }</Text>

                    <Button
                      color="gradient"
                      ghost={ !isInFavorites }
                      onClick={ onToggleFavorite }
                    >
                      { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
                    </Button>
                  </Card.Header>

                  <Card.Body>
                    <Text size={30}>Sprites:</Text>

                    <Container direction='row' display='flex' gap={ 0 }>
                        <Image 
                          src={ pokemon.sprites.front_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                          
                        />
                        <Image 
                          src={ pokemon.sprites.back_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.front_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />

                    </Container>


                  </Card.Body>  


                </Card>
              </Grid>

           </Grid.Container>



        </Layout>
    )
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }` );

  return {
    paths: pokemons151.map( id => ({
      params: { id }
    })),
    //si el fallback esta en false es que cuando me paso de los path determinados da 404.
    //si el fallback esta en blocking
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo( id )

  if(!pokemon){
    return {
      redirect: {
        destination: '/ ', //si no existe el pokemon en getPokemonInfo redirecciono al home
        permanent: false //si la redireccion es permanente borran la direccion a la otra pagina del indice (poq puede ser que en un futuro exista ese pokemon)
      }
    }
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400, // 60* 60 * 24. Escribir ya el resultado
  }
}






export default PokemonPage;