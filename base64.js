var fs = require('fs');

const args = process.argv.slice(2).map(a => ({
    key: a.split('=')[0],
    value: a.split('=')[1],
}));

const getArgValue = (key, type, defaultValue) => {
    const arg = args.find(a => a.key === key);
    if (arg) {
        if (type === 'boolean') {
            return arg.value === 'true';
        } else if (type === 'int') {
            return parseInt(arg.value, 10);
        }
        return arg.value;
    }
    return defaultValue;
};

const pathToImage = getArgValue('path');
if (!pathToImage) {
    console.error('No path to file specified. Please call this api with the key \'path\'=xxx, where xxx is a path to the image file that you want receive base64 string from.');
    return;
}

// function to encode file data to base64 encoded string
const base64_encode = (file) => {
    let result = '';
    console.log(`Reading file: ${file}`);
    try {
        // read binary data
        const bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        result = Buffer.from(bitmap).toString('base64');
    } catch (err) {
        // [ 'errno', 'syscall', 'code', 'path' ] - err object properties
        if (err.toString().indexOf('no such file or directory') !== -1) {
            console.error(`Image file not found. Please check path to the file: ${file}`);
        }
    }
    return result;
}

const base64ImageResult = base64_encode(pathToImage);
if (base64ImageResult) {
    console.log(base64ImageResult);
}
return base64ImageResult;
