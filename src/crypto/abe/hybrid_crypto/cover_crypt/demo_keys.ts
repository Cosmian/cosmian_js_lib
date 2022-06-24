
import { hexDecode } from "../../../../utils/utils"
import { DemoKeys } from "../demo_hybrid_crypto"


export class CoverCryptDemoKeys extends DemoKeys {
  constructor() {
    super(CoverCryptDemoKeys.policy, CoverCryptDemoKeys.publicKey, CoverCryptDemoKeys.masterPrivateKey, CoverCryptDemoKeys.topSecretMkgFinUser, CoverCryptDemoKeys.mediumSecretMkgUser, CoverCryptDemoKeys.plaintext, CoverCryptDemoKeys.uid, CoverCryptDemoKeys.encryptedData)
  }

  // {"last_attribute_value":10,"max_attribute_value":100,"store":{"Security Level":[["Protected","Low Secret","Medium Secret","High Secret","Top Secret"],true],"Department":[["R&D","HR","MKG","FIN"],false]},"attribute_to_int":{"Security Level::Low Secret":[2],"Department::MKG":[8],"Security Level::Medium Secret":[3],"Security Level::Top Secret":[5],"Security Level::Protected":[1],"Department::FIN":[10,9],"Department::HR":[7],"Department::R&D":[6],"Security Level::High Secret":[4]}}
  static policy = hexDecode('7b226c6173745f6174747269627574655f76616c7565223a31302c226d61785f6174747269627574655f76616c7565223a3130302c2273746f7265223a7b225365637572697479204c6576656c223a5b5b2250726f746563746564222c224c6f7720536563726574222c224d656469756d20536563726574222c224869676820536563726574222c22546f7020536563726574225d2c747275655d2c224465706172746d656e74223a5b5b22522644222c224852222c224d4b47222c2246494e225d2c66616c73655d7d2c226174747269627574655f746f5f696e74223a7b225365637572697479204c6576656c3a3a4c6f7720536563726574223a5b325d2c224465706172746d656e743a3a4d4b47223a5b385d2c225365637572697479204c6576656c3a3a4d656469756d20536563726574223a5b335d2c225365637572697479204c6576656c3a3a546f7020536563726574223a5b355d2c225365637572697479204c6576656c3a3a50726f746563746564223a5b315d2c224465706172746d656e743a3a46494e223a5b31302c395d2c224465706172746d656e743a3a4852223a5b375d2c224465706172746d656e743a3a522644223a5b365d2c225365637572697479204c6576656c3a3a4869676820536563726574223a5b345d7d7d')

