const assert = require("assert");
const Recrypt = require("@ironcorelabs/recrypt-node-binding");

// Methods that are changed have NoSign postfix, not stuck to this naming though

//Create a new Recrypt API instance
const Api256 = new Recrypt.Api256();

//Generate a user key pair
const userKeys = Api256.generateKeyPair();

//Generate a plaintext to encrypt
const plaintext = Api256.generatePlaintext();

//Encrypt the data to the user public key
const encryptedValue = Api256.encryptNoSign(plaintext, userKeys.publicKey);

//Generate a second public/private key pair as the target of the transform. This will allow the encrypted data to be
//transformed to this second key pair and allow it to be decrypted.
const deviceKeys = Api256.generateKeyPair();

//Generate a transform key from the user private key to the device public key
const userToDeviceTransformKey = Api256.generateTransformKeyNoSign(userKeys.privateKey, deviceKeys.publicKey);

//Transform the encrypted data (without decrypting it!) so that it can be decrypted with the second key pair
const transformedEncryptedValue = Api256.transformNoSign(encryptedValue, userToDeviceTransformKey);

//Decrypt the data using the second private key
const decryptedValue = Api256.decryptNoSign(transformedEncryptedValue, deviceKeys.privateKey);

if (decryptedValue.toString() === plaintext.toString()) {
  console.log("Things work")
} else {
  console.log("Things dont work")
}
