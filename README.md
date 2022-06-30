# reveni-js-sdk

[![npm version](https://badge.fury.io/js/reveni-js-sdk.svg)](https://badge.fury.io/js/reveni-js-sdk)
![tests and linter](https://github.com/reveni-io/reveni-js-sdk/actions/workflows/main.yml/badge.svg)

## Setup

You can use a script tag to load reveni-js-sdk or use npm package.

### Using npm package

```
npm install reveni-js-sdk
```

```jsx
import reveni from 'reveni-js-sdk'

function App() {
  const open = () => {
    reveni.init('orderId', 'returnId', 'token', '#reveni')
  }

  return (
    <div className="App">
      <button onClick={open}>Open iframe</button>
      <div id="reveni"></div>
    </div>
  )
}

export default App
```

### Using script tag

```html
<script src="https://cdn.reveni.io/public/js-sdk/reveni-js-sdk.js"></script>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.reveni.io/public/js-sdk/reveni-js-sdk.js"></script>
    <script>
      function instantRefund() {
        reveni.init('test', 'test', 'token', '#div')
      }
    </script>
  </head>
  <body>
    <button onClick="instantRefund()">Open iframe</button>
    <div id="div"></div>
  </body>
</html>
```

### Set arguments in script query parameters

```html
'
<script src="https://cdn.reveni.io/public/js-sdk/reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>
'
```

### Try in sandbox enviroment

```js
reveni.init('test', 'test', 'token', '#div', true)
```

## Parameters

| Property        | Description                          | Example                                                       |
| --------------- | ------------------------------------ | ------------------------------------------------------------- |
| returnId        | Return id                            | a3a7640d671c4cde8adff13560e25f7b                              |
| orderId         | Order id                             | a3a7640d671c4cde8adff13560e25f7b                              |
| token           | Token to authenticate a user         | eyJ0eXAiOiJKV1Q.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwifQ.vWXQ2gwzuM |
| elementSelector | CSS selector to render reveni iframe | #reveni                                                       |
| sandbox         | Use sandbox environment              | true or false. By default is false                            |
