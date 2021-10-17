import sys
import telnetlib
import time


Host = '192.168.249.1'
user = 'cisco'
password = 'cisco123'

tn = telnetlib.Telnet(Host)

tn.read_until(b"Username: ")
tn.write(user.encode('ascii') + b"\n")


tn.read_until(b"Password: ")
tn.write(password.encode('ascii') + b"\n")


time.sleep(2)
tn.write(b"config t\n")

time.sleep(2)
tn.write(b"\n")

time.sleep(2)
tn.write(b"interface fast 0/3\n")


time.sleep(2)
tn.write(b"switchport access vlan 10 \n")

tn.write(b"end\n")
tn.write(b"wr\n")
tn.write(b"exit\n")
line=tn.read_all()
print (line)