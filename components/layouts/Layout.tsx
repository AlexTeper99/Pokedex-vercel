

import Head from 'next/head';
import { FC, PropsWithChildren} from 'react';
import { Navbar } from '../ui';
import { useRouter } from 'next/router';

interface Props {
    title: string,
    children: JSX.Element | JSX.Element[] | string | string[];
};

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

//en el metatag de la imagen necesito la ruta especifica y del lado del servidor
export const Layout: FC<Props> = ({children, title}) => {

  


  return (
      <>
        <Head>
            <title>{title || 'PokemonApp' }</title>
            <meta name="author" content="Alex Teper" />
            <meta name="description" content={`Información sobre el pokémon ${title}`} />
            <meta name="keywords" content={ `${title}, pokemon, pokedex`} />
            <meta property="og:title" content={`Información sobre el pokémon ${title}`} />
<meta property="og:description" content={`Información sobre el pokémon ${title}`} />
<meta property="og:image" content={`${origin}/img/banner.png`}  /> 
        </Head>
      
        {/*<Navbar />*/}
        <Navbar></Navbar>

        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>
      
      </>
  )
};