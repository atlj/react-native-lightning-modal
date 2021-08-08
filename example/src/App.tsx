import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useBottomModal, BottomModal } from 'react-native-lightning-modal';

export default function App() {
  const { dismiss, show, modalProps } = useBottomModal();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={show}>
        <Text>show</Text>
      </TouchableOpacity>
      <BottomModal height={500} {...modalProps}>
        <TouchableOpacity onPress={dismiss}>
          <Text>dismiss</Text>
        </TouchableOpacity>
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
