import AWS from 'aws-sdk';
import fs from 'fs';
const storage = require('../config/objectstorage.json');

//const endpoint: AWS.Endpoint = new AWS.Endpoint(storage.url);
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
  },
  getBucketlist: async () => {
    // { Name: ~, CreationDate: ~}
    const { Buckets } = await S3.listBuckets().promise();
    return Buckets;
  },
  deleteBucket: async (bucket_name: string) => {
    await S3.deleteBucket({
      Bucket: bucket_name
    }).promise();
  },
  uploadObjectfolder: async (object_name: string, bucket_name = 'jdevbook') => {
    // object_name = 'sample-folder/'
    if (object_name[object_name.length - 1] !== '/')
      object_name = object_name + '/';

    await S3.putObject({
      Bucket: bucket_name,
      Key: object_name
    }).promise();
  },
  uploadObjectfile: async (
    object_name: string,
    local_file_path: string,
    bucket_name = 'jdevbook'
  ) => {
    // object_name = 'sample-object'
    // local_file_path = '/tmp/test.txt'
    // 덮어쓰기 가능
    await S3.putObject({
      Bucket: bucket_name,
      Key: object_name,
      ACL: 'public-read', // console.ncloud에서 보기 가능
      Body: fs.createReadStream(local_file_path)
    }).promise();
  }
};

export default objectStorage;

//(async () => await objectStorage.makeBucket('jdevbook2'))();
//(async () => console.log(await objectStorage.getBucketlist()))();
//(async () => await objectStorage.deleteBucket('jdevbook2'))();
//(async () => await objectStorage.uploadObjectfolder('test4'))();
// (async () =>
//   await objectStorage.uploadObjectfile(
//     'testfile.png',
//     '../models/erd-workbench.png'
//   ))();
