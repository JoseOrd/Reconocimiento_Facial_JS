
//var faceapi = "./face-api.js"
const video = document.getElementById('video')
 
function startVideo(){
    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

 navigator.getUserMedia(
    {video: {}},
    stream => video.srcObject = stream,
    err => console.log(err)
 )       
}


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
     faceapi.nets.ageGenderNet.loadFromUri('/models'),
]).then(startVideo)

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval( async () => {
        const detections = await faceapi.detectAllFaces(video, new 
            faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            const resizeDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);

            faceapi.draw.drawDetections(canvas, resizeDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizeDetections)

    }, 100)
});
 




/*

   Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.tinyYolov2.loadFromUri('/models'),

   ]).then(cargarCamara)

const cargarCamara = () =>{
    navigator.getMedia (

        // Restricciones (contraints) *Requerido
        {
        video: true,
        audio: false
        },
        
        // Funcion de finalizacion (Succes-Callback) *Requerido
        stream => elvideo.strObject = stream,
        console.error
        
        
        );
}

elvideo.addEventListener('play', ()=>{
    //Creamos el canvmos con los elemtnos de laface api
    const canvas = faceapi.createCanvasFromMedia(elvideo)
    //Lo añadimos al body
    document.body.append(canvas)
})

*/
