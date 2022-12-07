# @ts2doc/storybook-addon

Storybook addon to document exported declarations from ts files

## Installation

### Yarn

```sh
yarn add -D @ts2doc/storybook-addon
```

### NPM

```sh
npm install --save-dev @ts2doc/storybook-addon
```

## Example

Given the following TypeScript interface:

```ts
/**
 * A movie
 */
export interface Movie {
    readonly title: string;
    rating?: number;
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
```

Will be displayed as:

![Interface example](https://github.com/jpiazzal/ts2doc/blob/main/docs/images/interface-example.png?raw=true)

## Usage

See @ts2doc [documentation](https://github.com/jpiazzal/ts2doc).
