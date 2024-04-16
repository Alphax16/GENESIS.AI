import cloudinary from "cloudinary";

// Initialize Cloudinary with your Cloudinary credentials
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary with options for folder and file names
const uploadFileToCloudinary = async (
	file: File,
	folderName?: string,
	fileName?: string
): Promise<string> => {
	const mainFolder = "GENESIS_AI";
	const folderPath = folderName ? `${mainFolder}/${folderName}` : mainFolder;

	const options: cloudinary.UploadApiOptions = { resource_type: "auto" };

	if (folderName) {
		options.folder = folderPath;
	}

	if (fileName) {
		options.public_id = fileName;
	}

	// Read file contents as a buffer
	const fileReader = new FileReader();
	fileReader.readAsArrayBuffer(file);

	return new Promise((resolve, reject) => {
		fileReader.onload = () => {
			const buffer = fileReader.result as ArrayBuffer;
			cloudinary.v2.uploader
				.upload_stream(options, (error, result) => {
					if (error) {
						reject(error);
					} else {
						if (result && result.secure_url) {
							resolve(result.secure_url);
						} else {
							reject(
								new Error(
									"Cloudinary upload result is undefined or missing secure_url"
								)
							);
						}
					}
				})
				.end(buffer);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

// Function to download a file from Cloudinary
const downloadFileFromCloudinary = async (
	fileUrl: string,
	folderPath?: string
): Promise<Blob> => {
	// Construct the full URL with folder path if provided
	const fullUrl = folderPath ? `${fileUrl}/${folderPath}` : fileUrl;

	return new Promise((resolve, reject) => {
		fetch(fullUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.blob();
			})
			.then((blob) => resolve(blob))
			.catch((error) => reject(error));
	});
};

export { uploadFileToCloudinary, downloadFileFromCloudinary };
