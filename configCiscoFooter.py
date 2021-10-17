
tn.write(b"end\n")
tn.write(b"wr\n")
tn.write(b"exit\n")
line = tn.read_all()
print(line)
