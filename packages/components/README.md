# @ts2doc/components

This package contains the components used by the [@ts2doc/storybook-addon](https://www.npmjs.com/package/@ts2doc/storybook-addon) package.

See @ts2doc [documentation](https://github.com/jpiazzal/ts2doc).

## Example

![Interface example](https://github.com/jpiazzal/ts2doc/blob/main/docs/images/interface-example.png?raw=true)

Is displayed from the following TypeScript interface:

```ts
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
```
