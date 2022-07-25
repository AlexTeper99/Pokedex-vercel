

const toggleFavorite = ( id: number ) => {

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
    
    if ( favorites.includes( id ) ) {
        favorites = favorites.filter( pokeId => pokeId !== id ); //regreso un nuevo id sin el pokemon
    } else {
        favorites.push( id ); //grabo el pokemon
    }

    localStorage.setItem('favorites', JSON.stringify( favorites ) ); //guardo el arreglo de favoritos como string en localstorage
}

const existInFavorites = ( id: number ): boolean => {

    if ( typeof window === 'undefined' ) return false;
    
    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    return favorites.includes( id );
}


const pokemons = (): number[] => {
    return JSON.parse( localStorage.getItem('favorites') || '[]' );
}



export default {
    existInFavorites,
    toggleFavorite,
    pokemons,
}