import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    return SecureStore.setItemAsync(key, value);
}

async function get(key) {
    return SecureStore.getItemAsync(key);
}

export { save, get };