  static publicKey = hexDecode('0205062054516aacba1dc61311f2255562bbedeaaf0c03d396ed905f2081b3700dc4de4402020720f6d25b0ead4e258f68b4be2ec8537a2811513471fb6100cbb92299924171bb0e02010620485252ca07511258c5827cf80b9deb79bc5d10bf13125bf66568e395f72558710204082082ea461c3479f79a64de1f7047c0ff3add60bb63dfc228f8d5bf983bb447f14802020820cc6394f7f9fb21f4c3de989d15a5fa1b9626d261bda84185d2a19e821f88010f02020a20ac188013ff20e01404239f3ab1407c9fb48c0b564c946ac52d7bd03740277c4302050920e826596248d81644c13303babe541e6f82d0e42481400b9ca9afb8a62ab23c2902040720a63a1d72aed1e631f623f2ba3d3b73ee311fda838eb4b60e629450bec1e8ce1202020920667bc40f64cb8f1ef25fb5ac8d7f0b7d1d16171d54bed093c6eea349c9348c1102040a208e3d1bbf9d9ce5170ad62c29aa77f510c659d617f827a05eacfccd9e7b47331b0204062016e09ea3d1b7f2716b30985aa1ca29761b73533db83f9dca7e9b99dc23b2153302030a203cbb5afe04ec2bfef72e420931474e146c0cf5218affb935367dc6fb1813b46002010720a4e9e0b1c233b9450224f6c1844611b221c5aaf62bed13881cf6edfcb2ecb60f02040920e658bd5ec07c51a04bdc8deadcd778017ca5708da7d93fce6ca9419a12c5ef12020108204ae5a74bdb7af4d8fbda9f3664459b68b44421bee3ccc3a7053f541266670e33020308201a1e4c33ceaac913ba885934045d7f5158035279231a9f6cb082e554c508c714020307207ab359c340ed7878f88ba81a7b3d5883c8b8b215e1fcbae2864efc537ea9220702050a20c42597f79aff6aef3346f69eb06eea295ae6de22008ee80b68db9f82459cb34302020620e47c6e351ba9d7d34054c630ba0a5ab14d046c834eb77a9ba2531ab7db805072020507207eff46eabb60795e311a0aa0b68b20429996421a1f3ec29e57882931b3a05149020109209a03c45a2a80056a7d1db4b41ca3b854f3ed284b5472a8f3128a1eb3eff6bb3a02030620aa58de3716ef74057c6b994f70c02b3539c2471800e3af2fe02a6b6381462774020309203e6c442f9ad202f846261b2cec53da4b221b8fbedd2c5c9cf5bc18e8abc38e0802010a2088bc8cec059d0ae04a3a9197d3b9710db54927b424e5b5bff45571a34fd58a5a02050820ea1c459fa3783c8da9d051fc15a4fac219bc2ecfd58a47353a139b85860c461400')

  static masterPrivateKey = hexDecode('02010a20dcdce54c6d3aa7d38c79108c58573a405a7ed21d3a148ac8a7ff38d8d1872a0d02050720a2b787dfff9ff7223681fccffe1596218bcbab041b0679922b2d792f9f14af08020209208629761487e41568c28c288525970e27194b242a7501cf887e9318a05b6f420a0205092097db19c9af2eb1b2912d5bf3bfa8ae787c09f00990e983bb4b1448507388200a02040a20a6a0c2eb17a362ef6d5de80b398ceb2a89edc4e72a8a340b6249f698c8799f0a02050620139c4aa755b4759eed3eb8db7a83fd48de6a830c86153ef66e145b7d3e6b200802030720c6d60dd0aafef136e5da13bfcaad5dd30d4defdb3f07993cb5e7f7e6db5066040204092076a90c9adb9ad469b45273ab0d552f3eee5ca20e26a9531c0abe12dc9f7cab030204082065f61a3f9c9d278e766aa370e3354ba6b06e88770422fe27e245cb8120fb0806020508207b207c4e0536ecb4593c432c6be5d469c821c1061961cbae48a858e304fc5a0002020620ad3c8d26ae6b4be15ed7347b4b7d01fef25fe725fd083d388f43cc6df14f410a02050a2049c4c0559242806b0635374b0c39bb3902940387828287f2ffa89d7eb36c180c02020820de4e37fe7a204eca58098a29921773c79c08ac653db50da971cad2b295f71d0502030620834413358b8408084125694bfc44569c0c4cb171470ed6de68e085cfdb0f030002010620ddefbe3a9a52f863356f2e6874a4fc7d18f0bc056ab3da3b993a4fc364d7430502040620dcc1635c166c623b075eba64e1aad7eeefd4326f0418db6fbad7ca2916968c0802020a20a6b6364a1c4da0af2f966153770426b76acb28f823da0e50f832d32bf9910e080201082090d769446d7adb1c4d5b6320cb94dcda867f69f3d60e870c6fda010bb443cf0902020720288b00e4aea9728c8a2a0a3889bce44b2875c954f8dfdeafb02a57143ac2f400020107201b150453da960818ace969cfd3b61cd3c745d01c8960b389e08fc1b613f22107020308200ac3b39239bb0e662fe76f368245f512beb40e3ed83e0b34bbe9f069267e8a0e020109202fbe307472f8d3adf9a65b48b1c46b6442dabd7b074f58c93eaaa472e75bb003020309204caba264e307820842bc75c70d6f39f88e6cd522ef7965fd12648e5e2c471a03020407208ebba31775a2fdc0a33013d8661a24229e24d5b4cabb78ff77181bcfb2fd170102030a208b1ad12d2798f20ae1f84d290027383b05eec6a92841eb76ea9e8af76666540700')

