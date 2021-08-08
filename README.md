# react-native-lightning-modal

![ezgif-2-f1e49a739730](https://user-images.githubusercontent.com/23079646/128644357-fc82ba9f-fa32-44eb-92cd-36b3486c9acb.gif)


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

>This hook declares the ref for you

```js
import React from 'react';
import { View } from 'react-native';

import { useBottomModal, BottomModal } from 'react-native-lightning-modal';

export default function App() {
  const { dismiss, show, modalProps } = useBottomModal();
  return (
    <View>
      <BottomModal  height={500} {...modalProps}>
        {/* Your Content */}
      </BottomModal>
    </View>
  );
}
```

>Bottom modal component needs to be below other elements.

You can then use

```js
show()
```

to show the modal

---

### Using a ref 📝

```js
import React from 'react';
import { View } from 'react-native';

import { BottomModal, BottomModalRef } from 'react-native-lightning-modal';

export default function App() {
  const bottomModalRef = React.useRef<BottomModalRef>(null);
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
bottomModalRef.show()
```

to show the modal

## DOCUMENTATION

### PROPS

|Prop name | Description| Type | Required
| ----------- | ----------- | ----------- | ----------- |
|height |Height of modal's presented state. This is required for animation to behave correctly | number | ✅ |
| backdropColor | Basically the color of a fullscreen view displayed below modaL | string | ❌ |
|style | Style of modal's container | ViewStyle | ❌ |
| easing | Easing function which modal will be presented. | Animated.EasingFunction | ❌ |
| duration | Modal animation's duration in milliseconds. | number | ❌ |

## ➕ Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📰 License

MIT
