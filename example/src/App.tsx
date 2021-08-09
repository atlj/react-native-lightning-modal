import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useBottomModal, BottomModal } from 'react-native-lightning-modal';

export default function App() {
  const { dismiss, show, modalProps } = useBottomModal();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <Text style={[styles.headingText, styles.header]}>Hi.👋</Text>
      <TouchableOpacity style={styles.button} onPress={show}>
        <Text style={styles.buttonText}>Show a lightning modal! ⚡</Text>
      </TouchableOpacity>
      <View style={styles.fill} />
      <BottomModal backdropColor="rgba(0,0,0,0.5)" height={300} {...modalProps}>
        <View style={styles.modalContainer}>
          <Text style={[styles.headingText, styles.header]}>I’m alive!</Text>
          <TouchableOpacity style={styles.buttonSecondary} onPress={dismiss}>
            <Text style={styles.buttonText}>Hide me ⛅</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headingText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 50,
  },
  header: { marginBottom: 30 },
  fill: { flex: 1 / 6 },
  button: {
    backgroundColor: '#F7FFDF',
    borderRadius: 10,
    padding: 6,
  },
  buttonSecondary: {
    backgroundColor: '#D9F6FF',
    borderRadius: 10,
    padding: 8,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
