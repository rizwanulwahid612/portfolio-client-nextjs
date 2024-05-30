

const uploadImage = async (imageFile:any) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload?key=2b92c688a279f5335d17fe0e073e7281', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      return data.data.url; // Assuming imgbb returns the URL of the uploaded image
    } else {
      throw new Error(data.error.message || 'Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Propagate the error to handle it in your onSubmit function
  }
};


export default uploadImage