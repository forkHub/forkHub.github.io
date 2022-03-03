Graphics 320, 240

Global img
Global imgBig
Global frame = 0
Global deg = 0
Global rot = 0
Global boxAr = Dim(10)

For i = 0 to 9
    boxAr[i].x = -Math.floor(Math.random() * 320)
    boxAr[i].y = Math.floor(Math.random() * 240)
Next

img = LoadImage("./gbr/box.png")
ResizeImage img, 16, 16
MidHandle img

imgBig = CopyImage(img)
ResizeImage imgBig, 30, 200
MidHandle imgBig
RotateImage imgBig, 30

Function Loop() 
    Cls

    For i = 0 to 9

        box = boxAr[i]
        box.x = box.x + 10
        
        if (box.x > 320) Then
            box.x = 0
            box.y = Math.floor(Math.random() * 240)
        EndIf

        if (ImageCollide(img, box.x, box.y, imgBig, 290, 120)) Then
            box.x = 0
            box.y = Math.floor(Math.random() * 240)
        EndIf

        DrawImage img, box.x, box.y
    
    Next

    rot = ((rot + 5) mod 360)
    RotateImage imgBig, rot
    DrawImage imgBig, 290, 120
End Function