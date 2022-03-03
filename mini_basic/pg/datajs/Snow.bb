Graphics 120, 160
Global snow = Dim(100)

;add property to snow
For i = 0 To 99
    snow[i].x = Math.random() * 120
    snow[i].y = Math.random() * 160
Next

;looping
Function Loop() 
    For i = 0 To 99
        item = snow[i]
        If (moveDown(item)) Then 
        ElseIf (moveRight(item)) Then 
        ElseIf (moveLeft(item)) Then 
        Else 
            item.y = 0
            item.x = Math.floor(Math.random() * 120)
        EndIf
    Next
End Function


;move snow left
Function moveLeft(snow)

    ; snow already at bottom
    If (snow.y >= 159) Then Return False

    ;get color pixel at left down position
    pixel = GetPixel(snow.x - 1, snow.y + 1)

    ;if red color is more than zero, means there is already snow there
    If (pixel[0] > 0) Then Return False

    ;we can move left down
    ;draw snow at left bottom position
    drawSnow(-1, 1, snow)

    Return True

End Function


Function moveRight(snow) 
    If (snow.y >= 159) Then Return False

    pixel = GetPixel(snow.x + 1, snow.y + 1)

    If (pixel[0] > 0) Then Return False
    
    drawSnow(1, 1, snow);
    
	  Return True
End Function


Function moveDown(snow) 

    If (snow.y >= 159) Then Return False

    pixel = GetPixel(snow.x, snow.y + 1)

    If (pixel[0] > 0) Then Return False
    
    drawSnow(0, 1, snow)
    
	  Return True

End Function

;draw snow at pos
Function drawSnow(xAdd, yAdd, snow)
    
    ;set color to zero, opacity full
    Color 0, 0, 0, 1
    SetPixel snow.x, snow.y

    ;add snow position
    snow.x = snow.x + xAdd
    snow.y = snow.y + yAdd
    
    ;draw snow at new pos
    Color 255, 255, 255, 1
    SetPixel snow.x, snow.y
End Function