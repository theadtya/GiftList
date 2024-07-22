const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree= new MerkleTree(niceList);
  const root= merkleTree.getRoot();
  console.log(root)

  const name= "Anna Stehr";
  const index= niceList.findIndex(x=>x==name);
  const proof= merkleTree.getProof(index)

  console.log(verifyProof(proof,name,root))

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
      name,
      proof
  });

  console.log({ gift });
}

main();