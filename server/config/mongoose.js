const mongoose = require('mongoose');
const AWS = require('aws-sdk');

// Configure AWS SDK to use the default credentials provider chain
AWS.config.update({ region: 'ap-south-1' });

const ssm = new AWS.SSM();

async function getParameterValue(parameterName) {
  const params = {
    Name: parameterName,
    WithDecryption: true // Retrieve the parameter with decryption for SecureString
  };

  try {
    const result = await ssm.getParameter(params).promise();
    return result.Parameter.Value;
  } catch (err) {
    throw new Error(`Error fetching parameter ${parameterName} from AWS SSM: ${err.message}`);
  }
}

async function main() {
  try {
    // Fetch the secure string from AWS SSM
    const mongoUrl = await getParameterValue('/mongo_url');

    // Connect to MongoDB using the retrieved secure string
    await mongoose.connect(mongoUrl);
    console.log(`Connected to db`);
  } catch (err) {
    console.log(`Error in connecting to db: ${err}`);
  }
}

main();