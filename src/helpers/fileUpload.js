

export const fileUpload = async ( file ) => {

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/de5je9zc4/upload';

    const formData = new FormData();
    formData.append('upload_preset','journal-app-react17');
    formData.append('file', file );

    try {

        const resp = await fetch( cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudinaryResp = await resp.json();
            return cloudinaryResp.secure_url;
        } else {
            throw await resp.json();
        }
        
    } catch (error) {
        throw error;
    }

}