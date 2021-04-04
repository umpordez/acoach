import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    return SecureStore.setItemAsync(key, value);
}

async function get(key) {
    return SecureStore.getItemAsync(key);
}

async function clear() {
    await SecureStore.deleteItemAsync('jwtToken');
    await SecureStore.deleteItemAsync('user');
    await SecureStore.deleteItemAsync('account');
    await SecureStore.deleteItemAsync('role');
}

export { clear, save, get };
