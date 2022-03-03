Graphics 300, 300

Global img
Global frame = 0
Global slide = 0

img = LoadAnimImage("./gbr/exp2_0.png", 64, 64)
ResizeImage img, 120, 120

Function Loop()
    Cls
    frame = ((frame mod 8) + 1)
    slide = (slide mod 120) + 5
    TileImage img, 0, 0, 0
    TileImage img, slide, slide, frame - 1
End Function
