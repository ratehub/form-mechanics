# Form stuff

## Layered approach

### Input component layer

- props that an input component must implement to work with the system
- two static methods: `validate` and `isEmpty`
- actual UI components are out of scope for this repo

exports:
- `inputProps(raw, clean, inputProps) -> proptypes`


### Context layer

- <Form> and <Input> components that link data across a component tree
- decorators for injecting stuff out of context where needed

exports:
- `


### State layer

- vanilla component state, mobx-state-tree, or redux adapters that work with the lower-level APIs to move data around

MST exports (at `form-mechanics/dist/mst`)
- `formModel`



### Data formats

#### Input values

```ts
  { state: VALID, cleanValue: T }
| { state: INVALID, reason: string }
| { state: VALIDATING }
```

#### Form values

```ts
raw: { fieldName: rawType }  // always available, useful for serialization
clean: { state: VALID, cleanVaue: { field: cleanType } }
     | { state: INVALID, reason: { field: string } }
     | { state: VALIDATING }
```
