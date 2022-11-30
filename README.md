# ts2doc

Parse exported declarations from typescript files into object, for documentation.

## Usage

```js
const { ts2doc } = require('ts2doc');

const doc = ts2doc(['path/to/file.ts']);
```

### API

```ts
ts2doc(filesPath: string[], options?: ts.CompilerOptions): Declaration[]
```

`options` is optional, and will be passed to typescript compiler. See [typescript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more details.

## Examples

```ts
// Movie.ts
export interface Movie {
    title: string;
    year: number;
    actors: string[];
}
```

Will be parsed into:

```js
[
    {
        name: 'Movie',
        type: 'interface',
        props: [
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'year',
                type: 'number'
            },
            {
                name: 'actors',
                type: 'string[]'
            }
        ]
    }
];
```

More examples can be found in [examples](./examples).

## License

MIT