  static topSecretMkgFinUserAccessPolicy = "Security Level::Top Secret && (Department::MKG || Department::FIN)"
  static topSecretMkgFinUser = hexDecode('02050a2049c4c0559242806b0635374b0c39bb3902940387828287f2ffa89d7eb36c180c020109202fbe307472f8d3adf9a65b48b1c46b6442dabd7b074f58c93eaaa472e75bb00302040a20a6a0c2eb17a362ef6d5de80b398ceb2a89edc4e72a8a340b6249f698c8799f0a020209208629761487e41568c28c288525970e27194b242a7501cf887e9318a05b6f420a02020820de4e37fe7a204eca58098a29921773c79c08ac653db50da971cad2b295f71d0502010a20dcdce54c6d3aa7d38c79108c58573a405a7ed21d3a148ac8a7ff38d8d1872a0d020308200ac3b39239bb0e662fe76f368245f512beb40e3ed83e0b34bbe9f069267e8a0e020508207b207c4e0536ecb4593c432c6be5d469c821c1061961cbae48a858e304fc5a0002020a20a6b6364a1c4da0af2f966153770426b76acb28f823da0e50f832d32bf9910e080201082090d769446d7adb1c4d5b6320cb94dcda867f69f3d60e870c6fda010bb443cf090204082065f61a3f9c9d278e766aa370e3354ba6b06e88770422fe27e245cb8120fb0806020309204caba264e307820842bc75c70d6f39f88e6cd522ef7965fd12648e5e2c471a0302030a208b1ad12d2798f20ae1f84d290027383b05eec6a92841eb76ea9e8af7666654070205092097db19c9af2eb1b2912d5bf3bfa8ae787c09f00990e983bb4b1448507388200a0204092076a90c9adb9ad469b45273ab0d552f3eee5ca20e26a9531c0abe12dc9f7cab0300')

  // User decryption key with access policy: "Security Level::Medium Secret && Department::MKG"
  static mediumSecretMkgUserAccessPolicy = "Security Level::Medium Secret && Department::MKG"
  static mediumSecretMkgUser = hexDecode('02020820de4e37fe7a204eca58098a29921773c79c08ac653db50da971cad2b295f71d050201082090d769446d7adb1c4d5b6320cb94dcda867f69f3d60e870c6fda010bb443cf09020308200ac3b39239bb0e662fe76f368245f512beb40e3ed83e0b34bbe9f069267e8a0e00')

  // The UID param is an integrity parameter both used in ABE header readonlyruction and AES-GCM-ciphertext generation
  static uid = hexDecode('00000001')

  // Plaintext example is: My secret message
  static plaintext = hexDecode('4d7920736563726574206d657373616765')

  // Hybrid encrypted data: ABE attributes are ['Security Level::Low Secret', 'Department::HR', 'Department::FIN']
  static encryptedData = hexDecode('000000b30000008b02020a20a721a54fc8840d4bd0e1134e3ac6d0b3ebeae813b0ffe6e89c873f80679a74812070a6878d6466381a43536ae49e6dba7b8f3d06cb4c2ae64e90f4eafd89ad6d4302020720aa11af8208aa967023efe21aacf41875d74654800e8e583f555bb6fff457d1292066d29e34af17753b5e9f82254fb9c0405abd29704e31836e7064fbd9434e1d2400bd4d843e3246405c1f044592e2904fdd7ac5d3024067229f68f1307424eb2e263f3bfeaf8b60be439010a12c0f145303b30a6aa31b2482e678f497cc9424af46216fe42ddbf219b4c15e72fa284a05163a')
}
