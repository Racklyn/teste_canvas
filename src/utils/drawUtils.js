export default {

    drawBlocks(ctxRefCurr, numBlocks, bSide, bColor){
        ctxRefCurr.fillStyle = bColor
        for(var x=0;x<numBlocks;x++){
            for(var y=0;y<numBlocks;y++){
                ctxRefCurr.fillRect(bSide*x,bSide*y,bSide-2, bSide-2);
                ctxRefCurr.fill();
            }
        }
    },
    drawPerson(ctxRefCurr, personInfo, bSide){
        const image = new Image();
        //image.src = "http://4.bp.blogspot.com/-Ei5gbWt0BwQ/VeYwQEIf6sI/AAAAAAAAlbo/uNXRTHdOqJQ/w680/bob-esponja-em-png-vetorizado-queroimagem-cei%25C3%25A7a-crispim%2B%25286%2529.png"
        image.src = personInfo.imageUrl//require("../assets/person2.png")

        let imgYCrop = 0
        let imgXCrop = personInfo.stepImagePos

        if (personInfo.lastDirY === -1) imgYCrop = 0
        else if (personInfo.lastDirY === 1) imgYCrop = 1
        else if (personInfo.lastDirX === -1) imgYCrop = 2
        else if (personInfo.lastDirX === 1) imgYCrop = 3

        
        

        ctxRefCurr.drawImage(
            image,
            imgXCrop * image.width/3, imgYCrop * image.height/4,
            image.width/3, image.height/4,
            personInfo.xB*bSide, personInfo.yB*bSide, 
            personInfo.width*bSide,personInfo.height*bSide,
            // 0, 0,
            // 50, 50
        );

        // ctxRefCurr.fillStyle = personInfo.color
        // ctxRefCurr.fillRect(personInfo.xB*bSide, personInfo.yB*bSide,personInfo.width*bSide, personInfo.height*bSide);
        // ctxRefCurr.fill();
    },
    clear(ctxRefCurr, side, newColor){
        ctxRefCurr.fillStyle = newColor
        ctxRefCurr.fillRect(0,0,side, side);
        ctxRefCurr.fill();
    },

    clearAndRedraw(ctxRefCurr, numBlocks, side, color, bColor, personInfo){
        this.clear(ctxRefCurr, side, color)
        this.drawBlocks(ctxRefCurr, numBlocks, side/numBlocks, bColor)
        this.drawPerson(ctxRefCurr, personInfo, side/numBlocks)
    }
}