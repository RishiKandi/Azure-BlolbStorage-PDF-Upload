// const { BlobServiceClient } = require("@azure/storage-blob");
// const selectButton = document.getElementById("select-button");
// const fileInput = document.getElementById("file-input");
// const listButton = document.getElementById("list-button");

// // Update <placeholder> with your Blob service SAS URL string
// const blobSasUrl = "https://blobstorageeeee.blob.core.windows.net/profilephoto?sp=racwdl&st=2023-04-12T05:23:49Z&se=2023-05-16T13:23:49Z&spr=https&sv=2021-12-02&sr=c&sig=TlpiqNWimPN71DeZqGVRjy%2F8cjNFXTBkFbVoWT6sKPs%3D";
// // Create a new BlobServiceClient
// const blobServiceClient = new BlobServiceClient(blobSasUrl);

// // Create a unique name for the container by 
// // appending the current time to the file name
// const containerName = "profilephoto" ;

// // Get a container client from the BlobServiceClient
// const containerClient = blobServiceClient.getContainerClient(containerName);

// const listFiles = async () => {
//     fileList.size = 0;
//     fileList.innerHTML = "";
//     try {
//         reportStatus("Retrieving file list...");
//         let iter = containerClient.listBlobsFlat();
//         let blobItem = await iter.next();
//         while (!blobItem.done) {
//             fileList.size += 1;
//             fileList.innerHTML += `<option>${blobItem.value.name}</option>`;


//             blobItem = await iter.next();
//         }
//         if (fileList.size > 0) {
//             reportStatus("Done.");
//         } else {
//             reportStatus("The container does not contain any files.");
//         }
//     } catch (error) {
//         reportStatus(error.message);
//     }
// };

// listButton.addEventListener("click", listFiles);

// const uploadFiles = async () => {
//     try {
//         reportStatus("Uploading files...");
//         const promises = [];
//         for (const file of fileInput.files) {
//             const blockBlobClient = containerClient.getBlockBlobClient(file.name);
//             promises.push(blockBlobClient.uploadBrowserData(file));
//         }
//         await Promise.all(promises);
//         reportStatus("Done.");
//         listFiles();
//     }
//     catch (error) {
//             reportStatus(error.message);
//     }
// }

// selectButton.addEventListener("click", () => fileInput.click());
// fileInput.addEventListener("change", uploadFiles);


// const fileInput = document.getElementById('file-input');
// const previewButton = document.getElementById('preview-button');
// const previewContainer = document.getElementById('preview-container');

// previewButton.addEventListener('click', () => {
//   const file = fileInput.files[0];
//   const reader = new FileReader();
  
//   reader.addEventListener('load', () => {
//     const fileContent = reader.result;
//     const fileType = file.type;

//     if (fileType === 'application/pdf') {
//       // Use PDF.js to render the PDF file on the page
//       const pdfViewer = document.createElement('iframe');
//       pdfViewer.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${fileContent}`;
//       previewContainer.appendChild(pdfViewer);
//     } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
//                fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
//       // Use Microsoft Office Web Viewer to display Word and Excel files
//       const officeViewer = document.createElement('iframe');
//       officeViewer.src = `https://view.officeapps.live.com/op/view.aspx?src=${fileContent}`;
//       previewContainer.appendChild(officeViewer);
//     } else {
//       // Unsupported file type
//       alert('Unsupported file type');
//     }
//   });
  
//   reader.readAsDataURL(file);
// });



// function PreviewImage() {
//     pdffile=document.getElementById("uploadPDF").files[0];
//     pdffile_url=URL.createObjectURL(pdffile);
//     $('#viewer').attr('src',pdffile_url);
// }






// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
// var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

// // Loaded via <script> tag, create shortcut to access PDF.js exports.
// var pdfjsLib = window['pdfjs-dist/build/pdf'];

// // The workerSrc property shall be specified.
// pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// var pdfDoc = null,
//     pageNum = 1,
//     pageRendering = false,
//     pageNumPending = null,
//     scale = 0.8,
//     canvas = document.getElementById('the-canvas'),
//     ctx = canvas.getContext('2d');

// /**
//  * Get page info from document, resize canvas accordingly, and render page.
//  * @param num Page number.
//  */
// function renderPage(num) {
//   pageRendering = true;
//   // Using promise to fetch the page
//   pdfDoc.getPage(num).then(function(page) {
//     var viewport = page.getViewport({scale: scale});
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     // Render PDF page into canvas context
//     var renderContext = {
//       canvasContext: ctx,
//       viewport: viewport
//     };
//     var renderTask = page.render(renderContext);

