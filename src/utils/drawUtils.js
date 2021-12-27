export default {

    drawBlocks(ctxRefCurr, numBlocks, bSide, bColor){
        ctxRefCurr.fillStyle = bColor
        for(var x=0;x<numBlocks;x++){
            for(var y=0;y<numBlocks;y++){
                ctxRefCurr.fillRect(bSide*x,bSide*y,bSide-2, bSide-2);
                ctxRefCurr.fill();
                //console.log(x,y)
            }
        }
    },
    drawPerson(ctxRefCurr, personInfo, bSide){
        ctxRefCurr.fillStyle = personInfo.color
        ctxRefCurr.fillRect(personInfo.xB+bSide, personInfo.yB+bSide,personInfo.width, personInfo.height);
        ctxRefCurr.fill();
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