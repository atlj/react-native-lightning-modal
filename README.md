# react-native-lightning-modal

![2021-08-09 17-32-38](https://user-images.githubusercontent.com/23079646/128723844-c7317cf3-6d28-4d60-a6ac-5c1c108a4a50.gif)

A fast bottom modal that works with React Native Reanimated 2!

## Prerequisites

This module needs

[React Native Reanimated 2](https://docs.swmansion.com/react-native-reanimated/docs/installation) &

[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) to work

## 🚀 Installation

First make sure that you have installed all the prerequisites.

### Using npm

```sh

npm install react-native-lightning-modal

```

### Using Yarn

```sh

yarn add react-native-lightning-modal

```

## ⚙️ Usage

### Using the useBottomModal hook 🪝

> This hook declares the ref for you

```js
import React from 'react';

import { View } from 'react-native';

import { useBottomModal, BottomModal } from 'react-native-lightning-modal';

export default function App() {
  const { dismiss, show, modalProps } = useBottomModal();

  return (
    <View>
      <BottomModal height={500} {...modalProps}>
        {/* Your Content */}
      </BottomModal>
    </View>
  );
}
```

> Bottom modal component needs to be below other elements.

You can then use

```js
show();
```

to show the modal

---

### Using a ref 📝

```js
import React from 'react';

import { View } from 'react-native';

import { BottomModal, BottomModalRef } from 'react-native-lightning-modal';

export default function App() {
  const bottomModalRef = React.useRef < BottomModalRef > null;

  return (
    <View>
      <BottomModal height={500} ref={bottomModalRef}>
        {/* Your Content */}
      </BottomModal>
    </View>
  );
}
```

You can than use

```js
bottomModalRef.show();
```

to show the modal

## DOCUMENTATION

### PROPS

| Prop Name         | Description                                                                           |            Type             | Required |                            Defaults to |
| ----------------- | ------------------------------------------------------------------------------------- | :-------------------------: | :------: | -------------------------------------: |
| **height**        | Height of modal's presented state. This is required for animation to behave correctly |          _number_           |    ✅    |                                     ❌ |
| **backdropColor** | Basically the color of a fullscreen view displayed below modaL                        |          _string_           |    ❌    |                            `undefined` |
| **style**         | Style of modal's container                                                            |         _ViewStyle_         |    ❌    |                            `undefined` |
| **animation**     | Animation type to use, can get spring and timing, defaults to timing animation        |   _'spring' \| 'timing'_    |    ❌    |                             `'timing'` |
| **timingConfig**  | Timing animation's config if animation prop is set to 'timing'                        | _Animated.WithTimingConfig_ |    ❌    | `{duration: 300, easing: Easing.quad}` |
| **springConfig**  | Spring animation's config if animation prop is set to 'spring'                        | _Animated.WithSpringConfig_ |    ❌    |                            `undefined` |
| **backdropStyle** | Style of the backdrop component                                                       |         _ViewStyle_         |    ❌    |                            `undefined` |

## ➕ Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📰 License

MIT
