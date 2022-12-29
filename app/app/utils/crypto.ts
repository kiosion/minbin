// Utils for handling local encryption / decryption of data

/**
 * Encrypt using Crypto web API
 * @param data Data to encrypt
 * @returns Promise containing the encrypted data and the key used to decrypt it
 */
const encrypt = async (
  data: string
): Promise<{ data: string; key: string }> => {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(data);
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encoded
    );
    const encryptedData = new Uint8Array(encrypted);
    const encryptedString = btoa(String.fromCharCode(...encryptedData));
    const keyString = btoa(
      String.fromCharCode(
        ...new Uint8Array(await window.crypto.subtle.exportKey('raw', key))
      )
    );
    return {
      data: encryptedString,
      key: `${keyString}:${btoa(String.fromCharCode(...iv))}`
    };
  } catch (err: unknown) {
    console.error(`[Crypto] Error while encrypting: `, err);
    return Promise.reject();
  }
};

/**
 * Decrypt using Crypto web API
 * @param data Data to decrypt
 * @param key Key and IV used for decryption
 * @returns Promise containing the decrypted data as string
 */
const decrypt = async (data: string, key: string): Promise<string> => {
  try {
    const decoded = atob(data);

    let [decodedKey, decodedIV] = key.split(':');

    if (!decodedKey || !decodedIV) {
      throw new Error('[Crypto] Invalid key provided');
    }

    decodedKey = atob(decodedKey);
    decodedIV = atob(decodedIV);

    const importedKey = await window.crypto.subtle.importKey(
      'raw',
      new Uint8Array(decodedKey.split('').map((c) => c.charCodeAt(0))),
      {
        name: 'AES-GCM'
      },
      true,
      ['encrypt', 'decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(decodedIV.split('').map((c) => c.charCodeAt(0)))
      },
      importedKey,
      new Uint8Array(decoded.split('').map((c) => c.charCodeAt(0)))
    );
    return new TextDecoder().decode(decrypted);
  } catch (err: unknown) {
    console.error(`[Crypto] Error while decrypting: `, err);
    return Promise.reject();
  }
};

export { encrypt, decrypt };
