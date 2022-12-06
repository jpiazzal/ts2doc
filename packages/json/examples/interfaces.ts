/**
 * This interface will be ignore because it is not exported.
 */
interface MovieDirector {
    name: string;
    age: number;
}

/**
 * Some description on interface
 */
export interface Movie {
    /**
     * Some description on property
     */
    title: string;
    year: number;
    rating?: number;
    director: MovieDirector;
    actors: string[];
    any: any;
    readonly isAvailable: boolean;

    // The following syntax is not supported
    // [key: string]: any;
}
