window.onload = function() {
    
    document.getElementById('btnTakePic').addEventListener('click',takePic);
}

function takePic(e)
        {
            var options = {
                quality: 80,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                targetWidth: 500,
                targetHeight: 300
        
            }
        
         navigator.camera.getPicture(success,fail, options);
        }
            
        function success(thePicture)
        {
            var image = thePicture;
            console.log(image);
        }
            
        function fail(e)
        {
            alert("Image failed: " + e.message);
        }