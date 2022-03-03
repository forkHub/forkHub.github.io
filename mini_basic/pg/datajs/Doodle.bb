Graphics 640, 480
FPS 60
brush = LoadImage("./gbr/brush.png")
MidHandle brush

Function Loop()
    If InputDrag() Then 
        DrawImage brush, InputX(), InputY()
    EndIf
End Function