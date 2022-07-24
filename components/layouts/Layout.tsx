

import Head from 'next/head';
import { FC, PropsWithChildren} from 'react';
import { Navbar } from '../ui';

interface Props {
    title: string,
    children: JSX.Element | JSX.Element[] | string | string[];
};

export const Layout: FC<Props> = ({children, title}) => {
  return (
      <>
        <Head>
            <title>{title || 'PokemonApp' }</title>
            <meta name="author" content="Alex Teper" />
            <meta name="description" content={`Información sobre el pokémon ${title}`} />
            <meta name="keywords" content={ `${title}, pokemon, pokedex`} />
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