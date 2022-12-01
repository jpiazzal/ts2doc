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

/**
 * Interface description
 */
export interface Movie {
    /**
     * Property description
     */
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
        kind: 'interface',
        description: 'Interface description',
        props: [
            {
                name: 'title',
                kind: 'prop',
                type: 'string',
                description: 'Property description'
            },
            {
                name: 'year',
                kind: 'prop',
                type: 'number',
                description: ''
            },
            {
                name: 'actors',
                kind: 'prop',
                type: 'string[]',
                description: ''
            }
        ]
    }
];
```

More examples can be found in [examples](./examples).

## Supported declarations

| Declaration | Supported |
| ----------- | --------- |
| `variable`  | ✅        |
| `interface` | ✅        |
| `function`  | ❌        |
| `type`      | ❌        |
| `enum`      | ❌        |
| `class`     | ❌        |
| `namespace` | ❌        |

## License

Distributed under the `MIT` License. See `LICENSE` file for more information.
