Graphics 300, 300
Global img
Global frame = 0
img = LoadAnimImage("./gbr/exp2_0.png", 64, 64)
ResizeImage img, 256, 256

Function Loop() 
    Cls
    frame = ((frame mod 8) + 1)
    DrawImage img, 0, 0, frame - 1
End Function