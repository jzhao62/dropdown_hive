cd ..
npm run build
cd build
aws s3 sync . s3://hiveaidemo --profile default