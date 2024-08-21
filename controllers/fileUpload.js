const File = require("../models/File");

//Route handler function for LocalFileUpload
exports.localFileUpload = async(req, res) => {
    try{
        //1->Fetching file from the request
        const file = req.files.file;
        console.log("This is the File -> ", file); //for checking purpose

        //2->Creating a path where file will be stored on the server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("This is the Path -> ", path); //for checking purpose

        //3->Adding path to the move function
        file.mv(path, (err)=>{
            console.log(err);
        });

        //4->Creating a successful response
        return res.json({
            success: true,
            messgae: "Local File Uploaded successfully",
        });
    }
    catch(err){
        console.log("Not able to upload the file on the server");
        console.log(err);
    }
}

//check whether the file type is supported or not
function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

//Function to upload file to Cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


//Route handler function for Image Upload
exports.imageUpload = async (req, res) => {
    try{
        //Fetch the data from the request body
        const { name, tags, email} = req.body;
        console.log(name,tags,email); //For checking purpose

        const file = req.files.imageFile;
        console.log(file); //For checking purpose 

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType); // For checking purpose

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format is not supported',
            })
        }

        //File format is supported!
        const response = await uploadFileToCloudinary(file, "SankarStorage");
        console.log(response);

        //Save the entry into the DataBase as well
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}


//Route handler function for Video Upload
exports.videoUpload = async (req, res) => {
    try{
        //Fetch the data from the request body
        const { name, tags, email} = req.body;
        console.log(name,tags,email); //For checking purpose

        const file = req.files.videoFile;
        console.log(file); //For checking purpose 

        //Validation
        const supportedTypes = ["mov", "mp4"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType); // For checking purpose

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format is not supported',
            })
        }

        //File format is supported!
        const response = await uploadFileToCloudinary(file, "SankarStorage");
        console.log(response);

        //Save the entry into the DataBase as well
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}


//ImageSize Reducer

exports.imageSizeReducer = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //TODO: add a upper limit of 5MB for Video
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported hai
        const response = await uploadFileToCloudinary(file, "Codehelp", 90);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
    }
}