//     // Wait for rendering to finish
//     renderTask.promise.then(function() {
//       pageRendering = false;
//       if (pageNumPending !== null) {
//         // New page rendering is pending
//         renderPage(pageNumPending);
//         pageNumPending = null;
//       }
//     });
//   });

//   // Update page counters
//   document.getElementById('page_num').textContent = num;
// }

// /**
//  * If another page rendering in progress, waits until the rendering is
//  * finised. Otherwise, executes rendering immediately.
//  */
// function queueRenderPage(num) {
//   if (pageRendering) {
//     pageNumPending = num;
//   } else {
//     renderPage(num);
//   }
// }

// /**
//  * Displays previous page.
//  */
// function onPrevPage() {
//   if (pageNum <= 1) {
//     return;
//   }
//   pageNum--;
//   queueRenderPage(pageNum);
// }
// document.getElementById('prev').addEventListener('click', onPrevPage);

// /**
//  * Displays next page.
//  */
// function onNextPage() {
//   if (pageNum >= pdfDoc.numPages) {
//     return;
//   }
//   pageNum++;
//   queueRenderPage(pageNum);
// }
// document.getElementById('next').addEventListener('click', onNextPage);

// /**
//  * Asynchronously downloads PDF.
//  */
// pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
//   pdfDoc = pdfDoc_;
//   document.getElementById('page_count').textContent = pdfDoc.numPages;

//   // Initial/first page rendering
//   renderPage(pageNum);
// });
// var fileInput = document.getElementById('file-input');
// fileInput.addEventListener('change', function(e) {
//     var file = fileInput.files[0];
//     if (file.type === 'application/pdf') {
//       var fileReader = new FileReader();
  
//       fileReader.onload = function() {
//         var pdfData = new Uint8Array(this.result);
//         pdfjsLib.getDocument(pdfData).promise.then(function(pdfDoc_) {
//           pdfDoc = pdfDoc_;
//           document.getElementById('page_count').textContent = pdfDoc.numPages;
  
//           // Initial/first page rendering
//           renderPage(pageNum);
//         });
//       };
//       fileReader.readAsArrayBuffer(file);
//     } else {
//       alert("Please select a PDF file.");
//     }
//   });






// Loaded via <script> tag, create shortcut to access PDF.js exports.
// var pdfjsLib = window['pdfjs-dist/build/pdf'];
// // The workerSrc property shall be specified.
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

// $("#myPdf").on("change", function(e){
// 	var file = e.target.files[0]
// 	if(file.type == "application/pdf"){
// 		var fileReader = new FileReader();  
// 		fileReader.onload = function() {
// 			var pdfData = new Uint8Array(this.result);
// 			// Using DocumentInitParameters object to load binary data.
// 			var loadingTask = pdfjsLib.getDocument({data: pdfData});
// 			loadingTask.promise.then(function(pdf) {
// 			  console.log('PDF loaded');
			  
// 			  // Fetch the first page
// 			  var pageNumber = 1;
// 			  pdf.getPage(pageNumber).then(function(page) {
// 				console.log('Page loaded');
				
// 				var scale = 1.5;
// 				var viewport = page.getViewport({scale: scale});

// 				// Prepare canvas using PDF page dimensions
// 				var canvas = $("#pdfViewer")[0];
// 				var context = canvas.getContext('2d');
// 				canvas.height = viewport.height;
// 				canvas.width = viewport.width;

// 				// Render PDF page into canvas context
// 				var renderContext = {
// 				  canvasContext: context,
// 				  viewport: viewport
// 				};
// 				var renderTask = page.render(renderContext);
// 				renderTask.promise.then(function () {
// 				  console.log('Page rendered');
// 				});
// 			  });
// 			}, function (reason) {
// 			  // PDF loading error
// 			  console.error(reason);
// 			});
// 		};
// 		fileReader.readAsArrayBuffer(file);
// 	}
// });



// Load PDF.js library and specify worker source
// var pdfjsLib = window['pdfjs-dist/build/pdf'];
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

// // Add event listener for file input change
// $("#myPdf").on("change", function(e) {
//   var file = e.target.files[0];

