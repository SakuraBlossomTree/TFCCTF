data = "CCCA CACG CAAT CAAT CCCA CACG CTGT ATAC CCTT CTCT ATAC CGTA CGTA CCTT CGCT ATAT CTCA CCTT CTCA CGGA ATAC CTAT CCTT ATCA CTAT CCTT ATCA CCTT CTCA ATCA CTCA CTCA ATAA ATAA CCTT CCCG ATAT CTAG CTGC CCTT CTAT ATAA ATAA CGTG CTTC"

# Remove spaces
data = data.replace(" ", "")

# Create a list to hold the binary values
binary_data = []

# Replace characters with binary values
for char in data:
    if char == 'A':
        binary_data.append("00")
    elif char == 'T':
        binary_data.append("11")
    elif char == 'G':
        binary_data.append("10")
    elif char == 'C':
        binary_data.append("01")

# Join the list into a single string
binary_data = ''.join(binary_data)

print(binary_data)

