MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

for i in range(3):
    for j in MATRIX_STR.splitlines():
        if len(j) > 1 and j[i].isalpha():
            print(j[i], end="")
print('')