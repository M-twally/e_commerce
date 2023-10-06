import multer from "multer"


export const filevalidation = {
    image: ['image/jpeg', 'image/png'],
    file: ['application/pdf', 'application/msword']
};

export function fileUpload(validationfile=[]) {
    const storage = multer.diskStorage({
    });

    function fileFilter(req, file, cb) {
        console.log({filterfile:file})
        console.log(filevalidation)
        
        console.log(validationfile.includes(file.mimetype))
        if (validationfile.includes(file.mimetype)) {
            console.log("okkkkkkkkk")
            cb(null, true);
        } else {
            console.log("nooooooooo")
            cb(new Error("Error: Invalid Type"), false);
        }
    }
    const upload = multer({ fileFilter, storage });
    return upload;
}

