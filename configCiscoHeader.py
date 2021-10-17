user = 'cisco'
password = 'cisco123'

tn = telnetlib.Telnet(Host)

tn.read_until(b"Username: ")
tn.write(user.encode('ascii') + b"\n")


tn.read_until(b"Password: ")
tn.write(password.encode('ascii') + b"\n")

tn.write(b"config t\n")
tn.write(b"\n")
