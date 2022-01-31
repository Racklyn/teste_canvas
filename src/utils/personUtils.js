export default {
    endOfTheBoardVerification(personInfo, side, numberOfBlocks, stepRel){
        let newY = personInfo.yB + (stepRel * personInfo.dirY) //*personInfo.width
        let newX = personInfo.xB + (stepRel * personInfo.dirX) //*personInfo.width

        if (newX < 0) newX = 0
        else if (newX + personInfo.width > numberOfBlocks) newX = numberOfBlocks - personInfo.width
            
        if (newY < 0) newY = 0
        else if (newY + personInfo.height > numberOfBlocks) newY = numberOfBlocks - personInfo.height

        let newPersonInfo = {
            ...personInfo,
            'yB': newY,
            'xB': newX,
        }

        return newPersonInfo
    }
}