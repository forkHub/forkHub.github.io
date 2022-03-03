Graphics 320, 240

;DECLARE GLOBAL VARIABLE
Global img              ;img object
Global imgX = 100       ;img x position
Global imgY = 100       ;img y position
Global imgDrag = False  ;img is dragged or not
Global imgDragX = 100   ;img x position when dragged
Global imgDragY = 100   ;img y position when dragged

img = LoadImage("./gbr/box.png")
RotateImage img, 30
MidHandle img
Color 255, 255, 255, 1

Function Loop() 
    Cls

    ;//if input is pressed (mouse/touch)
    if (InputDown()) Then
        ;//if input position collide with image
        if ImageDotCollide(img, imgX, imgY, InputX(), InputY()) Then
            imgDrag = true
            imgDragX = imgX
            imgDragY = imgY
        EndIf
    Else 
        imgDrag = false
        imgX = imgDragX
        imgY = imgDragY;
    EndIf

    if (InputDrag() && imgDrag) Then
        imgDragX = imgX + InputDragX()
        imgDragY = imgY + InputDragY()
    EndIf

    DrawImage img, imgDragX, imgDragY
End Function
