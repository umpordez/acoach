# Code Standards for our app ;)

Here are basic guidelines to keep our ecosystem healthy

### While coding
- Class as PascalCase
- Variables and functions as camelCase
- Max Column 80 (this can be broken when writing react/html since the things can go wild)
- Save spaces instead of tabs in source code
- Indentation is 4 spaces
- Space between arguments in a function call
- Start method names with a verb (try to be as clear as possible)
- Prefer clear and verbose names than simple names.
- Prefer simplicity over complexity
- Keep an eye on `eslint` errors and React warnings
- Make test cases as often as possible and test the functionality and sanity checks
- Use `()` around arguments in function calls, this is easier to identify and found arguments.


### While adding new modules to package.json
- *always* read the `package.json` of a dependency, we want to keep the lowest
dependency with other modules as possible, so if you want to add a depedency
that add another 20 things, make sure you really, really need that.
- Prefer library over frameworks, module over library, simple code over module.
- Don't add a dependency to a function of 3 lines (like the dead
[leftpad](https://github.com/left-pad/left-pad/blob/master/index.js)), prefer to
write your own if is a thing that simple, we want to create an `utils.js` with
some common functions we use over our app (cpf format, phone number prettify).

Simple things that are better handwritten and have more flexibility.
