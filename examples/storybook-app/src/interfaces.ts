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
     * The date of birth of the actor
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
     * The date of birth of the director
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

export interface Movie {
    /**
     * The title of the movie
     */
    title: string;
    /**
     * The year the movie was released
     */
    year: number;
    /**
     * The rating of the movie
     */
    rating?: number;
    /**
     * The genres of the movie
     */
    genres: string[];
    /**
     * The actors in the movie
     */
    cast: Actor[];
    /**
     * The director of the movie
     */
    director: Director;
}
