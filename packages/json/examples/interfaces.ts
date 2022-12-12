/**
 * This interface will be ignore because it is not exported.
 */
interface MovieDirector {
    name: string;
    age: number;
}

interface ParentInterface {
    field: string;
}

interface Media {
    id: number;
}

/**
 * Some description on interface
 * @link https://wikipedia.org/wiki/Film | Useful link
 * @link https://wikipedia.org/wiki/Film
 */
export interface Movie extends Media, ParentInterface {
    /**
     * Some description on property
     * @link https://www.imdb.com/title/tt0111161/ Best film ever
     */
    title: string;
    /**
     * @type {Date}
     */
    year: number;
    rating?: number;
    director: MovieDirector;
    actors: string[];
    /**
     * @deprecated
     */
    any: any;
    /**
     * @default true
     */
    readonly isAvailable: boolean;

    // The following syntax is not supported yet
    // [key: string]: any;
}