//   // Check if file is a PDF
//   if (file.type == "application/pdf") {
//     var fileReader = new FileReader();  

//     // Load PDF file data as array buffer
//     fileReader.onload = function() {
//       var pdfData = new Uint8Array(this.result);

//       // Load PDF document with PDF.js
//       var loadingTask = pdfjsLib.getDocument({data: pdfData});

//       // When PDF is loaded successfully
//       loadingTask.promise.then(function(pdf) {
//         console.log('PDF loaded');

//         // Get the first page of the PDF
//         var pageNumber = 1;
//         pdf.getPage(pageNumber).then(function(page) {
//           console.log('Page loaded');

//           // Define the scale and viewport of the page
//           var scale = 1.5;
//           var viewport = page.getViewport({scale: scale});

//           // Get the canvas element and context
//           var canvas = document.getElementById('pdfViewer');
//           var context = canvas.getContext('2d');

//           // Set the canvas size to match the viewport size
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;

//           // Render the page into the canvas
//           var renderContext = {
//             canvasContext: context,
//             viewport: viewport
//           };
//           var renderTask = page.render(renderContext);
//           renderTask.promise.then(function() {
//             console.log('Page rendered');
//           });
//         });
//       }, function(reason) {
//         // PDF loading error
//         console.error(reason);
//       });
//     };
//     fileReader.readAsArrayBuffer(file);
//   }
// });





// function previewFile() {
//     var previewContainer = document.querySelector('.preview-container');
//     var previewImage = previewContainer.querySelector('.preview-image');
//     var pdfjsLib = window['pdfjs-dist/build/pdf'];
//     // Get the selected file
//     var file = document.querySelector('input[type=file]').files[0];
  
//     // Check if the selected file is a PDF or an image
//     if (file.type.startsWith('image/')) {
//       // If the selected file is an image, display it in the preview container
//       var reader = new FileReader();
//       reader.onloadend = function() {
//         previewImage.src = reader.result;
//       }
//       if (file) {
//         reader.readAsDataURL(file);
//       } else {
//         previewImage.src = "";
//       }
//     } else if (file.type == 'application/pdf') {
//       // If the selected file is a PDF, display it in the preview container using PDF.js library
//       var fileReader = new FileReader();
//       fileReader.onload = function() {
//         var typedarray = new Uint8Array(this.result);
//         pdfjsLib.getDocument(typedarray).then(function(pdf) {
//           pdf.getPage(1).then(function(page) {
//             var canvas = document.createElement('canvas');
//             var ctx = canvas.getContext('2d');
//             var viewport = page.getViewport({scale: 1});
//             canvas.width = viewport.width;
//             canvas.height = viewport.height;
//             page.render({canvasContext: ctx, viewport: viewport}).promise.then(function() {
//               previewImage.src = canvas.toDataURL();
//             });
//           });
//         });
//       };
//       fileReader.readAsArrayBuffer(file);
//     }
//   }
  


function renderPage(num) {
    pageRendering = true;
    // Using promise to fetch the page
    pdfDoc.getPage(num).then(function(page) {
      var viewport = page.getViewport({scale: scale});
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      document.querySelector('#pdf-viewer').appendChild(canvas);
  
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
  
      // Wait for rendering to finish
      renderTask.promise.then(function() {
        pageRendering = false;
        if (pageNumPending !== null) {
          // New page rendering is pending
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });
  
    // Update page counters
    document.getElementById('page_num').textContent = num;
  }
  



function previewFile() {
    var previewContainer = document.querySelector('.preview-container');
    var previewImage = previewContainer.querySelector('.preview-image');
  
    // Get the selected file
    var file = document.querySelector('input[type=file]').files[0];
  
    // Check if the selected file is a PDF or an image
    if (file.type.startsWith('image/')) {
      // If the selected file is an image, display it in the preview container
      var reader = new FileReader();
      reader.onloadend = function() {
        previewImage.src = reader.result;
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        previewImage.src = "";
      }
    } else if (file.type == 'application/pdf') {
      // If the selected file is a PDF, display it in the preview container using PDF.js library
      pdfjsLib.getDocument({ url: URL.createObjectURL(file) }).promise.then(function(pdf) {
        pdf.getPage(1).then(function(page) {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var viewport = page.getViewport({ scale: 1 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function() {
            previewImage.src = canvas.toDataURL();
          });
        });
      });
    }
  }
  

  