import numpy as np
from PIL import Image
from tensorflow.keras.preprocessing import image
 
# Load the image
img = Image.open('cat.png')
# Preprocess the image
img = img.resize((512, 512))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array[:, :, :3], axis=0)
img_array = img_array / 255.
 
# Load the model
model = unet_plus_plus_model(input_shape=(
    512, 512, 3), num_classes=2, deep_supervision=False)
 
# Make predictions
predictions = model.predict(img_array)
 
# Convert predictions to a numpy array and resize to original image size
predictions = np.squeeze(predictions, axis=0)
predictions = np.argmax(predictions, axis=-1)
predictions = Image.fromarray(np.uint8(predictions*255))
predictions = predictions.resize((img.width, img.height))
 
# Save the predicted image
predictions.save('predicted_image.jpg')
predictions