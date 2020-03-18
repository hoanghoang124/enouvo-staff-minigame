import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadFileService {
  FOLDER = '';

  constructor() {}

  uploadfile(file) {
    const bucket = new S3({
      accessKeyId: 'AKIAJTX2Q3I6SY4BT4RA',
      secretAccessKey: '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',
      region: 'ap-southeast-1'
    });

    const params = {
      Bucket: 'staff-avatar',
      Key: this.FOLDER + file.name,
      Body: file
    };

    bucket.upload(params, function(err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log(Object.values(data)[0]);
      return true;
    });
  }
}
