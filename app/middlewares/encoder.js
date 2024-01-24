const crypto = require("crypto-js")
const key = 'VUMAP@1234'
exports.encode = async (dataToEncode) => {
    try {
      let data = dataToEncode
      const encrypted = crypto.AES.encrypt(JSON.stringify(data), key).toString();
      return encrypted;
    } catch (error) {
      console.error(error);
    }
    };

    exports.decode = async (dataToDecode,key,res) => {
      try {
        let data = dataToDecode
        const decrypted = crypto.AES.decrypt(data, key)
        data = crypto.enc.Utf8.stringify(decrypted)
        console.log("decrypted", JSON.parse(data))
        return JSON.parse(data);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error });
      }
      };
