const fileInput = document.getElementById("fileInput")
const viewer = document.getElementById("viewer")

fileInput.addEventListener("change", function(e){

    const file = e.target.files[0]

    const reader = new FileReader()

    reader.onload = function(){

        const typedarray = new Uint8Array(this.result)

        pdfjsLib.getDocument(typedarray).promise.then(function(pdf){

            viewer.innerHTML=""

            for(let pageNum=1; pageNum<=pdf.numPages; pageNum++){

                pdf.getPage(pageNum).then(function(page){

                    const viewport = page.getViewport({scale:1.5})

                    const pageDiv = document.createElement("div")
                    pageDiv.className="page"

                    const canvas = document.createElement("canvas")
                    const context = canvas.getContext("2d")

                    canvas.height = viewport.height
                    canvas.width = viewport.width

                    pageDiv.appendChild(canvas)
                    viewer.appendChild(pageDiv)

                    const renderContext={
                        canvasContext:context,
                        viewport:viewport
                    }

                    page.render(renderContext)

                })

            }

        })

    }

    reader.readAsArrayBuffer(file)

})