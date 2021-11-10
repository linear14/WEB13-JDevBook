import AWS from 'aws-sdk';
const storage = require('../config/objectstorage.json');

const endpoint: AWS.Endpoint = new AWS.Endpoint(storage.url);
const url: string = storage.url;
const region: string = storage.region;
const access_key: string = storage.access_key;
const secret_key: string = storage.secret_key;

const S3 = new AWS.S3({
  endpoint: url,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key
  }
});

const objectStorage = {
  makeBucket: async (bucket_name: string) => {
    await S3.createBucket({
      Bucket: bucket_name,
      CreateBucketConfiguration: {}
    }).promise();
  }
};

export default objectStorage;

//(async () => await objectStorage.makeBucket('jdevbook2'))();
