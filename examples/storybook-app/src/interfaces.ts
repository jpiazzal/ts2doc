interface Media {
    id: number;
}

export interface Actor {
    /**
     * The name of the actor
     */
    name: string;
    /**
     * The age of the actor
     */
    age: number;
    /**
     * @deprecated
     */
    birthDate: Date;
    /**
     * The place of birth of the actor
     */
    birthPlace?: string;
    /**
     * The roles the actor has played
     */
    roles: string[];
}

/**
 * @link https://wikipedia.org/wiki/Film_Director
 */
export interface Director {
    /**
     * The name of the director
     */
    name: string;
    /**
     * The age of the director
     */
    age: number;
    /**
     * @deprecated
     */
    birthDate: Date;
    /**
     * The place of birth of the director
     */
    birthPlace?: string;
    /**
     * The movies the director has directed
     */
    movies: Movie[];
}

/**
 * A movie is a piece of media that is intended to be viewed as a film.
 * @link https://wikipedia.org/wiki/Film | Useful link
 */
export interface Movie extends Media {
    /**
     * The title of the movie
     */
    readonly title: string;
    /**
     * The year the movie was released
     * @type {Date}
     */
    year: number;
    /**
     * The rating of the movie
     * @link https://wikipedia.org/wiki/Film_rating_system Film rating system
     * @default 0
     */
    rating?: number;
    genres: string[];
    /**
     * The actors in the movie
     */
    cast: Actor[];
    /**
     * @deprecated
     */
    director: Director;
}
